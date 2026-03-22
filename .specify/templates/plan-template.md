# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x with TSX (`strict: true`)  
**Primary Dependencies**: `tscircuit`, `typescript`, React JSX runtime types  
**Storage**: N/A  
**Testing**: `npm run typecheck`, `tsci check netlist`, `tsci check placement` (when applicable), `tsci build`, `tsci snapshot`  
**Target Platform**: tscircuit CLI, web preview, and PCB fabrication outputs
**Project Type**: tscircuit component/package  
**Performance Goals**: Fast enough iteration for local circuit editing; minimize avoidable autorouting/rebuild churn  
**Constraints**: Preserve circuit intent, keep render logic pure, and document manufacturability assumptions  
**Scale/Scope**: Small-to-medium PCB/subcircuit features within a single package repository

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Circuit intent is explicit: affected nets, components, footprints, polarity, and mechanical constraints are documented.
- [ ] Render logic remains pure and composable: no hidden side effects in TSX, and repeated circuit patterns have an extraction plan.
- [ ] Type contracts are explicit: `strict` assumptions hold, and any `any`, type assertions, or non-null assertions are justified.
- [ ] Verification plan includes `npm run typecheck`, `tsci check netlist`, `tsci build`, and `tsci snapshot`; add `tsci check placement` for placement, outline, or footprint changes.
- [ ] Manufacturability assumptions are captured: board outline, layer count, trace width/clearance expectations, critical footprints/connectors, and fabrication readiness status.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
index.circuit.tsx          # Current package entrypoint for the primary circuit
src/                       # Optional for extracted subcircuits/helpers as complexity grows
├── circuits/
├── components/
└── lib/

tests/                     # Optional automated tests when explicitly requested
artifacts/                 # Optional generated validation assets when checked in by policy
specs/[###-feature]/
```

**Structure Decision**: Keep the existing root entrypoint unless feature scope
justifies extraction into `src/circuits/`, `src/components/`, or `src/lib/`.
Document every new directory and why it reduces circuit complexity.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ----------------------------------- |
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
