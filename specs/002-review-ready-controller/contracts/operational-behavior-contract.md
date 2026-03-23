# Operational Behavior Contract: Review-Ready Controller Hardware

## Purpose

Define the behavior expected from the review-ready controller assumptions during
normal operation, outage handling, recovery, and field service.

## Management Contract

- The controller is centrally managed over 10/100 Ethernet while retaining local
  door-decision authority during WAN or controller-management outages.
- Loss of management connectivity must not disable credential evaluation,
  supervised input monitoring, or dry-relay lock control.
- Local events generated while offline or degraded must be timestamped via the
  dedicated RTC path and persisted into the SPI FRAM event journal.
- Reconnection must trigger a resynchronization phase that uploads retained
  events without blocking normal access-control behavior.
- Online, degraded, offline, resyncing, and power-fail-warning states should
  remain review-visible through dedicated status signals or annotated board paths.

## Controller-Core Contract

- The chosen controller direction is a single MCU-class device with native
  Ethernet MAC ownership and explicit reset, watchdog, and recovery access.
- Firmware update or recovery workflows must be possible through the dedicated
  service connector without repurposing installer wiring.
- The controller must retain enough peripheral access to service the RMII PHY,
  RTC, FRAM, RS-485 transceiver, Wiegand lines, and supervised inputs.

## Power And Retention Contract

- PoE-derived rails power only controller logic, networking, retention devices,
  service circuitry, and reader auxiliary functions within the board budget.
- External lock actuation current remains outside the PoE-fed board domain and
  is controlled only through the dry relay boundary.
- Power-fail warning should permit best-effort final journaling before logic
  shutdown, but persisted events and retained time must remain valid even if the
  shutdown is abrupt.
- RTC retention must survive controller resets and building-side logic power loss
  well enough to preserve offline event ordering.

## Reader And Input Contract

- OSDP is the preferred reader mode and must be represented as a complete
  half-duplex RS-485 path with direction control, biasing, and protection.
- Wiegand remains available as a separate compatibility path for retrofit reader
  deployments.
- Door contact, REX, tamper, and auxiliary fault inputs must remain distinct
  monitored functions and continue to generate locally buffered events.

## Service And Installer Workflow Contract

- Installer-facing terminals should be dedicated to field wiring and remain
  distinct from the service/debug connector footprint.
- Manufacturing bring-up, firmware recovery, and diagnostics must use the
  dedicated Tag-Connect-style service footprint.
- Service access placement should allow recovery and diagnostics without
  disturbing lock or reader wiring during normal enclosure service.

## Review-Readiness Contract

- Every major subsystem must be marked as either review-ready or provisional,
  with no hidden ambiguity about controller core, power chain, retention path,
  reader path, or connector-family choices.
- The review package must make it possible to trace every field-facing function
  to a connector family, power domain, and controller-side subsystem without
  reference to proprietary schematics.