# Lec.BPMN — Workflow 관점의 BPMN·Camunda 7 강의

BPMN을 "전문 자격"이 아니라 **Workflow를 구조적으로 생각하는 도구**로 소개하는 전일(8교시) 강의 자료다.
중심 사례는 **신입사원 온보딩**이며, HTML(reveal.js) 슬라이드 위에 **실제 BPMN 모델(bpmn-js)** 을 렌더링하고 **토큰 재생**으로 실행 의미를 관찰한다.

> **현재 상태: 수직 슬라이스(vertical slice).**
> 전체 52장 중 디자인 시스템과 핵심 기능을 검증하기 위한 대표 6장만 구현했다.
> 남은 장표는 이 틀을 그대로 확장한다. → [`docs/status.md`](docs/status.md)

## 구현된 대표 슬라이드

| # | 설계안 | 무엇을 보여 주나 |
|---|---|---|
| 1 | 01 | 타이틀 · 다섯 관점(시작·역할·분기·대기·예외) — 디자인 기준 |
| 2 | 03 | OutSystems ↔ BPMN 비교 (공식 문서 검증 반영) |
| 3 | 08 | 온보딩 **전체 실제 모델** 렌더링 |
| 4 | 38 | **토큰 재생** — 서류 대기(1) → 병렬 준비(3) → 입사일 대기(1) → 완료 |
| 5 | 35 | 안티패턴 — XOR 분기 + Parallel 합류 **교착** |
| 6 | 42 | Async·Job·Retry·Incident 복구 경계 (검증 반영) |

## 실행

브라우저는 로컬 파일에서 BPMN을 `fetch` 하지 못하므로 **정적 서버**로 연다.

```bash
python3 -m http.server 8753
# 브라우저에서 http://localhost:8753/index.html
```

- 이동: `→ / ←`, 발표자 노트: `S`, 전체화면: `F`, 개요: `Esc`
- 토큰 재생·교착 슬라이드는 `→`(다음 fragment)로 단계가 진행된다.
- `?debug` 를 붙이면 콘솔에 단계 로그가 출력된다.

## 구조

```
index.html                     reveal.js 덱 (슬라이드)
assets/css/theme.css           디자인 시스템 (등장인물 색·리본·레이아웃·BPMN 마커)
assets/js/deck.js              reveal 초기화 + bpmn-js 렌더링 + 토큰 재생(step)
models/
  new_hire_onboarding.bpmn     중심 사례 실제 실행 모델 (Camunda 7)
  frag_deadlock_xor_parallel.bpmn  교착 설명용 조각 모델
vendor/                        reveal.js, bpmn-js (오프라인·PDF export 위해 벤더링)
docs/verification-notes.md     내용 검증 기록 (OutSystems·Camunda 공식 문서 대조)
```

## 디자인 규칙

- **브랜드 색(ecoletree)**: 강조 = teal `--brand`(#1aa6c9, 로고 기준 추정치 — 정확한 브랜드 hex 있으면 `theme.css` 토큰만 교체). 'eco' 그레이 `--brand-gray`. 색 토큰은 모두 `assets/css/theme.css :root`에 정의.
- **등장인물 색은 전 장표에서 유지**: 지민(신입사원)=청록 · 수진(HR)=파랑 · 민호(매니저)=주황 · IT·시설=회색 · 외부 시스템=빨강.
- BPMN 개념 장표 상단에는 **현재 스토리 장면** 리본을 고정한다.
- **이모지·픽토그램 글리프 금지**(⛔ ✎ ✓ ✗ ↻ ① 등). 아이콘 대신 색·좌측 보더·숫자·타이포로 표현한다.

## PDF / PPTX export

원본은 HTML이다. 확정 후:
- **PDF**: 브라우저 인쇄(`?print-pdf`) 또는 decktape.
- **PPTX**: HTML→PPTX는 손실이 크다(애니메이션 소실). 필요 시 정적 이미지 export 또는 별도 논의.

## 출처

- BPMN 2.0.2 — OMG
- Camunda 7 Manual — docs.camunda.org/manual/7.x
- OutSystems 11 — success.outsystems.com
- 라이브러리: reveal.js (MIT), bpmn-js (bpmn.io — 뷰어 로고 유지)
