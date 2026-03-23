# Research: Fabrication-Ready Controller Hardware

## Decision 1: Treat 003 as a closure milestone on top of the 002 architecture, not as a redesign

**Decision**: Keep the board architecture from Features 001 and 002 intact and
limit 003 to fabrication closure: exact BOM lines, footprints, mechanical notes,
procurement treatment, and bring-up evidence.

**Rationale**: The open work is concentrated in physical part lock-in and release
readiness, not in electrical architecture. Re-opening the controller topology,
power-domain boundaries, or interface model would add risk without helping the
fabrication claim.

**Alternatives considered**:

- Revisit controller or power architecture during fabrication planning: rejected
  because it would invalidate accepted contracts from 001 and 002.
- Move directly into fabrication export without a closure pass: rejected because
  several fabrication-critical choices are still implicit or provisional.

## Decision 2: Use the existing TSX component modules plus `src/lib/` models as the release-state source of truth

**Decision**: Keep exact footprint and supplier-part detail in the component
modules while using `src/lib/controller-types.ts` and `src/lib/wiring-contracts.ts`
to summarize fabrication status, approved-vs-blocked items, connector decisions,
and preserved interface contracts.

**Rationale**: The repository already separates physical implementation from typed
system intent. Extending that pattern gives reviewers one place to inspect the
release state without scattering fabrication status across comments or hidden notes.

**Alternatives considered**:

- Put all fabrication status only in markdown: rejected because it would drift
  from the actual component definitions.
- Encode every approval detail only in TSX components: rejected because it would
  make system-level closure harder to review and validate.

## Decision 3: Close Ethernet readiness by adding the actual board-edge connector implementation and related mechanical constraints

**Decision**: Treat Ethernet readiness as incomplete until `src/components/ethernet-poe-front-end.tsx`
contains the actual approved magjack or connector-plus-magnetics choice, the
associated protection boundary, and board-edge/keepout constraints that match
first-article assembly expectations.

**Rationale**: The current source already has a concrete PHY candidate and the
RMII boundary, but fabrication still depends on the real LAN-entry hardware,
shield handling, and the mechanical assumptions of that footprint. That is the
actual missing closure item for Ethernet.

**Alternatives considered**:

- Treat the current PHY-only front end as sufficient: rejected because it does
  not define the physical fabrication interface.
- Defer the connector decision to procurement after release: rejected because the
  board-edge footprint and assembly constraints depend on it.

## Decision 4: Close relay readiness by modeling the real relay device and its protection network, not only the field terminals

**Decision**: Treat the relay region as fabrication-blocking until
`src/components/relay-lock-output.tsx` includes the approved relay package,
contact form, coil-drive strategy, suppression network, and creepage-sensitive
placement notes alongside the installer terminals.

**Rationale**: The current module exposes the dry-contact interface but does not
yet contain the actual electromechanical switching device or a release-ready
protection strategy. That gap is too large to call the lock path fabrication-ready.

**Alternatives considered**:

- Leave relay choice as a generic dry-contact placeholder: rejected because the
  relay package drives both layout and procurement risk.
- Replace the relay with a logic-driven lock output: rejected because it violates
  the established dry-relay external-power contract.

## Decision 5: Treat retention closure as both a schematic and evidence problem

**Decision**: Close retention readiness only when the board-level
`C_EVENT_BUFFER_PLACEHOLDER`, the RTC backup-domain implementation, and the
FRAM/RTC approval state are all resolved in source and reflected in a minimum
power-fail and bring-up verification package.

**Rationale**: The current RTC and FRAM candidates are strong, but retention is
not fabrication-ready if the backup-domain hardware and power-fail behavior are
still implied rather than proven. The board-level placeholder proves the closure
is not finished yet.

**Alternatives considered**:

- Accept the current RTC/FRAM parts as automatically fabrication-ready: rejected
  because the surrounding backup and power-fail implementation is still incomplete.
- Treat retention as a firmware-only problem: rejected because backup hardware
  and capacitor choices directly affect the physical design.

## Decision 6: Promote connector families into exact approved parts only where mechanical and sourcing assumptions are explicit

**Decision**: Keep the current family split of RJ45, 5.08 mm terminals,
3.81 mm terminals, and Tag-Connect-style service access, but require exact part
approval, footprint ownership, and sourcing treatment before any interface is
counted as fabrication-ready.

**Rationale**: The family-level decisions from 002 are still sound and align with
the accepted architecture. The missing work is exact SKU selection and release
discipline, not a change in connector-family strategy.

**Alternatives considered**:

- Re-open connector-family selection entirely: rejected because the current
  family split already matches current-class and serviceability needs.
- Freeze generic KiCad footprints without vendor lock-in: rejected because it
  leaves assembly and sourcing ambiguity in place.

## Decision 7: Fabrication-ready status requires a dedicated release artifact set, not only green circuit checks

**Decision**: Require a fabrication-readiness package that includes approved BOM
status, blocker list, footprint status, procurement notes, DFM and assembly
assumptions, and a first-article bring-up checklist in addition to the normal
`tsci` validation commands.

**Rationale**: `tsci` proves connectivity, placement, and renderability, but not
whether the board can be responsibly purchased, assembled, and brought up.
Feature 003 explicitly expands the definition of ready to include those concerns.

**Alternatives considered**:

- Use only `npm` and `tsci` outputs as the fabrication gate: rejected because
  they do not cover sourcing or production readiness.
- Make procurement and bring-up separate future milestones: rejected because the
  feature definition already includes them in fabrication readiness.

## Decision 8: Any unresolved sourcing or footprint issue remains an explicit fabrication blocker rather than a soft note

**Decision**: Do not allow uncertain magjack, relay, connector, retention, or
assembly choices to hide behind vague notes. If exact closure cannot be reached,
the item remains a named fabrication blocker with measurable criteria.

**Rationale**: The feature spec requires an unambiguous distinction between
review-ready and fabrication-ready. Soft ambiguity would collapse that boundary.

**Alternatives considered**:

- Carry unresolved items as informal risk notes: rejected because that makes the
  release state ambiguous.
- Claim fabrication-ready with pending sourcing follow-up: rejected because it
  contradicts FR-015 and FR-017.