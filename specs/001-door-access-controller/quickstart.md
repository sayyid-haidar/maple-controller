# Quickstart: One-Door Access Controller

## Goal

Build the first tscircuit representation of a one-door LAN access controller with
PoE-powered logic, separate external lock power, OSDP/Wiegand reader support,
supervised inputs, and offline event-buffering intent.

## Planned File Layout

```text
index.circuit.tsx
src/
├── circuits/
│   └── one-door-controller.tsx
├── components/
│   ├── ethernet-poe-front-end.tsx
│   ├── power-domains.tsx
│   ├── reader-interfaces.tsx
│   ├── supervised-input-bank.tsx
│   └── relay-lock-output.tsx
└── lib/
    ├── controller-types.ts
    └── wiring-contracts.ts
```

## Current Execution Status

The repository now contains the full exploratory implementation for all four
planned user stories:

- `index.circuit.tsx` is the thin entrypoint for the assembled controller board
- `src/circuits/one-door-controller.tsx` defines the 4-layer board shell plus
   review-visible status, buffering, and service-access rows
- `src/components/` contains modular subsystem placeholders for Ethernet/PoE,
   power domains, reader interfaces, supervised inputs, and relay lock output
- `src/lib/` contains the typed board model, service-access model, and named
   wiring contracts for field wiring, status paths, and offline behavior

## Implementation Steps

1. Create the domain types in `src/lib/controller-types.ts` for reader modes,
   lock policy, power domains, and operational states.
2. Model the board shell and placement zones in
   `src/circuits/one-door-controller.tsx`.
3. Add the Ethernet + PoE entry section with shielded RJ45/magjack assumptions,
   PoE PD block, and logic rails.
4. Add the external lock power entry and dry relay output section for 12V/24V
   lock compatibility.
5. Add reader-interface sections for OSDP/RS-485 and Wiegand.
6. Add supervised input sections for door contact, REX, tamper, and fault.
7. Wire named nets and annotate protection/isolation boundaries.
8. Keep `index.circuit.tsx` as the thin entrypoint that renders the assembled
   controller board.

This file layout and validation workflow are now confirmed as the baseline for
implementation tasks T001 and T002.

## Validation Workflow

Run these commands from repository root after each meaningful increment:

```bash
npm run typecheck
tsci check netlist
tsci build
tsci snapshot
```

Current repository note: the exploratory board shell now sets
`routingDisabled` at the board level intentionally. This keeps default `tsci
build` and `tsci snapshot` stable while the project is still in the structured
placement and interface-definition phase rather than the routing phase.

Run this when board outline, connector placement, or subsystem zoning changes:

```bash
tsci check placement
```

For local execution in this repository, `npm run build` and `npm run snapshot`
map to the `tsci` CLI through package scripts.

## Review Package Notes

The current board shell now captures these review-visible paths:

- Ethernet and PoE entry zone with management summary, online, and degraded
   status placeholders
- PoE-derived logic rails and separate external lock power intent
- dry relay lock control intent with fail-safe and fail-secure placeholders
- OSDP/RS-485 and Wiegand reader wiring, including compatibility control-line
   placeholders and protected field-side reader power
- door contact, REX, tamper, and fault monitoring with visible supervision or
   damping placeholders
- pending buffered-event visibility
- management offline and resynchronization visibility
- RTC and nonvolatile event-buffer placeholder nets
- power-fail warning path
- service/debug UART, boot/config, and watchdog visibility placeholders

Remaining assumptions still marked provisional for the exploratory shell:

- final RJ45 magjack and Ethernet magnetics footprint
- final PoE PD and regulator component chain
- final relay package, contact rating, and field suppression topology
- final installer terminal block family and credential reader connector choices
- final MCU, RTC, and nonvolatile storage devices behind the placeholder nets

## Final Validation Snapshot

The current implementation has been revalidated with:

```bash
npm run typecheck
tsci check netlist
tsci build
tsci snapshot --update
tsci check placement
```

At this stage the shell remains intentionally exploratory and placement-first,
but the full feature passes the required type, netlist, build, snapshot, and
placement workflows with routing disabled at the board level.

## Definition of Done for Current Handoff

This exploratory feature handoff is complete when:

- the board is decomposed into subsystem components
- both reader interface families are present in the design
- PoE logic power and external lock power are explicitly separated
- dry relay lock control and fail-safe/fail-secure policy are documented in code
- offline/local fallback intent is represented in the typed model and contracts
- managed administration, service/debug access, and explicit state visibility
   are review-visible in the board shell and contracts
