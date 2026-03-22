<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- [PRINCIPLE_1_NAME] -> I. Circuit Intent Before Convenience
- [PRINCIPLE_2_NAME] -> II. Pure React-Style Circuit Components
- [PRINCIPLE_3_NAME] -> III. Strict TypeScript as Design Contract
- [PRINCIPLE_4_NAME] -> IV. Verification Before Share or Merge
- [PRINCIPLE_5_NAME] -> V. Manufacturable, Deterministic Outputs
Added sections:
- Project Constraints
- Workflow & Review
Removed sections:
- None
Templates requiring updates:
- ✅ /Users/sayyidhaidar/Developer/Personals/maple-tscircuit/.specify/templates/plan-template.md
- ✅ /Users/sayyidhaidar/Developer/Personals/maple-tscircuit/.specify/templates/spec-template.md
- ✅ /Users/sayyidhaidar/Developer/Personals/maple-tscircuit/.specify/templates/tasks-template.md
- ✅ Reviewed /Users/sayyidhaidar/Developer/Personals/maple-tscircuit/.specify/templates/commands/*.md (directory not present; no update needed)
Follow-up TODOs:
- None
-->

# maple-tscircuit Constitution

## Core Principles

### I. Circuit Intent Before Convenience

Every feature and refactor MUST preserve electrical intent before optimizing code
brevity, visual polish, or routing aesthetics. Component values, named nets,
footprints, polarity, connectors, and mechanical constraints MUST be explicit in
the spec, plan, or code that introduces them. Placeholder components or guessed
footprints MAY be used only when clearly marked as provisional and MUST block
fabrication-ready claims until replaced.

Rationale: hardware mistakes cost board spins, money, and time; explicit intent
is cheaper than debugging manufactured defects.

### II. Pure React-Style Circuit Components

tscircuit modules MUST be expressed as pure TypeScript/TSX components or helpers
whose output is derived only from explicit inputs. Render logic MUST NOT mutate
shared state, depend on evaluation order, or hide side effects inside component
execution. Repeated electrical patterns or mixed mechanical/electrical concerns
SHOULD be extracted into reusable subcircuits or helpers with clear props.

Rationale: tscircuit follows React's component model; purity and composition make
generated boards predictable, reviewable, and reusable.

### III. Strict TypeScript as Design Contract

The repository MUST keep TypeScript strict mode enabled. New code MUST avoid
implicit `any`, broad type assertions, and unchecked non-null assertions unless a
review note documents why they are unavoidable. Component props, helpers, and
configuration objects MUST model optional values, variants, and units explicitly.
Stable domain literals such as net names, package options, and variant keys
SHOULD use unions, interfaces, or `as const` rather than free-form strings.

Rationale: in a circuit codebase, loose typing hides invalid assumptions that can
become broken nets, wrong parts, or invalid fabrication outputs.

### IV. Verification Before Share or Merge

Every non-trivial circuit change MUST define and run the minimum verification set:
`npm run typecheck`, `tsci check netlist`, `tsci build`, and `tsci snapshot` or
equivalent visual proof when placement or routing changes. `tsci check placement`
MUST be run for board-outline, footprint, or placement changes and before any
fabrication-oriented handoff. Exploratory work MAY tolerate temporary DRC noise,
but unresolved netlist, placement, or build failures MUST block merge.

Rationale: circuit quality is established by executable validation and rendered
artifacts, not by visual inspection of TSX alone.

### V. Manufacturable, Deterministic Outputs

Any work intended for fabrication MUST document board outline, layer count,
critical footprints, connectors, trace-width assumptions, and assembly
constraints. Authors MUST prefer deterministic layouts and bounded autorouter
choices; if routing is intentionally deferred, the plan MUST state that clearly.
`tsci push`, fabrication export, or order placement MUST NOT occur without
explicit user approval.

Rationale: manufacturability is a product requirement, and deterministic outputs
reduce review ambiguity and accidental hardware risk.

## Project Constraints

This repository is a tscircuit component package centered on TypeScript/TSX
entrypoints and `tsci` workflows. Repository changes MUST prefer official
tscircuit primitives and documented CLI behavior over undocumented props or
invented flags. The current baseline toolchain is TypeScript 5.x with strict
mode, `tscircuit`, React-style JSX, and the package scripts `dev`, `build`,
`snapshot`, `snapshot:update`, `start`, and `typecheck`.

Repository structure MAY evolve beyond a single `index.circuit.tsx`, but new
folders MUST reduce complexity, improve reuse, or isolate mechanical/electrical
domains; they MUST NOT be added as organizational overhead. When a feature adds
new dependencies, the plan MUST justify why built-in tscircuit capabilities or
simple helpers are insufficient.

## Workflow & Review

Specs, plans, and tasks for this repository MUST record the affected nets,
components, footprints, board constraints, and validation commands for each
feature. Each user story MUST be independently verifiable through commands,
snapshots, or clearly defined review artifacts.

Reviews MUST check:

- circuit intent and provisional parts are documented
- render logic remains pure and reusable where repetition exists
- strict TypeScript guarantees are preserved
- required `tsci` and TypeScript verification steps are present and passing
- fabrication readiness is either demonstrated or explicitly declared out of
  scope

Before a change is described as fabrication-ready, the reviewer MUST confirm that
placement, connectivity, and manufacturability assumptions are captured in the
specification or handoff notes.

## Governance

This constitution supersedes local habits and informal workflow preferences for
this repository. Every plan, task list, implementation, and review MUST include a
constitution compliance check against these principles.

Amendments MUST be made by updating this file together with any affected Speckit
templates in the same change. Amendment proposals MUST include a short rationale,
the expected impact on delivery workflow, and any migration steps needed for
open work.

Versioning policy for this constitution follows semantic versioning:

- MAJOR: remove or materially redefine a principle or governance rule
- MINOR: add a new principle, mandatory section, or materially stronger rule
- PATCH: clarifications, wording improvements, and non-semantic refinements

Compliance review expectations:

- `/speckit.plan` outputs MUST pass the Constitution Check before research is
  considered complete
- `/speckit.tasks` outputs MUST include mandatory validation work required by
  Principle IV
- code review MUST reject undocumented exceptions to Principles I through V

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
