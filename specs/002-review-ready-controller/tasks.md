# Tasks: Review-Ready Controller Hardware

**Input**: Design documents from `/specs/002-review-ready-controller/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `checklists/requirements.md`

**Tests**: Automated test tasks are not included because the specification does not request TDD or dedicated automated tests. Constitution-mandated validation tasks are included for every user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup

**Purpose**: Replace placeholder planning content with concrete repo paths and create the review-artifact documents that the implementation work will fill.

- [x] T001 Replace the placeholder feature summary, source-tree notes, and structure decision in `specs/002-review-ready-controller/plan.md`
- [x] T002 Create the review handoff, validation workflow, and artifact checklist in `specs/002-review-ready-controller/quickstart.md`
- [x] T003 [P] Create the hardware review contract for controller, Ethernet, reader, and connector assumptions in `specs/002-review-ready-controller/contracts/hardware-interface-contract.md`
- [x] T004 [P] Create the operational review contract for power-fail, retention, and service workflows in `specs/002-review-ready-controller/contracts/operational-behavior-contract.md`

---

## Phase 2: Foundational

**Purpose**: Establish shared types, named nets, reusable subcircuit files, and board-level integration zones that every story depends on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T005 Define controller-core placeholder, Ethernet strategy, retention, connector-family, and readiness-status types in `src/lib/controller-types.ts`
- [x] T006 [P] Define shared nets and interface contracts for controller-core, RTC, event store, RS-485, service access, and installer connectors in `src/lib/wiring-contracts.ts`
- [x] T007 [P] Create the controller-core subcircuit scaffold in `src/components/controller-core.tsx`
- [x] T008 [P] Create the RTC and event-retention subcircuit scaffold in `src/components/retention-support.tsx`
- [x] T009 [P] Create the service and recovery connector subcircuit scaffold in `src/components/service-connectors.tsx`
- [x] T010 Update the board shell to reserve placement zones and integration hooks for controller-core, retention, and service-access blocks in `src/circuits/one-door-controller.tsx`
- [x] T011 [P] Record the per-story validation matrix and expected review artifacts in `specs/002-review-ready-controller/quickstart.md`
- [x] T012 Capture shared placeholder-device, footprint, and sourcing assumptions in `specs/002-review-ready-controller/plan.md`

**Checkpoint**: Foundation ready. User story implementation can now proceed.

---

## Phase 3: User Story 1 - Lock In The Controller Core Direction (Priority: P1) 🎯 MVP

**Goal**: Commit the board to one reviewable controller-core direction, including the Ethernet MAC/PHY boundary, service signals, and clock/reset assumptions.

**Independent Test**: Verify that the review package and snapshots show one controller-core placeholder direction, one Ethernet partition strategy, named service nets, and explicit reset/clock dependencies with no unresolved controller-role ambiguity.

### Implementation for User Story 1

- [x] T013 [P] [US1] Implement the controller-core placeholder block with boot, reset, clock, and peripheral interface nets in `src/components/controller-core.tsx`
- [x] T014 [P] [US1] Update the Ethernet front end with the chosen MAC/PHY partition, magnetics boundary, and controller-facing LAN signals in `src/components/ethernet-poe-front-end.tsx`
- [x] T015 [US1] Integrate the controller-core block, Ethernet boundary, and service-signal breakout into `src/circuits/one-door-controller.tsx`
- [x] T016 [US1] Document the selected controller-core direction, clock/reset assumptions, and LAN boundary in `specs/002-review-ready-controller/contracts/hardware-interface-contract.md`
- [x] T017 [US1] Update the controller-core readiness statement and review package checklist in `specs/002-review-ready-controller/quickstart.md`

### Validation for User Story 1 (MANDATORY)

- [x] T018 [P] [US1] Run `npm run typecheck` for `index.circuit.tsx`, `src/circuits/one-door-controller.tsx`, `src/components/controller-core.tsx`, `src/components/ethernet-poe-front-end.tsx`, `src/components/service-connectors.tsx`, `src/lib/controller-types.ts`, and `src/lib/wiring-contracts.ts`
- [x] T019 [P] [US1] Run `tsci check netlist` for the controller-core and Ethernet updates rendered from `index.circuit.tsx`
- [x] T020 [US1] Run `tsci build` and `tsci snapshot` to capture the reviewable controller-core direction from `index.circuit.tsx`
- [x] T021 [US1] Run `tsci check placement` for controller, Ethernet, and service-access placement changes in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 1 should independently prove the chosen controller-core and Ethernet direction.

---

## Phase 4: User Story 2 - Make The Power And Retention Chain Reviewable (Priority: P2)

**Goal**: Make the PoE-fed logic power path, RTC path, and retained event-store path concrete enough for review while keeping lock power external to PoE-fed logic.

**Independent Test**: Verify that the design package shows a complete PoE-to-logic chain, one RTC path, one event-store path, and an explicit architectural separation between PoE-fed logic power and external dry-relay lock power.

### Implementation for User Story 2

- [x] T022 [P] [US2] Refine the PoE-fed conversion chain and named logic-network rails in `src/components/power-domains.tsx`
- [x] T023 [P] [US2] Implement the RTC, backup, and nonvolatile event-store placeholder paths in `src/components/retention-support.tsx`
- [x] T024 [US2] Integrate retention, power-fail, and PoE-only logic power separation into `src/circuits/one-door-controller.tsx`
- [x] T025 [US2] Document PoE-to-logic rails, RTC retention, event buffering, and outage behavior in `specs/002-review-ready-controller/contracts/operational-behavior-contract.md`
- [x] T026 [US2] Update review-ready versus provisional power and retention assumptions in `specs/002-review-ready-controller/plan.md`

### Validation for User Story 2 (MANDATORY)

- [x] T027 [P] [US2] Run `npm run typecheck` for `src/circuits/one-door-controller.tsx`, `src/components/power-domains.tsx`, `src/components/retention-support.tsx`, `src/lib/controller-types.ts`, and `src/lib/wiring-contracts.ts`
- [x] T028 [P] [US2] Run `tsci check netlist` for the power and retention additions rendered from `index.circuit.tsx`
- [x] T029 [US2] Run `tsci build` and `tsci snapshot` to capture the PoE, RTC, and event-store review package from `index.circuit.tsx`
- [x] T030 [US2] Run `tsci check placement` for power-chain, RTC, and retained-storage placement changes in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 2 should independently prove reviewable power and retention behavior.

---

## Phase 5: User Story 3 - Make Reader And Service Interfaces Concrete (Priority: P3)

**Goal**: Define the RS-485/OSDP path, preserve the Wiegand path, and make the service/debug access strategy concrete for bring-up and recovery.

**Independent Test**: Verify that the board package names one RS-485 transceiver path for OSDP, preserves a separate Wiegand path, and exposes a distinct service connector with boot, reset, console, or programming signals.

### Implementation for User Story 3

- [x] T031 [P] [US3] Implement the concrete half-duplex RS-485 OSDP path, including controller-side signals, biasing, termination, and protection assumptions in `src/components/reader-interfaces.tsx`
- [x] T032 [P] [US3] Implement the service and recovery connector strategy with boot, reset, console, and programming access signals in `src/components/service-connectors.tsx`
- [x] T033 [US3] Update controller-side signal breakout for reader, RS-485, Wiegand, and service-access nets in `src/components/controller-core.tsx`
- [x] T034 [US3] Integrate the reader-interface and service-access blocks into `src/circuits/one-door-controller.tsx`
- [x] T035 [US3] Document RS-485, Wiegand, and service-access expectations in `specs/002-review-ready-controller/contracts/hardware-interface-contract.md`
- [x] T036 [US3] Update commissioning, firmware recovery, and field-diagnostics workflow notes in `specs/002-review-ready-controller/quickstart.md`

### Validation for User Story 3 (MANDATORY)

- [x] T037 [P] [US3] Run `npm run typecheck` for `src/circuits/one-door-controller.tsx`, `src/components/controller-core.tsx`, `src/components/reader-interfaces.tsx`, `src/components/service-connectors.tsx`, and `src/lib/wiring-contracts.ts`
- [x] T038 [P] [US3] Run `tsci check netlist` for the RS-485, Wiegand, and service-access updates rendered from `index.circuit.tsx`
- [x] T039 [US3] Run `tsci build` and `tsci snapshot` to capture the reader and service interface review package from `index.circuit.tsx`
- [x] T040 [US3] Run `tsci check placement` for reader-port, transceiver, and service-connector placement changes in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 3 should independently prove the reader and service interface strategy.

---

## Phase 6: User Story 4 - Standardize Installer-Facing Wiring (Priority: P4)

**Goal**: Commit the design to concrete connector-family assumptions for field wiring while keeping service access distinct and explicitly marking any remaining provisional selections.

**Independent Test**: Verify that each external field interface maps to a named connector family, that service access is distinct from installer wiring, and that unresolved connector or footprint risks are explicitly called out.

### Implementation for User Story 4

- [x] T041 [P] [US4] Refine the dry-relay field connector family and external lock-power monitoring assumptions in `src/components/relay-lock-output.tsx`
- [x] T042 [P] [US4] Refine installer-facing connector families for door contact, request-to-exit, tamper, and auxiliary monitoring in `src/components/supervised-input-bank.tsx`
- [x] T043 [P] [US4] Assign concrete connector-family mappings for Ethernet entry, reader wiring, service access, and field I/O in `src/lib/wiring-contracts.ts`
- [x] T044 [US4] Integrate connector zoning, silkscreen naming intent, and service-versus-installer separation in `src/circuits/one-door-controller.tsx`
- [x] T045 [US4] Record connector-family decisions, provisional footprint risks, and unresolved sourcing concerns in `specs/002-review-ready-controller/plan.md`
- [x] T046 [US4] Publish the installer-facing interface map and distinct service-access mapping in `specs/002-review-ready-controller/quickstart.md`

### Validation for User Story 4 (MANDATORY)

- [x] T047 [P] [US4] Run `npm run typecheck` for `src/circuits/one-door-controller.tsx`, `src/components/relay-lock-output.tsx`, `src/components/supervised-input-bank.tsx`, `src/components/service-connectors.tsx`, and `src/lib/wiring-contracts.ts`
- [x] T048 [P] [US4] Run `tsci check netlist` for the installer-facing connector updates rendered from `index.circuit.tsx`
- [x] T049 [US4] Run `tsci build` and `tsci snapshot` to capture the installer-wiring review package from `index.circuit.tsx`
- [x] T050 [US4] Run `tsci check placement` for terminal-block, relay, reader, and service-connector placement changes in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 4 should independently prove the installer-facing wiring standardization.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize readiness reporting, review artifacts, and full-project validation after all desired stories are complete.

- [x] T051 [P] Review circuit purity and strict typing across `index.circuit.tsx`, `src/circuits/one-door-controller.tsx`, `src/components/*.tsx`, and `src/lib/*.ts`
- [x] T052 [P] Finalize the feature readiness summary, review artifacts, and open-risk register in `specs/002-review-ready-controller/plan.md` and `specs/002-review-ready-controller/quickstart.md`
- [x] T053 Re-run `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` for the complete feature implemented from `index.circuit.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies; can start immediately.
- Foundational (Phase 2): Depends on Setup; blocks all user stories.
- User Story 1 (Phase 3): Depends on Foundational; establishes the controller-core direction required by all later stories.
- User Stories 2 and 3 (Phases 4 and 5): Depend on User Story 1 because the power, retention, reader, and service strategies all attach to the chosen controller-core and Ethernet partition.
- User Story 4 (Phase 6): Depends on User Stories 2 and 3 so connector-family choices reflect the bounded power, reader, and service interfaces.
- Polish (Phase 7): Depends on all desired user stories being complete.

### User Story Dependencies

- User Story 1 (P1): Starts after Foundational; no dependency on other stories.
- User Story 2 (P2): Starts after User Story 1; reuses the controller-core and Ethernet assumptions but remains independently testable through power and retention artifacts.
- User Story 3 (P3): Starts after User Story 1; reuses the controller-core signal map but remains independently testable through reader and service-interface artifacts.
- User Story 4 (P4): Starts after User Stories 2 and 3; consolidates connector-family decisions after power and interface assumptions are stable.

### Within Each User Story

- Implement shared subcircuits and contracts before board-level integration.
- Complete board-level integration before story documentation and readiness updates.
- Run the mandatory `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` tasks after the story implementation is complete.

### Suggested Completion Order

- Single-developer flow: Phase 1 → Phase 2 → US1 → US2 → US3 → US4 → Polish.
- Parallel flow after US1: US2 and US3 can proceed in parallel, then converge on US4.

---

## Parallel Opportunities

- T003 and T004 can run in parallel after T001 starts shaping the feature docs.
- T006 through T009 can run in parallel after T005 establishes the shared review model.
- In US1, T013 and T014 can run in parallel before T015.
- In US2, T022 and T023 can run in parallel before T024.
- In US3, T031 and T032 can run in parallel before T033-T034.
- In US4, T041 through T043 can run in parallel before T044.
- T051 and T052 can run in parallel before T053.

---

## Parallel Example: User Story 1

```bash
# Parallelizable implementation work for US1
T013 Implement the controller-core placeholder block in src/components/controller-core.tsx
T014 Update the Ethernet front end with the chosen MAC/PHY partition in src/components/ethernet-poe-front-end.tsx
```

## Parallel Example: User Story 2

```bash
# Parallelizable implementation work for US2
T022 Refine the PoE-fed conversion chain in src/components/power-domains.tsx
T023 Implement RTC and event-retention placeholder paths in src/components/retention-support.tsx
```

## Parallel Example: User Story 3

```bash
# Parallelizable implementation work for US3
T031 Implement the RS-485 OSDP path in src/components/reader-interfaces.tsx
T032 Implement the service and recovery connector strategy in src/components/service-connectors.tsx
```

## Parallel Example: User Story 4

```bash
# Parallelizable implementation work for US4
T041 Refine the dry-relay field connector family in src/components/relay-lock-output.tsx
T042 Refine installer-facing connector families in src/components/supervised-input-bank.tsx
T043 Assign concrete connector-family mappings in src/lib/wiring-contracts.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate User Story 1 with T018 through T021 before moving on.

### Incremental Delivery

1. Finish Setup and Foundational once.
2. Deliver User Story 1 as the controller-core and Ethernet decision package.
3. Deliver User Story 2 for power and retention review.
4. Deliver User Story 3 for reader and service-interface review.
5. Deliver User Story 4 for installer-wiring standardization.
6. Finish with Phase 7 polish and full validation.

### Parallel Team Strategy

1. One developer completes Setup and Foundational.
2. After User Story 1 is complete:
   - Developer A takes User Story 2.
   - Developer B takes User Story 3.
3. Merge those results before a shared pass on User Story 4 and Phase 7.

---

## Notes

- `[P]` means the task can be completed in parallel because it primarily touches separate files or independent documentation.
- `[US1]` through `[US4]` map each task back to a specific user story for traceability.
- Each user story includes explicit independent test criteria and mandatory tscircuit validation tasks.
- All task lines follow the required checklist format: checkbox, task ID, optional `[P]`, required story label for story phases, and exact file paths.