# Feature Specification: One-Door Access Controller

**Feature Branch**: `001-door-access-controller`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "saya mau membuat access control yang bisa handle 1 pintu, mirip seperti produknya zkteco c3 atau Verkada, sebelum buka ini kamu harus riset ke internet soal skematik dll nya, pastinya yang harus biasa adalah koneksi via lan untuk transfer data dll, sisanya riset ke internet sejelas2nya, cari skematik mereka dan pelajarin"

## Clarifications

### Session 2026-03-23

- Q: Reader interface mana yang harus didukung? → A: Both OSDP / RS-485 and Wiegand.
- Q: Strategi power mana yang harus dipakai? → A: PoE for logic/network plus separate external lock power.
- Q: Model lock output mana yang harus dipakai? → A: Dry relay control compatible with 12V and 24V external lock supplies.
- Q: Mode lock behavior mana yang harus didukung? → A: Support both fail-safe and fail-secure.
- Q: Model manajemen controller mana yang harus dipakai? → A: Centrally managed with local fallback.

## User Scenarios & Testing *(mandatory)*

For this repository, every user story MUST identify the affected components,
nets, footprints, or board constraints and state the snapshot, review package,
or other artifact that proves the story works independently.

Public research used for this specification focused on capability classes that
appear in one-door Ethernet access controllers such as ZKTeco C3-series and
Verkada AC12-class products: LAN connectivity, external reader support, lock
relay control, door position monitoring, request-to-exit inputs, local decision
making during network outages, and event upload when connectivity returns. This
specification intentionally does not reproduce or depend on proprietary vendor
schematics. The selected power model uses PoE for controller logic and network
operation, while the lock path is powered from a separate external supply and is
controlled through a dry relay compatible with 12V and 24V lock circuits.

### User Story 1 - Control One Networked Door (Priority: P1)

As a product owner, I want a single controller that can manage one secured door
over a LAN connection so that the door can enforce access rules while remaining
connected to a central management system without requiring the door lock current
to be sourced from the controller's PoE logic power.

**Why this priority**: This is the minimum viable product. Without reliable one-door
control with LAN connectivity, the design does not satisfy the core product goal.

**Independent Test**: Can be fully tested by demonstrating a single-door controller
with Ethernet connectivity, one dry-relay lock output compatible with 12V and
24V external lock supplies, one door-state input, one exit input, and one
credential-reader path in the circuit review artifacts.

**Acceptance Scenarios**:

1. **Given** the controller is powered and connected to a LAN, **When** it receives a valid access decision from its configured credential path, **Then** it provides the correct unlock control for one door and records the event for management upload.
2. **Given** the controller is installed on one door, **When** the door sensor or request-to-exit input changes state, **Then** the controller can distinguish door-open, door-closed, and exit-request conditions for that door.
3. **Given** the deployment uses either fail-safe or fail-secure lock hardware, **When** the installer configures the controller for the selected lock behavior, **Then** the controller can operate the door correctly without requiring a different controller design.
4. **Given** the controller logic is powered by PoE and the lock path has its own external supply, **When** an unlock action is requested, **Then** the controller can actuate the lock path through a dry relay without making lock-current sizing a dependency of the PoE logic domain.

---

### User Story 2 - Keep Operating During Network Interruptions (Priority: P2)

As an operator, I want the door to continue enforcing local access behavior when
the network is temporarily unavailable so that the secured door does not become
unusable or unmanaged during normal LAN disruptions.

**Why this priority**: Products in this class are expected to keep operating at the
edge. Network resilience is a core differentiator for access controllers connected
through Ethernet.

**Independent Test**: Can be fully tested by reviewing that the design includes the
signals, interfaces, and documented behavior needed for local decision making,
event buffering, and state recovery after reconnect.

**Acceptance Scenarios**:

1. **Given** the controller temporarily loses LAN connectivity, **When** a credential is presented or an exit request occurs, **Then** the controller continues door control according to locally available rules and preserves event information for later synchronization.
2. **Given** connectivity is restored after an outage, **When** the controller reconnects to management, **Then** it can transmit buffered events and recover to a synchronized operational state without requiring door rewiring or manual hardware reset.

---

### User Story 3 - Integrate With Standard Door Hardware (Priority: P3)

As an installer, I want the controller to work with standard door hardware and
common credential reader interfaces, including OSDP / RS-485 and Wiegand, so
that the system can be deployed in a real building without a custom ecosystem.

**Why this priority**: Deployment flexibility matters, but it is secondary to the
core one-door controller itself.

**Independent Test**: Can be fully tested by reviewing that the circuit supports one
door lock path, one door-position path, one exit path, tamper/power monitoring,
and external reader connectivity expectations documented in the feature artifacts.

**Acceptance Scenarios**:

1. **Given** an installer uses common door hardware, **When** they connect the lock, door contact, exit button, and either an OSDP / RS-485 reader or a Wiegand reader, **Then** the controller exposes dry-relay lock control compatible with 12V and 24V external lock supplies without needing product-specific adapters.
2. **Given** the door environment needs operational monitoring, **When** tamper or power-fault conditions occur, **Then** the controller can surface those conditions as distinct operational states.
3. **Given** the installer uses either fail-safe or fail-secure lock hardware, **When** they wire the lock according to the documented policy, **Then** the controller supports the selected lock behavior through the same control architecture.

---

### User Story 4 - Support Managed Administration (Priority: P4)

As a security administrator, I want the controller to exchange events and
configuration over LAN so that a central system can manage permissions, monitor
door activity, and maintain audit visibility.

**Why this priority**: This is important for enterprise usability, but it depends on
the controller first being able to operate the door safely and locally.

**Independent Test**: Can be fully tested by reviewing that the design reserves the
connectivity, status, and service interfaces required for remote management and
firmware/configuration workflows.

**Acceptance Scenarios**:

1. **Given** the controller is online, **When** a central management system requests status or sends configuration updates, **Then** the controller provides enough networked interface capability to support monitoring and data exchange over LAN.
2. **Given** the controller temporarily loses connectivity to the central management system, **When** local door events continue to occur, **Then** the controller keeps enforcing local door decisions and buffers state for later synchronization.

### Edge Cases

- What happens when the credential reader path is connected but unavailable or unsupported for the configured door mode?
- What happens when the lock output is commanded to unlock but the door contact does not change state within the allowed interval?
- What happens when the exit button is pressed while the controller is offline and the buffered event store is near capacity?
- What happens when LAN is present but the controller cannot reach its management endpoint?
- What happens when backup power is degraded, input voltage is outside the expected range, or tamper is triggered during a door event?
- What happens when a required footprint, connector, magnetics, or isolation component is unavailable and must be marked provisional?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST represent a one-door access control controller with explicit circuit elements, nets, footprints, and board constraints.
- **FR-002**: The system MUST include LAN connectivity intended for data transfer, event upload, status reporting, and configuration exchange with a central management system.
- **FR-003**: The system MUST support one door-control path that can command an electric locking device powered from a separate external lock power domain through a dry relay compatible with both 12V and 24V lock supplies and report the commanded lock state.
- **FR-003A**: The system MUST support both fail-safe and fail-secure lock behavior through documented wiring and configuration policy.
- **FR-004**: The system MUST support one door-position sensing path so the system can distinguish at minimum open and closed door states.
- **FR-005**: The system MUST support at least one request-to-exit input path for normal egress handling.
- **FR-006**: The system MUST support external credential-reader integration through both OSDP / RS-485 and Wiegand interfaces.
- **FR-007**: The system MUST support local door operation when LAN connectivity is temporarily unavailable.
- **FR-008**: The system MUST preserve access events and operational state changes that occur during network interruption so they can be uploaded after reconnection.
- **FR-009**: The system MUST provide a distinct operational path for tamper or enclosure intrusion detection.
- **FR-010**: The system MUST provide a way to detect or report abnormal power conditions in both the PoE logic/network domain and the separate external lock power domain.
- **FR-011**: The system MUST document the expected PoE-fed logic/control domain, the separate external lock power domain, and any required isolation or protection boundaries between them.
- **FR-012**: The system MUST document the expected building-side interfaces for LAN, reader, lock, door contact, exit button, tamper, and maintenance/service access.
- **FR-013**: The system MUST identify whether the resulting design is exploratory, review-ready, or fabrication-ready.
- **FR-014**: The system MUST target centralized management over LAN with local fallback for door decisions, event retention, and state recovery during management-link interruptions.
- **FR-015**: The system MUST define the minimum review artifacts needed to verify one-door behavior, LAN connectivity intent, and outage-handling behavior.
- **FR-016**: The system MUST preserve explicit and reviewable interface definitions for all configuration, state, and installer-facing connections.

### Key Entities *(include if feature involves data)*

- **Door Controller**: The primary board-level controller responsible for managing one secured door, handling network connectivity, and coordinating all door-related inputs and outputs.
- **Credential Path**: The logical and physical interface by which external reader hardware or credential subsystems communicate door-unlock intent to the controller through OSDP / RS-485 or Wiegand.
- **Door State Path**: The sensing path that reports physical door status and supports monitoring functions such as held-open or forced-door conditions.
- **Exit Request Path**: The input path that authorizes normal egress independently of a credential presentation.
- **Lock Control Path**: The controlled output path that drives or enables an electric locking mechanism.
- **Relay Output Path**: The dry-relay-controlled installer-facing path that switches an external 12V or 24V lock circuit.
- **Lock Policy**: The configured operating behavior that determines whether the controlled door hardware behaves as fail-safe or fail-secure under power-loss conditions.
- **Event Record**: A retained record of access decisions, state changes, alarms, or operational faults that may need to be forwarded to a management system.
- **Management Link**: The LAN-based communication relationship between the controller and a remote management service or appliance.
- **Power Domain**: A defined electrical domain for logic, communications, reader support, and lock-related power/control behavior.
- **Power Architecture**: A dual-domain power model where PoE powers controller logic and networking while a separate external supply powers the lock path.

## Assumptions

- The scope is one physical door only.
- The feature is meant to match the product category and core capabilities of ZKTeco C3-100 or Verkada AC12-class controllers, not to clone or reverse engineer proprietary implementations.
- Ethernet LAN connectivity is mandatory and is treated as the primary management/data interface.
- PoE is the selected source for controller logic and network operation, while lock actuation uses a separate external power input.
- Lock actuation is controlled by a dry relay and must remain compatible with both 12V and 24V external lock supplies.
- The controller must be deployable with either fail-safe or fail-secure lock hardware.
- The first version prioritizes a controller board and building-side interfaces, not a complete end-to-end software management platform.
- Common access-control deployment expectations include lock control, door contact, request-to-exit, credential reader integration, tamper awareness, and local operation during temporary network loss.
- Credential reader compatibility explicitly includes both OSDP / RS-485 and Wiegand.
- The intended operational model is centrally managed over LAN with local fallback behavior during management-link interruption.
- Because proprietary vendor schematics are not assumed to be available for lawful reuse, this feature will rely on public product capabilities, common access-control architecture, and original circuit design decisions.

## Dependencies

- Availability of suitable LAN physical interface components, PoE power components, and associated protection/isolation parts.
- Availability of connectors and interface components appropriate for installer-facing door hardware wiring.
- Availability of footprints for the selected access-control interface components.
- Availability of an installer-facing external lock power input path sized for the chosen lock class.
- Availability of enough board area and power budget to separate logic/control functions from door-side interface requirements.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Reviewers can identify, from the spec and artifacts alone, one complete path each for LAN connectivity, lock control, door sensing, exit request, OSDP / RS-485 reader integration, and Wiegand reader integration.
- **SC-002**: The primary user story can be validated with the declared verification artifacts without unresolved connectivity or completeness issues.
- **SC-003**: The feature artifacts explicitly describe how centralized management works during normal operation and how the controller remains operable with buffered events during a temporary LAN or management-link outage.
- **SC-004**: At least 90% of installer-facing interfaces required for a standard one-door deployment are explicitly named and documented in the resulting design package.
- **SC-005**: Fabrication readiness status is unambiguous, and any provisional footprints or unresolved installer constraints are clearly called out before review completion.
