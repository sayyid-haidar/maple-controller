# Implementation Plan: Fabrication-Ready Controller Hardware

**Branch**: `003-fabrication-ready-controller` | **Date**: 2026-03-24 | **Spec**: [/Users/sayyidhaidar/Developer/Personals/maple-tscircuit/specs/003-fabrication-ready-controller/spec.md](/Users/sayyidhaidar/Developer/Personals/maple-tscircuit/specs/003-fabrication-ready-controller/spec.md)
**Input**: Feature specification from `/specs/003-fabrication-ready-controller/spec.md`

## Summary

Promote the one-door controller from the 002 review-ready milestone to a real
fabrication-ready release package by closing fabrication-critical BOM choices,
locking the Ethernet and dry-relay physical implementations, replacing the last
placeholder retention and connector decisions, and adding explicit
manufacturing, procurement, and bring-up evidence without changing the accepted
controller architecture from Features 001 and 002.

The board is not treated as fabrication-ready at the start of 003. The working
release state for this feature is `fabrication-blocked` until the blocker
register is empty and all release evidence is present in source plus feature
artifacts.

## Technical Context

**Language/Version**: TypeScript 5.x with TSX (`strict: true`)  
**Primary Dependencies**: `tscircuit`, `typescript`, repository CAD-model helpers in `src/lib/cad-models.ts`  
**Storage**: Dedicated RTC backup domain plus SPI FRAM event journal; fabrication evidence lives in spec artifacts, not runtime storage  
**Testing**: `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement` for any footprint, connector, board-edge, or placement-zone change  
**Target Platform**: 4-layer one-door controller PCB modeled in tscircuit and prepared for first-article fabrication review  
**Project Type**: tscircuit hardware controller package  
**Performance Goals**: Preserve the existing local-fallback controller behavior, 10,000-event retention target, and stable snapshot/build output while reducing BOM and fabrication ambiguity to zero for fabrication-critical items  
**Constraints**: Keep the current modular TSX architecture intact, preserve the dry-relay external-lock boundary, maintain OSDP plus Wiegand support, do not claim fabrication-ready status while any fabrication-critical part or footprint remains provisional, and keep `routingDisabled` unless a later user-approved task explicitly moves routing forward  
**Scale/Scope**: One board revision touching the existing one-door controller entrypoint, core component modules, typed hardware contract models, and the fabrication-readiness documentation package

## Implementation Baseline

- **Current fabrication status**: 002 is documented as review-ready, but
  `controllerBoardModel.fabricationStatus` currently says `fabrication-ready`
  before BOM, footprint, and release evidence are actually closed.
- **Current implementation scope**: The board already has modular TSX blocks for
  controller core, Ethernet/PoE front end, power domains, reader interfaces,
  retention support, service connector, supervised inputs, and relay lock output.
- **Current validation baseline**: Prior milestone evidence indicates green
  `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and
  `tsci check placement`, with known non-blocking placeholder-chip warnings.

## Release Gate And Blocker Register

`fabrication-ready` is a release gate, not an aspirational label. 003 therefore
tracks the board as `fabrication-blocked` until the following blockers are closed:

| Blocker key | Current state | Owner | Owning files | Closure criteria |
| ----------- | ------------- | ----- | ------------ | ---------------- |
| `ethernet_magjack` | closed | LAN entry review | `src/components/ethernet-poe-front-end.tsx`, `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts` | released as Abracon `ARJP11A-MA` on the KiCad `RJ45_Abracon_ARJP11A-MA_Horizontal` footprint |
| `ethernet_poe_entry_boundary` | closed | LAN entry review | `src/components/ethernet-poe-front-end.tsx`, `src/circuits/one-door-controller.tsx` | PoE taps, shield bond, and LAN-edge placement notes are now encoded in source |
| `lock_relay` | closed | lock-interface review | `src/components/relay-lock-output.tsx`, `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts` | released as Omron `G5LE-1-DC12` on the KiCad `Relay_SPDT_Omron-G5LE-1` footprint |
| `lock_relay_drive` | closed | lock-interface review | `src/components/relay-lock-output.tsx`, `src/components/power-domains.tsx` | PB10 low-side drive, flyback path, and dry-contact metadata are now encoded in source |
| `rtc_backup_source` | open | retention review | `src/components/retention-support.tsx`, `src/lib/controller-types.ts` | backup-source topology promoted from hold-up capacitor placeholder to approved part or justified blocker |

All other fabrication-critical items must resolve to explicit `approved` or
`blocked` states in the typed release ledger. No implicit review-only wording is
allowed once 003 lands.

## Architecture Impact

- No subsystem redesign is planned. The existing board partitioning in
  `src/circuits/one-door-controller.tsx` remains the top-level integration point.
- Physical closure work stays inside the current modules by replacing family-only
  assumptions with approved part numbers, exact footprints, mechanical notes,
  and release-status metadata.
- Typed repository contracts in `src/lib/controller-types.ts` and
  `src/lib/wiring-contracts.ts` will become the single summary of release state,
  while individual component modules remain the source of footprint, pin, and
  supplier-part detail.
- The resulting milestone is still incremental to 001 and 002: PoE powers logic,
  Ethernet remains the management path, dry relay remains the only lock-power
  switching boundary, OSDP and Wiegand stay supported, RTC plus FRAM retention
  stays in scope, and service access remains separate from installer wiring.

## Current Implementation Delta

- `src/components/ethernet-poe-front-end.tsx` now carries the released magjack,
  explicit PoE taps, shield-bond treatment, and PHY-side series links for the LAN edge.
- `src/components/relay-lock-output.tsx` now carries the released relay device,
  PB10-driven low-side coil path, flyback suppression, and installer-edge relay corridor.
- `src/components/retention-support.tsx` already names candidate RTC and FRAM
  devices, but backup-source implementation and the board-level event-buffer
  placeholder in `src/circuits/one-door-controller.tsx` still prevent closure.
- `src/components/service-connectors.tsx`, `src/components/reader-interfaces.tsx`,
  and `src/components/supervised-input-bank.tsx` already express interface-family
  intent, but 003 must convert that intent into approved connector families,
  exact part lines, and fabrication-readiness notes.
- `src/lib/wiring-contracts.ts` still advertises a provisional-parts list from
  the 002 milestone; 003 must replace that list with a fabrication-critical
  closure ledger that distinguishes approved BOM lines from blockers.

## Fabrication-Blocking Workstreams

1. **BOM closure and status alignment**
   Replace review-era provisional lists with approved BOM lines or explicit
   blockers, and align `fabricationStatus` with documented evidence rather than
   optimistic intent.
2. **Ethernet physical lock-in**
   Add the approved RJ45/magjack or connector-plus-magnetics implementation,
   board-edge constraints, shield/ESD expectations, and PoE/LAN footprint review.
3. **Relay and lock-interface physical lock-in**
   Add the approved relay package, contact form, coil-drive path, suppression
   topology, creepage assumptions, and installer-facing connection details while
   preserving the dry-contact boundary.
4. **Retention and provisional-part cleanup**
   Replace `C_EVENT_BUFFER_PLACEHOLDER`, finalize RTC backup support choices,
   and close remaining connector-family placeholders or mark them as blockers.
5. **Manufacturing, procurement, and bring-up readiness**
   Define the artifact set required to treat the board as fabrication-ready:
   footprint ownership, assembly notes, sourcing risk treatment, and minimum
   first-article checkout expectations.

## Key Source Touch Points

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
│   ├── retention-support.tsx
│   ├── service-connectors.tsx
│   └── supervised-input-bank.tsx
└── lib/
    ├── controller-types.ts
    └── wiring-contracts.ts

specs/003-fabrication-ready-controller/
```

**Structure Decision**: Keep the existing one-board entrypoint and component
split. 003 is a release-closure milestone, so the plan avoids new folders or
new board abstractions unless a concrete part decision cannot be represented in
the current modules.

## Validation Strategy

- Run `npm run typecheck` after updating typed fabrication models and component
  props so release-status metadata stays strict and explicit.
- Run `tsci check netlist` after each subsystem lock-in to ensure Ethernet,
  relay, retention, and connector updates do not break established contracts.
- Run `tsci build` after BOM and footprint changes to verify the circuit still
  produces deterministic artifacts and that any remaining warnings are reviewed.
- Run `tsci snapshot` after visible footprint or placement changes so the
  Ethernet edge, service access, relay region, and terminal blocks can be
  reviewed visually.
- Run `tsci check placement` whenever Ethernet, relay, service, board-edge, or
  connector footprints change, because 003 explicitly depends on manufacturable
  placement and board-edge assumptions.
- Treat fabrication-ready status as blocked unless the documentation package and
  source tree agree on approved parts, blockers, and bring-up expectations.

## Fabrication-Critical BOM Ledger Baseline

- Service recovery header: may be approved if exact footprint, sourcing path,
  and use boundary are explicit.
- Reader and supervised-input terminals: may be approved when the Phoenix
  terminal series and pin counts are explicit and placement remains installer-facing.
- RTC and FRAM devices: may be approved if the exact parts remain aligned with
  the retention package and no board-level placeholders remain for the devices themselves.
- Ethernet entry, PoE ingress boundary, relay device, and relay drive are now
  released; RTC backup source remains the final explicit blocker in this workstream.

## Procurement Risk Register

| Part | Status | Source path | Alternate treatment | Release impact |
| ---- | ------ | ----------- | ------------------- | -------------- |
| Abracon `ARJP11A-MA` | approved | Abracon distribution | no alternate until body and shield geometry are revalidated | acceptable single-source exception |
| Omron `G5LE-1-DC12` | approved | Digikey Omron distribution | no alternate until drill pattern and body envelope match | acceptable single-source exception |
| Harwin `M50-3500542` | approved | Harwin M50 series | pin-compatible alternates allowed with identical height and pitch | low risk |
| Phoenix Contact installer terminals | approved | Phoenix Contact MC/MKDS distribution | pitch- and entry-compatible alternates only | low risk |
| RTC backup source | blocked | none | none | blocks fabrication-ready release |

Release acceptance for 003 remains `fabrication-blocked` until the RTC backup
source moves from open blocker to approved or explicitly bounded retention policy.

## Final Blocker Handling Rule

- Remaining blocker list for the current candidate: `rtc_backup_source` only.
- If that blocker remains open, the board state must stay `fabrication-blocked`
  even when Ethernet, relay, sourcing, assembly, and bring-up packages are complete.
- No other subsystem may be re-opened unless a new blocker is added explicitly to
  the typed release ledger and mirrored into the feature artifacts.

## Evidence Ownership

- Hardware architecture review owns the typed release-state ledger in `src/lib/controller-types.ts`.
- Interface closure review owns connector decisions and traceability in `src/lib/wiring-contracts.ts`.
- LAN entry review owns Ethernet mechanical and PoE ingress closure.
- Lock-interface review owns relay device, drive path, and dry-contact boundary validation.
- Retention review owns RTC, FRAM, and backup-domain closure.
- Release owner owns the final consistency pass across source, specs, and validation artifacts.

## Sequencing

1. Normalize release-state models and identify every remaining fabrication-critical
   placeholder across `src/lib/` and the component modules.
2. Lock Ethernet entry: exact connector/magjack approach, protection boundary,
   board-edge mechanics, and any required PHY-adjacent support changes.
3. Lock the relay path: exact relay package, drive assumptions, suppression
   parts, terminal compatibility, and lock-domain placement constraints.
4. Close retention-support placeholders and installer-connector family choices,
   including the event-buffer capacitor and RTC backup-domain implementation.
5. Update fabrication-readiness artifacts with BOM status, procurement policy,
   footprint status, and bring-up expectations, then re-run the full validation
   set before any fabrication-ready claim.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Circuit intent is explicit: the plan names the exact subsystems and files
  where Ethernet, relay, retention, connector, and release-status closure work occurs.
- [x] Render logic remains pure and composable: the plan preserves the existing
  TSX subcircuit split instead of collapsing physical-finalization work into the board shell.
- [x] Type contracts are explicit: `strict` TypeScript remains the release-state
  contract for BOM closure, connector decisions, and fabrication blockers.
- [x] Verification plan includes `npm run typecheck`, `tsci check netlist`,
  `tsci build`, and `tsci snapshot`; `tsci check placement` is mandatory for
  the footprint and placement-sensitive work in this milestone.
- [x] Manufacturability assumptions are captured: the plan keeps the 4-layer
  board target, identifies board-edge and creepage-sensitive regions, and blocks
  fabrication-ready status until footprints, sourcing, and bring-up notes are closed.

## Project Structure

### Documentation (this feature)

```text
specs/003-fabrication-ready-controller/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── fabrication-readiness-contract.md
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
│   ├── controller-core.tsx
│   ├── ethernet-poe-front-end.tsx
│   ├── power-domains.tsx
│   ├── reader-interfaces.tsx
│   ├── relay-lock-output.tsx
│   ├── retention-support.tsx
│   ├── service-connectors.tsx
│   └── supervised-input-bank.tsx
└── lib/
    ├── controller-types.ts
    └── wiring-contracts.ts

specs/003-fabrication-ready-controller/
```

**Structure Decision**: The current repository layout already matches the
electrical partitioning of the product. 003 will refine the existing modules,
not introduce new architecture, and will keep documentation grouped under the
feature spec directory.

## Complexity Tracking

No constitution violations require justification for this plan.

## Post-Design Constitution Check

- [x] Circuit intent remains explicit across the plan, research, data model,
  quickstart, and fabrication-readiness contracts.
- [x] The design remains modular by electrical concern, with no hidden
  side-effectful render logic introduced by the plan.
- [x] Strict typing remains part of the implementation plan through typed BOM,
  blocker, connector, and release-status updates in `src/lib/controller-types.ts`.
- [x] The validation flow remains the required `npm run typecheck`,
  `tsci check netlist`, `tsci build`, `tsci snapshot`, and `tsci check placement`.
- [x] Manufacturability assumptions are explicit enough to distinguish
  review-ready intent from a true fabrication-ready release gate.
