# 내용 검증 노트

강의 자료의 사실 주장을 공식 문서로 검증한 기록이다. 강사가 BPMN·OutSystems를 깊게 알지 못한다는 전제에서, **틀리기 쉬운 지점**과 **교정된 표현**을 남긴다. 슬라이드 문구는 이 노트를 기준으로 작성한다.

> 검증일 기준 최신 공식 문서를 확인했다. 강의 직전에 EoL·버전 등 시점에 민감한 항목은 한 번 더 확인한다.

---

## 1. OutSystems (공식 문서 기반)

출처: OutSystems 11 공식 문서 (success.outsystems.com)
- Processes (BPT): `/documentation/11/building_apps/using_processes_bpt/processes/`
- Notation Reference for BPMN Practitioners: `/documentation/11/building_apps/using_processes_bpt/notation_reference_for_bpmn_practitioners/`
- Human Activity: `/documentation/11/reference/outsystems_language/processes/process_tools/human_activity/`
- Workflows in ODC: `/documentation/outsystems_developer_cloud/building_apps/about_business_processes/workflows_in_odc/`

### 확정된 용어

- **BPT(Business Process Technology)** 는 **OutSystems 11** 용어다. 모델링 단위는 **Process**(process flow).
- OutSystems가 **직접 발행한 BPMN 매핑**이 존재한다:

  | OutSystems 요소 | OutSystems 공식 BPMN 대응 |
  |---|---|
  | Human Activity | Task of type **User or Manual** |
  | Automatic Activity | Service / Script / Send Task |
  | Decision | Exclusive(데이터 기반) Gateway |
  | Fork | Parallel split |
  | Wait | Intermediate catch Event / Receive Task |
  | Execute Process | Reusable Sub-Process |
  | Connector | Sequence Flow |

- **Human Activity → 화면 연결**: 실행되면 사용자 **Taskbox**에 뜨고, 활동의 **Destination** 속성이 가리키는 **Screen**에서 작업을 완료한다. ("Screen에 그냥 연결"이 아니라 Taskbox + Destination 메커니즘.)

### 교정 사항 (설계안 03)

- ✅ "BPT" 표기는 유지하되 **"OutSystems 11 (BPT)"** 로 버전을 명시한다.
- ⚠️ **ODC(OutSystems Developer Cloud)에는 BPT가 없다.** 대체 기능은 **Workflows**이며 노드는 `Start / End / HumanActivity / AutomaticActivity / Decision` 등. 슬라이드에 "ODC에서는 BPT 대신 Workflows" 주의를 넣었다.
- ⚠️ **"Screen = User Task"로 치환 금지.** User Task에 대응하는 것은 **Human Activity**이고, Screen/Form은 그 작업의 **사용자 접점**일 뿐이다. (슬라이드 주의 띠에 명시)
- "주된 관심: 앱 구현 vs 업무 의미" 같은 단정은 완화했다 — BPT도 비즈니스 프로세스를 모델링한다. "앱에 내장되어 실행되는 프로세스(고유 표기)" vs "표준 표기 기반 프로세스 모델"로 표현.

### ODC 개발 방식 — action flow (설계안 04 재작성, 2026-07-16)

출처: OutSystems Developer Cloud 공식 문서 (success.outsystems.com)
- Server Action: `/documentation/outsystems_developer_cloud/outsystems_language_and_elements/logic_actions/server_action/`
- Workflows in ODC: `/documentation/outsystems_developer_cloud/building_apps/about_business_processes/workflows_in_odc/`

- **ODC의 로직은 visual flow로 만든다.** Server Action을 **action flow**에 끌어다 놓고 **Run Server Action** 요소로 실행하며, 출력 파라미터를 이후 흐름에서 쓴다. 즉 화면 로직·서버 액션 자체가 흐름 편집이다. (공식 문서 "Run Server Action" 설명)
- **ODC Workflows**는 별개의 **workflow 편집기**(시각 캔버스)로, 노드는 `Start / Conditional start / Human activity / Automatic activity / Decision` 등. **BPT의 후속 '프로세스 기능'**이며, 평소 개발하는 action flow와는 다른 층위(오래 실행되는 비즈니스 프로세스)다.
- **설계안 04 재작성 근거**: 비교의 왼쪽을 옛 BPT 요소 매핑이 아니라 **"ODC는 이미 흐름으로 개발한다"**로 잡는다. 화면에는 요소 1:1 대응을 주장하지 **않는다** — action flow와 BPMN 프로세스는 **같은 흐름 문법**(시작·단계·분기·끝)을 공유하되 **층위가 다르다**(action flow=한 요청 안 즉시 실행 / BPMN=사람·시스템·시간에 걸친 대기를 품은 오케스트레이션). "If ↔ Gateway, Server Action ↔ Service Task" 같은 1:1 치환은 오해이므로 화면·대본에서 금지.
- 화면에 쓴 노드명은 근거 있는 것만: ODC 쪽 `Start / Aggregate / If / Run Server Action / End` — Aggregate(조회)·Run Server Action은 공식 문서 확인, If·Start·End는 OutSystems 로직 편집 기본 요소.

---

## 2. BPMN 2.0 + Camunda 7 (docs.camunda.org)

출처: Camunda 7 Manual (`docs.camunda.org/manual/7.x/`), OMG BPMN 2.0.2.

| # | 주장 | 판정 | 비고 |
|---|---|---|---|
| 1 | Event-based Gateway 뒤에 Catch Event **또는 Receive Task** | ⚠️ 부분 오류 | **Camunda 7 엔진은 Receive Task를 지원하지 않는다.** Intermediate Catch Event만 허용. 일반 Task·데이터 분기도 불가. |
| 2 | XOR: outgoing Flow 조건 평가, 정확히 1개, Default로 미일치 처리 | ✅ | **조건 불일치 + Default 없으면 런타임 예외** — Default가 필요한 이유. |
| 3 | Parallel: 조건 무시, 1→N 복제 / 합류는 모든 incoming 도착까지 대기 | ✅ | |
| 4 | XOR 분기 → Parallel 합류 = 교착 | ✅ | 엔진이 자동 감지하지 않음. 인스턴스가 합류에서 **영원히 대기**(멈춤). 안티패턴. |
| 5 | Inclusive: 조건 참인 경로 모두 / 합류는 **활성(도달 가능) 경로만** 대기 | ✅ | 복잡·중첩 모델에서 활성 경로 계산이 비싸고 까다로울 수 있음(문서화된 주의). |
| 6 | async + Job + Retry + Incident, 기본 retries=3 → 0이면 Incident | ✅ | 초기 `retries` 값 = 3(총 3회 시도). 문서는 "2 retries(첫 시도 후 2회 재시도)"로 표현 — 슬라이드는 "총 3회"로 통일. |
| 7 | External Task: **Worker가 retries·retryTimeout 설정** | ✅ | 일반 async Job(엔진 기본 3)과 다름. Worker가 `handleFailure(retries, retryTimeout)`로 지정, 0이면 Incident. |
| 8 | Wait State: 상태 저장 + 트랜잭션 Commit + 요청/스레드 종료, Trigger로 재개 | ✅ | User Task·Message/Timer Catch·External Task 등. |
| 9 | Message Correlation: message name + (business key / correlation 변수) | ✅ | business key는 사용자 지정 식별자, **엔진이 유일성 보장 안 함**. |
| 10 | Boundary: 실선=interrupting(중단), 점선=non-interrupting(추가 토큰) | ✅ | `cancelActivity` true/false. |
| 11 | BPMN 2.0 표준에 역할(Pool·Lane)·분기(Gateway)·대기(Intermediate Catch Event·User Task)·예외(Boundary/Error Event)의 표기가 정의되어 있다 | ✅ | OMG BPMN 2.0.2 스펙 목차 수준에서 확인 — Pools/Lanes, Gateways, Events(Catch/Boundary/Error) 장이 표준에 존재. "다른 표기법(순서도·상태도)에는 이런 요소의 **합의된 표기**가 없다"는 식의 비교는 "약속이 없다/표기 밖" 수준으로만 말하고 능력 부정 단정은 피한다. |
| 12 | Start Event 발생 시 Process Instance 한 건이 생성되고, End Event는 도달한 토큰을 소멸시킨다. 프로세스에 End Event가 여럿일 수 있다 | ✅ | BPMN 2.0.2·Camunda 7 기본 실행 의미. None Start Event는 API/수동으로 인스턴스 시작, Message/Timer Start도 가능(온보딩은 None Start로 단순화). 여러 End Event 허용 — 각기 도달한 토큰만 소멸(Terminate End만 전체 종료). "계기마다 업무 한 건이 새로 생긴다"는 이 의미의 서술. |
| 13 | Pool = 참여자(참가 조직/시스템)의 경계, Lane = Pool 안의 역할 구획, Message Flow = **서로 다른 Pool 사이**의 통신(같은 Pool 안은 Sequence Flow) | ✅ | OMG BPMN 2.0.2. Message Flow는 Pool 경계를 넘는 메시지에만 사용, Lane은 실행 의미가 없는 시각적 책임 구획(엔진 동작에 영향 없음, 가독성·책임 표기용). |
| 14 | 하나의 Process Definition(배포된 설계, 버전 있음)에서 여러 Process Instance(각 업무 한 건)가 독립적으로 실행된다. Camunda Cockpit은 실행 중 인스턴스의 상태·현재 위치를 관찰하는 운영 도구 | ✅ | Camunda 7 기본 개념. Cockpit은 EE 웹앱(운영/관찰용) — 강의는 "실행 의미를 관찰하는 확대경"(M4) 수준으로만 다루고 운영 전문가 양성(§4 배제)로 넘어가지 않는다. |
| 15 | Event Subprocess(triggeredByEvent) — interrupting start(isInterrupting=true, 예: 메시지 OfferCanceled)이 발화하면 감싸는 프로세스 범위를 취소하고 자신의 흐름을 실행. non-interrupting은 병렬로 추가 실행 | ✅ | BPMN 2.0.2·Camunda 7. Boundary Event(§2-10)의 interrupting/non-interrupting과 같은 원리. "언제든 올 수 있는 사건"을 본류에 선으로 그리지 않고 범위 전체에 거는 표기. |

### 강사가 알아야 할 Camunda 7 시점 주의

- **`historyTimeToLive` 필수(7.20+):** 미설정 시 배포가 파싱 예외로 실패한다. (이 저장소의 `models/new_hire_onboarding.bpmn`에는 `camunda:historyTimeToLive="180"` 설정됨 ✓)
- **Camunda 7 EoL:** Community Edition 최종 릴리스 7.24 (2025-10-14), 이후 CE 릴리스 없음. Enterprise 지원은 2030-04까지 연장(이후 패치). 전략 방향은 Camunda 8로 이관. **강의 직전 공식 발표 페이지로 날짜 재확인.**
- **XOR 미일치 예외:** 조건이 모두 false이고 Default가 없으면 실행 시 예외 — 흔한 함정.

---

## 3. BPMN 표준 연혁 (장표 05)

출처: OMG BPMN spec 이력, Trisotech "BPMN Introduction and History", Wikipedia "Business Process Model and Notation", iso.org (ISO/IEC 19510:2013). 검증일 2026-07-15.

| # | 사실 | 판정 | 비고 |
|---|---|---|---|
| 1 | BPMN 1.0은 2004년 BPMI(Business Process Management Initiative)가 발표 | ✅ | 2004-05 공개. 사람이 읽는 표기로 출발 |
| 2 | BPMI는 2005년 OMG와 합병, OMG가 표준 관리 주체가 됨 | ✅ | OMG 첫 스펙 문서는 2006-02 |
| 3 | BPMN 2.0은 2011년 1월 OMG formal 발표 — 명칭이 "Model and Notation"으로 바뀌고 **실행 의미(execution semantics)** 가 표준에 포함됨 | ✅ | "그림이 실행 규칙까지 담다"의 근거 |
| 4 | 2013년 ISO/IEC 19510으로 국제 표준 채택 | ✅ | 대응 미세 버전은 출처 간 2.0.1/2.0.2 표기가 갈림 — **화면에는 미세 버전을 올리지 않는다** |
| 5 | "BPMS 전성기의 약속이 무너졌다"류의 서사 | ⚠️ 해석 | 검증 가능한 사실이 아니라 해석 — 화면·대본에서는 연혁 사실 + 과정 핵심 메시지 M5(억지 모델링 금지)로만 말하고, 흥망 단정은 피한다. 도구 변화의 검증된 앵커는 §2 시점 주의(Camunda 7 CE 최종 7.24, 2025-10)뿐 — 화면 비노출, 예상 질문 대응용 |

## 4. 슬라이드에 반영한 교정 요약

- 설계안 03: OutSystems 표기 버전 명시, ODC/Workflows 주의, Screen≠User Task 강조, 공식 매핑 표 사용.
- 설계안 39(Event-based Gateway) 제작 시: "뒤에 Catch Event 또는 Receive Task" → **"Camunda 7에서는 Intermediate Catch Event만"** 으로 교정할 것.
- 설계안 42(Async): 일반 Job(기본 3회) vs External Task(Worker 설정) 구분을 명시.
