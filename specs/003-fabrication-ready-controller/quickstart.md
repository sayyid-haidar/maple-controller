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

## First-Article Bring-Up Minimums

- Verify PoE intake, intermediate rails, and 3.3 V logic rail behavior
- Verify Ethernet link, PHY visibility, and management status indicators
- Verify relay actuation path and continuity of COM, NO, and NC contacts
- Verify reader auxiliary power and at least basic OSDP and Wiegand continuity
- Verify RTC continuity and retained event storage behavior across simulated power loss
- Verify service connector programming, reset, and recovery access

## Known Risks To Eliminate In 003

- Premature `fabrication-ready` status in typed models without closed release evidence
- Missing physical Ethernet entry implementation despite a concrete PHY choice
- Missing physical relay device despite existing field-terminal modeling
- Board-level retention placeholder still present in the main circuit shell
- Family-level connector choices that still need exact approved parts and sourcing treatment

## Definition Of Done For Planning

This plan is complete when implementation tasks derived from it can close every
fabrication-critical item without re-deriving the product architecture. A later
implementation should be able to follow this sequence directly and determine,
from source plus documentation, whether the board is still blocked or genuinely
fabrication-ready.