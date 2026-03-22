# Hardware Interface Contract: One-Door Access Controller

## Purpose

Define the installer-facing physical and electrical interface expectations for the
one-door controller board.

## Contract Summary

| Interface | Direction | Contract |
| --------- | --------- | -------- |
| Ethernet / PoE RJ45 | In/Out | 10/100 Ethernet management link with PoE powering only the logic/network domain |
| External Lock Power | Input | Installer-provided 12V or 24V lock supply isolated from PoE logic power |
| Dry Relay Lock Output | Output | Form-C dry relay path switching the external lock circuit |
| Door Contact Input | Input | Supervised or dry monitored input for door-open/closed state |
| REX Input | Input | Supervised or dry monitored request-to-exit input |
| Tamper / Fault Input | Input | Supervised or dry monitored tamper or abnormal-power path |
| OSDP Reader Port | Bidirectional | RS-485 reader link with auxiliary reader power and protection |
| Wiegand Reader Port | Mixed | Reader power plus Wiegand data/control wiring for compatibility readers |
| Service / Debug Access | Mixed | Reserved maintenance access for commissioning, diagnostics, or firmware workflows |

## Electrical Expectations

### Ethernet / PoE

- Must terminate through Ethernet magnetics appropriate for 10/100 Ethernet.
- Must include surge/ESD protection at the cable entry boundary.
- Must not be the primary power source for lock actuation current.

### External Lock Power + Relay

- Must accept installer-provided 12V or 24V lock power.
- Must switch through a dry relay compatible with fail-safe and fail-secure lock
  wiring policies.
- Must document suppression/protection assumptions for inductive lock loads.

### Reader Ports

- OSDP port must follow RS-485 wiring assumptions and support secure-channel-capable readers.
- Wiegand port must remain explicitly labeled as compatibility-facing and not the
  preferred security path for new deployments.
- Reader-facing power and data lines must have protection appropriate for field
  wiring.

### Supervised Inputs

- Door contact, REX, and tamper/fault inputs must be clearly labeled and mapped
  to distinct controller states.
- The design must state whether each channel is dry-contact only or supports end-of-line supervision.
