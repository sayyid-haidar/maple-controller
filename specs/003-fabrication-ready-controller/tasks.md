# Tasks: Fabrication-Ready Controller Hardware

**Input**: Design documents from `/specs/003-fabrication-ready-controller/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Automated test tasks are not included because the specification does not request TDD or dedicated automated tests. Constitution-mandated validation tasks are included for every user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup

**Purpose**: Align the feature artifacts with a fabrication-closure workflow so implementation can drive a real release package instead of review-only notes.

- [X] T001 Refresh the fabrication release artifact map, closure sequence, and validation workflow in `specs/003-fabrication-ready-controller/quickstart.md`
- [X] T002 Replace any optimistic fabrication-ready wording with an explicit release gate and blocker register in `specs/003-fabrication-ready-controller/plan.md`
- [X] T003 [P] Expand the feature-level signoff criteria, blocker policy, and evidence requirements in `specs/003-fabrication-ready-controller/contracts/fabrication-readiness-contract.md`

---

## Phase 2: Foundational

**Purpose**: Establish strict release-state models, fabrication blocker tracking, and board-level integration hooks that every fabrication-closure story depends on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T004 Extend fabrication status handling with `fabrication-blocked` plus approved-BOM, blocker, manufacturing, procurement, and bring-up package models in `src/lib/controller-types.ts`
- [X] T005 [P] Replace the review-era `provisionalParts` summary with a fabrication-critical closure ledger and exact connector-decision records in `src/lib/wiring-contracts.ts`
- [X] T006 [P] Align the board shell with evidence-based release state, fabrication blocker visibility, and retention-closure integration points in `src/circuits/one-door-controller.tsx`
- [X] T007 [P] Add released-part CAD model ownership and mechanically significant footprint coverage needed by fabrication-critical components in `src/lib/cad-models.ts`
- [X] T008 Capture the per-story validation matrix, release evidence ownership, and blocker-to-file traceability in `specs/003-fabrication-ready-controller/quickstart.md`

**Checkpoint**: Foundation ready. Fabrication-closure stories can now proceed.

---

## Phase 3: User Story 1 - Close Fabrication-Blocking Part Decisions (Priority: P1) 🎯 MVP

**Goal**: Convert every fabrication-critical placeholder inherited from the review-ready milestone into either an approved BOM line with exact release metadata or an explicit fabrication blocker.

**Independent Test**: Verify that the source and fabrication-readiness package show an approved or blocked state for every fabrication-critical Ethernet, relay, retention, connector, and service-access part without relying on family-only placeholders.

### Implementation for User Story 1

- [X] T009 [P] [US1] Replace review-era connector, relay, retention, and service placeholder metadata with approved-or-blocked BOM records in `src/lib/controller-types.ts`
- [X] T010 [P] [US1] Convert interface-level provisional summaries into exact part, footprint, and closure-owner records in `src/lib/wiring-contracts.ts`
- [X] T011 [P] [US1] Promote the service connector from a generic header decision to an approved recovery/programming part with release metadata in `src/components/service-connectors.tsx`
- [X] T012 [P] [US1] Promote reader-facing and supervised-input terminal families to exact approved parts or explicit blockers in `src/components/reader-interfaces.tsx` and `src/components/supervised-input-bank.tsx`
- [X] T013 [P] [US1] Close the RTC, FRAM, and backup-support part decisions with exact release metadata in `src/components/retention-support.tsx`
- [X] T014 [US1] Remove `C_EVENT_BUFFER_PLACEHOLDER` and tie the board shell to the new fabrication-closure records in `src/circuits/one-door-controller.tsx`
- [X] T015 [US1] Publish the fabrication-critical BOM ledger, unresolved blocker criteria, and closure ownership in `specs/003-fabrication-ready-controller/plan.md` and `specs/003-fabrication-ready-controller/contracts/fabrication-readiness-contract.md`

### Validation for User Story 1 (MANDATORY)

- [X] T016 [P] [US1] Run `npm run typecheck` for `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts`, `src/components/service-connectors.tsx`, `src/components/reader-interfaces.tsx`, `src/components/supervised-input-bank.tsx`, `src/components/retention-support.tsx`, and `src/circuits/one-door-controller.tsx`
- [X] T017 [P] [US1] Run `tsci check netlist` for the fabrication-critical part-closure updates rendered from `index.circuit.tsx`
- [X] T018 [US1] Run `tsci build` and `tsci snapshot` to capture the approved-versus-blocked fabrication baseline from `index.circuit.tsx`
- [X] T019 [US1] Run `tsci check placement` for retention, service, and installer-connector footprint changes in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 1 should independently prove that fabrication-critical placeholders are no longer implicit.

---

## Phase 4: User Story 2 - Lock Physical Ethernet And Lock-Output Implementations (Priority: P2)

**Goal**: Make the Ethernet entry and dry-relay lock-output regions fabrication-ready by defining exact physical parts, protection networks, and placement constraints for the highest-risk field interfaces.

**Independent Test**: Verify that the board package and rendered circuit show one approved LAN-entry implementation and one approved relay implementation, each with manufacturable footprints, protection details, and board-edge or creepage-sensitive placement assumptions.

### Implementation for User Story 2

- [X] T020 [P] [US2] Add the approved LAN-entry hardware, PoE ingress boundary, shield treatment, and exact footprint ownership in `src/components/ethernet-poe-front-end.tsx`
- [X] T021 [P] [US2] Add Ethernet board-edge keepouts, enclosure-facing notes, and placement constraints for the LAN region in `src/circuits/one-door-controller.tsx`
- [X] T022 [P] [US2] Replace placeholder relay-only passives with the approved relay device, coil-drive path, and suppression network in `src/components/relay-lock-output.tsx`
- [X] T023 [P] [US2] Align external lock-power sensing, relay-interface nets, and dry-contact boundary metadata with the final physical closure in `src/components/power-domains.tsx` and `src/lib/wiring-contracts.ts`
- [X] T024 [US2] Record exact Ethernet and relay part decisions, assembly constraints, and creepage or board-edge rules in `specs/003-fabrication-ready-controller/contracts/hardware-interface-contract.md`

### Validation for User Story 2 (MANDATORY)

- [X] T025 [P] [US2] Run `npm run typecheck` for `src/components/ethernet-poe-front-end.tsx`, `src/components/relay-lock-output.tsx`, `src/components/power-domains.tsx`, `src/lib/wiring-contracts.ts`, and `src/circuits/one-door-controller.tsx`
- [X] T026 [P] [US2] Run `tsci check netlist` for the Ethernet and relay physical-closure updates rendered from `index.circuit.tsx`
- [X] T027 [US2] Run `tsci build` and `tsci snapshot` to capture the final LAN-edge and relay-region implementation from `index.circuit.tsx`
- [X] T028 [US2] Run `tsci check placement` for Ethernet connector, relay, terminal-block, and mechanically sensitive placement changes in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 2 should independently prove the manufacturable Ethernet and relay implementation choices.

---

## Phase 5: User Story 3 - Prove Manufacturing And Procurement Readiness (Priority: P3)

**Goal**: Define the DFM, assembly, sourcing, alternate-part, and first-article bring-up evidence that turns exact part selection into a real fabrication-ready release package.

**Independent Test**: Verify that reviewers can determine manufacturability, procurement coverage, and first-article bring-up expectations for every fabrication-critical subsystem from the repository artifacts without undocumented bench knowledge.

### Implementation for User Story 3

- [X] T029 [P] [US3] Add manufacturing-readiness, procurement-readiness, and bring-up verification records for fabrication-critical subsystems in `src/lib/controller-types.ts`
- [X] T030 [P] [US3] Add sourcing paths, alternate-part treatment, lifecycle notes, and footprint-review ownership for each fabrication-critical item in `src/lib/wiring-contracts.ts`
- [X] T031 [P] [US3] Extend mechanically important Ethernet, relay, service, and terminal components with final CAD model and assembly-suitability metadata in `src/components/ethernet-poe-front-end.tsx`, `src/components/relay-lock-output.tsx`, `src/components/service-connectors.tsx`, and `src/components/supervised-input-bank.tsx`
- [X] T032 [US3] Write the manufacturing, procurement, and first-article bring-up package in `specs/003-fabrication-ready-controller/quickstart.md` and `specs/003-fabrication-ready-controller/contracts/fabrication-readiness-contract.md`
- [X] T033 [US3] Record critical sourcing risk, accepted alternates, single-source exceptions, and release acceptance criteria in `specs/003-fabrication-ready-controller/plan.md`

### Validation for User Story 3 (MANDATORY)

- [X] T034 [P] [US3] Run `npm run typecheck` for `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts`, `src/components/ethernet-poe-front-end.tsx`, `src/components/relay-lock-output.tsx`, `src/components/service-connectors.tsx`, and `src/components/supervised-input-bank.tsx`
- [X] T035 [P] [US3] Run `tsci check netlist` for the manufacturing and procurement readiness updates rendered from `index.circuit.tsx`
- [X] T036 [US3] Run `tsci build` and `tsci snapshot` to capture the final first-article release package from `index.circuit.tsx`
- [X] T037 [US3] Run `tsci check placement` for assembly-sensitive Ethernet, relay, service, and terminal footprints in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 3 should independently prove that the board can be ordered, assembled, and brought up with explicit evidence.

---

## Phase 6: User Story 4 - Preserve The Existing Controller Contracts While Finalizing Parts (Priority: P4)

**Goal**: Reconcile the final fabrication choices with the accepted 001 and 002 architecture so exact part lock-in does not silently change power boundaries, field interfaces, retention behavior, or service separation.

**Independent Test**: Verify that the final fabrication package preserves PoE-fed logic, the external dry-relay lock boundary, OSDP plus Wiegand support, retained event logging, and separate service access while making any remaining blockers explicit.

### Implementation for User Story 4

- [X] T038 [P] [US4] Reconcile final Ethernet, relay, retention, and connector decisions against the preserved architecture and interface models in `src/lib/controller-types.ts` and `src/lib/wiring-contracts.ts`
- [X] T039 [P] [US4] Update subsystem integration so final part lock-in preserves PoE-versus-lock separation, reader mode support, retention behavior, and service isolation in `src/circuits/one-door-controller.tsx`, `src/components/ethernet-poe-front-end.tsx`, `src/components/relay-lock-output.tsx`, `src/components/retention-support.tsx`, and `src/components/service-connectors.tsx`
- [X] T040 [US4] Publish the final contract-preservation statements and any explicit scope-change notes in `specs/003-fabrication-ready-controller/contracts/hardware-interface-contract.md` and `specs/003-fabrication-ready-controller/contracts/operational-behavior-contract.md`
- [X] T041 [US4] Set the final board release state and explicit blocker handling rules in `src/lib/controller-types.ts` and `specs/003-fabrication-ready-controller/plan.md`

### Validation for User Story 4 (MANDATORY)

- [X] T042 [P] [US4] Run `npm run typecheck` for `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts`, `src/circuits/one-door-controller.tsx`, `src/components/ethernet-poe-front-end.tsx`, `src/components/relay-lock-output.tsx`, `src/components/retention-support.tsx`, and `src/components/service-connectors.tsx`
- [X] T043 [P] [US4] Run `tsci check netlist` for the final fabrication-ready contract-preservation candidate rendered from `index.circuit.tsx`
- [X] T044 [US4] Run `tsci build` and `tsci snapshot` to capture the fully reconciled fabrication-ready candidate from `index.circuit.tsx`
- [X] T045 [US4] Run `tsci check placement` for the final Ethernet, relay, retention, service, and installer-interface placement state in `src/circuits/one-door-controller.tsx`

**Checkpoint**: User Story 4 should independently prove that fabrication closure preserved the accepted controller contracts.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Remove stale review-ready assumptions, finalize handoff artifacts, and run full-project validation for the fabrication-ready candidate.

- [X] T046 [P] Review component consistency and remove stale review-ready or placeholder wording across `src/components/*.tsx`, `src/lib/*.ts`, and `src/circuits/one-door-controller.tsx`
- [X] T047 [P] Finalize the feature handoff, artifact locations, blocker summary, and release workflow in `specs/003-fabrication-ready-controller/quickstart.md` and `specs/003-fabrication-ready-controller/plan.md`
- [X] T048 Re-run `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` for the complete fabrication-ready candidate rendered from `index.circuit.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies; can start immediately.
- Foundational (Phase 2): Depends on Setup; blocks all user stories.
- User Story 1 (Phase 3): Depends on Foundational; establishes the approved-versus-blocked release model required by all later stories.
- User Story 2 (Phase 4): Depends on User Story 1 because Ethernet and relay physical lock-in must land on the finalized fabrication ledger.
- User Story 3 (Phase 5): Depends on User Stories 1 and 2 because manufacturing and procurement evidence must reference the final critical-part and physical-implementation choices.
- User Story 4 (Phase 6): Depends on User Stories 1 through 3 so contract-preservation review uses the actual release candidate.
- Polish (Phase 7): Depends on all desired user stories being complete.

### User Story Dependencies

- User Story 1 (P1): Starts after Foundational; no dependency on later stories.
- User Story 2 (P2): Starts after User Story 1; reuses the fabrication-closure ledger and board shell but remains independently testable through Ethernet and relay artifacts.
- User Story 3 (P3): Starts after User Stories 1 and 2; remains independently testable through manufacturing, procurement, and bring-up artifacts.
- User Story 4 (P4): Starts after User Stories 1 through 3; remains independently testable through contract-preservation and final release-state artifacts.

### Within Each User Story

- Update typed release-state models and interface ledgers before dependent board integration.
- Complete physical component closure before story-level documentation and signoff notes.
- Run the mandatory `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` tasks after the story implementation tasks are complete.

### Suggested Completion Order

- Single-developer flow: Phase 1 → Phase 2 → US1 → US2 → US3 → US4 → Polish.
- Fabrication-closure flow: finish the release ledger first, then lock Ethernet and relay, then complete manufacturing and procurement evidence, then perform contract-preservation reconciliation.

---

## Parallel Opportunities

- T003 can run in parallel with T001-T002.
- T005-T007 can run in parallel after T004 defines the release-state model.
- In US1, T009-T013 can run in parallel before T014-T015.
- In US2, T020-T023 can run in parallel before T024.
- In US3, T029-T031 can run in parallel before T032-T033.
- In US4, T038-T039 can run in parallel before T040-T041.
- T046 and T047 can run in parallel before T048.

---

## Parallel Example: User Story 1

```bash
# Parallelizable implementation work for US1
T009 Replace release metadata in src/lib/controller-types.ts
T010 Convert interface closure records in src/lib/wiring-contracts.ts
T011 Promote the service connector decision in src/components/service-connectors.tsx
T012 Promote installer-facing connector decisions in src/components/reader-interfaces.tsx and src/components/supervised-input-bank.tsx
T013 Close RTC, FRAM, and backup-support part decisions in src/components/retention-support.tsx
```

## Parallel Example: User Story 2

```bash
# Parallelizable implementation work for US2
T020 Add the approved LAN-entry hardware in src/components/ethernet-poe-front-end.tsx
T021 Add Ethernet board-edge constraints in src/circuits/one-door-controller.tsx
T022 Replace placeholder relay-only passives with the approved relay path in src/components/relay-lock-output.tsx
T023 Align lock-domain sensing and relay metadata in src/components/power-domains.tsx and src/lib/wiring-contracts.ts
```

## Parallel Example: User Story 3

```bash
# Parallelizable implementation work for US3
T029 Add manufacturing and procurement models in src/lib/controller-types.ts
T030 Add sourcing and alternate-part treatment in src/lib/wiring-contracts.ts
T031 Extend CAD and assembly metadata in src/components/ethernet-poe-front-end.tsx, src/components/relay-lock-output.tsx, src/components/service-connectors.tsx, and src/components/supervised-input-bank.tsx
```

## Parallel Example: User Story 4

```bash
# Parallelizable implementation work for US4
T038 Reconcile final part decisions against architectural models in src/lib/controller-types.ts and src/lib/wiring-contracts.ts
T039 Update subsystem integration to preserve accepted contracts in src/circuits/one-door-controller.tsx and the affected component modules
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate User Story 1 with T016-T019 before moving on.

### Incremental Delivery

1. Finish Setup and Foundational once.
2. Deliver User Story 1 as the fabrication-critical BOM and blocker closure baseline.
3. Deliver User Story 2 for Ethernet and relay physical closure.
4. Deliver User Story 3 for manufacturing, procurement, and bring-up evidence.
5. Deliver User Story 4 for contract-preservation and final release-state reconciliation.
6. Finish with Phase 7 polish and full validation.

### Parallel Team Strategy

1. One developer completes Setup and Foundational.
2. After User Story 1 is complete:
   - Developer A takes Ethernet closure in User Story 2.
   - Developer B takes relay and lock-domain closure in User Story 2.
   - Developer C prepares manufacturing and procurement package tasks in User Story 3 once the physical part choices stabilize.
3. Merge those results before the shared contract-preservation pass in User Story 4.

---

## Notes

- `[P]` means the task can be completed in parallel because it primarily touches separate files or independent release artifacts.
- `[US1]` through `[US4]` map each task back to a specific user story for traceability.
- Each user story includes explicit independent test criteria and mandatory tscircuit validation tasks.
- All task lines follow the required checklist format: checkbox, task ID, optional `[P]`, required story label for story phases, and exact file paths.