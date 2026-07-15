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

- [x] **4교시(22~27) 완성 (2026-07-15)**: 22 재판정 PASS(cite·역할 보강)·23 Gateway 규칙(M3, frag_gateway_rule.bpmn+s-gateway)·24 Exclusive(s-xor, 토큰 1·사무실 ghost·Default 스텝)·25 Parallel(s-parallel, 1→3→1·부분도착 대기로 26 교착 예고)·26 재판정 통과·27 회수(rows). 전 장 slide-reviewer PASS(24·25는 caveat 5번째 STEPS 스텝 추가로 FAIL 해소) + **deck-reviewer 4교시 마일스톤 PASS**. §7에 교착 등재. deck.js STEPS s-gateway·s-xor·s-parallel.

- [x] **5교시(28~34) 완성 (2026-07-15)**: 28 Inclusive 분기(s-inclusive, 개수 가변)·29 Inclusive 합류(s-inclusive-join, 활성 경로만·복잡 모델 경고)·30 Event-based(s-eventbased, 제출 win·기한 취소, §2-1 Catch Event만 교정)·31 선택 기준(qgrid)·32 Wait State(flow, 저장·재개)·33 Correlation(src+rows)·34 회수(rows). 전 장 slide-reviewer PASS(32는 '대기'색 err→wait 수정) + **deck-reviewer 5교시 마일스톤 PASS**. §7에 Inclusive·Event-based·Correlation 등재, 신규 `.flow__n--wait`.

- [x] **6교시(35~41) 완성 (2026-07-15)**: 35 Definition·Instance·Cockpit(병합, **M4 확대경 화면 확립** at msg, s-instances 세 인스턴스 지민·영수·아라)·36 저장·롤백 범위(s-savepoint, asyncBefore)·37 재활용 통과·38 Boundary Event(s-boundary, 중단/비중단, §2-10)·39 업무 결과 vs 기술 실패(vs, §2-6 cite)·40 채용 취소 Event Subprocess(s-eventsub, §2-15)·41 회수(rows, M4 재확립). 전 장 slide-reviewer PASS + **deck-reviewer 6교시 마일스톤 PASS**(FAIL 0). WARN 반영: async→Async·End→End Event 표기 통일. §7에 **Commit**·Boundary Event·Event Subprocess·Cockpit·Async 등재, §6에 예시 인스턴스 영수·아라(persona 아님) 등재, verification-notes §2-14·15 추가.

- [x] **7교시(42~46) 완성 (2026-07-15)**: 실습 단원. 42 실습 안내(신규 `.lab` 워크시트: 시작·끝·역할 슬롯)·43 실습 1 정상 경로(신규 `.tasks`: Start·User Task 동사·End·Sequence Flow)·44 실습 2 분기·병렬(lab 판단 슬롯 + 교착 caveat, 26 함정의 self-check)·45 실습 3 대기·기한·실패(tasks: Wait State·Timer·Retry/Incident)·46 모델 리뷰 체크리스트(qgrid 6점검, **M2 화면 확립**). 실습 사례는 중심 사례 온보딩(§6), 수강생이 요구사항 카드로 직접 구성. **운영 컨텍스트(시간·인원 배분)는 전부 aside.notes에만** — 화면 노출 0. 전 장표 slide-reviewer PASS + **deck-reviewer 7교시 마일스톤 PASS**(FAIL 0). §7에 Catch Event·Timer 등재(신규 컴포넌트 lab·tasks, theme.css?v=10).

- [x] **8교시(47~50) 완성 (2026-07-15)**: 덜어내기·판단·마무리. 47 실습 4 그리지 않을 것(vs 남긴다↔밖에 둔다: 알림·검증·입력, **M5 화면 확립**)·48 BPMN 적용 판단 기준(신규 `.matrix` 의사결정: 상황×도구 BPMN/Flowchart/State Machine/Checklist, "적합/일부/과함")·49 여섯 관점 다시 보기(qgrid, **M1 화면 확립** — 07 북엔드, 이월 WARN 해소)·50 내 업무에서 BPMN을 쓰지 않을 곳(rows 3신호, 열린 질문 클로징, M5). 전 장표 slide-reviewer PASS. 신규 컴포넌트 matrix(theme.css?v=11), DESIGN.md 구도 컴포넌트에 lab·tasks·matrix 등재·vs 일반 용도 명시.

- [x] **🎉 덱 최종 완성 (2026-07-15) — 50장 전량 통과 + deck-reviewer 최종 PASS(FAIL 0)**: 최종 판정 FAIL 1건(§7 "타이머" 혼용 — 화면·notes "타이머"→"Timer" 전면 통일, 32장 Timer/타이머 공존 제거) 해소. WARN 반영(cite "BPMN 2.0.2"→"BPMN 2.0", verification-notes §3-4). 잔여 WARN 1건(bpmn+beat 3연속 16–18·23–25·28–30)은 교습 단원의 정당한 예외로 **비차단** 판정. M1~M5 전부 화면 회수(M1=49·M2=08/46·M3=23·M4=35/36·M5=05/47/50), Q1~Q6 전 질문 복수 복무, 07↔49 북엔드 완결.

## 다음 세션이 할 일 (순서대로)

**모든 장표 제작·검증 완료(50/50).** 남은 것은 완성 후 작업:

1. **강사 대본 정식화** — `script-author` 스킬로 각 section `aside.notes`를 설계안 §8 형식(역할·대사·중요 문장·오해·교정·예상 질문·시간 조정)으로 다듬는다. 현재 전 장표에 대본 초안이 내장돼 있으나 정식 판정(slide-reviewer 중요 문장 일치)은 미실시. inventory 상태 "통과"→"대본"으로 갱신 대상.
2. **PDF export 파이프라인** — `?print-pdf` 또는 decktape로 산출. 폰트·bpmn 렌더 오프라인 동일성 확인. PPTX는 확정 후 별도 논의(DESIGN §Responsive).
3. **강의 직전 재확인** — verification-notes 시점 민감 항목(Camunda 7 CE EoL 7.24·2025-10 등) 공식 페이지 재확인.

### 잔여 WARN (비차단 — 완성 판정을 막지 않음)
- 구도 3연속(bpmn+beat 16–18·23–25·28–30): 교습 단원 정당 예외. 단원 리팩터 시 1장을 다른 구도로 환기하면 개선.
- `↔` 글리프: DESIGN.md vs 컴포넌트에 명시됨(중앙 ↔). CLAUDE.md 허용 목록 명문화는 사용자 판단(비차단).

### 이월 WARN (해당 교시에서 처리)
- 05 msg "유행은 오갔지만" — 해석 서사 잔존(§3-5). 5번 재방문 시 재검토.
- M1 정확 문장("BPMN은 목적이 아니라 …") 미등장 — 49(8교시) 제작 전 재검토.
- 22 화면 주장에 cite 없음 — 4교시에서 추가.
- 재활용 22·26·37 단원명 label이 자기 교시 기준 — 해당 교시 제작 시 확인.

## 주의 (세션에서 배운 것)

- **푸시**: origin=hskim-ecoletree/Lec.BPMN. **`env -u GITHUB_TOKEN git push`** 로 밀 것. `~/.zshrc`의 `GITHUB_TOKEN`(ecoletree)이 gh 활성 계정을 ecoletree로 고정 → 그냥 `git push`하면 403. gh 저장 기본 계정은 hskim-ecoletree로 전환해 둠.
- **ditto 플러그인**: `~/.claude/settings.json`에 전역 활성(`ditto@ditto-local`). 매 프롬프트에 "DITTO prime directive" 주입 + PreToolUse 훅으로 일부 명령 차단(자격증명·`~/.claude` 쓰기 등). **세션 안에서 못 끔**(자기 훅이 차단). 사용자가 `/plugin`에서 비활성 대기 중 — 다음 세션부터 적용.
- **디자인 이터레이션은 실물로** — 표지 등은 별도 시안 HTML을 만들어 스크린샷/렌더로 보여주고 고르게 한다.
- 브라우저 캐시: `?nocache=N` 증가 + force reload. **theme.css/deck.js 수정 시 index.html의 `?v=` 올린다**(현재 theme.css `?v=11`·deck.js `?v=13`).
- bpmn 로드는 비동기 — 슬라이드 진입 후 0.5초 대기 후 fragment 진행해야 STEPS 적용.
- **원격 세션 푸시**: 이 환경에서는 평범한 `git push origin <branch>`가 정상 동작(위 `env -u GITHUB_TOKEN` 주의는 로컬 세션용). Playwright는 `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`를 executablePath로 지정.

## 미해결

- [x] ~~1~8교시 전 장표 제작(01~50)~~ — **완료. 덱 최종 deck-reviewer PASS.**
- [ ] **강사 대본 정식화** (script-author) — 초안은 전 장표 내장, 정식 판정 미실시.
- [ ] **PDF export**(`?print-pdf`/decktape) — 덱 완성했으므로 착수 가능.
- [ ] ditto `/plugin` 비활성 (사용자 직접)
- [ ] 브랜드 정확한 hex 미확보 — 현재 `#457075` 유지.
- [ ] 강의 직전 verification-notes 시점 민감 항목 재확인(Camunda 7 EoL 등).
