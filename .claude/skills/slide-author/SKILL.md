---
name: slide-author
description: Lec.BPMN 강의 장표를 제작·수정할 때 사용. 설계안 항목을 읽고 디자인 시스템 골격으로 슬라이드를 만들고, 브라우저 검증과 slide-reviewer 판정까지의 전체 절차를 담는다. index.html에 슬라이드를 추가·수정하는 모든 작업 전에 로드한다.
---

# slide-author — 장표 제작 절차

한 번에 **장표 하나**를 완성한다. 여러 장을 한꺼번에 만들고 나중에 검증하지 않는다.

## 절차

### 0. 헌장 정합 확인
`COURSE.md`에서 이 장표가 **어느 질문(Q1~Q6)에 복무하는지** 정하고, §4 배제 사항(범위·표현)과 §7 용어 사전에 어긋나지 않는지 확인한다. 복무를 말할 수 없는 장표는 만들지 않는다.

### 1. 소재 읽기
`docs/course-plan.md`(구 설계안 — **참고 초안**, 정본 아님)에서 해당 장표(NN) 항목이 있으면 참고한다:
제목 / 핵심 내용 / **스토리 장면** / 전달 메시지·대사 / 화면 구성 / 연관 장표 / 중요도 / 배정 시간 / 추가 이야기.

- 설계안의 "화면 구성"은 **의도**이지 마크업 지시가 아니다. DESIGN.md 컴포넌트로 번역하고, 문구를 그대로 옮기지 않는다.
- 충돌 시 우선순위: **COURSE.md > DESIGN.md > verification-notes > 설계안** (예: 설계안 39의 "Receive Task" → Camunda 7은 Intermediate Catch Event만).

### 2. 사실 확인
장표에 올릴 모든 사실 주장(표준 동작·제품 기능·버전·날짜)을 `docs/verification-notes.md`에서 대조한다. 노트에 없는 주장은 (a) 공식 문서로 검증해 노트에 추가하거나 (b) 화면에서 뺀다.

### 3. 레이아웃 골격 선택
아래 골격 중 하나로 시작한다. 새 골격이 필요하면 만들되 DESIGN.md Components에 등재한다.

**A. 개념 장표 (BPMN 우측 배치)** — 기본형
```html
<section data-steps="s-KEY"> <!-- 토큰 재생 필요할 때만 data-steps -->
  <div class="slide">
    <div class="slide__eyebrow"><span class="cat">단원명</span><span class="pg">설계안 NN</span></div>
    <h2 class="slide__title slide__title--sm">제목</h2>
    <div class="scene">
      <span class="scene__tag">현재 스토리 장면</span>
      <span class="scene__text"><b>인물</b>에게 지금 일어난 일…</span>
    </div>
    <div class="cols cols--bpmn-right">
      <div class="col">
        <div class="bpmn" data-model="models/….bpmn" data-focus="Id1 Id2" data-pad="60">
          <div class="bpmn__cap">모델 설명 알약</div>
          <div class="bpmn__canvas"></div>
        </div>
      </div>
      <div class="col" style="gap:12px"><!-- 카드·노트 최대 3블록 --></div>
    </div>
    <div class="slide__key">핵심 문장 — 일반화된 교훈 한 줄</div>
    <div class="slide__cite">출처: …</div> <!-- 사실 주장 있을 때만 -->
  </div>
</section>
```
BPMN 좌측 설명·우측 모델이면 `cols--bpmn-left`.

**B. 비교 장표 (2열 + 비교표)** — 도구·개념 대비 (예: 설계안 03)
`cols--2`(pill 헤더 카드 2장) → `ctable` → `strip`(오해 방지 칩) → `slide__key`.

**C. 텍스트 구조 장표** — 목표/비목표(`goals`+`goal-list`), 실행 단계(`steps`), 체크리스트.

**D. 타이틀·전환 장표** — `title-slide`(좌 제목 / 우 딥 teal 패널 `lens` 리스트).

### 4. 토큰 재생 (필요 시)
1. `<section data-steps="s-키이름">` 지정.
2. `assets/js/deck.js`의 `STEPS["s-키이름"]`에 상태 배열 추가. **인덱스 = 보인 fragment 수** — 슬라이드 안 `.fragment` 개수는 `steps.length - 1`과 일치해야 한다.
3. API 체인: `a.clear().focus([ids], pad).mark(ids, "active-el").token(id, "1")`.
   마커: `highlight-flow`(경로) / `active-el`(활성) / `dead-el`(교착) / `dim-el`(비활성). 토큰: `tok--wait`(대기), `tok--ghost`(미생성).
4. 큰 모델은 단계마다 `focus()`로 설명 구간을 줌 — 전체 fit은 훑어보기 전용.
5. 요소 id는 `models/*.bpmn`에서 grep으로 확인한다. 추측 금지.

### 5. 콘텐츠 규칙 (DESIGN.md Slide Content Principles 요약)
- 제목: 목차만 읽어도 내용 예상. 결론형·이유형. 한 슬라이드 한 주제.
- 강조 1~2개만: `em`(teal), `.count`(큰 숫자), 위치(리본/핵심 문장). 중첩 금지.
- 본문 블록 ≤ 3. 화면 텍스트는 대본이 아니다 — 대사는 `<aside class="notes">`로(script-author 스킬).
- 정의·표는 사례(scene) 해석 뒤 fragment로 공개.
- 이모지·픽토그램 글리프 금지. 색은 토큰만.
- 오해 교정은 `.strip .tag` 또는 `.note--warn`으로 화면에 명시.

### 6. 브라우저 검증 (메인 세션에서 직접)
```bash
python3 -m http.server 8753   # 이미 떠 있으면 재사용
```
1. `http://localhost:8753/index.html?nocache=N#/h` 로 이동 (**nocache 값을 매번 증가 + force reload** — deck.js/theme.css 캐시가 자주 남는다).
2. 콘솔 오류 0 확인 (`?debug`로 step 로그 확인 가능).
3. `Reveal.slide(h,0,-1)` 후 `Reveal.nextFragment()`를 끝까지 — 각 단계 토큰·마커 개수를 DOM으로 확인(`.tok`, `.active-el` 등).
4. 스크린샷으로 겹침·과밀·단어 중간 줄바꿈 확인.

### 7. 리뷰 → 등록 → 완료
1. `slide-reviewer` 서브에이전트를 실행한다. 프롬프트에 **장표 번호와 section 위치(#/h)** 를 명시.
2. FAIL 항목을 고치고 재검증. 모두 PASS + 브라우저 검증 통과 후에만 완료 선언.
3. `docs/inventory.md`에 등록·갱신한다: 복무 질문(Q1~Q6), 상태(초안→검증→통과), 출처 여부.
4. 커밋 메시지에 장표 번호를 남긴다 (예: `장표 21 Start Event 추가`).

## 절대 하지 않기
- 검증 없이 여러 장 연속 제작
- bpmn 요소 id 추측 사용
- verification-notes에 없는 사실 주장 게재
- 완성 모델을 스토리 진행 전에 전부 공개
