# Implementation Plan: Review-Ready Controller Hardware

**Branch**: `002-review-ready-controller` | **Date**: 2026-03-23 | **Spec**: [/Users/sayyidhaidar/Developer/Personals/maple-tscircuit/specs/002-review-ready-controller/spec.md](/Users/sayyidhaidar/Developer/Personals/maple-tscircuit/specs/002-review-ready-controller/spec.md)
**Input**: Feature specification from `/specs/002-review-ready-controller/spec.md`

## Summary

Move the existing one-door access controller from an exploratory subsystem shell
to a review-ready board definition by standardizing on a single-controller-core
direction, a concrete PoE-fed logic power chain, dedicated RTC and nonvolatile
event-retention assumptions, an explicit OSDP RS-485 transceiver path, a
manufacturing-safe service connector strategy, and installer-facing connector
families that keep the dry-relay external lock power boundary from Feature 001
intact.

## Technical Context

**Language/Version**: TypeScript 5.x with TSX (`strict: true`)  
**Primary Dependencies**: `tscircuit`, `typescript`, React JSX runtime types  
**Storage**: Dedicated I2C RTC with backup domain plus SPI FRAM-class event journal; no repository-side data store  
**Testing**: `npm run typecheck`, `tsci check netlist`, `tsci check placement`, `tsci build`, `tsci snapshot`  
**Target Platform**: 4-layer one-door controller PCB rendered in tscircuit CLI with review-ready fabrication assumptions  
**Project Type**: tscircuit hardware controller package  
**Performance Goals**: Preserve sub-250ms local unlock decision latency, buffer at least 10,000 offline events, and keep review decisions within 10/100 Ethernet plus IEEE 802.3af PoE power budget  
**Constraints**: Preserve Feature 001 architecture, keep lock power external and dry-relay switched, keep OSDP plus Wiegand support, separate service access from installer wiring, and mark unresolved sourcing or footprint items as provisional instead of implied complete  
**Scale/Scope**: One physical controller board revision with one MCU-class controller core, one external RMII PHY path, one PoE-derived logic rail chain, one RTC path, one SPI event store path, one OSDP RS-485 path, one Wiegand compatibility path, and one standardized family assignment for each installer-facing interface

## Implementation Baseline

- **Current fabrication status**: exploratory
- **Current implementation scope**: Feature 001 already defines the one-door
  controller shell, field-interface intent, and typed management model in
  `src/circuits/one-door-controller.tsx`, `src/components/`, and `src/lib/`
- **Current validation baseline**: `npm run typecheck`, `tsci check netlist`,
  `tsci build`, `tsci snapshot`, and `tsci check placement` after placement,
  footprint, or outline changes

## Current Implementation Delta

- The 002 milestone now has real source scaffolding and board integration for a
  controller-core placeholder, external RMII PHY boundary, retention-support
  block, dedicated service connector, and explicit PoE-to-logic power chain.
- Installer-facing terminal assumptions are now explicit in source for dry relay,
  external lock supply, and supervised-input wiring rather than being implied by
  net names alone.
- The review package now includes a concrete RS-485 OSDP transceiver boundary,
  a separate Wiegand compatibility path, dedicated service recovery wiring, and
  installer-facing terminal placeholders for lock and monitored-input wiring.
- The board remains exploratory because concrete vendor SKUs, terminal-block
  series, and final chip footprints are still provisional, but the design is no
  longer only a subsystem shell.
- Validation for the implemented US1 and US2 slices is currently green on
  TypeScript, netlist, build, snapshot, and placement checks.
- `tsci build` still emits non-blocking placeholder-chip semantic warnings for
  `pinAttributes`, which appear to be a tooling behavior rather than a layout or
  connectivity failure.

## Initial Blockers And Provisional Decisions

- The controller-core decision is reduced to one primary class direction, but
  the exact MCU SKU remains provisional pending package, RAM, and lifecycle review
- The Ethernet PHY, PoE PD front end, regulator devices, and RJ45 magjack remain
  placeholder part families rather than final purchasable part numbers
- RTC backup source implementation is fixed to a dedicated backup domain, but the
  exact holder, charging, and retention-duration details remain open for part review
- Event retention is standardized on an SPI FRAM-class journal, but final density
  and package selection remain provisional until event sizing is converted into tasks
- RS-485 surge, bias, and termination strategy is fixed conceptually, but exact
  protection arrays and stuffing options remain open to schematic capture work
- Installer connector families are now narrowed to specific family classes,
  though final vendor series and pin counts remain implementation tasks
- Installer terminals are now split conceptually into 5.08mm lock-side blocks,
  3.81mm monitored-input and reader blocks, and a separate Tag-Connect-style
  service footprint, but silkscreen wording and exact terminal series remain open
  for the fabrication-ready pass

## Final Review Summary

- Primary controller direction is a single MCU-class controller with integrated
  10/100 Ethernet MAC, paired with an external RMII PHY rather than a Linux MPU
  or a separate SPI/Ethernet controller architecture.
- Power-chain review intent is PoE PD intake to isolated 12V intermediate rail,
  then regulated 5V and 3.3V logic rails, while the external lock supply remains
  wholly outside the PoE-fed domain and is switched only through dry relay contacts.
- Retention strategy is a dedicated I2C RTC with backup power plus SPI FRAM-class
  nonvolatile event storage so offline event logging and timestamp continuity can
  be reviewed without assuming a full filesystem or battery-backed RAM subsystem.
- Reader/service review intent is a half-duplex RS-485 OSDP path with explicit
  biasing and surge assumptions, continued Wiegand compatibility, a distinct
  Tag-Connect-style service connector, and pluggable terminal-block families for
  installer wiring.
- Final validation status for the current milestone is green for `npm run typecheck`,
  `tsci check netlist`, `tsci build`, `tsci snapshot --update`, and
  `tsci check placement`, with only known non-blocking placeholder-chip warnings
  still emitted by `tsci build`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Circuit intent is explicit: the plan names the controller-core direction, MAC/PHY boundary, PoE rail chain, RTC and event-store paths, RS-485 path, service interface, connector families, and the external lock-power boundary.
- [x] Render logic remains pure and composable: implementation will extend the existing modular TSX structure with dedicated controller-core and retention/service subcircuits instead of collapsing work into the board shell.
- [x] Type contracts are explicit: strict TypeScript remains required, and the next implementation stage will add typed models for controller core, connector-family assignments, retention devices, and service signals.
- [x] Verification plan includes `npm run typecheck`, `tsci check netlist`, `tsci build`, and `tsci snapshot`; `tsci check placement` is mandatory because connector families, new subcircuits, and placement zones will change.
- [x] Manufacturability assumptions are captured: the plan preserves a 4-layer board target, states service-vs-installer connector separation, names connector family classes, and explicitly distinguishes review-ready assumptions from still-provisional part choices.

## Project Structure

### Documentation (this feature)

```text
specs/002-review-ready-controller/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── hardware-interface-contract.md
│   └── operational-behavior-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
index.circuit.tsx
src/
├── circuits/
│   └── one-door-controller.tsx
├── components/
│   ├── ethernet-poe-front-end.tsx
│   ├── power-domains.tsx
│   ├── reader-interfaces.tsx
│   ├── relay-lock-output.tsx
│   ├── supervised-input-bank.tsx
│   ├── controller-core.tsx            # planned
│   ├── retention-support.tsx          # planned
│   └── service-connectors.tsx         # planned
└── lib/
    ├── controller-types.ts
    └── wiring-contracts.ts

specs/002-review-ready-controller/
```

**Structure Decision**: Keep the one-board entrypoint in
`src/circuits/one-door-controller.tsx` and extend the existing modular source
layout with focused components for controller core and retention/service logic.
This preserves Feature 001 architecture while making the new review-ready
decisions explicit in dedicated, testable TSX modules.

## Complexity Tracking

No constitution violations require justification for this plan.

## Post-Design Constitution Check

- [x] Circuit intent remains explicit in the plan, research, data model, quickstart, and contracts.
- [x] The design direction keeps the TSX implementation decomposed by electrical concern.
- [x] Strict typing remains a first-class design constraint for the future code changes.
- [x] The required validation flow is encoded in quickstart and remains mandatory for implementation tasks.
- [x] Manufacturability assumptions are documented with board layer choice, connector-family assignments, and explicit provisional-risk tracking.
