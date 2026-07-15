# Lec.BPMN — 작업 규칙

BPMN·Camunda 7 강의 슬라이드(reveal.js + bpmn-js). 원본은 HTML이며 PDF/PPTX는 export 산출물이다.

## 규칙의 원천 (우선순위 순)

1. **`DESIGN.md`** — 시각 규칙(색·타이포·컴포넌트) + **Slide Content Principles**(전달 원칙 11개 + 자가 점검 체크리스트 10문항). 장표·대본의 완성 기준.
2. **`docs/verification-notes.md`** — OutSystems·Camunda 7 사실 검증 기록. **여기 없는 사실 주장은 화면·대본에 올리지 않는다.** 어긋나는 내용 발견 시 먼저 공식 문서로 재검증 후 노트를 갱신한다.
3. **`docs/course-plan.md`** — 52장 설계안(정본). 각 장표의 제목·핵심 내용·스토리 장면·대사·화면 구성·연관 장표·배정 시간.

## 작업 흐름

- **장표 제작·수정** → `slide-author` 스킬을 먼저 로드하고 그 절차를 따른다.
- **강사 대본 작성** → `script-author` 스킬을 먼저 로드한다. 대본은 각 `<section>`의 `<aside class="notes">`가 정본.
- **장표 완성 판정** → 브라우저 검증(메인 세션) 후 `slide-reviewer` 서브에이전트로 체크리스트를 판정받는다. FAIL 항목을 고치기 전에는 완료라고 말하지 않는다.

## 검증 명령

```bash
python3 -m http.server 8753          # 정적 서버 (file://로는 bpmn fetch 불가)
# http://localhost:8753/index.html?nocache=N#/h  — 브라우저 캐시 우회는 nocache 값 증가 + force reload
# ?debug 붙이면 deck.js step 로그 출력
```

브라우저에서: 콘솔 오류 0, fragment 끝까지 진행하며 토큰 재생 확인, 스크린샷으로 겹침·과밀 확인.

## 불변 규칙 (요약)

- 이모지·픽토그램 글리프 금지. 아이콘은 CSS(색 보더·막대·숫자)로.
- 색은 `assets/css/theme.css :root` 토큰만. 하드코딩 금지(예외: OutSystems 주황 계열은 도구 구분용).
- 모든 콘텐츠 슬라이드는 핵심 문장(`.slide__key`)으로 닫는다.
- 개념 장표는 스토리 장면 리본(`.scene`)으로 시작한다.
- 한글 `word-break: keep-all` 전제 — 제목·본문에서 단어 중간 줄바꿈이 보이면 버그.
- 대본·화면에서 금지 표현: "전문가", "완전 정복", "실행 엔진 숙달", "Deep-Dive".
