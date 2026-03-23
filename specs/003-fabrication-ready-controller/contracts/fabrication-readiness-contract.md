# Fabrication Readiness Contract: Fabrication-Ready Controller Hardware

## Purpose

Define the minimum evidence required before the one-door controller can be
treated as ready for first-article fabrication.

## BOM Closure Contract

- Every fabrication-critical part must be in one of two states only:
  `approved` with an exact BOM line or `blocked` with measurable closure criteria.
- Each approved BOM line must record exact manufacturer part number, package,
  intended footprint, electrical role, sourcing path, and alternate-part policy.
- No family-only, placeholder, or implied part decisions may remain hidden in
  source files once fabrication-ready status is claimed.
- Each blocked item must identify an owner, impact area, closure criteria, and
  the file that still carries the unresolved implementation.

## Footprint and Assembly Contract

- Every fabrication-critical approved part must have a manufacturable footprint
  suitable for the intended assembly path.
- Ethernet, relay, service, and installer-facing connectors must have explicit
  placement and access expectations where assembly or enclosure fit depends on them.
- `tsci check placement` is mandatory for any revision that changes critical
  footprints, board-edge parts, or placement spacing.
- Mechanically significant parts must either carry a released CAD model or a
  named `missing_blocker` entry in the fabrication ledger.

## Procurement Contract

- Fabrication-critical approved parts must show at least one credible source path.
- Lifecycle or availability notes must be recorded when known for critical parts.
- Alternate-compatible parts must be identified where practical; if no alternate
  exists, the part must be called out as a justified single-source exception.
- Sourcing uncertainty that materially threatens ordering remains a release blocker.
- Approved connector and electromechanical parts must declare whether they are
  accepted as single-source exceptions or have explicit alternates.

## Bring-Up Contract

- The release package must define minimum first-article checks for:
  power rails, Ethernet link, relay switching, supervised inputs, retained-event
  behavior, and service access.
- These checks must be specific enough that a reviewer or technician can perform
  them without relying on undocumented tribal knowledge.
- The bring-up package must name the file or artifact where each check's pass
  criteria are maintained.

## Validation Contract

- The release candidate must pass `npm run typecheck`, `tsci check netlist`,
  `tsci build`, and `tsci snapshot`.
- The release candidate must also pass `tsci check placement` whenever the
  feature changes any footprint, connector placement, board-edge component, or
  mechanically significant region.
- Known tooling quirks may be recorded, but they do not waive real netlist,
  build, or placement failures.
- Release evidence is incomplete if the typed release ledger, interface ledger,
  and owning TSX component files disagree about an approved-versus-blocked state.

## Release Decision Contract

- `fabrication-ready` may be claimed only when BOM, footprint, procurement,
  manufacturing, and bring-up requirements are all satisfied.
- Otherwise the board remains `fabrication-blocked` or `review-ready`, and the
  unresolved items must remain explicit in the feature artifacts.
- `fabrication-blocked` is the required state whenever Ethernet entry, relay
  implementation, or RTC backup support still depend on placeholders or open part decisions.
