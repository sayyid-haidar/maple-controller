# Data Model: One-Door Access Controller

## Entity: ControllerBoard

**Purpose**: The complete one-door controller assembly rendered by tscircuit.

**Fields**:

- `boardName`: stable board identifier
- `boardOutline`: dimensions and mounting constraints
- `layerCount`: target PCB stackup, fixed at 4 for this plan
- `fabricationStatus`: `exploratory | review-ready | fabrication-ready`
- `managementModel`: `centralized-with-local-fallback`
- `readerModes`: supported interface variants
- `lockModes`: supported fail-safe/fail-secure behavior
- `eventBufferTarget`: minimum local backlog target

**Relationships**:

- Has many `PowerDomain`
- Has many `ReaderPort`
- Has many `SupervisedInput`
- Has one `LockOutput`
- Has one `ManagementLink`
- Produces many `EventRecord`

**Validation Rules**:

- Must include both a PoE logic domain and a separate lock-power domain
- Must expose at least one OSDP-capable path and one Wiegand-capable path
- Must include door-state, REX, and tamper/fault sensing paths

## Entity: PowerDomain

**Purpose**: An electrical power zone with explicit source and protection
boundaries.

**Fields**:

- `name`: `poe_logic`, `reader_aux`, `lock_external`, etc.
- `sourceType`: `poe | external_dc | regulated_aux`
- `nominalVoltage`
- `currentBudget`
- `isolatedFrom`: related domains requiring separation
- `protectionStrategy`: fusing, TVS, surge, reverse-polarity, etc.

**Relationships**:

- Belongs to `ControllerBoard`
- Supplies `ReaderPort`, `SupervisedInput`, or `LockOutput`

**Validation Rules**:

- `poe_logic` cannot be the primary source for lock actuation current
- External lock domain must declare supported 12V/24V range

## Entity: ReaderPort

**Purpose**: Installer-facing credential-reader interface.

**Fields**:

- `name`
- `protocol`: `osdp_rs485 | wiegand`
- `powerOutVoltage`
- `powerOutCurrent`
- `signalPins`
- `surgeProtection`
- `activePolicy`: `preferred | compatibility`

**Relationships**:

- Belongs to `ControllerBoard`
- Uses one `PowerDomain`

**Validation Rules**:

- OSDP path must use RS-485 signaling assumptions
- Wiegand path must define data and auxiliary control lines

## Entity: SupervisedInput

**Purpose**: A monitored installer-facing input channel.

**Fields**:

- `name`
- `inputKind`: `door_contact | rex | tamper | aux_fault`
- `supervisionMode`: `dry | supervised_eol`
- `normalState`
- `alarmState`
- `debouncePolicy`

**Relationships**:

- Belongs to `ControllerBoard`
- May emit `EventRecord`

**Validation Rules**:

- Door contact and REX must be present
- Tamper or fault monitoring must be present

## Entity: LockOutput

**Purpose**: The installer-facing control path for the door lock.

**Fields**:

- `relayType`: `dry_form_c`
- `supportedExternalVoltages`: `12V`, `24V`
- `supportedPolicies`: `fail-safe`, `fail-secure`
- `contactRating`
- `suppressionStrategy`

**Relationships**:

- Belongs to `ControllerBoard`
- Uses the external lock `PowerDomain`

**Validation Rules**:

- Must be dry relay, not logic-drive only
- Must support both fail-safe and fail-secure deployment policies

## Entity: ManagementLink

**Purpose**: The LAN-visible management relationship between the controller and a
central system.

**Fields**:

- `transport`: `ethernet_10_100`
- `powerModel`: `poe_logic_only`
- `state`: `online | degraded | offline | resyncing`
- `localFallbackEnabled`: boolean
- `lastSyncMarker`

**Relationships**:

- Belongs to `ControllerBoard`
- Governs synchronization of `EventRecord`

**Validation Rules**:

- Must support local fallback when not online

## Entity: EventRecord

**Purpose**: A retained local record of controller activity.

**Fields**:

- `timestamp`
- `eventType`: `access_granted | access_denied | door_open | door_closed | rex | tamper | power_fault | sync`
- `source`
- `result`
- `syncState`: `pending | synced | failed`

**Relationships**:

- Emitted by `ReaderPort`, `SupervisedInput`, `LockOutput`, or `ManagementLink`

**Validation Rules**:

- Must be persistable across connectivity interruptions
- Must support at least the target backlog capacity defined by `ControllerBoard`

## State Transitions

### Door State

`secured -> unlock_requested -> unlocked -> door_open -> door_closed -> secured`

Exceptional transitions:

- `secured -> forced_open_alarm`
- `unlocked -> held_open_alarm`
- `any -> tamper_alarm`

### Management State

`online -> degraded -> offline -> resyncing -> online`

Rules:

- `offline` must still allow local access logic and event creation
- `resyncing` must flush buffered events without blocking normal door control
