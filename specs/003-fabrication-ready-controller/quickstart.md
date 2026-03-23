# Quickstart: Fabrication-Ready Controller Hardware

## Goal

Close the remaining fabrication blockers in the existing one-door controller
implementation without changing the accepted architecture from Features 001 and
002, then generate enough BOM, footprint, procurement, and bring-up evidence to
justify a fabrication-ready claim.

## Planned Source Touch Points

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
```

## Implementation Sequence

1. Update `src/lib/controller-types.ts` so fabrication status is evidence-based
   and so fabrication-critical parts, approved BOM lines, and blockers can be
   expressed without ambiguity.
2. Replace the old `provisionalParts` summary in `src/lib/wiring-contracts.ts`
   with a fabrication-closure ledger that maps each critical interface and part
   to either an approved decision or an explicit blocker.
3. Update `src/components/ethernet-poe-front-end.tsx` to add the real LAN-entry
   implementation, exact footprint decision, shield/protection treatment, and
   board-edge constraints required for fabrication review.
4. Update `src/components/relay-lock-output.tsx` to add the exact relay device,
   coil-drive path, suppression network, and any creepage or assembly-sensitive
   layout notes while preserving the dry-contact external-lock boundary.
5. Update `src/components/retention-support.tsx` and
   `src/circuits/one-door-controller.tsx` to remove the event-buffer placeholder,
   finalize RTC backup support parts, and make retention closure explicit.
6. Confirm exact connector choices in `src/components/service-connectors.tsx`,
   `src/components/reader-interfaces.tsx`, and
   `src/components/supervised-input-bank.tsx` where family-only assumptions still
   stand in for release-ready decisions.
7. Align documentation artifacts under `specs/003-fabrication-ready-controller/`
   with the actual source state so the release package and the TSX design agree.
8. Run the full validation set and only leave the board in `fabrication-ready`
   state if no fabrication-critical blockers remain.

## Release Gate

The board starts 003 in `fabrication-blocked` state and only moves to
`fabrication-ready` after the following gate is satisfied:

- every fabrication-critical part has an explicit `approved` or `blocked` record
- every field-facing connector has an exact part decision or a named blocker
- Ethernet entry, relay path, and retention support no longer rely on hidden placeholders
- manufacturing, procurement, and bring-up evidence all point at the same source state
- `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, and any required `tsci check placement` run cleanly for the candidate

If any one of these remains open, the board stays `fabrication-blocked` and the
release package must name the blocker, owner, closure criteria, and owning file.

## Architecture To Preserve

- PoE powers logic, networking, retention, service circuitry, and reader auxiliary
  functions only
- External lock power remains installer supplied and is switched only through the
  dry relay path
- OSDP over RS-485 remains the preferred reader mode and Wiegand remains available
- RTC plus SPI FRAM retention remains part of the controller baseline
- Service and recovery access remain physically distinct from installer terminals

## Fabrication-Critical Work Checklist

- Ethernet connector or magjack exact part approved and present in source
- Ethernet board-edge and protection notes captured
- Relay exact part approved and present in source
- Relay suppression and creepage assumptions captured
- Event-buffer placeholder removed or converted into an explicit blocker
- RTC backup support choice finalized
- Installer-facing connector families promoted to exact approved parts
- BOM status, procurement notes, and alternates captured for each critical item
- Bring-up checklist written for first article

## Validation Workflow

Run these commands from repository root after each major closure step:

```bash
npm run typecheck
tsci check netlist
tsci build
tsci snapshot
```

Run this additional command whenever Ethernet, relay, connector, or placement
changes affect board edge, footprint choice, or placement spacing:

```bash
tsci check placement
```

## Validation Matrix

| Workstream | Source of truth | Required checks | Evidence owner |
| ---------- | --------------- | --------------- | -------------- |
| Release-state and blocker ledger | `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts` | `npm run typecheck` | hardware architecture review |
| Service, reader, supervised-input, and retention closure | `src/components/service-connectors.tsx`, `src/components/reader-interfaces.tsx`, `src/components/supervised-input-bank.tsx`, `src/components/retention-support.tsx`, `src/circuits/one-door-controller.tsx` | `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, `tsci check placement` when footprints move | fabrication closure review |
| Ethernet physical lock-in | `src/components/ethernet-poe-front-end.tsx`, `src/circuits/one-door-controller.tsx` | `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, `tsci check placement` | LAN entry review |
| Relay and lock-boundary lock-in | `src/components/relay-lock-output.tsx`, `src/components/power-domains.tsx`, `src/lib/wiring-contracts.ts` | `npm run typecheck`, `tsci check netlist`, `tsci build`, `tsci snapshot`, `tsci check placement` | lock-interface review |
| Manufacturing, procurement, and bring-up package | `specs/003-fabrication-ready-controller/plan.md`, `specs/003-fabrication-ready-controller/contracts/fabrication-readiness-contract.md`, `src/lib/controller-types.ts`, `src/lib/wiring-contracts.ts` | consistency review plus final validation sweep | release owner |

## Release Evidence Expectations

The feature is only ready to describe as fabrication-ready when the repository
contains all of the following in a consistent state:

- source modules updated with exact parts and manufacturable footprints
- typed fabrication status aligned with actual evidence
- BOM closure summary covering approved parts and blockers
- connector and footprint decisions captured for every field-facing interface
- procurement notes covering source path, alternates, and lifecycle risk
- bring-up checklist covering power, Ethernet, relay, reader, retention, and service access
- green TypeScript and `tsci` validation results for the release candidate

## Manufacturing Package

- Assembly method: mixed SMT reflow plus selective solder for the LAN magjack,
  relay, service header, and installer-facing terminals.
- Critical footprint reviews:
  - Abracon `ARJP11A-MA` LAN entry
  - Omron `G5LE-1-DC12` relay
  - Phoenix Contact `MKDS 1,5/3-5,08` and `MC 1,5/4-G-3,81` field terminals
  - Harwin `M50-3500542` service header
- Handling constraints:
  - keep the LAN shield body and relay height clear of enclosure features
  - keep the relay driver parts on the logic side of the dry-contact corridor
  - preserve straight cable-entry direction for installer terminals

## Procurement Package

| Part key | Source path | Alternate policy | Lifecycle note |
| -------- | ----------- | ---------------- | -------------- |
| `ethernet_magjack` | Abracon distribution | no alternate until shield/body geometry is revalidated | `unknown` |
| `lock_relay` | Digikey Omron distribution | no alternate until drill pattern and body envelope match | `active` |
| `service_debug_header` | Harwin M50 series | pin-compatible alternates only with identical mating height | `active` |
| `reader_terminal_blocks` | Phoenix Contact MC series | pitch- and entry-compatible alternates only | `active` |
| `supervised_input_terminal_blocks` | Phoenix Contact MC series | pitch- and entry-compatible alternates only | `active` |
| `rtc_backup_source` | not approved | blocked | `unknown` |

Current single-source exceptions: `STM32F407VET6`, `DS3231MZ+`, `MB85RS256A`,
`ARJP11A-MA`, and `G5LE-1-DC12`.

## Bring-Up Package

Minimum first-article evidence for the current candidate:

1. Verify `V48_POE_IN`, `V12_POE_INT`, `V5_LOGIC`, and `V3_3_LOGIC` in order.
2. Verify the ARJP11A-MA link comes up, the PHY resets cleanly, and the LAN shield
   RC bond does not short into field return.
3. Verify PB10 actuates the Omron relay, the flyback path clamps correctly, and
   COM/NO/NC continuity matches fail-safe and fail-secure wiring expectations.
4. Verify OSDP/Wiegand continuity and auxiliary reader power remain unaffected by
   the LAN and relay closures.
5. Verify FRAM retention and RTC behavior still pass, with the RTC backup source
   remaining an explicit release blocker.
6. Verify the service header can be accessed without disturbing LAN or field wiring.

## Blocker Traceability

Each fabrication blocker must be traceable through all three layers below:

- typed release-state record in `src/lib/controller-types.ts`
- interface or connector closure ledger entry in `src/lib/wiring-contracts.ts`
- owning component or board file that still requires closure

Use the following part keys as the primary traceability spine during 003:

- `ethernet_magjack` (closed)
- `ethernet_poe_entry_boundary` (closed)
- `lock_relay` (closed)
- `lock_relay_drive` (closed)
- `rtc_backup_source`
- `service_debug_header`
- `reader_terminal_blocks`
- `supervised_input_terminal_blocks`

## First-Article Bring-Up Minimums

- Verify PoE intake, intermediate rails, and 3.3 V logic rail behavior
- Verify Ethernet link, PHY visibility, and management status indicators
- Verify relay actuation path and continuity of COM, NO, and NC contacts
- Verify reader auxiliary power and at least basic OSDP and Wiegand continuity
- Verify RTC continuity and retained event storage behavior across simulated power loss
- Verify service connector programming, reset, and recovery access

## Release Artifact Map

- `src/lib/controller-types.ts`: board status, fabrication-critical part states, manufacturing package, procurement package, bring-up package
- `src/lib/wiring-contracts.ts`: connector decisions, interface ledger, and blocker-to-file traceability
- `src/circuits/one-door-controller.tsx`: board-level retention support and integration-sensitive placement state
- `src/components/*.tsx`: exact component, footprint, and sourcing choices for the owning subsystem
- `specs/003-fabrication-ready-controller/plan.md`: gate status, blocker register, and release decision summary
- `specs/003-fabrication-ready-controller/contracts/fabrication-readiness-contract.md`: signoff rules and evidence contract

## Known Risks To Eliminate In 003

- Premature `fabrication-ready` status before the final `rtc_backup_source` blocker is cleared
- RTC backup-source ambiguity that could overstate retained-time capability at release

## Feature Handoff

- Current release state: `fabrication-blocked`
- Remaining named blocker: `rtc_backup_source`
- Closed high-risk interfaces: Ethernet / PoE LAN entry and dry relay lock output
- Artifact locations:
   - typed release ledger: `src/lib/controller-types.ts`
   - sourcing and interface ledger: `src/lib/wiring-contracts.ts`
   - LAN entry implementation: `src/components/ethernet-poe-front-end.tsx`
   - relay implementation: `src/components/relay-lock-output.tsx`
   - release contracts and handoff docs: `specs/003-fabrication-ready-controller/contracts/` and `specs/003-fabrication-ready-controller/plan.md`
- Release workflow from here:
   1. approve or explicitly bound `rtc_backup_source`
   2. rerun the full validation set
   3. move `fabricationStatus` and the release gate from blocked to ready only after typed and document packages agree

## Definition Of Done For Planning

This plan is complete when implementation tasks derived from it can close every
fabrication-critical item without re-deriving the product architecture. A later
implementation should be able to follow this sequence directly and determine,
from source plus documentation, whether the board is still blocked or genuinely
fabrication-ready.
