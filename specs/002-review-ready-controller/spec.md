# Feature Specification: Review-Ready Controller Hardware

**Feature Branch**: `002-review-ready-controller`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "Create a follow-on feature that moves the one-door access controller toward review-ready hardware by defining controller-core, Ethernet, PoE conversion, RTC/event storage, RS-485, service/debug, and installer connector assumptions while preserving the existing one-door architecture and deployment model."

## User Scenarios & Testing *(mandatory)*

For this repository, every user story MUST identify the affected components,
nets, footprints, or board constraints and state the snapshot, review package,
or other artifact that proves the story works independently.

This feature builds directly on the exploratory one-door controller and narrows
the open architectural space so the next hardware iteration can be reviewed for
part-family suitability, field wiring practicality, and manufacturability. It
does not reproduce proprietary schematics. Instead, it translates the existing
door-controller intent into a concrete review target with explicit placeholder
device classes, service access expectations, and installer-facing connector
families.

### User Story 1 - Lock In The Controller Core Direction (Priority: P1)

As a hardware reviewer, I want the one-door controller to name a concrete
controller-core placeholder strategy, including how Ethernet connectivity is
partitioned, so that the design is no longer blocked on whether the product is
built around a network-capable controller or an MCU plus separate Ethernet
device path.

**Why this priority**: The controller core determines reset strategy, memory
interfaces, clocking, network topology, firmware service access, and how every
other subsystem attaches to the board.

**Independent Test**: Can be fully tested by reviewing the design package and
confirming that one primary controller-core placeholder, one Ethernet MAC/PHY
strategy, named service nets, and the expected clock/reset dependencies are all
documented without unresolved role ambiguity.

**Acceptance Scenarios**:

1. **Given** the board is being reviewed for the next milestone, **When** the reviewer inspects the controller section, **Then** they can identify whether the design assumes a single network-capable controller or a controller paired with a separate Ethernet physical-layer path.
2. **Given** the Ethernet path is part of the review, **When** the reviewer inspects the LAN architecture, **Then** they can see the intended MAC/PHY boundary, magnetics/isolation boundary, and the controller-facing signals required to support central management over LAN.
3. **Given** the system must keep local fallback behavior, **When** the controller core is specified, **Then** the documented placeholder strategy still supports local door decisions, offline buffering, and later synchronization after network recovery.

---

### User Story 2 - Make The Power And Retention Chain Reviewable (Priority: P2)

As a hardware reviewer, I want the PoE-fed logic power path, RTC path, and
nonvolatile event retention path to have concrete placeholder assumptions so
that power-fail behavior, event retention, and rail planning can be reviewed
before detailed part selection.

**Why this priority**: The current design remains exploratory until reviewers can
trace how logic power is derived from PoE, how timekeeping survives resets or
outages, and how buffered events survive power interruptions.

**Independent Test**: Can be fully tested by reviewing that the design package
shows a PoE input path, intermediate and logic rail assumptions, an RTC device
class, an event-store device class, and the expected power-fail or retention
signals required for outage handling.

**Acceptance Scenarios**:

1. **Given** the controller logic is powered from PoE only, **When** the reviewer inspects the power architecture, **Then** they can follow a complete placeholder path from Ethernet power intake through logic-network rails without any dependency on the external lock power domain.
2. **Given** the controller must timestamp and preserve events, **When** the reviewer inspects the retention architecture, **Then** they can identify one RTC placeholder path and one nonvolatile event-store placeholder path with clear assumptions for retained operation across power interruption.
3. **Given** lock power remains external, **When** the reviewer checks the power boundaries, **Then** the design still keeps lock current outside the PoE-fed logic/network domain and preserves dry-relay isolation between the controller and field lock supply.

---

### User Story 3 - Make Reader And Service Interfaces Concrete (Priority: P3)

As an integrator, I want the OSDP path, Wiegand path, RS-485 transceiver path,
and service/debug access strategy to use defined placeholder interface classes
so that the controller can be reviewed for installation practicality,
commissioning, and recovery workflows.

**Why this priority**: A controller intended for field deployment must expose a
clear service path and reader interface strategy; otherwise, review-ready status
cannot be claimed even if the lock and power architecture are sound.

**Independent Test**: Can be fully tested by reviewing that the board package
names one RS-485 transceiver class for OSDP, preserves Wiegand support, and
defines at least one field-service connector strategy with clearly named boot,
reset, console, or programming access signals.

**Acceptance Scenarios**:

1. **Given** OSDP over RS-485 is a required reader mode, **When** the reviewer inspects the reader interface section, **Then** they can identify a complete half-duplex RS-485 placeholder path including controller-side signals and field-side protection or biasing expectations.
2. **Given** Wiegand compatibility must remain available, **When** the reviewer inspects the same section, **Then** the design still reserves a distinct Wiegand path without collapsing the product into an OSDP-only controller.
3. **Given** the board will need manufacturing bring-up and field recovery, **When** the reviewer inspects the service strategy, **Then** they can identify a concrete debug or commissioning connector approach and the signals that must be reachable without disturbing installer wiring.

---

### User Story 4 - Standardize Installer-Facing Wiring (Priority: P4)

As an installer, I want the controller to commit to concrete connector families
for door hardware, reader wiring, and maintenance access so that the board can
be evaluated as a manufacturable product rather than an abstract lab assembly.

**Why this priority**: Installer-facing wiring choices influence enclosure size,
silkscreen clarity, field replacement, creepage/clearance, and serviceability,
but they should be finalized after the core controller and power choices are
bounded.

**Independent Test**: Can be fully tested by reviewing that each external field
interface is mapped to a declared connector family and that any still-provisional
interfaces are explicitly called out as open review items rather than hidden
ambiguity.

**Acceptance Scenarios**:

1. **Given** the installer needs to wire lock relay contacts, door contact, request-to-exit, reader buses, and auxiliary monitoring, **When** they inspect the design package, **Then** each interface is associated with a concrete field-wiring connector family suitable for low-volume manufacturable assembly.
2. **Given** service access should not be confused with field wiring, **When** the reviewer checks the external interface table, **Then** the service/debug connector strategy is distinct from installer-facing terminal connections.
3. **Given** some components may remain provisional, **When** the reviewer checks the feature readiness statement, **Then** any unresolved connector, footprint, or sourcing risks are explicitly identified instead of being implied complete.

### Edge Cases

- What happens when the preferred controller-core direction becomes unavailable and the board must preserve the same interface partition using a fallback controller class?
- What happens when the PoE power budget is sufficient for logic and networking but not for every planned auxiliary rail or retention feature?
- What happens when the RTC backup source, event-store retention assumptions, or write endurance are inadequate for offline event bursts?
- What happens when RS-485 biasing, surge protection, or common-mode tolerance forces a different placement or connector arrangement than the exploratory layout allowed?
- What happens when the chosen service connector is convenient for bring-up but inaccessible once the board is installed in its intended enclosure?
- What happens when an installer-facing connector family is easy to source but unsuitable for expected field current, wire gauge, creepage, or replacement workflow?
- What happens when a selected placeholder device class is acceptable for review but still lacks a stable footprint, second source, or procurement confidence?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST preserve the one-door controller architecture from Feature 001, including PoE-fed logic and networking, separate external lock power switched through a dry relay, support for OSDP and Wiegand readers, centralized management, and local fallback behavior during network interruption.
- **FR-002**: The system MUST define a primary controller-core placeholder direction for the next hardware milestone and clearly state whether Ethernet is assumed to be handled by a network-capable controller or by a controller paired with a separate Ethernet physical interface path.
- **FR-003**: The system MUST document the controller-core support signals needed for review, including reset, boot or recovery access, clocking assumptions, firmware service access, and the control interfaces required to attach reader, retention, and status subsystems.
- **FR-004**: The system MUST define the intended Ethernet strategy for central management, including a reviewable MAC-to-PHY partition assumption, magnetics or isolation boundary assumptions, and the LAN-side interface that remains separate from lock power wiring.
- **FR-005**: The system MUST define a reviewable PoE-to-logic power conversion chain with explicit placeholder stages from Ethernet power intake to the logic and communications rails used by the controller, reader interfaces, retention devices, and service circuitry.
- **FR-006**: The system MUST preserve the architectural boundary that the external lock power path is not sourced by PoE logic power and is only controlled through the documented dry-relay lock path.
- **FR-007**: The system MUST define a concrete RTC placeholder path with stated assumptions for time retention during reset or power interruption and for how the controller obtains timestamps for offline and synchronized event records.
- **FR-008**: The system MUST define a concrete nonvolatile event-store placeholder path with stated assumptions for retained event storage across outages, offline buffering, and later upload to central management.
- **FR-009**: The system MUST document a reviewable RS-485 transceiver path for OSDP support, including controller-side signaling, field-side wiring expectations, and any required biasing, termination, or protection assumptions.
- **FR-010**: The system MUST preserve a distinct Wiegand path alongside the RS-485 path so installers and reviewers can see that both reader options remain supported in the product scope.
- **FR-011**: The system MUST define a service or debug connector strategy that supports manufacturing bring-up, firmware recovery, and field diagnostics without reusing installer-facing lock or reader terminals for those workflows.
- **FR-012**: The system MUST assign concrete connector-family assumptions for installer-facing interfaces, at minimum covering Ethernet entry, external lock relay contacts, door contact, request-to-exit, reader connections, tamper or auxiliary monitoring, and any required external power-monitoring interfaces.
- **FR-013**: The system MUST identify which controller, power, retention, interface, and connector selections are placeholders suitable for design review versus which remain provisional due to sourcing, footprint, or qualification risk.
- **FR-014**: The system MUST define the minimum review artifacts needed to evaluate the controller core, power chain, retention path, RS-485 path, service access strategy, and installer connector families as a coherent next-step hardware design.
- **FR-015**: The system MUST keep installer-visible wiring intent explicit enough that reviewers can map every named field function to a connector family, power domain, and controller-side subsystem without relying on proprietary reference designs.

### Key Entities *(include if feature involves data)*

- **Controller Core Placeholder**: The primary processing and control element assumed for the next milestone, including its networking responsibility, boot behavior, and attachment points for peripheral subsystems.
- **Ethernet Strategy**: The documented assumption for how central-management LAN connectivity is realized, including controller-to-network partitioning and the building-side isolation boundary.
- **PoE Conversion Chain**: The sequence of placeholder power stages that converts Ethernet-delivered power into the logic and communications rails used by the controller board.
- **RTC Path**: The timekeeping subsystem that preserves or restores accurate timestamps for access and fault events across resets or outages.
- **Event Store**: The nonvolatile retained storage path used to buffer access, alarm, and status records while the controller is offline or recovering.
- **RS-485 Reader Path**: The half-duplex field interface path used to support OSDP reader communication and its associated protection and biasing expectations.
- **Wiegand Reader Path**: The separate legacy reader path that preserves compatibility with installations not using OSDP.
- **Service Connector Strategy**: The defined bring-up and recovery access method for programming, console access, reset, or firmware recovery.
- **Installer Connector Family**: The chosen family class for field wiring terminations, such as pluggable terminal blocks or other serviceable installer-facing connectors, mapped to each external function.
- **Readiness Status**: The explicit declaration of which parts of the design are review-ready, which remain placeholder-based, and which are still exploratory.

## Assumptions

- The next milestone is still a hardware-definition step, not a final fabrication release.
- A 10/100 Ethernet management link is sufficient for the one-door controller product class.
- The controller-core decision can remain a placeholder between a network-capable controller and a controller plus separate Ethernet interface path, but the spec must reduce the ambiguity to one primary direction for review.
- The PoE power path is assumed to provide only the logic, networking, retention, and service rails required by the controller board.
- Lock power remains a separate installer-supplied domain that is switched by dry relay contacts and is not budgeted from PoE.
- The RTC is assumed to be a dedicated low-power timekeeping device with retained time across controller resets.
- The nonvolatile event store is assumed to be a retained memory device sized for meaningful offline buffering rather than a transient cache only.
- OSDP continues to use an RS-485 physical path and Wiegand remains available for legacy reader compatibility.
- The service connector may be compact and manufacturing-oriented, but it must still be physically distinct from installer field wiring.
- Installer-facing wiring is assumed to use widely available serviceable connector families appropriate for door-controller field wiring rather than ad hoc flying leads.
- This feature intentionally uses original architecture and public capability patterns; it does not copy proprietary schematics or exact vendor circuitry.

## Dependencies

- Availability of one controller-core direction that can credibly support Ethernet management, local fallback, retained event logging, and the required door-control interfaces.
- Availability of placeholder PoE, logic-rail, RTC, retained-memory, and RS-485 device classes that can be represented with footprints acceptable for review.
- Availability of connector families suitable for low-voltage field wiring, relay contacts, and manufacturing or service access.
- Availability of enough enclosure and board area to separate installer wiring, service access, Ethernet magnetics or isolation, and logic circuitry in a reviewable layout.
- Availability of sourcing assumptions or alternate options for any placeholder device class that may still be provisional at review time.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Reviewers can identify, from the specification and resulting review artifacts alone, one unambiguous controller-core direction, one Ethernet strategy, one PoE conversion chain, one RTC path, one retained event-store path, one RS-485 path, one Wiegand path, and one service connector strategy.
- **SC-002**: At least 90% of installer-facing interfaces required for a standard one-door deployment are mapped to named connector families and explicit power-domain ownership before the feature is considered ready for planning.
- **SC-003**: The review package states whether each major subsystem is review-ready or still provisional, with no hidden ambiguity about controller, power, retention, reader, or connector selections.
- **SC-004**: A reviewer can determine from the feature artifacts alone that PoE powers only logic and networking while lock actuation remains on a separate external supply controlled by dry relay contacts.
- **SC-005**: The feature artifacts provide enough detail for the next planning phase to break controller-core, power-chain, retention, interface, and connector work into implementable tasks without reopening the basic product architecture decided in Feature 001.
