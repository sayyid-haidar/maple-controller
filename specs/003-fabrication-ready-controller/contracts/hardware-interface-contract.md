# Hardware Interface Contract: Fabrication-Ready Controller Hardware

## Purpose

Define the exact physical and electrical interface expectations that the
fabrication-ready one-door controller must preserve while locking final parts.

## Contract Summary

| Interface | Direction | Required Physical Decision | Power Domain | Fabrication Contract |
| --------- | --------- | -------------------------- | ------------ | -------------------- |
| Ethernet / PoE LAN entry | In/Out | Exact approved RJ45 magjack or connector-plus-magnetics implementation | PoE logic | Board-edge LAN entry, PoE intake, shield handling, and manufacturable footprint must be explicit |
| Controller service / recovery | Mixed | Exact approved Tag-Connect-style or equivalent service footprint | 3.3V logic reference | SWD, UART, reset, and recovery access remain separate from installer wiring |
| External lock supply | Input | Exact approved 5.08 mm terminal family and part | External lock domain | Installer-provided 12 V or 24 V lock supply remains outside PoE-derived power |
| Dry relay lock contacts | Output | Exact approved relay package plus exact field terminal | External lock domain | Dry Form-C switching remains the only lock-power switching boundary |
| Door / REX / tamper / fault inputs | Input | Exact approved 3.81 mm terminal family and part | Supervised input domain | Monitored field inputs remain installer-facing and distinct from service access |
| OSDP reader bus | Bidirectional | Exact approved 3.81 mm terminal family and part | Protected reader auxiliary | RS-485 A/B, field return, and auxiliary power remain visible and protected |
| Wiegand reader port | Mixed | Exact approved 3.81 mm terminal family and part | Protected reader auxiliary | Wiegand compatibility path remains separate from OSDP transceiver hardware |

## Ethernet / PoE Contract

- The LAN-entry hardware is fixed to the Abracon `ARJP11A-MA` integrated 10/100
  magjack on the KiCad `RJ45_Abracon_ARJP11A-MA_Horizontal` footprint.
- The LAN boundary must show the relationship among the released magjack,
  PoE taps feeding `V48_POE_IN`, PHY-side series links, and the LAN shield RC
  bleed into logic ground.
- Ethernet board-edge placement assumes the connector body overhang is confined
  to the left enclosure-facing edge and that tall logic-side parts stay out of
  the shield corridor for first-article assembly review.
- No Ethernet closure work may collapse the existing separation between LAN/PoE
  logic power and the external lock domain.

## Relay / Lock Contract

- The lock path must continue to use a dry relay and must not become a logic-fed
  wet output.
- The exact relay device is the Omron `G5LE-1-DC12` on the KiCad
  `Relay_SPDT_Omron-G5LE-1` footprint, with a PB10-driven low-side transistor
  and a dedicated flyback diode for coil suppression.
- Installer-facing terminals for external lock power and relay contacts must be
  exact approved parts with manufacturable footprints.
- Creepage, clearance, and placement assumptions for the relay region require
  the relay body and 5.08 mm field terminals to stay grouped at the installer
  edge with the coil-drive network kept on the logic side of the dry-contact
  boundary.

## Retention / Service Contract

- RTC backup support, event-buffer hardware, and service-access hardware must be
  represented by exact approved parts or explicit blockers.
- The service connector must remain physically and electrically distinct from
  installer-facing terminals.
- Programming, reset, and boot/recovery access must remain available through the
  dedicated service footprint without requiring bodge wiring.

## Connector and Footprint Contract

- Every field-facing interface must map to an exact approved connector or remain
  an explicit blocker.
- Every fabrication-critical part must name the exact intended footprint and its
  ownership in the source tree.
- CAD model or equivalent 3D support should remain present for physically
  important released parts where the repository already uses that practice.

## Preservation Clause

- Exact part lock-in may refine packaging, sourcing, and footprint details, but
  it must not silently change the accepted power-domain boundaries, reader mode
  support, retention intent, or service separation established in Features 001
  and 002.

## Final Contract-Preservation Notes

- Ethernet closure preserves the PoE-only logic-power boundary; the ARJP11A-MA
  implementation does not create any wet-output path into the lock domain.
- Relay closure preserves the dry-contact installer boundary; only the relay
  coil is logic powered, while COM/NO/NC remain installer supplied.
- Service and reader access remain physically separate, with no migration of
  reader or lock signals onto the Harwin recovery header.
- No scope change has been accepted for 003 beyond leaving `rtc_backup_source`
  as the final explicit fabrication blocker.