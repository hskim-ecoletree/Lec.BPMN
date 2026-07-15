# 제작 현황 · 다음 세션 시작 지점

> 새 세션은 이 문서 + `CLAUDE.md`(자동 로드) + `COURSE.md` + `DESIGN.md` + `docs/curriculum.md`만 읽으면 이어서 작업할 수 있다.
> 최종 갱신: 2026-07-16.

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

## 다음 세션이 할 일 (순서대로)

1. **표지 브라우저 눈 확인** — `http://localhost:8753/index.html?nocache=N#/1`. 볼 것: 겹침·과밀, "구조로 읽는 법." 줄바꿈(단어 중간 끊김 없는지), 콘솔 오류 0. (이번 세션은 스크린샷 도구가 없어 시각 미검증) 문제 있으면 표지부터 수정.
2. **슬라이드 02 빌드** — `slide-author` 로드 후. 형식 A(개념), 온보딩 BPMN + "화면·기능 목록 ↔ 구조" 대비. 표지 '구조'를 눈으로 해소. 브라우저 검증 → `slide-reviewer` → `inventory` 갱신 → 커밋.
3. **1교시 나머지 제작** (03·05·06·07) 순서대로, 1장씩.
4. **재활용 built 슬라이드 26·37**: 제목 담백화(curriculum 반영분과 일치)·표지 외 "도형"→"다이어그램"을 index.html에 반영 + `slide-reviewer` 재판정. (현재 curriculum만 반영, index.html 미반영)
5. `docs/inventory.md`에 50장 "계획" 상태 등록 (아직 안 함).
6. 교시(단원) 완성마다 `deck-reviewer`.

## 주의 (세션에서 배운 것)

- **푸시**: origin=hskim-ecoletree/Lec.BPMN. **`env -u GITHUB_TOKEN git push`** 로 밀 것. `~/.zshrc`의 `GITHUB_TOKEN`(ecoletree)이 gh 활성 계정을 ecoletree로 고정 → 그냥 `git push`하면 403. gh 저장 기본 계정은 hskim-ecoletree로 전환해 둠.
- **ditto 플러그인**: `~/.claude/settings.json`에 전역 활성(`ditto@ditto-local`). 매 프롬프트에 "DITTO prime directive" 주입 + PreToolUse 훅으로 일부 명령 차단(자격증명·`~/.claude` 쓰기 등). **세션 안에서 못 끔**(자기 훅이 차단). 사용자가 `/plugin`에서 비활성 대기 중 — 다음 세션부터 적용.
- **디자인 이터레이션은 실물로** — 표지 등은 별도 시안 HTML을 만들어 스크린샷/렌더로 보여주고 고르게 한다.
- 브라우저 캐시: `?nocache=N` 증가 + force reload. **theme.css/deck.js 수정 시 index.html의 `?v=` 올린다**(현재 `?v=4`).
- bpmn 로드는 비동기 — 슬라이드 진입 후 0.5초 대기 후 fragment 진행해야 STEPS 적용.

## 미해결

- [ ] 표지 시각 검증 (다음 세션 1번)
- [ ] ditto `/plugin` 비활성 (사용자 직접)
- [ ] 구성안 v2: 명시적 "승인" 절차 없이 표지부터 제작 착수됨. inventory 50장 등록 아직.
- [ ] 브랜드 정확한 hex 미확보 — 현재 `#457075` 유지.
- [ ] PDF export 파이프라인(`?print-pdf`)은 덱 완성 후.
