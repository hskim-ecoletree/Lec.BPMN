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

### 강사가 알아야 할 Camunda 7 시점 주의

- **`historyTimeToLive` 필수(7.20+):** 미설정 시 배포가 파싱 예외로 실패한다. (이 저장소의 `models/new_hire_onboarding.bpmn`에는 `camunda:historyTimeToLive="180"` 설정됨 ✓)
- **Camunda 7 EoL:** Community Edition 최종 릴리스 7.24 (2025-10-14), 이후 CE 릴리스 없음. Enterprise 지원은 2030-04까지 연장(이후 패치). 전략 방향은 Camunda 8로 이관. **강의 직전 공식 발표 페이지로 날짜 재확인.**
- **XOR 미일치 예외:** 조건이 모두 false이고 Default가 없으면 실행 시 예외 — 흔한 함정.

---

## 3. 슬라이드에 반영한 교정 요약

- 설계안 03: OutSystems 표기 버전 명시, ODC/Workflows 주의, Screen≠User Task 강조, 공식 매핑 표 사용.
- 설계안 39(Event-based Gateway) 제작 시: "뒤에 Catch Event 또는 Receive Task" → **"Camunda 7에서는 Intermediate Catch Event만"** 으로 교정할 것.
- 설계안 42(Async): 일반 Job(기본 3회) vs External Task(Worker 설정) 구분을 명시.
