# 제작 현황 · 다음 세션 시작 지점

> 새 세션은 이 문서 + `CLAUDE.md`(자동 로드) + `COURSE.md` + `DESIGN.md` + `docs/curriculum.md`만 읽으면 이어서 작업할 수 있다.
> 최종 갱신: 2026-07-15 (원격 세션).

## 완료된 것

- [x] **빌드 방식**: HTML(reveal.js + bpmn-js), 라이브러리·Pretendard 벤더링, 정적 서버(`python3 -m http.server 8753`).
- [x] **거버넌스**: `COURSE.md`(헌장 — 여섯 질문 Q1~Q6) > `DESIGN.md`(v3) > `docs/verification-notes.md` > `docs/curriculum.md`(구성안 v2) > `docs/course-plan.md`(구 설계안, 참고용).
- [x] **하네스**: `slide-author`/`script-author` 스킬 + `slide-reviewer`/`deck-reviewer` 서브에이전트.
- [x] **디자인 v3 확정·적용**: 표지=어둠 속 수직 광선, 본문=따뜻한 종이+좌측 그림자, 메시지 우선, 강조·토큰 `#457075`. **아이덴티티 변경은 사용자 승인 없이 금지.**
- [x] **수직 슬라이스 6장** v3 재작성 + 대본 초안 내장.
- [x] **원격 이전**: origin = `https://github.com/hskim-ecoletree/Lec.BPMN.git`. 푸시는 반드시 `env -u GITHUB_TOKEN git push`(아래 주의).
- [x] **덱 톤 담백화 (2026-07-16)**: `curriculum.md` 제목에서 수사·은유(네 가족·지도·세 층)·구호(도형보다 먼저)·극적 표현·숫자 장치 제거. 시각 표현 용어를 **"다이어그램"**으로 통일("도형"은 개별 모양에만). COURSE.md §5 "도형이 많은"→"요소가 많은".
- [x] **표지(01) 확정 (2026-07-16)**: A안 **"업무 흐름을 / 구조로 읽는 법."**, 세로 부제 "신입사원 온보딩". 대사 재작성(도형·여섯질문 슬로건 제거, '구조'를 담백하게 진술 + 02로 연결). slide-reviewer 판정: 내용·표지 규칙 전부 **PASS**. 기존 하드코딩 색 FAIL은 `--dark-vert`/`--dark-corp` 토큰으로 추출해 해소(값 동일, 렌더 무변화, `?v=4`). DESIGN.md 세로부제 예시 드리프트도 갱신.
- [x] **02번 설계 확정**: 표지의 '구조'를 **화면·기능 목록 ↔ 구조 대비표**로 해소하는 스토리 개막 장표. (curriculum.md 02행에 명시)
- [x] **표지 시각 검증 (2026-07-15)**: Playwright 스크린샷으로 확인 — 겹침·단어 중간 줄바꿈 없음. favicon 404 제거(`data:,`)로 콘솔 오류 0.
- [x] **슬라이드 02 제작 완료 (2026-07-15)**: slide-reviewer **PASS**. 신규 스케치 모델 `models/frag_structure_overview.bpmn`(단일 풀 12요소 — COURSE.md §6 "처음부터 완성 모델 금지" 준수, 완성 모델 훑기는 09의 몫). 신규 구도 `relist`+`facet-row`(DESIGN.md 등재): 상단 화면·기능 목록 스트립 ↔ 전폭 다이어그램, 하단 구조 단어 5개 fragment(시작·일·분기·대기·결과, STEPS `s-structure` 마커 동기화) + caveat. 첫 시안(전체 모델+세로 목록)은 스크린샷 검증에서 겹침·판독 불가로 폐기.
- [x] **inventory 전면 재등록 (2026-07-15)**: 구성안 v2 기준 50장 등록부로 교체(교시별 표+시간 검산). 재활용 장표 data-plan 새 번호 재부여(03→04, 08→09, 38→22, 35→26, 42→37), deck.js 주석·curriculum 커버리지 검산(02=Q1~Q5)도 정합화. index.html "도형" 표현은 이미 0건.

- [x] **1교시(01~07) 완성 (2026-07-15)**: 03(rows)·05(flow 타임라인+M5)·06(rows)·07(qgrid 회수) 신규 제작, 전부 slide-reviewer PASS. 04 label 1교시 단원명으로 통일 + 재판정 PASS. 26·37 재판정 PASS. **deck-reviewer 1교시 마일스톤 PASS** (2회차 — 1회차 FAIL 2건은 04 label·게이트 문제, 해소함).
- [x] **verification-notes §3 신설**: BPMN 표준 연혁(2004/2011/2013) 웹 검증 + "흥망 서사는 해석 — 화면·대본 단정 금지" 규칙. §2-11(표준 표기 범위·비교 완화 규칙) 추가.
- [x] **COURSE.md §7 확장**: Checklist·Flowchart·State Machine·XOR·Parallel·Async·Retry·멱등·안티패턴·AI 에이전트·Service Task·Automatic Activity·Destination Screen·Form 등재.

- [x] **2교시(08~15) 완성 (2026-07-15)**: 08 BPMN 정의(M2, src+rows)·10 무-다이어그램 정리(qa)·11 범위 시작·끝(frag_scope_startend.bpmn, s-scope)·12 역할·인계(handoff)·13 정상·예외 경로(전체 모델+dead-strip, s-paths)·14 요소 네 갈래(qgrid)·15 질문↔요소 회수(rows) 신규, 09 재활용 개정(지도 훑기·M2 중복 제거·능력 부정 완화·채용 매니저). 전 장표 slide-reviewer PASS + **deck-reviewer 2교시 마일스톤 PASS**. 신규 컴포넌트 src·qa·handoff, qgrid 등재 확장. COURSE §7에 Event·Activity·Sequence Flow 등재, Retry 읽기형 '재시도' 허용.

- [x] **3교시(16~21) 완성 (2026-07-15)**: 16 Start/End Event(전체 모델+s-startend, Process Instance 첫 등장)·17 Pool/Lane/Message Flow(s-lanes, beat 캡션)·18 User Task(검토 태스크 줌+s-usertask, 일·대기)·19 Service/External Task(vs, Worker 첫 등장)·20 Activity 이름(신규 rename)·21 회수(qgrid). 전 장 slide-reviewer PASS + **deck-reviewer 3교시 마일스톤 PASS**(재판정, 1회차 FAIL은 17 notes "순서 흐름"→"Sequence Flow"). 신규 컴포넌트 beat·rename. §7에 Event·Activity·Sequence Flow·Pool·Lane·Message Flow·Tasklist 등재, verification-notes §2-12·13 추가.

## 다음 세션이 할 일 (순서대로)

1. **4교시(22~27) 제작** — 22는 이미 있음(재활용, 검증 상태): 4교시 작업 시 재판정 + cite 추가(deck-reviewer 이월). 23 Gateway 규칙(M3)·24 Exclusive·25 Parallel·26(재활용 통과)·27 회수 순. `slide-author` 로드 → 브라우저 검증 → `slide-reviewer` → inventory 갱신 → 커밋.
   - 23이 M3(Gateway는 마름모가 아니라 규칙) 확립 장표. 24·25는 병합·단계 노출(분기→합류).
2. 4교시 완성 시 deck-reviewer.
3. 이후 5교시(28~34) → 6교시(35~41, 37 재검토 포함) → 7·8교시 순.

### 이월 WARN (해당 교시에서 처리)
- 05 msg "유행은 오갔지만" — 해석 서사 잔존(§3-5). 5번 재방문 시 재검토.
- M1 정확 문장("BPMN은 목적이 아니라 …") 미등장 — 49(8교시) 제작 전 재검토.
- 22 화면 주장에 cite 없음 — 4교시에서 추가.
- 재활용 22·26·37 단원명 label이 자기 교시 기준 — 해당 교시 제작 시 확인.

## 주의 (세션에서 배운 것)

- **푸시**: origin=hskim-ecoletree/Lec.BPMN. **`env -u GITHUB_TOKEN git push`** 로 밀 것. `~/.zshrc`의 `GITHUB_TOKEN`(ecoletree)이 gh 활성 계정을 ecoletree로 고정 → 그냥 `git push`하면 403. gh 저장 기본 계정은 hskim-ecoletree로 전환해 둠.
- **ditto 플러그인**: `~/.claude/settings.json`에 전역 활성(`ditto@ditto-local`). 매 프롬프트에 "DITTO prime directive" 주입 + PreToolUse 훅으로 일부 명령 차단(자격증명·`~/.claude` 쓰기 등). **세션 안에서 못 끔**(자기 훅이 차단). 사용자가 `/plugin`에서 비활성 대기 중 — 다음 세션부터 적용.
- **디자인 이터레이션은 실물로** — 표지 등은 별도 시안 HTML을 만들어 스크린샷/렌더로 보여주고 고르게 한다.
- 브라우저 캐시: `?nocache=N` 증가 + force reload. **theme.css/deck.js 수정 시 index.html의 `?v=` 올린다**(현재 `?v=4`).
- bpmn 로드는 비동기 — 슬라이드 진입 후 0.5초 대기 후 fragment 진행해야 STEPS 적용.

## 미해결

- [ ] 4~8교시 제작 (22~50, 26장). 진행: 01~21 통과(1·2·3교시 완료), 22·26·37 재활용 존재.
- [ ] ditto `/plugin` 비활성 (사용자 직접)
- [ ] 구성안 v2: 명시적 "승인" 절차 없이 표지부터 제작 착수됨.
- [ ] 브랜드 정확한 hex 미확보 — 현재 `#457075` 유지.
- [ ] PDF export 파이프라인(`?print-pdf`)은 덱 완성 후.
