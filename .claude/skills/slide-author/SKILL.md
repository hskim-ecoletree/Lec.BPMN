---
name: slide-author
description: Lec.BPMN 강의 장표를 제작·수정할 때 사용. 확정 디자인 v3(표지=빛, 본문=그림자, 메시지 우선) 골격과 절차, 브라우저 검증, slide-reviewer 판정까지 담는다. index.html에 슬라이드를 추가·수정하는 모든 작업 전에 로드한다.
---

# slide-author — 장표 제작 절차 (디자인 v3)

한 번에 **장표 하나**를 완성한다. 여러 장을 한꺼번에 만들고 나중에 검증하지 않는다.
시각·전달 규칙의 정본은 `DESIGN.md`(v3)다 — 이 스킬은 절차와 골격만 요약한다.

## 절차

### 0. 헌장 정합
`COURSE.md`에서 복무 질문(Q1~Q6)을 정하고 §4 배제·§7 용어 사전 위반이 없는지 확인. 복무를 말할 수 없는 장표는 만들지 않는다.

### 1. 메시지부터 쓴다
그 장표가 남길 **압축된 교훈 한두 줄**을 먼저 확정한다(이것이 화면 최대 요소이자 제목). `docs/curriculum.md`(승인된 구성안)의 해당 행과 `docs/course-plan.md`(참고 초안)를 소재로 쓰되 문구는 새로 쓴다.
충돌 시 우선순위: **COURSE.md > DESIGN.md > verification-notes > curriculum > 구 설계안**.

### 2. 사실 확인
모든 사실 주장을 `docs/verification-notes.md`와 대조. 없으면 공식 문서로 검증해 노트에 추가하거나 화면에서 뺀다.

### 3. v3 골격
```html
<section data-plan="NN" data-steps="s-KEY"> <!-- data-steps는 토큰 재생 시에만 -->
  <div class="slide">
    <div class="slide__shade"></div>
    <div class="slide__label">단원명(세로)</div>
    <div class="slide__q">Q3</div>
    <div class="slide__inner">
      <h2 class="slide__msg">압축된 메시지 — 화면 최대 요소</h2>
      <!-- 구도 컴포넌트 하나 (아래에서 선택) -->
      <div class="slide__support">근거 한 줄(선택)</div>
      <div class="slide__cite">출처 — 사실 주장 있을 때만</div>
    </div>
    <aside class="notes">
      <p><b>대사</b> — [다음] 표시로 fragment와 동기화된 강사 대본.</p>
      <p><b>오해</b> — … <b>교정</b> — …</p>
    </aside>
  </div>
</section>
```

**구도 컴포넌트** (내용 구조에 맞게 선택, 같은 구도 연속 반복 금지):
- `vs` — 대형 용어 매핑(도구·개념 대비). fragment로 행 단위 등장
- `bpmn` 전면 — 실제 모델이 주인공일 때. 하단 `hero-foot`(persona 점+힌트)
- `cols--jumbo` — 좌 bpmn + 우 132px 숫자(`fragment fade-in-then-out`으로 교체)
- `dead-strip` — 도식 아래 한 줄 색 원장(ok/no/wt)
- `flow` — 가로 4단계 타임라인(실행·복구)
- `caveat` — 테라코타 좌측 룰의 오해 교정 한 줄

**규칙**: 화면 텍스트 30~60단어(초과분은 notes로) · 무의미한 장식 0 · 색은 의미색 4종만(`--accent #457075`/err/ok/wait) · 표지 외 어두운 면 금지.

### 4. 토큰 재생 (필요 시)
1. `data-steps="s-키"` + `assets/js/deck.js`의 `STEPS["s-키"]` 배열. **fragment 수 = 배열 길이 − 1.**
2. API: `a.clear().focus([ids], pad).mark(ids, "active-el").token(id)` — 토큰은 **무라벨**(개수는 jumbo가 말함). 마커: `highlight-flow`/`active-el`(accent), `dead-el`(테라코타), `dim-el`. 토큰 변형: `tok--wait`, `tok--ghost`.
3. 요소 id는 `models/*.bpmn`에서 grep으로 확인. 추측 금지.
4. 큰 모델은 단계마다 `focus()` 줌.

### 5. 브라우저 검증 (메인 세션에서 직접)
```bash
python3 -m http.server 8753   # 이미 떠 있으면 재사용
```
1. `http://localhost:8753/index.html?nocache=N#/h` (**nocache 증가 + force reload**). **theme.css/deck.js를 수정했다면 index.html의 `?v=` 버전도 올린다.**
2. 콘솔 오류 0 (`?debug` 로그 확인 가능).
3. `Reveal.slide(h,0,-1)` 후 `nextFragment()` 끝까지 — **bpmn 로드는 비동기이므로 슬라이드 진입 후 0.5초 대기하고 fragment를 진행**해야 STEPS가 적용된다. `.tok`/`.active-el` 개수를 DOM으로 확인.
4. 스크린샷: 겹침·과밀·단어 중간 줄바꿈·바닥 잘림 확인.

### 6. 리뷰 → 등록 → 완료
1. `slide-reviewer` 서브에이전트 실행 (장표 번호 + #/h 명시). FAIL 수정 전 완료 선언 금지.
2. `docs/inventory.md` 등록·갱신 (복무 Q, 상태, 출처 여부).
3. 커밋 메시지에 장표 번호.

## 절대 하지 않기
- 검증 없이 여러 장 연속 제작 / bpmn id 추측 / 미검증 사실 게재
- 메시지보다 크거나 먼저 읽히는 요소를 만드는 것
- 의미 없는 장식(바·배지·칩·이모지) 추가
