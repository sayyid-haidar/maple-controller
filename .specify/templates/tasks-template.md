---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated test tasks are OPTIONAL and only included when explicitly requested in the feature specification. Validation tasks required by the constitution are NOT optional: include the relevant `tsci` and TypeScript verification steps for every story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Current repository**: `index.circuit.tsx` at root, with optional `src/` and `tests/`
- **Expanded circuit package**: `src/circuits/`, `src/components/`, `src/lib/`
- **Validation artifacts**: `specs/[###-feature]/`, optional snapshot outputs or generated review assets
- Use the real paths from `plan.md`; do not invent backend/frontend structure unless the plan explicitly introduces it.

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create or confirm the circuit file structure described in plan.md
- [ ] T002 Confirm required dependencies, footprints, and tscircuit packages for the feature
- [ ] T003 [P] Document required validation commands and artifact locations for the feature

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Establish shared nets, board constraints, and reusable subcircuits required across stories
- [ ] T005 [P] Define strict TypeScript interfaces/types for new feature inputs and configuration
- [ ] T006 [P] Prepare provisional component or footprint decisions and mark any unresolved fabrication blockers
- [ ] T007 Configure any feature-specific validation helpers, scripts, or snapshot baselines
- [ ] T008 Record manufacturability assumptions that all stories depend on

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Validation for User Story 1 (MANDATORY) ⚠️

- [ ] T010 [P] [US1] Run `npm run typecheck` and capture any required TypeScript contract updates
- [ ] T011 [P] [US1] Run `tsci check netlist` for the affected circuit paths
- [ ] T012 [US1] Run `tsci build` and `tsci snapshot` for the user-visible circuit outcome
- [ ] T013 [US1] Run `tsci check placement` if board outline, footprint, or placement changed

### Tests for User Story 1 (OPTIONAL - only if tests requested)

- [ ] T014 [P] [US1] Add automated test coverage requested by the spec

### Implementation for User Story 1

- [ ] T015 [P] [US1] Implement or update circuit elements in `index.circuit.tsx` or the planned `src/` path
- [ ] T016 [P] [US1] Add or extract reusable subcircuit/helpers for repeated circuit logic
- [ ] T017 [US1] Wire nets, placement props, and footprint selections for the story outcome
- [ ] T018 [US1] Document provisional parts, fabrication blockers, or review notes introduced by this story

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Validation for User Story 2 (MANDATORY)

- [ ] T019 [P] [US2] Run the required `tsci` and TypeScript validation commands for the changed circuit scope

### Tests for User Story 2 (OPTIONAL - only if tests requested)

- [ ] T020 [P] [US2] Add automated test coverage requested by the spec

### Implementation for User Story 2

- [ ] T021 [P] [US2] Implement the circuit/subcircuit changes in the planned TSX files
- [ ] T022 [US2] Integrate with shared nets, constraints, and subcircuits from earlier phases
- [ ] T023 [US2] Update snapshots, notes, and fabrication-readiness status as needed

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Validation for User Story 3 (MANDATORY)

- [ ] T024 [P] [US3] Run the required `tsci` and TypeScript validation commands for the changed circuit scope

### Tests for User Story 3 (OPTIONAL - only if tests requested)

- [ ] T025 [P] [US3] Add automated test coverage requested by the spec

### Implementation for User Story 3

- [ ] T026 [P] [US3] Implement the circuit/subcircuit changes in the planned TSX files
- [ ] T027 [US3] Integrate with shared nets, constraints, and subcircuits from earlier phases
- [ ] T028 [US3] Update snapshots, notes, and fabrication-readiness status as needed

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Review circuit purity, type contracts, and directory structure for unnecessary complexity
- [ ] TXXX [P] Additional automated tests (if requested)
- [ ] TXXX Validate fabrication readiness statement, export assumptions, and reviewer handoff notes
- [ ] TXXX Re-run final `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` if applicable

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Mandatory validation tasks MUST be present for each story
- Optional automated tests, when requested, SHOULD be added before implementation
- Shared types and constraints before dependent circuit implementation
- Core circuit implementation before integration and snapshot refresh
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Validation commands that touch different artifacts can run in parallel when safe
- Independent circuit helpers within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch independent validation work for User Story 1 together:
Task: "Run npm run typecheck and capture any required TypeScript contract updates"
Task: "Run tsci check netlist for the affected circuit paths"

# Launch independent circuit implementation tasks together:
Task: "Implement or update circuit elements in index.circuit.tsx or the planned src/ path"
Task: "Add or extract reusable subcircuit/helpers for repeated circuit logic"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Required validation tasks are part of the definition of done, even when automated tests are not requested
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, undocumented provisional parts, and cross-story dependencies that break independence
