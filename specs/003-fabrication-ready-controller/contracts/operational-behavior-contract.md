# Operational Behavior Contract: Fabrication-Ready Controller Hardware

## Purpose

Define the operating behavior that must still hold after exact part selection
and fabrication closure work are complete.

## Management Contract

- The controller remains centrally managed over 10/100 Ethernet while retaining
  local door-decision authority during management interruption.
- Final Ethernet hardware choices must not remove local fallback behavior or the
  ability to surface management state signals used in the current design.
- Offline or degraded operation must still produce timestamped retained events
  using the dedicated RTC and nonvolatile event-store path.
- Resynchronization after reconnect must still occur without blocking normal
  local access-control behavior.

## Power and Locking Contract

- PoE-derived power continues to serve only board logic, networking, retention,
  service, and reader auxiliary loads within the board budget.
- External lock current remains installer supplied and is switched only through
  the dry relay contact set.
- Final relay and suppression choices must not backfeed the logic domain or turn
  the product into a wet-output lock driver.

## Reader and Input Contract

- OSDP remains the preferred reader mode and continues to be implemented as a
  visible RS-485 path with protection and bias assumptions.
- Wiegand remains available as a separate compatibility path.
- Door contact, REX, tamper, and auxiliary fault monitoring remain distinct
  functions and continue to be represented as supervised installer-facing inputs.

## Retention Contract

- RTC-backed time continuity remains part of the product baseline.
- Nonvolatile event buffering remains part of the baseline and must survive
  abrupt logic-power loss consistent with the approved retention design.
- Final retention-part choices must not narrow the existing event-buffer target
  or remove power-fail visibility without explicit scope change approval.

## Service and Bring-Up Contract

- Manufacturing programming, debug, and recovery access continue to use the
  dedicated service connector rather than installer terminals.
- First-article bring-up must be possible using the approved service footprint,
  board power inputs, and documented checks rather than undocumented bench steps.

## Fabrication-Ready State Contract

- The board may only be described as fabrication-ready when exact part choices,
  footprints, sourcing notes, assembly notes, and bring-up expectations all
  agree across source and documentation.
- If any fabrication-critical item remains unresolved, the board state is
  `fabrication-blocked` rather than `fabrication-ready`.
- Any deliberate narrowing of architecture or interface support requires an
  explicit scope-change note rather than silent drift during part lock-in.

## Final Candidate Preservation Notes

- The current candidate keeps PoE limited to logic, networking, retention,
  service, and reader auxiliary functions.
- The current candidate keeps the lock path dry-contact only; the new PB10 relay
  drive energizes the coil without sourcing installer lock current.
- OSDP plus Wiegand support remains intact, and service recovery remains on the
  dedicated Harwin header.
- The only accepted unfinished item is `rtc_backup_source`, which keeps the
  board in `fabrication-blocked` state without changing the baseline retention intent.