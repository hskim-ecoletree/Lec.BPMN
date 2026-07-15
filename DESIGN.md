## Overview

**Lec.BPMN**은 BPMN·Camunda 7을 "Workflow를 구조적으로 생각하는 도구"로 가르치는 전일(8교시) **강의 슬라이드 덱**이다. 마케팅 페이지가 아니라 **16:9 프레젠테이션 슬라이드**가 캔버스이며, 슬라이드 위에 실제 BPMN 모델(bpmn-js)을 렌더링하고 토큰을 얹어 실행 의미를 관찰한다.

디자인의 중심은 **ecoletree 브랜드 teal** `{colors.primary}` (`#1aa6c9`)이다. 로고의 눈송이-원 teal에서 가져왔고, 슬라이드의 모든 강조(제목 하이라이트, 스토리 리본, 개념 pill, BPMN 하이라이트, "핵심" 배지)에 쓰인다. 본문은 밝은 종이 위 `{colors.ink}` (`#0f172a`, 순흑 아님)로 읽히고, 타이틀·구분 슬라이드는 **딥 teal 패널** `{colors.primary-deep}` (`#0e5e73`)로 반전해 브랜드 색을 한 번 더 각인한다.

슬라이드는 세 층의 표면 리듬을 갖는다: **흰 종이**(기본 콘텐츠 슬라이드) → **딥 teal 패널**(타이틀·전환) → **점선 그리드 BPMN 캔버스**(모델을 얹는 작업면). 이 셋 이상으로 표면 색을 늘리지 않는다.

강의 슬라이드의 성패는 "다른 사람이 같은 흐름을 예상하게 하는가"이므로, 시각 규칙도 **명료함 > 장식**을 따른다. 아이콘 이모지·픽토그램을 쓰지 않고(색·좌측 보더·숫자·타이포로 대체), 등장인물 색은 전 장표에서 고정한다.

**핵심 특징**
- 3표면 리듬: 흰 종이(콘텐츠) / 딥 teal(타이틀·전환) / 점선 그리드(BPMN 캔버스).
- **등장인물 색 고정**: 지민=청록, 수진=파랑, 민호=주황, IT·시설=회색, 외부=빨강. 전 장표에서 같은 인물은 같은 색.
- 개념 장표 상단에 **현재 스토리 장면** 리본을 고정 — 정의보다 사례를 먼저.
- 실제 `.bpmn`을 bpmn-js로 렌더링하고 **앰버 토큰** `{colors.token}`을 얹어 위치·개수를 재생.
- 슬라이드마다 하단에 강사가 그대로 읽는 **핵심 문장** 한 줄.
- **이모지·픽토그램 글리프 금지**(⛔ ✎ ✓ ✗ ① 등) — 색·보더·숫자로 표현.

> **구현 매핑**: 아래 `{token}`은 `assets/css/theme.css :root`의 CSS 변수와 1:1 대응한다(예: `{colors.primary}` = `--brand`). 브랜드 hex를 바꾸려면 `:root` 토큰 한 줄만 고치면 전체에 반영된다.

## Colors

> **출처**: ecoletree 로고(눈송이-원 teal)와 워드마크('eco' 그레이). teal·gray hex는 로고 이미지 기준 **육안 추정치** — 정확한 브랜드 hex가 있으면 교체.

### Brand & Accent
- **Primary Teal** (`{colors.primary}` — `#1aa6c9`, CSS `--brand`): 브랜드 강조. 제목 하이라이트, 스토리 리본 좌측 바, BPMN pill, BPMN 경로 하이라이트, "핵심" 배지, 링크.
- **Teal Dark** (`{colors.primary-dark}` — `#147e9b`, CSS `--brand-dark`): 밝은 배경 위 teal 텍스트·비교표 BPMN 열·hover.
- **Teal Deep** (`{colors.primary-deep}` — `#0e5e73`, CSS `--brand-deep`): 타이틀·전환 슬라이드의 딥 teal 패널 배경.
- **Teal Tint** (`{colors.primary-tint}` — `#e8f6fa`, CSS `--brand-tint`): 스토리 리본·정보 노트·pill의 옅은 배경.
- **Teal Line** (`{colors.primary-line}` — `#c3e5ee`, CSS `--brand-line`): teal 계열 1px 테두리.
- **Brand Gray** (`{colors.brand-gray}` — `#6e7073`, CSS `--brand-gray`): 로고 'eco' 그레이. 중립 강조가 필요한 라벨.

### Personas (전 장표에서 고정 — 인물 = 색)
- **지민 / 신입사원** (`{colors.persona-jimin}` — `#0d9488`, 청록): 프로세스를 시작·기다리는 주인공.
- **수진 / HR** (`{colors.persona-sujin}` — `#2563eb`, 파랑): 온보딩 전체 책임자.
- **민호 / 채용 매니저** (`{colors.persona-minho}` — `#ea580c`, 주황): 근무형태·장비·권한 확인.
- **IT·시설** (`{colors.persona-it}` — `#64748b`, 회색): 계정·장비·좌석 준비.
- **외부 시스템 / IdP** (`{colors.persona-ext}` — `#dc2626`, 빨강): 실패할 수 있는 외부 호출.

> Persona teal(`#0d9488`)과 Primary teal(`#1aa6c9`)은 각각 청록/시안으로 구분된다. 등장인물 칩과 브랜드 강조가 한 화면에서 충돌하지 않게, persona는 인물 표시에만, primary는 개념 강조에만 쓴다.

### Surface
- **Paper** (`{colors.paper}` — `#ffffff`, CSS `--paper`): 기본 슬라이드 배경.
- **Paper 2** (`{colors.paper-2}` — `#f8fafc`, CSS `--paper-2`): 덱 배경·타이틀 그라디언트 하단.
- **Paper 3** (`{colors.paper-3}` — `#f1f5f9`, CSS `--paper-3`): 카드·기본 노트 배경.
- **Line** (`{colors.line}` — `#e2e8f0`, CSS `--line`): 1px 테두리·구분선.
- **Line Mid** (`{colors.line-mid}` — `#cbd5e1`, CSS `--line-mid`): 진한 구분선·기본 노트 좌측 바.

### Text
- **Ink** (`{colors.ink}` — `#0f172a`, CSS `--ink`): 기본 본문. 순흑 아님.
- **Ink Soft** (`{colors.ink-soft}` — `#334155`, CSS `--ink-soft`): 부제·설명.
- **Ink Mute** (`{colors.ink-mute}` — `#64748b`, CSS `--ink-mute`): 캡션·머리글·보조.

### Semantic (BPMN·실행)
- **Token** (`{colors.token}` — `#f59e0b`, 앰버, CSS `--token`): 프로세스 토큰. BPMN 위 오버레이 점.
- **OK** (`{colors.ok}` — `#059669`, CSS `--ok`): 생성됨·완료·성공 경로.
- **Warn** (`{colors.warn}` — `#d97706`, CSS `--warn`): 대기·주의 노트 좌측 바.
- **Bad** (`{colors.bad}` — `#dc2626`, CSS `--bad`): 교착·실패·존재하지 않는 토큰(ghost).

## Typography

### Font Family
UI·본문은 **Pretendard**(가능 시 벤더링) → 시스템 한글 스택 폴백(`-apple-system, "Apple SD Gothic Neo", "Segoe UI", "Noto Sans KR", system-ui`). 코드·식별자·토큰 숫자는 **모노**(`"SF Mono", "JetBrains Mono", "D2Coding", ui-monospace, Menlo`).

- **한글 줄바꿈**: 전역 `word-break: keep-all`(단어 중간 끊김 금지) + `overflow-wrap: anywhere`(긴 영문·URL만 분절).
- 발표 PC 환경이 제각각이므로 Pretendard **벤더링**을 권장한다(폰트 없는 PC에서도 동일).

### Hierarchy
| Token | Size | Weight | Line H | Use |
|---|---|---|---|---|
| `{type.title-hero}` | 47px | 700 | 1.18 | 타이틀 슬라이드 제목 (`.title-slide h1`) |
| `{type.title}` | 40px | 700 | 1.15 | 콘텐츠 슬라이드 제목 (`.slide__title`) |
| `{type.title-sm}` | 34px | 700 | 1.15 | 긴 제목 (`.slide__title--sm`) |
| `{type.lead}` | 20–23px | 400–600 | 1.4–1.5 | 부제·리드 (`.slide__lead`, `.title-slide__sub`) |
| `{type.key}` | 21px | 600 | 1.4 | 하단 핵심 문장 (`.slide__key`) |
| `{type.body}` | 16–18px | 400 | 1.45–1.55 | 카드·노트 본문 |
| `{type.eyebrow}` | 15px | 700 | — | 머리글 카테고리(대문자·자간 확대, `.slide__eyebrow`) |
| `{type.label}` | 13–15px | 700 | — | pill·칩·표 헤더·카드 헤더 |
| `{type.cite}` | 12.5–13px | 400 | — | 출처(모노, `.slide__cite` / `.cite`) |

### Principles
- **제목은 볼드(700)·음의 자간**(`-0.02em`)으로 단단하게. 본문 자간 `-0.01em`.
- 강조 `<em>`은 이탤릭이 아니라 **teal 색 + 600**(`.reveal em`).
- `<strong>`은 색을 바꾸지 않고 무게만 올려 본문 흐름을 끊지 않는다.

## Layout

### Slide Canvas
- **고정 캔버스 1280 × 720 (16:9)**, `margin 0`, `center: false`(상단 정렬로 꽉 채움). reveal이 뷰포트에 맞춰 스케일.
- 콘텐츠 슬라이드 패딩: `48px 60px 40px`(`.slide`). 여유형 `56px 72px 48px`(`.slide--pad-lg`).
- 세로 구조(위→아래): **eyebrow → title → scene 리본 → 본문(cols) → 핵심 문장**. 핵심 문장은 `margin-top:auto`로 항상 바닥에 고정.

### Spacing
- 기본 8px 리듬. 카드 내부 20–22px, 슬라이드 섹션 간 16–28px.
- Radius: `{rounded.md}` 14px(`--radius`, 카드·BPMN 캔버스), `{rounded.sm}` 9px(`--radius-sm`, 리본·노트·칩), `{rounded.full}` 999px(persona 칩·caution 태그).

### Grid (본문 cols)
- `{grid.2}` `.cols--2` — 1:1 균등 2열(비교·목표/비목표).
- `{grid.bpmn-right}` `.cols--bpmn-right` — 1.55:1, 왼쪽 BPMN + 오른쪽 개념/Properties.
- `{grid.bpmn-left}` `.cols--bpmn-left` — 1:1.4, 왼쪽 설명 + 오른쪽 BPMN.
- **원칙**: 이야기 속 Process 조각은 좌·중앙, 그 장면에서 발견한 개념·Properties는 우측. 정의·표는 사례를 읽은 뒤 공개.

### Whitespace
슬라이드당 정보 밀도를 낮게 유지한다 — 표·카드·주의띠·핵심문장을 한 슬라이드에 다 넣어 겹치지 않게, 요소 수를 줄이고 여백을 확보한다.

## Elevation & Depth
| Level | Treatment | Use |
|---|---|---|
| 0 | Flat | 기본 슬라이드 표면 |
| 1 | `0 1px 2px rgba(15,23,42,.06), 0 2px 8px rgba(15,23,42,.06)` (`--shadow-sm`) | 카드·BPMN 캔버스 |
| 2 | `0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.08)` (`--shadow`) | 떠 있는 패널 |

### Decorative Depth
- 타이틀 슬라이드: 좌상단 `radial-gradient`로 teal-tint 후광 + 하단 paper→paper-2 그라디언트.
- BPMN 캔버스: 22px 간격 **점선 그리드**(모델링 도구의 작업면 은유). 그 외 표면은 평평하게.

## Shapes
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 9px | 리본·노트·pill·칩 |
| `{rounded.md}` | 14px | 카드·BPMN 캔버스·목표 카드 |
| `{rounded.full}` | 999px | persona 칩·caution 태그·step 배지(원형) |

- **아이콘은 글리프가 아니라 CSS로 그린다**: 노트는 좌측 3px 색 보더, 목표 리스트는 좌측 색 막대, 상태는 색+텍스트. 이모지·딩벳(⛔ ✎ ✓ ✗ ①)을 절대 쓰지 않는다.

## Components

### Slide Shells
**`slide`** — 기본 콘텐츠 슬라이드. 흰 종이, flex column, 위 구조(eyebrow→title→scene→cols→key).
**`title-slide`** — 표지. 좌 1.5 : 우 1 그리드. 좌: kicker·제목(teal 하이라이트)·부제·메타. 우: **딥 teal 패널**(`{colors.primary-deep}`)에 "다섯 관점" 리스트.

### `slide__eyebrow`
상단 머리글. 좌: 카테고리(`{type.eyebrow}`, teal), 우: 설계안 페이지 번호(모노, 흐린 색). 대문자·자간 확대.

### `slide__key` (핵심 문장)
슬라이드 하단 고정. 상단 2px 라인 + 좌측 "핵심" 배지(teal, 흰 글씨) + 강사가 그대로 읽는 문장(`{type.key}`). **모든 콘텐츠 슬라이드에 하나** — 마케팅의 "closing CTA"에 해당하는 이 덱의 마무리 규칙.

### `scene` (현재 스토리 장면 리본)
개념 장표 상단 고정. teal-tint 그라디언트 배경 + **좌측 5px teal 바** + `scene__tag`("현재 스토리 장면", teal 대문자) + `scene__text`(지금 인물에게 일어난 사건). 정의보다 **먼저** 온다.

### `persona` (등장인물 칩)
`persona--{jimin|sujin|minho|it|ext}`. 알약형 배경 + 앞의 색 점(인물 색). 같은 인물은 전 장표에서 같은 색. `.persona-row`로 나열.

### Cards
**`card`** — 흰 배경, `{colors.line}` 1px, radius 14, `--shadow-sm`. `card__h`(대문자 라벨 머리글).
**`card--flat`** — 그림자 없이 `{colors.paper-2}` 배경.
**`card--accent`** — teal 테두리(`{colors.primary-line}`) + teal 머리글. 개념 강조 카드.

### `pill` (열 헤더 배지)
**`pill--os`** — OutSystems 열, 주황 계열(`#fff1e9`/`#c2410c`/`#fed7aa`).
**`pill--bpmn`** — BPMN 열, teal 계열(`{colors.primary-tint}`/`{colors.primary-dark}`/`{colors.primary-line}`).

### `ctable` (비교표)
관점 × (OutSystems / BPMN) 2열 비교. `.os b`는 주황(`#c2410c`), `.bp b`는 teal(`{colors.primary-dark}`). 도구를 색으로 구분해 한눈에 읽힌다.

### `note` (주의·보조)
아이콘 없이 **좌측 3px 색 보더**로 종류를 구분: 기본=회색(`{colors.line-mid}`), `note--warn`=주황(`{colors.warn}`, 앰버 배경), `note--info`=teal(`{colors.primary}`, teal-tint 배경).

### `strip` / `tag` (주의 띠)
빨강 계열 알약 칩을 가로로 나열 — "1:1 아님", "통합 수업 아님" 같은 오해 방지 문구.

### BPMN Canvas & Tokens
**`bpmn`** — bpmn-js 렌더 영역. 점선 그리드 배경, radius 14, `--shadow-sm`. 좌상단 `bpmn__cap`(모델 설명 알약).
**하이라이트 마커**(bpmn-js `addMarker`):
- `highlight-flow` — 현재 경로 강조(teal 3px).
- `active-el` — 현재 활성 요소(파랑 3.5px + 옅은 파랑 fill).
- `dead-el` — 교착·멈춘 요소(빨강 점선).
- `dim-el` — 비활성 경로(투명도 0.32).

**`tok`** (토큰 오버레이) — 앰버 원 + 흰 테두리 + 숫자 라벨. `tok--wait`(회색, 저장·대기), `tok--ghost`(빨강 점선, 생성되지 않은 토큰).

### `ledger` (토큰 원장)
분기·합류를 표로 추적: 경로 × 생성 여부 × 합류. `.made`=녹색, `.none`=빨강, `.wait`=주황. 글리프 없이 색+텍스트.

### `steps` (실행 단계)
`step__n`(원형 숫자 배지) + `step__t`(제목) + `step__d`(설명). `step--ok`(녹색), `step--fail`(빨강). Camunda 실행/복구 흐름을 단계로.

### `lens` (다섯 관점 · 타이틀 전용)
딥 teal 패널 위, 번호 배지 + 관점 + 한 줄 설명. 반투명 흰 구분선.

### `count`
큰 모노 숫자 + 앰버 강조 — 토큰 개수(1→3→1)를 강조.

## Do's and Don'ts

### Do
- 개념 장표는 **스토리 리본으로 시작**하고, 정의·표는 사례를 읽은 뒤 공개한다.
- 같은 인물은 전 장표에서 **같은 persona 색**으로 유지한다.
- 강조는 브랜드 teal 하나로 통일한다(제목 하이라이트·리본·pill·"핵심" 배지).
- 모든 콘텐츠 슬라이드를 **핵심 문장 한 줄**로 닫는다.
- 아이콘이 필요하면 **CSS로 그린다**(좌측 색 보더·색 막대·숫자).
- BPMN은 실제 `.bpmn`을 렌더하고, 큰 모델은 단계별로 **포커스(줌)** 해 토큰을 legible하게.
- 사실 주장(OutSystems·Camunda)은 `docs/verification-notes.md`를 따른다.

### Don't
- **이모지·픽토그램 글리프 금지**(⛔ ✎ ✓ ✗ ↻ ① …) — AI 생성 느낌을 준다.
- persona teal(`#0d9488`)과 brand teal(`#1aa6c9`)을 같은 역할에 섞지 않는다(인물 vs 개념).
- 3표면(흰/딥teal/그리드) 외에 새 표면 색을 추가하지 않는다.
- 본문을 순흑(`#000`)으로 쓰지 않는다 — `{colors.ink}` `#0f172a`.
- 한 슬라이드에 표·카드·주의띠·핵심문장을 과밀하게 넣어 겹치지 않는다.
- 제목을 순흑 배경/과한 그림자로 장식하지 않는다.

## Responsive & Export
- **캔버스는 16:9 고정.** reveal이 뷰포트에 맞춰 스케일하므로 전체화면(F)·프로젝터에서 꽉 찬다.
- **PDF**: `?print-pdf` 인쇄 또는 decktape. 폰트·bpmn-js CSS를 벤더링·임베드해 오프라인·PDF에서 동일하게 렌더.
- **PPTX**: HTML→PPTX는 애니메이션 손실이 크므로 지양. 필요 시 정적 이미지 export.
- fragment로 토큰·요소를 단계 노출 → 인쇄 시에는 전 단계가 펼쳐지도록 처리.

## Iteration Guide
1. 한 번에 컴포넌트 하나만 손본다. 토큰·컴포넌트 이름을 직접 참조한다.
2. 색을 바꿀 땐 `assets/css/theme.css :root` 토큰만 고친다(하드코딩 금지).
3. 새 개념 장표는 **scene 리본 → cols(좌 BPMN/우 개념) → 핵심 문장** 골격을 재사용한다.
4. 새 아이콘이 필요하면 글리프 대신 CSS 도형으로 그린다.
5. 3표면 리듬(흰/딥teal/그리드)을 유지한다 — 표면 색을 늘리면 시스템이 깨진다.
6. 핵심 문장은 비협상 — 모든 콘텐츠 슬라이드가 여기서 마무리된다.
