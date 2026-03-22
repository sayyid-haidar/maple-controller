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

## Validation Workflow

Run these commands from repository root after each meaningful increment:

```bash
npm run typecheck
tsci check netlist
tsci build
tsci snapshot
```

Run this when board outline, connector placement, or subsystem zoning changes:

```bash
tsci check placement
```

## Definition of Done for Planning Handoff

The feature is ready to move into `/speckit.tasks` when:

- the board is decomposed into subsystem components
- both reader interface families are present in the design
- PoE logic power and external lock power are explicitly separated
- dry relay lock control and fail-safe/fail-secure policy are documented in code
- offline/local fallback intent is represented in the typed model and contracts
