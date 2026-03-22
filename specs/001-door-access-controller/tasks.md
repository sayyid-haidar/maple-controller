# Tasks: One-Door Access Controller

**Input**: Design documents from `/specs/001-door-access-controller/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Automated test tasks are not included because the specification does not request TDD or dedicated automated tests. Constitution-mandated validation tasks are included for every user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup

**Purpose**: Prepare the repository structure and planning references used by all implementation work.

- [ ] T001 Create the planned source structure in `src/circuits/one-door-controller.tsx`, `src/components/ethernet-poe-front-end.tsx`, `src/components/power-domains.tsx`, `src/components/reader-interfaces.tsx`, `src/components/supervised-input-bank.tsx`, `src/components/relay-lock-output.tsx`, `src/lib/controller-types.ts`, and `src/lib/wiring-contracts.ts`
- [ ] T002 Confirm the implementation file layout and validation workflow in `specs/001-door-access-controller/quickstart.md`
- [ ] T003 [P] Record the initial fabrication-readiness baseline and unresolved part-selection assumptions in `specs/001-door-access-controller/plan.md`

---

## Phase 2: Foundational

**Purpose**: Establish shared types, board shell, and reusable contracts that block all user stories.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T004 Define shared domain types for controller variants, power domains, reader modes, lock policies, management states, and event records in `src/lib/controller-types.ts`
- [ ] T005 [P] Define reusable installer-facing connectors, named nets, and interface contracts in `src/lib/wiring-contracts.ts`
- [ ] T006 [P] Create the base board shell with 4-layer constraints, placement zones, fabrication status, and composition hooks in `src/circuits/one-door-controller.tsx`
- [ ] T007 [P] Replace the current stub board with a thin feature entrypoint that renders `src/circuits/one-door-controller.tsx` from `index.circuit.tsx`
- [ ] T008 Capture provisional footprints, protection boundaries, and board-review blockers shared across stories in `specs/001-door-access-controller/plan.md`

**Checkpoint**: Foundation ready. User story implementation can now proceed.

---

## Phase 3: User Story 1 - Control One Networked Door (Priority: P1) 🎯 MVP

**Goal**: Deliver a one-door controller with Ethernet connectivity, PoE-powered logic, external lock power via dry relay, and the minimum door-state and egress paths.

**Independent Test**: Verify that the rendered circuit and snapshots show one complete path for Ethernet/PoE entry, one external dry-relay lock path, one door contact path, one REX path, and one credential-reader path in the P1 board assembly.

### Validation for User Story 1 (MANDATORY)

- [ ] T009 [P] [US1] Run `npm run typecheck` against `index.circuit.tsx`, `src/circuits/one-door-controller.tsx`, `src/components/ethernet-poe-front-end.tsx`, `src/components/power-domains.tsx`, and `src/components/relay-lock-output.tsx`
- [ ] T010 [P] [US1] Run `tsci check netlist` for the board defined by `index.circuit.tsx` and `src/circuits/one-door-controller.tsx`
- [ ] T011 [US1] Run `tsci build` and `tsci snapshot` for the P1 assembly rendered from `index.circuit.tsx`
- [ ] T012 [US1] Run `tsci check placement` for connector zoning and board outline changes in `src/circuits/one-door-controller.tsx`

### Implementation for User Story 1

- [ ] T013 [P] [US1] Implement PoE logic rails, external lock-power entry, and named power nets in `src/components/power-domains.tsx`
- [ ] T014 [P] [US1] Implement the 10/100 Ethernet + PoE front end with protection and logic-domain assumptions in `src/components/ethernet-poe-front-end.tsx`
- [ ] T015 [P] [US1] Implement the dry Form-C relay lock path with 12V/24V compatibility and fail-safe/fail-secure wiring annotations in `src/components/relay-lock-output.tsx`
- [ ] T016 [P] [US1] Implement the minimum supervised door-contact and REX paths needed for one-door control in `src/components/supervised-input-bank.tsx`
- [ ] T017 [US1] Integrate the power, Ethernet, relay, door-contact, and REX subcircuits into the board assembly in `src/circuits/one-door-controller.tsx`
- [ ] T018 [US1] Document the P1 review package, commanded lock path, and remaining credential-path assumptions in `specs/001-door-access-controller/quickstart.md`

**Checkpoint**: User Story 1 should be independently demonstrable as the MVP board.

---

## Phase 4: User Story 2 - Keep Operating During Network Interruptions (Priority: P2)

**Goal**: Add the local-fallback, event-buffering, and RTC-backed ordering model needed for operation through management or LAN interruptions.

**Independent Test**: Verify that the typed model, contracts, and board annotations show persistent event buffering, offline management states, and a nonvolatile ordering strategy without changing the door-control hardware assumptions.

### Validation for User Story 2 (MANDATORY)

- [ ] T019 [P] [US2] Run `npm run typecheck` against `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts`, and `src/circuits/one-door-controller.tsx`
- [ ] T020 [P] [US2] Run `tsci check netlist` for the offline-support additions rendered from `index.circuit.tsx`
- [ ] T021 [US2] Run `tsci build` and `tsci snapshot` to confirm the offline-buffering and management-state additions in `index.circuit.tsx`
- [ ] T022 [US2] Run `tsci check placement` if RTC, nonvolatile storage, or service-access placement changes are introduced in `src/circuits/one-door-controller.tsx`

### Implementation for User Story 2

- [ ] T023 [P] [US2] Extend event, management, and timekeeping domain types for offline buffering and resynchronization in `src/lib/controller-types.ts`
- [ ] T024 [P] [US2] Define nonvolatile storage, RTC-backed ordering, and power-fail signaling interfaces in `src/lib/wiring-contracts.ts`
- [ ] T025 [P] [US2] Add the board-level storage, RTC, and degraded/offline management annotations to `src/circuits/one-door-controller.tsx`
- [ ] T026 [US2] Update the behavioral handoff and outage assumptions in `specs/001-door-access-controller/contracts/operational-behavior-contract.md`
- [ ] T027 [US2] Update the implementation handoff for offline buffering, RTC ordering, and resync expectations in `specs/001-door-access-controller/quickstart.md`

**Checkpoint**: User Story 2 should independently describe and render offline-capable behavior for the controller.

---

## Phase 5: User Story 3 - Integrate With Standard Door Hardware (Priority: P3)

**Goal**: Add the full installer-facing hardware set, including both OSDP/RS-485 and Wiegand reader compatibility, tamper/fault monitoring, and field-wiring protections.

**Independent Test**: Verify that the board and review artifacts show explicit installer-facing interfaces for OSDP/RS-485, Wiegand, tamper/fault, door contact, REX, and dry-relay lock wiring with named nets and protection boundaries.

### Validation for User Story 3 (MANDATORY)

- [ ] T028 [P] [US3] Run `npm run typecheck` against `src/components/reader-interfaces.tsx`, `src/components/supervised-input-bank.tsx`, `src/components/relay-lock-output.tsx`, and `src/circuits/one-door-controller.tsx`
- [ ] T029 [P] [US3] Run `tsci check netlist` for the installer-facing interfaces rendered from `index.circuit.tsx`
- [ ] T030 [US3] Run `tsci build` and `tsci snapshot` to capture the complete field-wiring interfaces in `index.circuit.tsx`
- [ ] T031 [US3] Run `tsci check placement` for reader-port, terminal-block, relay, and protection-zone placement in `src/circuits/one-door-controller.tsx`

### Implementation for User Story 3

- [ ] T032 [P] [US3] Implement the OSDP/RS-485 and Wiegand reader sections with protection and compatibility labeling in `src/components/reader-interfaces.tsx`
- [ ] T033 [P] [US3] Expand monitored inputs for tamper and abnormal-power sensing in `src/components/supervised-input-bank.tsx`
- [ ] T034 [P] [US3] Refine the relay output with installer-facing suppression and contact-rating annotations in `src/components/relay-lock-output.tsx`
- [ ] T035 [US3] Integrate the complete installer-facing reader and supervised-input hardware into `src/circuits/one-door-controller.tsx`
- [ ] T036 [US3] Update field-wiring expectations, supervision modes, and service-access notes in `specs/001-door-access-controller/contracts/hardware-interface-contract.md`

**Checkpoint**: User Story 3 should independently cover standard one-door field-hardware integration.

---

## Phase 6: User Story 4 - Support Managed Administration (Priority: P4)

**Goal**: Reserve the service, management, and status interfaces needed for central administration without breaking local operation.

**Independent Test**: Verify that the board, contracts, and review notes show management-link states, service/debug access, and explicit status paths for online, degraded, offline, and resyncing operation.

### Validation for User Story 4 (MANDATORY)

- [ ] T037 [P] [US4] Run `npm run typecheck` against `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts`, `src/components/ethernet-poe-front-end.tsx`, and `src/circuits/one-door-controller.tsx`
- [ ] T038 [P] [US4] Run `tsci check netlist` for the managed-administration additions rendered from `index.circuit.tsx`
- [ ] T039 [US4] Run `tsci build` and `tsci snapshot` to verify service-access and management-state visibility in `index.circuit.tsx`
- [ ] T040 [US4] Run `tsci check placement` if service/debug connectors or status indicators are added to `src/circuits/one-door-controller.tsx`

### Implementation for User Story 4

- [ ] T041 [P] [US4] Extend management-link and configuration/status interface types in `src/lib/controller-types.ts`
- [ ] T042 [P] [US4] Add service/debug access and management-interface net definitions in `src/lib/wiring-contracts.ts`
- [ ] T043 [P] [US4] Add management-status, service-access, and monitoring-resync annotations in `src/components/ethernet-poe-front-end.tsx`
- [ ] T044 [US4] Integrate the managed-administration interfaces and review-visible status paths in `src/circuits/one-door-controller.tsx`
- [ ] T045 [US4] Update central-management behavior and handoff notes in `specs/001-door-access-controller/contracts/operational-behavior-contract.md`

**Checkpoint**: User Story 4 should independently describe the managed-administration layer on top of the controller hardware.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize documentation, fabrication-readiness notes, and full-project validation after all desired stories are complete.

- [ ] T046 [P] Refresh the final board handoff notes, file layout, and validation instructions in `specs/001-door-access-controller/quickstart.md`
- [ ] T047 Review circuit purity, typing discipline, and unnecessary complexity across `index.circuit.tsx`, `src/circuits/one-door-controller.tsx`, `src/components/*.tsx`, and `src/lib/*.ts`
- [ ] T048 Validate fabrication-readiness status, provisional parts, and reviewer handoff notes in `specs/001-door-access-controller/plan.md`
- [ ] T049 Re-run `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` for the complete feature implemented from `index.circuit.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies; can start immediately.
- Foundational (Phase 2): Depends on Setup; blocks all user stories.
- User Stories (Phases 3-6): Depend on Foundational completion.
- Polish (Phase 7): Depends on all desired user stories being complete.

### User Story Dependencies

- User Story 1 (P1): Starts after Foundational; no dependency on later stories.
- User Story 2 (P2): Starts after Foundational; reuses P1 board shell but remains independently testable through offline-behavior artifacts.
- User Story 3 (P3): Starts after Foundational; reuses P1 power and board shell but remains independently testable through installer-interface artifacts.
- User Story 4 (P4): Starts after Foundational; reuses P1 Ethernet shell and P2 state model but remains independently testable through management-interface artifacts.

### Within Each User Story

- Run validation tasks after the story implementation tasks are complete.
- Update shared types and contracts before wiring dependent board integrations.
- Complete board integration before final story documentation and snapshot refresh.

### Suggested Completion Order

- US1 → US2 → US3 → US4 for single-developer flow.
- US1 first as MVP, then US2 and US3 in either order, then US4.

---

## Parallel Opportunities

- T003 can run in parallel with T001-T002.
- T005-T007 can run in parallel after T004 starts shaping the shared model.
- In US1, T013-T016 can run in parallel before T017.
- In US2, T023-T025 can run in parallel before T026-T027.
- In US3, T032-T034 can run in parallel before T035-T036.
- In US4, T041-T043 can run in parallel before T044-T045.
- Final polish task T046 can run in parallel with T047-T048 before T049.

---

## Parallel Example: User Story 1

```bash
# Parallelizable implementation work for US1
T013 Implement PoE and lock power domains in src/components/power-domains.tsx
T014 Implement Ethernet + PoE front end in src/components/ethernet-poe-front-end.tsx
T015 Implement dry relay lock output in src/components/relay-lock-output.tsx
T016 Implement door contact and REX monitoring in src/components/supervised-input-bank.tsx
```

## Parallel Example: User Story 2

```bash
# Parallelizable implementation work for US2
T023 Extend offline event and management types in src/lib/controller-types.ts
T024 Define storage and RTC contracts in src/lib/wiring-contracts.ts
T025 Add offline-buffering board annotations in src/circuits/one-door-controller.tsx
```

## Parallel Example: User Story 3

```bash
# Parallelizable implementation work for US3
T032 Implement OSDP and Wiegand reader sections in src/components/reader-interfaces.tsx
T033 Expand tamper and fault monitoring in src/components/supervised-input-bank.tsx
T034 Refine relay suppression and ratings in src/components/relay-lock-output.tsx
```

## Parallel Example: User Story 4

```bash
# Parallelizable implementation work for US4
T041 Extend management and status types in src/lib/controller-types.ts
T042 Add service/debug net definitions in src/lib/wiring-contracts.ts
T043 Add management-status annotations in src/components/ethernet-poe-front-end.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate P1 with T009-T012 before moving on.

### Incremental Delivery

1. Finish Setup + Foundational once.
2. Deliver US1 as the MVP door controller.
3. Add US2 for offline resilience.
4. Add US3 for full field-hardware coverage.
5. Add US4 for managed administration.
6. Finish with Polish and final validation.

### Parallel Team Strategy

1. One developer completes Setup + Foundational.
2. After that checkpoint:
   - Developer A takes US1.
   - Developer B takes US2.
   - Developer C takes US3.
   - Developer D takes US4 once shared management types stabilize.

---

## Notes

- `[P]` means the task can be completed in parallel because it primarily touches separate files or independent documentation.
- `[US1]` through `[US4]` map each task back to a specific user story.
- Each user story includes explicit independent test criteria and mandatory constitution validation tasks.
- All task lines follow the required checklist format: checkbox, task ID, optional `[P]`, required story label for story phases, and exact file paths.
