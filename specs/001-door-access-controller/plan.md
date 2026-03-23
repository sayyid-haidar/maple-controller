# Implementation Plan: One-Door Access Controller

**Branch**: `001-door-access-controller` | **Date**: 2026-03-23 | **Spec**: [/Users/sayyidhaidar/Developer/Personals/maple-tscircuit/specs/001-door-access-controller/spec.md](/Users/sayyidhaidar/Developer/Personals/maple-tscircuit/specs/001-door-access-controller/spec.md)
**Input**: Feature specification from `/specs/001-door-access-controller/spec.md`

## Summary

Design a one-door LAN access controller PCB in tscircuit with PoE-powered logic,
a separate external 12V/24V lock domain switched by a dry relay, dual OSDP and
Wiegand reader support, supervised installer-facing inputs, and local event
buffering for centrally managed operation with offline fallback.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x with TSX (`strict: true`)  
**Primary Dependencies**: `tscircuit`, `typescript`, React JSX runtime types  
**Storage**: On-board nonvolatile event storage for local buffering; no repository-side data store  
**Testing**: `npm run typecheck`, `tsci check netlist`, `tsci check placement` (when applicable), `tsci build`, `tsci snapshot`  
**Target Platform**: 4-layer access-controller PCB modeled in tscircuit CLI with fabrication-ready outputs
**Project Type**: tscircuit hardware controller package  
**Performance Goals**: <250ms local door-decision path from valid reader/input event to relay action; buffer at least 10,000 offline events; keep planning assumptions within 10/100 Ethernet bandwidth and PoE logic power budget  
**Constraints**: Preserve circuit intent, keep render logic pure, use PoE only for controller logic/networking, use external 12V/24V lock power via dry relay, document surge/isolation boundaries, and avoid proprietary schematic reuse  
**Scale/Scope**: One physical door, one active controller board variant, one lock path, one door-state path, one exit path, one tamper path, and installer-facing support for both OSDP/RS-485 and Wiegand reader interfaces

## Implementation Baseline

- **Current fabrication status**: exploratory
- **Current implementation scope**: full exploratory shell for US1-US4 with
  modular subsystem placeholders, typed management/service models, and explicit
  review-visible field/status paths
- **Validation baseline**: `npm run typecheck`, `tsci check netlist`,
  `tsci build`, `tsci snapshot`, and `tsci check placement` after placement or
  outline changes

## Initial Blockers And Provisional Decisions

- RJ45 magjack and Ethernet magnetics footprint are still provisional
- PoE PD controller and downstream regulator chain are represented as typed and
  placement placeholders pending concrete part selection
- Dry relay package, contact rating, and suppression topology remain provisional
- Terminal block families for lock, reader, and monitored inputs remain
  provisional until installer wiring assumptions are finalized
- RTC, nonvolatile event-buffer storage, and service/debug access are now
  represented in the circuit shell as explicit placeholder nets and review paths,
  but concrete devices and connector families remain provisional
- The exploratory board shell intentionally keeps `routingDisabled` enabled at
  the board level while interface structure, zoning, and subsystem contracts are
  being validated before detailed routing work begins

## Final Review Summary

- Modular TSX subcircuits now cover Ethernet/PoE, power domains, reader
  interfaces, supervised inputs, and relay lock output without collapsing into a
  monolithic board expression.
- Shared typing now covers management states, service access modes, offline
  buffering, timekeeping, and installer-facing interface expectations.
- Field-review artifacts now expose online, degraded, offline, resyncing,
  power-fail, RTC, event-buffer, and service/debug placeholder paths.
- The shell remains exploratory rather than fabrication-ready because concrete
  connector, protection, relay, controller, RTC, and memory parts are still
  provisional.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Circuit intent is explicit: the plan documents PoE logic power, separate lock power, dry relay switching, OSDP/Wiegand reader paths, supervised inputs, and central-management fallback behavior.
- [x] Render logic remains pure and composable: implementation is planned as extracted TSX building blocks for power, I/O, reader, and relay subsystems rather than one monolithic board expression.
- [x] Type contracts are explicit: strict TypeScript remains enabled and the design introduces dedicated type definitions for interface variants, power domains, and operational states.
- [x] Verification plan includes `npm run typecheck`, `tsci check netlist`, `tsci build`, and `tsci snapshot`; `tsci check placement` is required because this feature introduces board outline, connectors, and placement-sensitive power/IO sections.
- [x] Manufacturability assumptions are captured: the plan fixes a 4-layer board target, installer-facing connectors, surge protection boundaries, dry-relay lock contract, and an explicit exploratory/review-ready/fabrication-ready status path.

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
index.circuit.tsx
src/
├── circuits/
│   └── one-door-controller.tsx
├── components/
│   ├── ethernet-poe-front-end.tsx
│   ├── reader-interfaces.tsx
│   ├── supervised-input-bank.tsx
│   ├── relay-lock-output.tsx
│   └── power-domains.tsx
└── lib/
  ├── controller-types.ts
  └── wiring-contracts.ts

tests/
artifacts/
specs/001-door-access-controller/
```

**Structure Decision**: Extract this feature into `src/circuits/`,
`src/components/`, and `src/lib/` because PoE, Ethernet, relay switching,
reader interfaces, and supervised inputs are distinct reusable circuit concerns.
`index.circuit.tsx` should become the minimal entrypoint that renders the
one-door controller assembly.

## Complexity Tracking

No constitution violations require justification for this plan.

## Post-Design Constitution Check

- [x] Circuit intent remains explicit in the plan, research, data model, and contracts.
- [x] The design keeps TSX modules pure and decomposed by electrical concern.
- [x] Strict typing remains a first-class design constraint through dedicated domain models.
- [x] The required validation flow is encoded in quickstart and will be mandatory in tasks.
- [x] Manufacturability assumptions are documented with board layer choice, wiring contracts, and protection expectations.
