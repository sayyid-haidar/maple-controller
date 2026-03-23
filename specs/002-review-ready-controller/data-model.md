# Data Model: Review-Ready Controller Hardware

## Entity: ReviewReadyBoardRevision

**Purpose**: The concrete board definition that extends the Feature 001 one-door
controller into a review-ready hardware milestone.

**Fields**:

- `boardName`: stable revision identifier
- `boardOutline`: board dimensions and mounting expectations
- `layerCount`: fixed 4-layer target for this milestone
- `fabricationStatus`: `exploratory | review-ready | fabrication-ready`
- `inheritsArchitectureFrom`: `001-door-access-controller`
- `localFallbackPolicy`: `enabled`
- `offlineEventTarget`: minimum retained event count

**Relationships**:

- Has one `ControllerCoreDirection`
- Has one `EthernetManagementPath`
- Has one `LogicPowerChain`
- Has one `RetentionSubsystem`
- Has one `ReaderInterfaceBundle`
- Has one `ServiceAccessPort`
- Has many `InstallerConnectorAssignment`
- Has many `ReadinessItem`

**Validation Rules**:

- Must preserve separate external lock power switched through a dry relay
- Must preserve both OSDP/RS-485 and Wiegand reader support
- Must define one unambiguous controller-core direction for review

## Entity: ControllerCoreDirection

**Purpose**: The primary processing strategy for the review-ready controller.

**Fields**:

- `controllerClass`: `mcu_with_integrated_ethernet_mac`
- `cpuFamilyAssumption`: Cortex-M-class placeholder
- `ethernetOwnership`: `native_mac_with_external_rmii_phy`
- `requiredInterfaces`: RMII, MDIO/MDC, SPI, I2C, UART, GPIO, watchdog, reset
- `serviceSignals`: SWDIO, SWCLK, UART TX/RX, nRESET, BOOT/RECOVERY
- `clockingAssumption`: external oscillator plus PHY reference strategy
- `fallbackOption`: alternate MCU class preserving the same peripheral partition

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`
- Drives `EthernetManagementPath`, `RetentionSubsystem`, and `ReaderInterfaceBundle`

**Validation Rules**:

- Must not require a Linux-class OS or mass storage to satisfy the feature
- Must expose enough interfaces for RTC, FRAM, RS-485, Wiegand, and service access

## Entity: EthernetManagementPath

**Purpose**: The 10/100 management LAN path and its isolation boundary.

**Fields**:

- `entryConnector`: `shielded_rj45_magjack`
- `magneticsStrategy`: `integrated_10_100_magnetics`
- `phyStrategy`: `external_rmii_phy`
- `managementTransport`: `ethernet_10_100`
- `poeDependency`: `ieee_802_3af_logic_power_only`
- `boundarySignals`: RMII, MDIO/MDC, PHY reset, link/status

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`
- Receives power from `LogicPowerChain`
- Interfaces with `ControllerCoreDirection`

**Validation Rules**:

- Must keep the LAN boundary separate from lock power wiring
- Must support central management and offline recovery synchronization

## Entity: LogicPowerChain

**Purpose**: The placeholder power-conversion sequence from PoE intake to board
logic and communications rails.

**Fields**:

- `inputSource`: `poe_rj45_center_tap`
- `pdFrontEnd`: IEEE 802.3af PD controller class
- `intermediateRail`: isolated 12V
- `secondaryRails`: 5V, 3.3V
- `servedLoads`: controller core, PHY, RTC, FRAM, RS-485, service access, reader auxiliary
- `excludedLoads`: external lock actuation current
- `powerFailSignal`: brownout or upstream-fail indication to controller

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`
- Supplies `EthernetManagementPath`, `RetentionSubsystem`, `ReaderInterfaceBundle`, and `ServiceAccessPort`

**Validation Rules**:

- Must not source the external lock domain
- Must define at least one retained-time and one retained-storage consumer

## Entity: RetentionSubsystem

**Purpose**: The timestamp and nonvolatile buffering path that survives network
loss and power interruption.

**Fields**:

- `rtcBus`: `i2c`
- `rtcBackupDomain`: dedicated retained supply
- `rtcSignals`: SCL, SDA, INT, backup supply
- `eventStoreBus`: `spi`
- `eventStoreClass`: `fram`
- `minimumBufferedEvents`: 10000
- `journalingPolicy`: append-only offline event journal
- `recoveryPolicy`: replay after reconnect without blocking door control

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`
- Interfaces with `ControllerCoreDirection`

**Validation Rules**:

- RTC must not depend solely on network connectivity for timestamp quality
- Event store must persist across resets and abrupt power loss

## Entity: ReaderInterfaceBundle

**Purpose**: The combined reader-interface strategy preserving both modern and
legacy reader modes.

**Fields**:

- `preferredMode`: `osdp_rs485`
- `compatibilityMode`: `wiegand`
- `rs485Topology`: half-duplex multidrop-capable placeholder
- `rs485Signals`: TX/RX UART path, direction enable, A, B, GND
- `rs485Protection`: TVS, bias network, selectable termination
- `wiegandSignals`: D0, D1, LED, BEEP, reader power, GND
- `readerPowerSource`: protected board-side auxiliary rail

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`
- Consumes `LogicPowerChain`
- Interfaces with `ControllerCoreDirection`

**Validation Rules**:

- OSDP and Wiegand paths must remain distinct and review-visible
- RS-485 physical assumptions must be complete enough for field wiring review

## Entity: ServiceAccessPort

**Purpose**: The manufacturing and field-recovery access point for programming,
debug, and diagnostics.

**Fields**:

- `connectorFamily`: `tag_connect_2x5_1_27mm`
- `accessibleSignals`: SWDIO, SWCLK, UART TX, UART RX, nRESET, BOOT/RECOVERY, VTREF, GND
- `usageModes`: manufacturing bring-up, firmware recovery, field diagnostics
- `separationPolicy`: not shared with installer-facing terminals
- `placementGoal`: accessible without disconnecting lock or reader field wiring

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`
- Interfaces with `ControllerCoreDirection`

**Validation Rules**:

- Must remain physically and electrically distinct from installer terminals
- Must expose enough signals for full recovery of the chosen controller class

## Entity: InstallerConnectorAssignment

**Purpose**: The mapping from field function to connector family and power-domain
ownership.

**Fields**:

- `functionName`: Ethernet, relay contacts, lock supply monitor, door contact, REX, tamper, OSDP, Wiegand
- `connectorFamily`: RJ45 magjack, 5.08mm pluggable terminal, 3.81mm pluggable terminal
- `domainOwner`: PoE logic, protected reader auxiliary, external lock supply
- `expectedWireClass`: signal, supervised input, reader bus, relay/load
- `serviceable`: boolean

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`

**Validation Rules**:

- Every installer-visible function named in the spec must map to a connector family
- Service/debug access must not appear in this entity set

## Entity: ReadinessItem

**Purpose**: The explicit declaration of what is review-ready versus still
provisional.

**Fields**:

- `subsystem`: controller core, PHY, PoE, RTC, FRAM, RS-485, connector family
- `status`: `review_ready | provisional | blocked`
- `reviewReason`: why the current assumption is sufficient or incomplete
- `nextTaskHint`: follow-up needed in implementation or sourcing

**Relationships**:

- Belongs to `ReviewReadyBoardRevision`

**Validation Rules**:

- Every major subsystem from FR-013 must have one readiness record
- No subsystem may remain implicitly unresolved

## State Transitions

### Management And Logging State

`online -> degraded -> offline -> resyncing -> online`

Rules:

- `offline` must continue to create timestamped local events
- `resyncing` must drain FRAM-backed events without blocking local door control

### Power And Retention State

`poe_present -> brownout_warning -> logic_shutdown -> retained_time_and_events -> poe_restore -> controller_recovery`

Rules:

- `brownout_warning` must provide enough notice for an orderly final journal write when feasible
- `retained_time_and_events` must preserve RTC state and persisted offline records even when controller logic is not running