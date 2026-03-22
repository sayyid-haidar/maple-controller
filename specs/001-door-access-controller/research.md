# Research: One-Door Access Controller

## Decision 1: Use 10/100 Ethernet with PoE PD logic power, not Gigabit Ethernet

**Decision**: Model the controller around a 10/100 Ethernet front end with PoE
power delivery for logic/networking only.

**Rationale**: Public one-door controller products in this class commonly use
Ethernet plus PoE/PoE+ for low-bandwidth management traffic and installation
simplicity. A one-door controller does not need Gigabit throughput, while 10/100
Ethernet significantly lowers PHY, magnetics, routing, power-budget, and EMC
complexity. It also fits the requirement that lock current must not be sourced
from the PoE logic domain.

**Alternatives considered**:

- Gigabit Ethernet with PoE+: rejected because bandwidth is unnecessary for this
  controller class and would add cost and PCB complexity.
- External DC only: rejected because LAN + PoE is a core product requirement.

## Decision 2: Prefer OSDP over RS-485, but retain Wiegand compatibility

**Decision**: Support both OSDP/RS-485 and Wiegand on the board, while treating
OSDP as the preferred modern interface.

**Rationale**: OSDP provides bidirectional communication, longer cable runs,
device supervision, and secure channel capability over RS-485. Wiegand remains
important for installed-base compatibility and competitive parity with public
single-door controller products. Planning around both interfaces meets the spec
without locking the product into Wiegand's weaker security model.

**Alternatives considered**:

- Wiegand only: rejected because it would not match current best practice for
  new deployments and weakens the security posture.
- OSDP only: rejected because it would unnecessarily reduce retrofit
  compatibility.

## Decision 3: Use separate external 12V/24V lock power switched by a dry Form-C relay

**Decision**: Keep lock power external and switch the lock path through a dry
relay rated for standard access-control lock loads, with support for both
fail-safe and fail-secure wiring policies.

**Rationale**: Public controller examples and installer practice both favor dry
relay flexibility for maglocks, strikes, and mixed door hardware. Externalizing
lock power prevents PoE budgeting from being dominated by lock loads and reduces
board-side thermal and protection burden. Supporting both 12V and 24V is more
deployable than hard-coding one lock voltage.

**Alternatives considered**:

- Wet output only at 12V or 24V: rejected because it couples the controller to a
  single lock-power model.
- On-board selectable wet output: rejected because it adds power-conversion and
  thermal complexity while offering less field flexibility than dry switching.

## Decision 4: Use supervised dry inputs for door contact, REX, tamper, and fault sensing

**Decision**: Model the board with supervised dry-input channels for door state,
request-to-exit, tamper, and abnormal-power/fault sensing.

**Rationale**: Supervised inputs align with installer expectations and improve
diagnostics for forced door, held-open, tamper, or broken-wire conditions.
These channels fit the controller class better than raw unsupervised GPIO and
make the local fallback model more trustworthy.

**Alternatives considered**:

- Unsupervised inputs only: rejected because they provide weaker field
  observability and fault detection.
- No tamper/fault supervision: rejected because the spec explicitly expects
  operational monitoring and tamper awareness.

## Decision 5: Provide local fallback with on-board nonvolatile event buffering and RTC-backed ordering

**Decision**: Plan for local decision making backed by nonvolatile event storage
and stable event ordering, targeting at least 10,000 buffered events.

**Rationale**: Centralized management with local fallback requires the controller
to keep operating and retain a meaningful event backlog during LAN or management
outages. Public products in this category advertise edge operation and sizable
event retention. A 10,000-event target is a reasonable baseline for a one-door
controller while keeping memory requirements modest.

**Alternatives considered**:

- Volatile-only buffering: rejected because events would be lost on reboot or
  power interruption.
- Unlimited historical storage goal: rejected because it is unnecessary for the
  feature scope and makes memory planning vague.

## Decision 6: Use a 4-layer PCB with explicit protection zones

**Decision**: Treat this feature as a 4-layer board with separate placement zones
for Ethernet/PoE entry, logic/control, reader interfaces, and relay/lock wiring.

**Rationale**: PoE, Ethernet magnetics, RS-485, Wiegand, surge suppression, and
installer terminal wiring all benefit from stronger return paths and cleaner EMI
partitioning than a minimal 2-layer board would provide. Four layers simplify
power distribution, improve signal integrity, and reduce routing risk for a
mixed low-voltage/security controller.

**Alternatives considered**:

- 2-layer board: rejected because it increases routing and EMC risk around PoE,
  Ethernet, and installer-facing surge-protected interfaces.

## Decision 7: Keep the TSX design modular and typed by electrical concern

**Decision**: Implement the feature as a composition of typed TSX modules for
power domains, Ethernet/PoE, reader interfaces, supervised inputs, and relay
outputs rather than as one giant board function.

**Rationale**: The project constitution requires pure React-style circuit
components and explicit typing. Decomposing the controller by subsystem makes the
board easier to inspect, reuse, and validate, and it prevents placement logic
from becoming opaque.

**Alternatives considered**:

- Single-file monolithic board component: rejected because it would hinder review
  and make future feature additions risky.
