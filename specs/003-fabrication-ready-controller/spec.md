# Feature Specification: Fabrication-Ready Controller Hardware

**Feature Branch**: `003-fabrication-ready-controller`  
**Created**: 2026-03-24  
**Status**: Draft  
**Input**: User description: "Move the one-door access controller from review-ready to fabrication-ready by finalizing exact BOM choices, locking Ethernet and relay physical implementations, resolving provisional parts, and defining manufacturing-readiness expectations while preserving the architectural intent and electrical contracts from Features 001 and 002."

## User Scenarios & Testing *(mandatory)*

For this repository, every user story MUST identify the affected components,
nets, footprints, or board constraints and state the command, snapshot, or other
artifact that proves the story works independently.

This feature follows the exploratory and review-ready milestones by closing the
remaining hardware ambiguity that blocks fabrication. It preserves the existing
one-door controller architecture: PoE powers controller logic and networking,
external lock power remains installer-supplied and switches only through the dry
relay boundary, OSDP and Wiegand remain supported, retained event logging stays
in scope, and service access remains distinct from installer wiring. The new
work is to convert provisional hardware choices into fabrication-signoff inputs:
approved manufacturer parts, manufacturable footprints, assembly-suitable
packages, procurement expectations, and bring-up evidence requirements.

### User Story 1 - Close Fabrication-Blocking Part Decisions (Priority: P1)

As a hardware lead, I want every fabrication-critical provisional component to be
resolved into an approved part decision or a documented selection gate so that
the board is no longer blocked by placeholder BOM entries.

**Why this priority**: The board cannot be considered fabrication-ready while
critical parts such as Ethernet entry hardware, relay hardware, retention
support parts, or installer terminal families are still provisional.

**Independent Test**: Can be fully tested by reviewing the fabrication-readiness
package and confirming that each previously provisional, fabrication-blocking
item has one approved BOM line or one explicit acceptance gate with decision
criteria, sourcing evidence, footprint ownership, and signoff status.

**Acceptance Scenarios**:

1. **Given** the review-ready controller still contains provisional parts, **When** the fabrication-ready package is reviewed, **Then** every fabrication-critical placeholder from the prior milestone is either replaced with an approved manufacturer part or tracked as a named blocker with documented selection criteria and closure owner.
2. **Given** a component is promoted from provisional to approved, **When** a reviewer inspects its BOM entry, **Then** the entry shows its exact manufacturer part number, package, footprint, electrical role, sourcing expectation, and any approved alternate or justified single-source exception.
3. **Given** a part remains temporarily undecided because market availability is unstable, **When** the reviewer inspects the readiness statement, **Then** the board is not claimed fabrication-ready unless the unresolved choice is explicitly treated as an open blocker with measurable closure criteria.

---

### User Story 2 - Lock Physical Ethernet And Lock-Output Implementations (Priority: P2)

As a hardware reviewer, I want the Ethernet entry and lock-output sections to be
defined down to their exact physical implementation choices so that the most
installation-sensitive and manufacturing-sensitive portions of the board can be
fabricated and assembled without interpretation.

**Why this priority**: The Ethernet magjack, magnetics boundary, relay package,
contact protection, and lock-interface details are the highest-risk physical
areas because they combine field wiring, mechanical fit, protection strategy,
and manufacturable footprint quality.

**Independent Test**: Can be fully tested by reviewing the board package and
confirming that the Ethernet path and relay lock path each identify an exact
approved physical implementation, a manufacturable footprint, the required
protection elements, and any board-edge or assembly constraints for those areas.

**Acceptance Scenarios**:

1. **Given** the Ethernet LAN entry is required for management and PoE intake, **When** the Ethernet section is reviewed, **Then** the design names the exact approved connector and magnetics implementation approach, the required protection boundary, and the footprint or mechanical constraints needed for fabrication.
2. **Given** the lock path must remain a dry relay on a separate external supply, **When** the lock-output section is reviewed, **Then** the design names the exact approved relay package, contact arrangement, suppression or protection approach, and installer-facing connection details without violating the existing electrical boundary between PoE logic and lock power.
3. **Given** Ethernet and relay areas often fail manufacturability through footprint or placement ambiguity, **When** those sections are signed off, **Then** each has an associated manufacturable footprint decision, assembly suitability statement, and any layout constraints needed to prevent rework during fabrication release.

---

### User Story 3 - Prove Manufacturing And Procurement Readiness (Priority: P3)

As an operations reviewer, I want the controller to include explicit DFM,
assembly, procurement, and bring-up expectations so that fabrication readiness
means the board can be ordered, assembled, and verified instead of merely drawn.

**Why this priority**: A board that has exact electrical parts but lacks
manufacturing checks, sourcing expectations, or bring-up criteria is still not a
fabrication-ready deliverable.

**Independent Test**: Can be fully tested by reviewing the manufacturing
readiness package and confirming that it defines footprint manufacturability,
assembly assumptions, procurement evidence, and a bring-up or production-test
expectation for each critical subsystem.

**Acceptance Scenarios**:

1. **Given** the design is approaching fabrication release, **When** the manufacturing-readiness package is reviewed, **Then** it states the DFM assumptions, assembly constraints, and footprint-review expectations for the controller as a complete board rather than only as schematic intent.
2. **Given** procurement readiness is required, **When** the BOM package is reviewed, **Then** each fabrication-critical item shows at least one credible source path, lifecycle or availability status when known, and any alternate or risk note required for ordering confidence.
3. **Given** first-article bring-up is part of fabrication readiness, **When** the verification package is reviewed, **Then** it defines the minimum bring-up and test expectations for power, Ethernet link, relay actuation, supervised inputs, retained event logging, and service access without relying on undocumented bench knowledge.

---

### User Story 4 - Preserve The Existing Controller Contracts While Finalizing Parts (Priority: P4)

As a system owner, I want fabrication closure work to preserve the controller's
existing electrical and operational contracts so that exact part selection does
not silently change the product architecture already accepted in earlier
milestones.

**Why this priority**: Fabrication closure is valuable only if it finalizes the
agreed design rather than re-opening the core architecture.

**Independent Test**: Can be fully tested by comparing the fabrication-ready
package against the prior milestone contracts and confirming that the declared
part selections still uphold the same power-domain boundaries, installer-facing
interfaces, reader modes, retention behavior, and service separation.

**Acceptance Scenarios**:

1. **Given** the controller previously established PoE-fed logic power and separate external lock power, **When** final part selections are reviewed, **Then** no approved BOM or footprint change collapses those domains or turns the relay path into a logic-powered lock driver.
2. **Given** the controller previously established OSDP, Wiegand, RTC-backed retention, SPI event logging, and separate service access, **When** the final fabrication package is reviewed, **Then** those functions remain explicitly supported or any narrowing of scope is called out as a formal product decision rather than an accidental consequence of part selection.
3. **Given** fabrication readiness is being claimed, **When** the readiness statement is reviewed, **Then** it explicitly states that the feature is incremental to Features 001 and 002 and preserves their accepted architectural and electrical contracts.

### Edge Cases

- What happens when the preferred exact part becomes unavailable after footprint lock but before fabrication release?
- What happens when a connector family fits the electrical intent but cannot meet assembly access, field wire gauge, enclosure clearance, or placement constraints?
- What happens when a magjack or discrete magnetics choice meets network intent but creates unresolved shield, keepout, or board-edge mechanical risk?
- What happens when the chosen relay package meets coil and contact intent but cannot satisfy suppression, creepage, or assembly-clearance expectations for the lock-output region?
- What happens when the event-buffer capacitor or RTC retention support choice meets nominal function but cannot guarantee the expected power-fail behavior during abrupt loss of power?
- What happens when a terminal block family is electrically acceptable but lacks sourcing stability, alternate options, or compatible footprint variants for manufacturing continuity?
- What happens when a board can be assembled in low volume but not by the intended contract manufacturer without footprint, stencil, or handling changes?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST preserve the controller architecture and electrical boundaries established in Features 001 and 002, including PoE-fed logic and networking, external installer-supplied lock power switched only through a dry relay boundary, distinct OSDP and Wiegand reader paths, retained event logging, and service access that remains separate from installer wiring.
- **FR-002**: The system MUST define which previously provisional or placeholder components are fabrication-critical for this milestone, including at minimum the Ethernet connector and magnetics implementation, relay package, relay contact protection, event-buffer capacitor, and installer-facing terminal block families.
- **FR-003**: The system MUST produce an exact approved BOM decision for every fabrication-critical component unless that component is explicitly tracked as an unresolved fabrication blocker with documented closure criteria.
- **FR-004**: Every approved BOM decision MUST identify the exact manufacturer part number, package, intended footprint, electrical role, and sourcing expectation needed for fabrication release.
- **FR-005**: Every fabrication-critical BOM item MUST state whether it has an approved alternate source, a footprint-compatible alternate, or a justified single-source exception.
- **FR-006**: The system MUST lock the Ethernet physical implementation by naming the approved LAN-entry strategy, the approved connector or connector-plus-magnetics arrangement, the field-side protection expectations, and any mechanical or placement constraints required for fabrication and assembly.
- **FR-007**: The system MUST lock the lock-output physical implementation by naming the approved relay package, contact form, coil-control assumptions, contact-protection approach, installer-facing connection method, and any mechanical or creepage constraints required for fabrication and assembly.
- **FR-008**: The system MUST resolve placeholder retention-support hardware, including the event-buffer capacitor and any associated retained-power support parts, into approved parts or explicit fabrication blockers with measurable selection criteria.
- **FR-009**: The system MUST resolve generic or family-only installer connector assumptions into approved connector families and exact part decisions, or into explicit blockers with closure criteria, for all external wiring points needed by the one-door controller.
- **FR-010**: The system MUST verify that every fabrication-critical approved part is backed by a manufacturable footprint suitable for the intended assembly method and board process.
- **FR-011**: The system MUST define the manufacturing-readiness package required for this milestone, including DFM expectations, assembly-suitability expectations, footprint-review expectations, and any handling or process constraints that affect first-article fabrication.
- **FR-012**: The system MUST define the procurement-readiness package required for this milestone, including source-path expectations, availability or lifecycle notes when known, alternate-part policy, and the criteria for accepting or rejecting sourcing risk.
- **FR-013**: The system MUST define the minimum bring-up and test expectations required before the board can be treated as fabrication-ready, including power-domain checks, Ethernet link verification, relay actuation verification, supervised-input verification, retention-behavior verification, and service-access verification.
- **FR-014**: The system MUST identify the review artifacts needed to prove fabrication readiness, including the BOM status view, footprint status view, manufacturing-readiness notes, procurement-readiness notes, and bring-up or production-test expectations.
- **FR-015**: The system MUST make unresolved fabrication blockers explicit and must not declare the controller fabrication-ready while any fabrication-critical part, footprint, assembly constraint, or procurement gate remains unclosed.
- **FR-016**: The system MUST preserve the accepted hardware-interface and operational-behavior contracts from Features 001 and 002 when locking exact parts, and any deviation from those contracts MUST be documented as an intentional scope change requiring explicit review.
- **FR-017**: The system MUST label the resulting design state unambiguously as fabrication-ready only when the BOM, footprints, manufacturing expectations, procurement expectations, and bring-up expectations are all complete enough for first-article release.

### Key Entities *(include if feature involves data)*

- **Fabrication-Critical Part**: A component whose exact selection, package, footprint, sourcing status, or physical implementation can block fabrication release if left provisional.
- **Approved BOM Line**: A final part decision containing the exact manufacturer part, package, footprint ownership, electrical role, and sourcing status used for fabrication release.
- **Fabrication Blocker**: A named unresolved issue that prevents a part, footprint, process assumption, or sourcing path from being treated as ready for first-article fabrication.
- **Ethernet Physical Implementation**: The approved LAN-entry hardware decision, including connector, magnetics approach, protection boundary, and mechanical placement expectations.
- **Lock-Output Physical Implementation**: The approved relay and protection decision for switching the installer-supplied lock circuit while preserving the dry-contact boundary.
- **Connector Family Decision**: The approved installer-facing connection strategy for external wiring, including the exact family and part selections needed for assembly and service.
- **Manufacturing-Readiness Package**: The set of DFM, footprint, assembly, and process expectations that define whether the board can be fabricated and assembled with acceptable risk.
- **Procurement-Readiness Package**: The set of sourcing, availability, alternate-part, and lifecycle expectations that define whether the board can be ordered with acceptable supply risk.
- **Bring-Up Verification Package**: The minimum first-article test and checkout expectations used to prove the fabricated board can be powered, linked, actuated, and serviced as intended.
- **Contract Preservation Statement**: The explicit statement that exact part selection does not alter the previously accepted power, interface, or operational boundaries without review.

## Assumptions

- This feature is the next incremental milestone after the review-ready controller hardware defined in Feature 002.
- Fabrication readiness means the board is ready for first-article release planning, not that field qualification or production scaling is complete.
- The controller architecture accepted in Features 001 and 002 remains in force unless a deliberate scope change is explicitly documented.
- Exact vendor-backed part selection is expected for fabrication-critical items wherever sourcing conditions permit stable approval.
- If a vendor or exact part cannot be responsibly locked because current sourcing is uncertain, the spec must treat that item as a fabrication blocker with explicit acceptance criteria rather than inventing false certainty.
- Ethernet entry, relay switching, retention support, and installer-facing connectors are the highest-priority areas for fabrication closure because they combine electrical, mechanical, assembly, and sourcing risk.
- DFM, manufacturable footprints, assembly suitability, procurement readiness, and bring-up expectations are all required parts of fabrication readiness for this repo.
- The board remains a one-door controller with centralized management over Ethernet and local fallback behavior during management interruption.

## Dependencies

- Availability of approved physical parts and footprints for Ethernet entry, relay switching, retention support, and installer-facing connectors.
- Availability of procurement evidence sufficient to judge source continuity, alternates, and lifecycle risk for fabrication-critical items.
- Availability of footprint and package reviews that can confirm assembly suitability for the intended fabrication path.
- Availability of a bring-up or production-test definition covering the board's critical functions.
- Availability of board-space, board-edge, creepage, and enclosure assumptions needed to validate exact connector and relay selections.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: One hundred percent of fabrication-critical placeholders inherited from the prior milestone are either converted into approved BOM lines or listed as explicit fabrication blockers with closure criteria and owner-visible status.
- **SC-002**: One hundred percent of installer-facing Ethernet, lock, reader, supervised-input, power, and service interfaces are mapped to approved physical connection decisions or explicit blockers before fabrication-ready status is claimed.
- **SC-003**: Reviewers can identify, from the fabrication-readiness package alone, the exact approved Ethernet entry implementation, the exact approved relay lock-output implementation, the resolved event-buffer or retention-support choice, and the approved terminal-family decisions without relying on undocumented tribal knowledge.
- **SC-004**: Every fabrication-critical approved part has an associated manufacturable footprint decision and assembly-suitability statement before first-article release planning begins.
- **SC-005**: The procurement-readiness package covers all fabrication-critical approved parts with source-path status and alternate-part treatment sufficient for reviewers to distinguish acceptable sourcing risk from release-blocking risk.
- **SC-006**: The bring-up verification package defines the minimum checks for power, Ethernet link, relay switching, supervised inputs, retained event behavior, and service access so a first article can be evaluated without undocumented bench procedures.
- **SC-007**: Fabrication-ready status is unambiguous, and no reviewer needs to infer whether the design is still review-ready versus fabrication-ready from partial BOM or footprint closure.
