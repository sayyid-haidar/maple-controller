# Research: Review-Ready Controller Hardware

## Decision 1: Use a single MCU-class controller with integrated Ethernet MAC and external RMII PHY

**Decision**: Standardize the next hardware milestone on a single MCU-class
controller that owns door logic, local fallback, event logging, and network
management, while using an external 10/100 RMII PHY rather than a Linux MPU,
dual-processor architecture, or a separate SPI Ethernet controller.

**Rationale**: A one-door controller does not need the software complexity,
power draw, boot time, or support burden of a Linux-class MPU. An MCU with an
integrated Ethernet MAC keeps deterministic local control, simplifies reset and
watchdog behavior, and still supports RTC, FRAM, RS-485, Wiegand, and service
interfaces without introducing a second major controller device. Using an
external RMII PHY keeps the LAN boundary reviewable and aligns with public
industrial-controller patterns.

**Alternatives considered**:

- Linux MPU with integrated MAC/PHY: rejected because it increases boot,
  security, storage, and recovery complexity for a one-door controller.
- MCU plus SPI Ethernet controller: rejected because it adds latency and a less
  review-friendly network boundary than a native MAC plus RMII PHY path.
- Dual-controller split between access logic and communications: rejected
  because it creates unnecessary firmware and debug complexity at this scope.

## Decision 2: Use shielded RJ45 magjack entry with PoE extraction and explicit MAC/PHY/isolation boundary

**Decision**: Keep Ethernet entry at a shielded RJ45 magjack with integrated
10/100 magnetics, center-tap PoE extraction, and a controller-facing RMII PHY
boundary that remains clearly separate from field lock wiring.

**Rationale**: The controller needs a reviewable LAN path for central
management, but installer and reviewer expectations are best served by a common
magjack-centered 10/100 Ethernet front end. This keeps the magnetics and cable
isolation boundary explicit, matches IEEE 802.3af assumptions, and leaves the
controller-facing interface limited to RMII plus MDIO/MDC and reset/clock
signals.

**Alternatives considered**:

- Discrete RJ45 plus separate magnetics module: rejected for this phase because
  an integrated magjack reduces ambiguity in board-edge planning.
- External Ethernet dongle or mezzanine: rejected because it weakens the review
  package and pushes core architecture decisions out of the board design.

## Decision 3: Use PoE PD intake to isolated 12V intermediate rail, then 5V and 3.3V downstream rails

**Decision**: Model the controller power chain as RJ45/PoE entry to a PoE PD
front end, then an isolated 12V intermediate rail, followed by regulated 5V and
3.3V rails for controller logic, PHY, RTC, FRAM, service circuitry, and reader
auxiliary functions that stay within the board’s logic/communications scope.

**Rationale**: A 12V intermediate rail provides headroom for reader auxiliary
power, RS-485 common-mode tolerance, and downstream conversion efficiency while
keeping the dry-relay external lock path entirely outside the PoE budget. The
5V and 3.3V split gives a reviewable home for service logic, transceivers,
status elements, and the controller core without demanding a final regulator
stack today.

**Alternatives considered**:

- Direct 48V to 3.3V conversion only: rejected because it leaves 5V and reader
  auxiliary assumptions under-specified.
- Non-isolated PoE conversion: rejected because it weakens the review story for
  Ethernet power boundary handling and field robustness.
- Wet lock power derived from PoE: rejected because Feature 001 explicitly keeps
  lock current outside the PoE-fed logic domain.

## Decision 4: Use a dedicated I2C RTC with backup domain for timestamp continuity

**Decision**: Use a dedicated low-power I2C RTC with interrupt/alarm output and
its own backup domain, targeting a coin-cell-backed or equivalent retained-time
implementation rather than relying on the MCU internal RTC alone.

**Rationale**: Review-ready status requires a timestamp source that survives MCU
resets and building-side power interruptions well enough to support offline
event ordering. A dedicated RTC keeps timekeeping decoupled from firmware update
cycles and brownout behavior, while an I2C connection plus interrupt pin keeps
integration simple and visible to reviewers.

**Alternatives considered**:

- MCU internal RTC only: rejected because retention quality and serviceability
  vary too much across controller choices.
- Network time only after reconnect: rejected because offline event ordering
  would become ambiguous during extended outages.
- Supercap-only retention with no defined backup domain: rejected because the
  retention duration would remain too vague for review.

## Decision 5: Use SPI FRAM-class nonvolatile event storage instead of NOR flash for the event journal

**Decision**: Standardize the offline event store on an SPI FRAM-class device
with sufficient density for at least 10,000 event records and power-loss-safe
journal semantics.

**Rationale**: FRAM avoids flash endurance management, erase latency, and write
coalescing logic for a controller that may need to persist bursts of local
access, alarm, and sync events during unstable power or network conditions. It
is a strong fit for review because the journaling assumption is easy to reason
about and does not require a filesystem or complex wear-leveling design.

**Alternatives considered**:

- SPI NOR flash: rejected because erase/write behavior complicates reliable
  power-loss logging.
- Battery-backed SRAM: rejected because it introduces another retention battery
  dependency without improving long-term persistence.
- eMMC or SD storage: rejected because it is disproportionate to a one-door
  controller and expands validation scope unnecessarily.

## Decision 6: Use a half-duplex RS-485 transceiver with explicit bias, selectable termination, and surge protection

**Decision**: Implement the OSDP physical layer around a single half-duplex
RS-485 transceiver, with controller-side UART plus direction control, field-side
TVS protection, bias resistors, and a termination option that can be stuffed or
left open depending on deployment topology.

**Rationale**: This keeps OSDP support concrete without collapsing the board into
an OSDP-only product. Reviewers can see the complete path from MCU UART to field
wiring while still preserving Wiegand as a separate compatibility interface.
Selectable termination and explicit biasing make the board practical for field
bus review and manufacturing without forcing the final population policy yet.

**Alternatives considered**:

- Fixed termination always populated: rejected because installer topology may
  vary and end-of-line assumptions should remain configurable.
- Isolated RS-485 transceiver at this stage: rejected because it adds cost and
  footprint complexity before the review package proves it is required.
- OSDP omitted until later: rejected because the feature exists specifically to
  make the reader interface review-ready.

## Decision 7: Use a Tag-Connect-style 10-pin service connector for SWD, UART, reset, and recovery access

**Decision**: Reserve a compact Tag-Connect-style 2x5 1.27mm service footprint
for SWD, UART console, reset, boot/recovery strap, ground, and target-reference
signals, located away from installer terminals.

**Rationale**: The board needs manufacturing bring-up and recovery access, but a
populated header is not desirable on an installed controller. A Tag-Connect
footprint keeps service access distinct, low-profile, and compatible with
factory or bench tooling while still exposing the signals reviewers expect to
see for firmware recovery.

**Alternatives considered**:

- Reusing installer terminals for service access: rejected because it violates
  the requirement to keep service and field wiring distinct.
- USB connector as the only debug path: rejected because it does not cover full
  programming and recovery needs.
- Large boxed ARM debug header: rejected because it consumes more board edge and
  enclosure volume than necessary for this product class.

## Decision 8: Standardize installer-facing wiring on RJ45 plus pluggable terminal-block families by current class

**Decision**: Use a shielded RJ45 magjack for Ethernet entry, 5.08mm pluggable
terminal blocks for external lock supply and dry relay contacts, and 3.81mm
pluggable terminal blocks for reader power/data and supervised field inputs.

**Rationale**: This combination is review-friendly, serviceable in low-volume
assembly, and aligned with expected wire gauge separation between relay/lock
circuits and lower-current signal interfaces. It also makes silkscreen and
mechanical planning straightforward without forcing bespoke cable harnesses.

**Alternatives considered**:

- Fixed screw terminals only: rejected because pluggable blocks improve service
  replacement and bench bring-up.
- JST/Molex wire-to-board connectors for field wiring: rejected because they are
  less installer-friendly for door-controller terminal work.
- Single connector family for every external interface: rejected because relay
  contact and external supply paths need larger pitch and current headroom than
  low-current reader or monitored inputs.