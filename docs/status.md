# 제작 현황 · 다음 세션 시작 지점

> 새 세션은 이 문서 + `CLAUDE.md`(자동 로드) + `COURSE.md` + `DESIGN.md` + `docs/curriculum.md`만 읽으면 이어서 작업할 수 있다.

## 완료된 것

- [x] **빌드 방식**: HTML(reveal.js + bpmn-js), 라이브러리·Pretendard 벤더링, 정적 서버로 구동(`python3 -m http.server 8753`)
- [x] **거버넌스**: `COURSE.md`(과정 헌장 — 여섯 질문 Q1~Q6, 배제 사항, 용어 사전) > `DESIGN.md` > `docs/verification-notes.md`(사실 검증) > `docs/curriculum.md`(구성안 v2) > `docs/course-plan.md`(구 설계안, 참고용)
- [x] **하네스**: `slide-author`/`script-author` 스킬 + `slide-reviewer`/`deck-reviewer` 서브에이전트 — 전부 디자인 v3 기준으로 배선됨
- [x] **디자인 v3 확정·적용** (커밋 `dce42c6`): 표지=어둠 속 수직 광선, 본문=따뜻한 종이+좌측 그림자, 메시지 우선 위계, 강조·토큰 `#457075`(사용자 확정), bpmn-js 투명 렌더. 많은 라운드 끝에 수렴 — **아이덴티티 변경은 사용자 승인 없이 금지**
- [x] **수직 슬라이스 6장** v3로 재작성 + 대본 초안(aside.notes) 내장, 브라우저 검증(콘솔 0)
- [x] 내용 검증: OutSystems(공식 문서)·Camunda 7 → `verification-notes.md` (Event-based GW는 Camunda 7에서 Catch Event만 — 장표 30 제작 시 반영)

## 다음 세션이 할 일 (순서대로)

1. **구성안 v2 승인 받기** — `docs/curriculum.md`(8교시 50장, 집중형 실습, 담백한 제목)는 작성 완료·미승인 상태. 사용자에게 승인 확인 후:
2. `docs/inventory.md`에 50장을 "계획" 상태로 등록 (기존 6장의 재활용 매핑: 01→01, 03→04(신규번호), 08→09… 는 curriculum.md 참조)
3. **1교시부터 장표 제작** — 반드시 `slide-author` 스킬 로드 후 1장씩: 메시지 작성 → v3 골격 → 브라우저 검증 → `slide-reviewer` 판정 → inventory 갱신 → 커밋
4. 교시(단원) 완성마다 `deck-reviewer`로 덱 일관성 판정
5. 기존 6장도 새 번호 체계로 재배치·slide-reviewer 재판정 필요 (v3 재작성 후 리뷰 안 거침)

## 주의 (세션에서 배운 것)

- **디자인 이터레이션은 반드시 실물(스크린샷)로** — 말로 방향을 설명하면 실패한다. 시안은 별도 HTML로 만들어 보여주고 고르게 할 것
- 브라우저 캐시가 자주 남는다: `?nocache=N` 증가 + force reload, theme.css/deck.js 수정 시 `?v=` 버전 증가
- bpmn 로드는 비동기 — 슬라이드 진입 후 0.5초 대기 후 fragment 진행해야 STEPS 적용
- 서버가 안 떠 있으면 `python3 -m http.server 8753` (레포 루트)

## 미해결

- [ ] 구성안 v2 사용자 승인 (위 1번)
- [ ] 브랜드 정확한 hex 미확보 — 현재 `#457075`는 사용자가 직접 확정한 값이므로 유지
- [ ] PDF export 파이프라인(`?print-pdf` 검증)은 덱 완성 후
