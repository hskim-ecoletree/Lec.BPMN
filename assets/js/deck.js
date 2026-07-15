/* =========================================================================
   Lec.BPMN — deck.js
   reveal.js 초기화 + bpmn-js 렌더링 + 토큰 재생(step) 시스템
   ========================================================================= */
(function () {
  "use strict";

  /* ---- 1. reveal 초기화 ---------------------------------------------- */
  Reveal.initialize({
    width: 1280,
    height: 720,
    margin: 0,
    minScale: 0.2,
    maxScale: 2.0,
    center: false,
    hash: true,
    controls: true,
    progress: true,
    slideNumber: false,
    transition: "fade",
    transitionSpeed: "fast",
    fragments: true,
  });

  /* ---- 2. bpmn 뷰어 레지스트리 --------------------------------------- */
  const viewers = new Map(); // container element -> { viewer, ready, ids }

  function makeViewer(container) {
    const canvas = container.querySelector(".bpmn__canvas");
    const viewer = new BpmnJS({ container: canvas });
    const rec = { viewer, ready: false, canvas };
    viewers.set(container, rec);
    return rec;
  }

  async function ensureLoaded(container) {
    let rec = viewers.get(container);
    if (!rec) rec = makeViewer(container);
    if (rec.ready) return rec;
    const url = container.getAttribute("data-model");
    try {
      const xml = await fetch(url).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
        return r.text();
      });
      await rec.viewer.importXML(xml);
      rec.ready = true;
      fit(rec, container);
    } catch (err) {
      console.error("[bpmn] load failed:", url, err);
      rec.canvas.innerHTML =
        '<div style="padding:24px;color:#b91c1c;font:14px monospace">' +
        "BPMN 로드 실패: " + url + "<br>" + (err && err.message) + "</div>";
    }
    return rec;
  }

  function fit(rec, container) {
    const focus = container.getAttribute("data-focus");
    const pad = +(container.getAttribute("data-pad") || 40);
    if (focus) {
      focusOn(rec, focus.split(/[,\s]+/).filter(Boolean), pad);
    } else {
      rec.viewer.get("canvas").zoom("fit-viewport", "auto");
    }
  }

  function focusOn(rec, ids, pad) {
    pad = pad || 40;
    const reg = rec.viewer.get("elementRegistry");
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, n = 0;
    ids.forEach((id) => {
      const el = reg.get(id);
      if (!el) return;
      n++;
      x0 = Math.min(x0, el.x); y0 = Math.min(y0, el.y);
      x1 = Math.max(x1, el.x + el.width); y1 = Math.max(y1, el.y + el.height);
    });
    if (!n) { rec.viewer.get("canvas").zoom("fit-viewport", "auto"); return; }
    rec.viewer.get("canvas").viewbox({
      x: x0 - pad, y: y0 - pad,
      width: (x1 - x0) + pad * 2, height: (y1 - y0) + pad * 2,
    });
  }

  /* ---- 3. bpmn 조작 API (step 함수에서 사용) ------------------------- */
  function apiFor(container) {
    const rec = viewers.get(container);
    const viewer = rec.viewer;
    const canvas = viewer.get("canvas");
    const overlays = viewer.get("overlays");
    const reg = viewer.get("elementRegistry");
    // 추적 상태는 컨테이너(뷰어)에 유지 — clear()가 이전 step의 마커도 제거해야 함
    const added = rec.added || (rec.added = { overlays: [], markers: [] });

    const api = {
      clear() {
        added.overlays.forEach((id) => overlays.remove(id));
        added.overlays = [];
        added.markers.forEach(([id, c]) => { try { canvas.removeMarker(id, c); } catch (e) {} });
        added.markers = [];
        return api;
      },
      mark(ids, cls) {
        toArr(ids).forEach((id) => {
          if (!reg.get(id)) return;
          canvas.addMarker(id, cls); added.markers.push([id, cls]);
        });
        return api;
      },
      token(id, label, cls) {
        const el = reg.get(id);
        if (!el) return api;
        const html = document.createElement("div");
        html.className = "tok " + (cls || "");
        html.textContent = label == null ? "" : label;
        // 요소 우상단 — 라벨을 가리지 않는다
        const oid = overlays.add(id, {
          position: { top: -12, left: el.width - 14 },
          html,
        });
        added.overlays.push(oid);
        return api;
      },
      focus(ids, pad) { focusOn(rec, toArr(ids), pad || 40); return api; },
      fit() { canvas.zoom("fit-viewport", "auto"); return api; },
    };
    return api;
  }

  function toArr(v) { return Array.isArray(v) ? v : String(v).split(/[,\s]+/).filter(Boolean); }

  /* ---- 4. step(토큰 재생) 정의 -------------------------------------- */
  // slideId -> [stateFn(api), ...]  (index = 지금까지 보인 fragment 수)
  const STEPS = {};

  // 슬라이드 02: 목록 ↔ 구조 — 구조 요소를 순서대로 가리킨다 (전체 유지, 마크만)
  STEPS["s-structure"] = [
    (a) => a.clear(),
    (a) => a.clear().mark("S_Start", "active-el"),
    (a) => a.clear().mark(
      ["S_Request", "S_Review", "S_Account", "S_Equipment", "S_Training"], "active-el"),
    (a) => a.clear().mark(["S_Complete", "S_Split"], "active-el")
      .mark(["S_fOk", "S_fLoop", "S_fAcc", "S_fEq", "S_fTr"], "highlight-flow"),
    (a) => a.clear().mark(["S_Submitted", "S_StartDate"], "active-el"),
    (a) => a.clear().mark("S_Ready", "active-el"),
    (a) => a.clear().mark("S_Ready", "active-el"), // caveat 노출 — 마킹 유지
  ];

  // 슬라이드 11: 범위 — 시작과 끝 (경계 강조: 시작 하나 + 결말 셋)
  // caveat 단일 fragment에서 경계 전체를 함께 표시한다.
  STEPS["s-scope"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().mark(
      ["Sc_Start", "Sc_Ready", "Sc_Missing", "Sc_Canceled"], "active-el"),
  ];

  // 슬라이드 13: 정상 경로와 예외 경로 — 결말 하나(정상) → 예외 셋 누적 강조
  STEPS["s-paths"] = [
    (a) => a.clear(),
    (a) => a.clear().mark("EndEvent_FirstDayReady", "active-el"),
    (a) => a.clear().mark(
      ["EndEvent_FirstDayReady", "EndEvent_DocumentsMissing"], "active-el"),
    (a) => a.clear().mark(
      ["EndEvent_FirstDayReady", "EndEvent_DocumentsMissing",
       "EndEvent_OnboardingCanceled"], "active-el"),
    (a) => a.clear().mark(
      ["EndEvent_FirstDayReady", "EndEvent_DocumentsMissing",
       "EndEvent_OnboardingCanceled", "Task_CreateAccount"], "active-el"),
  ];

  // 슬라이드 16: Start/End Event — 시작 하나 강조 → 결말 셋 추가 강조
  STEPS["s-startend"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().mark("StartEvent_OfferAccepted", "active-el"),
    (a) => a.clear().mark(
      ["StartEvent_OfferAccepted", "EndEvent_FirstDayReady",
       "EndEvent_DocumentsMissing", "EndEvent_OnboardingCanceled"], "active-el"),
  ];

  // 슬라이드 17: Pool·Lane·Message Flow — Lane 강조 → 외부 Pool + Message Flow
  STEPS["s-lanes"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().mark(
      ["Lane_HR", "Lane_Manager", "Lane_IT", "Lane_Facilities"], "highlight-flow"),
    (a) => a.clear()
      .mark("Participant_IdentityProvider", "active-el")
      .mark("MessageFlow_CreateAccountRequest", "highlight-flow"),
  ];

  // 슬라이드 18: User Task — 검토 태스크로 줌 → 대기(하류 dim)
  STEPS["s-usertask"] = [
    (a) => a.clear().fit(),
    (a) => a.clear()
      .focus(["Task_ReviewDocuments", "Gateway_DocumentsComplete", "Task_RequestCorrections"], 70)
      .mark("Task_ReviewDocuments", "active-el"),
    (a) => a.clear()
      .focus(["Task_ReviewDocuments", "Gateway_DocumentsComplete", "Task_RequestCorrections"], 70)
      .mark("Task_ReviewDocuments", "active-el")
      .mark(["Gateway_DocumentsComplete", "Task_RequestCorrections", "Gateway_RequirementsMerge"], "dim-el"),
  ];

  // 슬라이드 23: Gateway 규칙 — 분기 강조 → 합류 → 일은 Task
  STEPS["s-gateway"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().mark("Gr_Split", "active-el"),
    (a) => a.clear().mark(["Gr_Split", "Gr_Merge"], "active-el"),
    (a) => a.clear().mark(["Gr_TaskA", "Gr_TaskB"], "active-el"),
  ];

  // 슬라이드 24: Exclusive Gateway — 분기(토큰 1) → 한 경로 → 합류 통과
  var WM = ["Gateway_WorkMode", "Task_PrepareRemoteShipping",
            "Task_PrepareOfficeSeat", "Gateway_WorkModeMerge"];
  STEPS["s-xor"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(WM, 60).mark("Gateway_WorkMode", "active-el").token("Gateway_WorkMode"),
    (a) => a.clear().focus(WM, 60)
      .mark("Task_PrepareRemoteShipping", "active-el").token("Task_PrepareRemoteShipping")
      .mark("Task_PrepareOfficeSeat", "dim-el").token("Task_PrepareOfficeSeat", null, "tok--ghost"),
    (a) => a.clear().focus(WM, 60).mark("Gateway_WorkModeMerge", "active-el").token("Gateway_WorkModeMerge"),
    // caveat — 조건 미일치 시 Default 경로가 받는다(근무 형태 다시 확인)
    (a) => a.clear().focus(WM.concat(["Task_ResolveWorkMode"]), 60)
      .mark("Task_ResolveWorkMode", "active-el").token("Task_ResolveWorkMode"),
  ];

  // 슬라이드 25: Parallel Gateway — 분기(1) → 셋(3) → 합류 대기
  var PREP = ["Gateway_PreparationSplit", "Task_CreateAccount", "Task_PrepareEquipment",
              "Task_RegisterTraining", "Gateway_PreparationJoin"];
  STEPS["s-parallel"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(PREP, 55).mark("Gateway_PreparationSplit", "active-el").token("Gateway_PreparationSplit"),
    (a) => a.clear().focus(PREP, 55)
      .mark(["Task_CreateAccount", "Task_PrepareEquipment", "Task_RegisterTraining"], "active-el")
      .token("Task_CreateAccount").token("Task_PrepareEquipment").token("Task_RegisterTraining"),
    (a) => a.clear().focus(PREP, 55).mark("Gateway_PreparationJoin", "active-el").token("Gateway_PreparationJoin"),
    // caveat — 하나라도 도착하지 않으면 합류가 멈춘다(26 교착 예고)
    (a) => a.clear().focus(PREP, 55)
      .mark("Gateway_PreparationJoin", "dead-el")
      .token("Task_CreateAccount").token("Task_PrepareEquipment")
      .token("Task_RegisterTraining", null, "tok--ghost")
      .token("Gateway_PreparationJoin", null, "tok--wait"),
  ];

  // 슬라이드 28: Inclusive 분기 — 조건에 맞는 경로만 (VPN·개발도구 O, 관리자 X)
  var ACC = ["Gateway_AccessSplit", "Task_ProvisionVpn", "Task_ProvisionDevTools",
             "Task_ApproveAdminAccess", "Gateway_AccessJoin"];
  STEPS["s-inclusive"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(ACC, 55).mark("Gateway_AccessSplit", "active-el").token("Gateway_AccessSplit"),
    (a) => a.clear().focus(ACC, 55)
      .mark(["Task_ProvisionVpn", "Task_ProvisionDevTools"], "active-el")
      .token("Task_ProvisionVpn").token("Task_ProvisionDevTools")
      .mark("Task_ApproveAdminAccess", "dim-el").token("Task_ApproveAdminAccess", null, "tok--ghost"),
    (a) => a.clear().focus(ACC, 55)
      .mark(["Task_ProvisionVpn", "Task_ProvisionDevTools"], "active-el")
      .token("Task_ProvisionVpn").token("Task_ProvisionDevTools")
      .mark("Task_ApproveAdminAccess", "dim-el").token("Task_ApproveAdminAccess", null, "tok--ghost"),
  ];

  // 슬라이드 29: Inclusive 합류 — 활성 경로(둘)만 대기, 관리자 경로는 대상 아님
  STEPS["s-inclusive-join"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(ACC, 55).mark("Gateway_AccessJoin", "active-el")
      .token("Task_ProvisionVpn").token("Task_ProvisionDevTools")
      .mark("Task_ApproveAdminAccess", "dim-el"),
    (a) => a.clear().focus(ACC, 55).mark("Gateway_AccessJoin", "active-el").token("Gateway_AccessJoin")
      .mark("Task_ApproveAdminAccess", "dim-el"),
    (a) => a.clear().focus(ACC, 55).mark("Gateway_AccessJoin", "active-el").token("Gateway_AccessJoin")
      .mark("Task_ApproveAdminAccess", "dim-el"),
  ];

  // 슬라이드 30: Event-based — 두 사건 경쟁 → 제출이 먼저(기한 취소)
  var EVT = ["Gateway_WaitForDocuments", "CatchEvent_DocumentsSubmitted",
             "CatchEvent_DocumentsDeadline", "Task_ReviewDocuments"];
  STEPS["s-eventbased"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(EVT, 55).mark("Gateway_WaitForDocuments", "active-el")
      .mark(["CatchEvent_DocumentsSubmitted", "CatchEvent_DocumentsDeadline"], "highlight-flow"),
    (a) => a.clear().focus(EVT, 55)
      .mark("CatchEvent_DocumentsSubmitted", "active-el").token("CatchEvent_DocumentsSubmitted")
      .mark("CatchEvent_DocumentsDeadline", "dead-el").token("CatchEvent_DocumentsDeadline", null, "tok--ghost"),
    (a) => a.clear().focus(EVT, 55)
      .mark("CatchEvent_DocumentsSubmitted", "active-el").token("CatchEvent_DocumentsSubmitted")
      .mark("CatchEvent_DocumentsDeadline", "dead-el").token("CatchEvent_DocumentsDeadline", null, "tok--ghost"),
  ];

  // 슬라이드 35: Definition/Instance/Cockpit — 한 설계, 세 건이 다른 위치
  STEPS["s-instances"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().fit(),
    (a) => a.clear().fit()
      .token("Task_ReviewDocuments").token("Task_CreateAccount").token("CatchEvent_StartDate"),
    (a) => a.clear().fit()
      .token("Task_ReviewDocuments").token("Task_CreateAccount").token("CatchEvent_StartDate"),
  ];

  // 슬라이드 36: 저장 지점과 롤백 — 계정 생성 앞 저장 지점 → 실패 → 롤백 범위
  var SAVE = ["Gateway_PreparationSplit", "Task_CreateAccount", "Gateway_PreparationJoin"];
  STEPS["s-savepoint"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(SAVE, 55).mark("Task_CreateAccount", "active-el").token("Task_CreateAccount", null, "tok--wait"),
    (a) => a.clear().focus(SAVE, 55).mark("Task_CreateAccount", "dead-el").token("Task_CreateAccount", null, "tok--ghost"),
    (a) => a.clear().focus(SAVE, 55).mark("Task_CreateAccount", "dead-el").token("Task_CreateAccount", null, "tok--wait"),
  ];

  // 슬라이드 38: Boundary Event — 확인 작업 계속 + 비중단 곁길 토큰
  var BND = ["Task_ConfirmRequirements", "BoundaryEvent_ManagerDelay",
             "Task_ManagerDelayFollowup", "EndEvent_ReminderCompleted"];
  STEPS["s-boundary"] = [
    (a) => a.clear().fit(),
    (a) => a.clear().focus(BND, 55).mark("Task_ConfirmRequirements", "active-el").token("Task_ConfirmRequirements"),
    (a) => a.clear().focus(BND, 55)
      .mark("Task_ConfirmRequirements", "active-el").token("Task_ConfirmRequirements")
      .mark(["BoundaryEvent_ManagerDelay", "Task_ManagerDelayFollowup"], "highlight-flow")
      .token("Task_ManagerDelayFollowup"),
    (a) => a.clear().focus(BND, 55)
      .mark("Task_ConfirmRequirements", "active-el").token("Task_ConfirmRequirements")
      .mark(["BoundaryEvent_ManagerDelay", "Task_ManagerDelayFollowup"], "highlight-flow")
      .token("Task_ManagerDelayFollowup"),
  ];

  // 슬라이드 40: Event Subprocess — 취소가 진행 전체를 중단
  var ESUB = ["EventSubProcess_OfferCancellation", "StartEvent_OfferCanceled",
              "Task_RecordCancellation", "EndEvent_OnboardingCanceled"];
  STEPS["s-eventsub"] = [
    (a) => a.clear().fit().token("Task_ReviewDocuments"),
    (a) => a.clear().fit().token("Task_ReviewDocuments"),
    (a) => a.clear().focus(ESUB, 55)
      .mark(["EventSubProcess_OfferCancellation", "StartEvent_OfferCanceled",
             "Task_RecordCancellation", "EndEvent_OnboardingCanceled"], "highlight-flow")
      .token("StartEvent_OfferCanceled")
      .token("Task_ReviewDocuments", null, "tok--ghost"),
    (a) => a.clear().focus(ESUB, 55)
      .mark(["EventSubProcess_OfferCancellation", "StartEvent_OfferCanceled",
             "Task_RecordCancellation", "EndEvent_OnboardingCanceled"], "highlight-flow")
      .token("StartEvent_OfferCanceled")
      .token("Task_ReviewDocuments", null, "tok--ghost"),
  ];

  // 슬라이드 09: 전체 온보딩 모델 — 조작 없음(fit)
  // 슬라이드 22: 토큰으로 진행 위치 읽기
  STEPS["s-token"] = [
    (a) => a.clear().fit(),
    (a) => a.clear()
      .focus(["Task_RequestDocuments", "Gateway_WaitForDocuments",
              "CatchEvent_DocumentsDeadline", "Task_ReviewDocuments"], 60)
      .mark("Gateway_WaitForDocuments", "active-el")
      .token("Gateway_WaitForDocuments"),
    (a) => a.clear()
      .focus(["Gateway_PreparationSplit", "Task_RegisterTraining", "Task_CreateAccount",
              "Task_PrepareEquipment", "Gateway_PreparationJoin"], 55)
      .mark(["Task_CreateAccount", "Task_PrepareEquipment", "Task_RegisterTraining"], "active-el")
      .token("Task_CreateAccount")
      .token("Task_PrepareEquipment")
      .token("Task_RegisterTraining"),
    (a) => a.clear()
      .focus(["Gateway_PreparationJoin", "CatchEvent_StartDate", "Task_FinalReadinessCheck"], 60)
      .mark("CatchEvent_StartDate", "active-el")
      .token("CatchEvent_StartDate"),
    (a) => a.clear()
      .focus(["Task_FinalReadinessCheck", "EndEvent_FirstDayReady"], 70)
      .mark("EndEvent_FirstDayReady", "active-el")
      .token("EndEvent_FirstDayReady"),
  ];

  // 슬라이드 26: 교착 (XOR 분기 + Parallel 합류)
  STEPS["s-deadlock"] = [
    (a) => a.clear(),
    (a) => a.clear()
      .mark(["Frag_XOR", "Frag_fRemote", "Frag_Remote"], "highlight-flow")
      .mark("Frag_Office", "dim-el").mark("Frag_fOffice", "dim-el")
      .token("Frag_Remote"),
    (a) => a.clear()
      .mark("Frag_Office", "dim-el")
      .mark("Frag_AND", "dead-el")
      .token("Frag_AND", null, "tok--wait")
      .token("Frag_Office", null, "tok--ghost"),
    (a) => a.clear()
      .mark("Frag_Office", "dim-el")
      .mark(["Frag_AND", "Frag_fToOrientation"], "dead-el")
      .mark(["Frag_Orientation", "Frag_End", "Frag_fEnd"], "dim-el")
      .token("Frag_AND", null, "tok--wait")
      .token("Frag_Office", null, "tok--ghost"),
  ];

  /* ---- 5. step 적용 (fragment 연동) --------------------------------- */
  function currentSlideEl() { return Reveal.getCurrentSlide(); }

  function slideKey(slideEl) { return slideEl && slideEl.getAttribute("data-steps"); }

  function visibleFragments(slideEl) {
    const frs = slideEl.querySelectorAll(".fragment");
    let n = 0;
    frs.forEach((f) => { if (f.classList.contains("visible")) n++; });
    return n;
  }

  async function renderSlide(slideEl) {
    if (!slideEl) return;
    const container = slideEl.querySelector(".bpmn[data-model]");
    if (container) await ensureLoaded(container);
    applySteps(slideEl);
  }

  function applySteps(slideEl) {
    const key = slideKey(slideEl);
    if (!key || !STEPS[key]) { dbg("no-key", key); return; }
    const container = slideEl.querySelector(".bpmn[data-model]");
    if (!container) { dbg("no-container"); return; }
    const rec = viewers.get(container);
    if (!rec || !rec.ready) { dbg("not-ready", !!rec, rec && rec.ready); return; }
    const steps = STEPS[key];
    const idx = Math.min(visibleFragments(slideEl), steps.length - 1);
    dbg("apply", key, "idx", idx);
    steps[idx](apiFor(container));
  }

  var DEBUG = /[?&]debug/.test(location.search);
  function dbg() { if (DEBUG) console.log.apply(console, ["[deck]"].concat([].slice.call(arguments))); }
  window.__deck = { viewers: viewers, STEPS: STEPS, applySteps: applySteps, apiFor: apiFor };

  /* ---- 6. 이벤트 배선 ------------------------------------------------ */
  Reveal.on("ready", (e) => renderSlide(e.currentSlide));
  Reveal.on("slidechanged", (e) => renderSlide(e.currentSlide));
  Reveal.on("fragmentshown", () => applySteps(currentSlideEl()));
  Reveal.on("fragmenthidden", () => applySteps(currentSlideEl()));

  // 리사이즈 시 현재 슬라이드 다이어그램 재적합
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      const slideEl = currentSlideEl();
      if (!slideEl) return;
      const container = slideEl.querySelector(".bpmn[data-model]");
      const rec = container && viewers.get(container);
      if (rec && rec.ready) { fit(rec, container); applySteps(slideEl); }
    }, 150);
  });
})();
