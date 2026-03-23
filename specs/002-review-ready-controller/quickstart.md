# Quickstart: Review-Ready Controller Hardware

## Goal

Extend the existing one-door controller implementation so reviewers can inspect
a concrete controller-core, power-chain, retention, reader-interface, service,
and connector-family strategy without reopening the basic product architecture
established in Feature 001.

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
│   ├── supervised-input-bank.tsx
│   ├── controller-core.tsx          # new planned module
│   ├── retention-support.tsx        # new planned module
│   └── service-connectors.tsx       # new planned module
└── lib/
    ├── controller-types.ts
    └── wiring-contracts.ts
```

## Implementation Sequence

1. Extend `src/lib/controller-types.ts` with typed models for controller-core
   direction, Ethernet PHY assumptions, RTC/event-store strategy, service
   connector signals, and installer connector-family assignments.
2. Add `src/components/controller-core.tsx` to represent the chosen MCU-class
   controller direction, clock/reset handling, RMII boundary, and service nets.
3. Update `src/components/ethernet-poe-front-end.tsx` and
   `src/components/power-domains.tsx` so the PoE chain explicitly shows PD
   intake, isolated 12V intermediate rail, and derived 5V and 3.3V rails.
4. Add `src/components/retention-support.tsx` for the I2C RTC, SPI FRAM,
   and power-fail signaling.
5. Add `src/components/service-connectors.tsx` for the Tag-Connect-style
   debug and recovery footprint.
6. Update `src/components/reader-interfaces.tsx` to show the half-duplex
   RS-485 transceiver path, bias/termination placeholders, and continued
   Wiegand compatibility signals.
7. Update `src/components/relay-lock-output.tsx` and
   `src/components/supervised-input-bank.tsx` so installer connector-family
   choices are visible and remain separate from service/debug access.
8. Recompose `src/circuits/one-door-controller.tsx` so the board shell exposes
   the new controller-core and retention/service zones without changing the
   one-door product scope.
9. Keep `index.circuit.tsx` as the thin entrypoint that renders the revised
   `OneDoorController` circuit.

## Review-Ready Assumptions To Preserve

- PoE powers logic, networking, retention, and reader auxiliary functions only
- Lock current remains installer-supplied and is switched through dry relay contacts
- OSDP over RS-485 remains the preferred reader mode and Wiegand remains available
- Central management remains Ethernet-based with local fallback during outages
- Service/debug access remains physically distinct from field wiring

## Current Execution Status

The repository now implements the planned 002 review-ready slices for controller,
power, retention, reader/service, and installer-facing connector assumptions:

- `src/components/controller-core.tsx` now reserves a single MCU-class control
   placeholder with explicit reset, boot, clock, RMII, service, RTC, and SPI
   event-store nets
- `src/components/ethernet-poe-front-end.tsx` now shows an external RMII PHY
   boundary instead of a purely abstract Ethernet placeholder path
- `src/components/service-connectors.tsx` now reserves a dedicated debug and
   recovery footprint distinct from installer-facing field wiring
- `src/components/retention-support.tsx` now reserves dedicated RTC backup and
   FRAM-class event-journal placeholder paths
- `src/components/power-domains.tsx` now shows a review-visible PoE chain from
   `V48_POE_IN` to `V12_POE_INT`, `V5_LOGIC`, and `V3_3_LOGIC`, plus a reader
   auxiliary branch that remains separate from external lock power
- `src/components/reader-interfaces.tsx` now shows a concrete half-duplex
   RS-485 OSDP transceiver boundary, controller-side direction nets, and a
   separate Wiegand compatibility path
- `src/components/relay-lock-output.tsx` and `src/components/supervised-input-bank.tsx`
   now expose installer-facing terminal placeholders instead of leaving lock and
   monitored-input connector assumptions implicit

Current validation status for these implemented slices:

- `npm run typecheck` passes
- `tsci check netlist` reports `Errors: 0` and `Warnings: 0`
- `tsci build` passes
- `tsci snapshot --update` succeeds
- `tsci check placement` reports no overlap, error, or warning markers

Known tooling note:

- `tsci build` still emits chip-semantic warnings for the new placeholder chips
   even after adding `pinAttributes`. This currently behaves like a tscircuit
   placeholder-chip limitation rather than a blocking netlist or placement error,
   so the milestone remains usable for review-oriented iteration.

## Commissioning And Recovery Workflow

- Use the dedicated service footprint for SWD programming, UART console access,
   reset assertion, and forced boot-mode entry.
- Treat `SERVICE_NRST` and `SERVICE_BOOT_CFG` as the review-visible recovery
   path into the controller core rather than hidden bench-only jumpers.
- Use OSDP as the primary reader integration path through the explicit RS-485
   transceiver block; keep Wiegand only for retrofit or compatibility reviews.
- During bring-up, confirm that the reader zone, controller zone, and service
   zone remain distinct in the schematic and PCB snapshots before discussing
   final connector or BOM selection.

## Validation Workflow

Run these commands from repository root after each meaningful implementation step:

```bash
npm run typecheck
tsci check netlist
tsci build
tsci snapshot
```

Run this additional command whenever board outline, connector placement,
footprints, or placement zones change:

```bash
tsci check placement
```

## Review Package Expectations

The implementation is ready for the next review once the generated board and
supporting documentation make these paths explicit:

- controller-core MAC/PHY split and recovery/service signals
- PoE PD, isolated 12V intermediate rail, and derived 5V/3.3V rails
- dedicated RTC backup path and SPI event-store path
- OSDP RS-485 transceiver with field-side bias, termination, and protection placeholders
- distinct Wiegand compatibility wiring
- Tag-Connect-style service footprint placed away from installer terminals
- connector-family mapping for Ethernet, lock relay, external lock power, reader wiring, door contact, REX, and tamper/aux monitoring

## Installer-Facing Interface Map

| Interface | Connector family | Current source expression |
| --------- | ---------------- | ------------------------- |
| Ethernet / PoE entry | Shielded RJ45 magjack | `src/components/ethernet-poe-front-end.tsx` |
| External lock power | 5.08mm pluggable terminal block | `src/components/relay-lock-output.tsx` |
| Dry relay lock contacts | 5.08mm pluggable terminal block | `src/components/relay-lock-output.tsx` |
| OSDP / RS-485 reader path | 3.81mm pluggable terminal block | `src/components/reader-interfaces.tsx` |
| Wiegand compatibility path | 3.81mm pluggable terminal block | `src/components/reader-interfaces.tsx` |
| Door / REX monitored inputs | 3.81mm pluggable terminal block | `src/components/supervised-input-bank.tsx` |
| Tamper / fault monitored inputs | 3.81mm pluggable terminal block | `src/components/supervised-input-bank.tsx` |
| Service / recovery | Tag-Connect 2x5 1.27mm | `src/components/service-connectors.tsx` |

Keep this mapping stable unless the board is being promoted out of the
review-ready milestone into concrete fabrication preparation.

## Remaining Provisional Items

- exact MCU SKU, PHY SKU, PoE PD controller, regulator part numbers, and RJ45 magjack vendor series
- exact RTC package and backup-source implementation details
- exact FRAM density and package choice
- exact RS-485 TVS array and stuffing policy for termination/bias options
- exact terminal-block series and pin-count consolidation plan

## Open Risk Register

- Placeholder-chip semantic warnings still appear during `tsci build` even when
   `pinAttributes` are set. Current evidence suggests this is a tooling quirk,
   not a connectivity or placement defect.
- Controller, PHY, PD, regulator, RTC, FRAM, and terminal-block vendor series
   are still provisional; this milestone standardizes architecture and interface
   families, not a fabrication-ready BOM.
- Reader surge network details and stuffing options remain review-visible but
   not yet reduced to final schematic values or approved protection SKUs.

## Definition Of Done For The Planned Implementation

This feature handoff is complete when:

- the existing one-door controller code expresses one unambiguous controller-core direction
- the PoE logic rail chain is review-visible and remains isolated from lock power sourcing
- RTC and FRAM retention paths are explicit in the typed model and the circuit shell
- the OSDP transceiver path and Wiegand compatibility path are both visible in the board design
- service/debug access uses a dedicated connector strategy that does not share installer terminals
- every installer-facing interface from the spec maps to a concrete connector family and readiness status