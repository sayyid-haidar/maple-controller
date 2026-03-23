# Hardware Interface Contract: Review-Ready Controller Hardware

## Purpose

Define the physical and electrical interface assumptions for the review-ready
one-door controller revision.

## Contract Summary

| Interface | Direction | Connector Family | Power Domain | Contract |
| --------- | --------- | ---------------- | ------------ | -------- |
| Ethernet / PoE LAN entry | In/Out | Shielded RJ45 magjack with integrated 10/100 magnetics | PoE logic | 10/100 management LAN plus IEEE 802.3af logic power intake |
| Controller service / recovery | Mixed | Tag-Connect-style 2x5 1.27mm footprint | 3.3V logic reference | SWD, UART, reset, boot/recovery access for bring-up and recovery |
| External lock supply | Input | 5.08mm pluggable terminal block | External lock domain | Installer-provided 12V or 24V lock supply, separate from PoE |
| Dry relay lock contacts | Output | 5.08mm pluggable terminal block | External lock domain | Form-C dry relay switching for fail-safe and fail-secure lock wiring |
| Door contact | Input | 3.81mm pluggable terminal block | Supervised input domain | Monitored field input for door state |
| Request-to-exit | Input | 3.81mm pluggable terminal block | Supervised input domain | Monitored field input for egress request |
| Tamper / auxiliary fault | Input | 3.81mm pluggable terminal block | Supervised input domain | Monitored field input for enclosure or supply fault signaling |
| OSDP reader bus | Bidirectional | 3.81mm pluggable terminal block | Protected reader auxiliary | Half-duplex RS-485 A/B plus reader power and reference |
| Wiegand reader port | Mixed | 3.81mm pluggable terminal block | Protected reader auxiliary | Reader power plus D0, D1, LED, beeper, and reference wiring |

## Electrical Expectations

### Ethernet / PoE

- Must terminate through integrated 10/100 magnetics at the board edge.
- Must show an explicit PoE PD front end before any downstream rails.
- Must keep Ethernet isolation and shield-handling assumptions separate from the
  lock relay and external lock supply regions.

### Controller Core Boundary

- Ethernet controller boundary is native MCU MAC to external RMII PHY.
- The controller-facing LAN interface must expose RMII, MDIO/MDC, PHY reset,
  and clock assumptions clearly enough for schematic review.
- Service-recovery signals must originate from the controller core and not from
  installer-facing connector paths.

### Power Domains

- PoE-derived rails may power controller logic, PHY, RTC, FRAM, RS-485, service
  circuitry, and reader auxiliary power only within the declared board budget.
- External lock power must remain installer-supplied and must not be sourced
  from the PoE-derived logic chain.
- Relay contacts must remain dry and visually distinct from logic-domain traces.

### Reader Interfaces

- OSDP must be implemented as a half-duplex RS-485 path with controller UART,
  direction control, field-side protection, bias network, and termination option.
- The review package must show one explicit RS-485 transceiver boundary between
  controller UART nets and the field-side OSDP A/B pair.
- Wiegand must remain a separate compatibility interface and not share the
  RS-485 transceiver path.
- Reader-facing power must pass through the protected board-side auxiliary rail
  rather than the external lock supply domain.

### Retention Interfaces

- RTC must use a dedicated retained-time path with I2C plus interrupt/alarm visibility.
- Event storage must use a nonvolatile SPI path suited to power-loss-safe logging.
- Power-fail warning should reach the controller soon enough to support an orderly
  final event-journal write when possible.

### Service And Installer Separation

- Service/recovery access must not reuse field lock, input, or reader terminals.
- Boot forcing and reset assertion must remain visibly tied to the dedicated
  service connector so recovery does not depend on hidden bodge wires.
- Installer terminals should remain serviceable without removing or obstructing
  the Tag-Connect recovery path.
- The final placement should support enclosure access to service tooling without
  forcing lock or reader wiring removal.