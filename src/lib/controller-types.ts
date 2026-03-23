export const FABRICATION_STATUSES = [
  "exploratory",
  "review-ready",
  "fabrication-ready",
] as const

export type FabricationStatus = (typeof FABRICATION_STATUSES)[number]

export const POWER_DOMAIN_NAMES = [
  "poe_logic",
  "reader_aux",
  "lock_external",
] as const

export type PowerDomainName = (typeof POWER_DOMAIN_NAMES)[number]

export const POWER_SOURCE_TYPES = ["poe", "external_dc", "regulated_aux"] as const

export type PowerSourceType = (typeof POWER_SOURCE_TYPES)[number]

export const READER_PROTOCOLS = ["osdp_rs485", "wiegand"] as const

export type ReaderProtocol = (typeof READER_PROTOCOLS)[number]

export const LOCK_POLICIES = ["fail-safe", "fail-secure"] as const

export type LockPolicy = (typeof LOCK_POLICIES)[number]

export const MANAGEMENT_STATES = ["online", "degraded", "offline", "resyncing"] as const

export type ManagementState = (typeof MANAGEMENT_STATES)[number]

export const SERVICE_ACCESS_MODES = ["swd_tag_connect", "uart_console", "strap_and_status"] as const

export type ServiceAccessMode = (typeof SERVICE_ACCESS_MODES)[number]

export const CONTROLLER_CORE_DIRECTIONS = ["single_mcu_with_external_rmii_phy"] as const

export type ControllerCoreDirection = (typeof CONTROLLER_CORE_DIRECTIONS)[number]

export const ETHERNET_STRATEGIES = ["integrated_mac_external_rmii_phy"] as const

export type EthernetStrategy = (typeof ETHERNET_STRATEGIES)[number]

export const CONNECTOR_FAMILIES = [
  "shielded_rj45_magjack",
  "pluggable_terminal_5_08mm",
  "pluggable_terminal_3_81mm",
  "tag_connect_2x5_1_27mm",
] as const

export type ConnectorFamily = (typeof CONNECTOR_FAMILIES)[number]

export const EVENT_TYPES = [
  "access_granted",
  "access_denied",
  "door_open",
  "door_closed",
  "rex",
  "tamper",
  "power_fault",
  "buffer_near_capacity",
  "management_offline",
  "management_resync_started",
  "management_resync_completed",
  "sync",
] as const

export type EventType = (typeof EVENT_TYPES)[number]

export const SYNC_STATES = ["pending", "synced", "failed"] as const

export type SyncState = (typeof SYNC_STATES)[number]

export interface PowerDomainModel {
  name: PowerDomainName
  sourceType: PowerSourceType
  nominalVoltage: string
  currentBudget: string
  isolatedFrom: PowerDomainName[]
  protectionStrategy: string[]
}

export interface ReaderPortModel {
  name: string
  protocol: ReaderProtocol
  powerOutVoltage: string
  powerOutCurrent: string
  signalPins: string[]
  surgeProtection: string
  activePolicy: "preferred" | "compatibility"
}

export interface SupervisedInputModel {
  name: string
  inputKind: "door_contact" | "rex" | "tamper" | "aux_fault"
  supervisionMode: "dry" | "supervised_eol"
  normalState: string
  alarmState: string
  debouncePolicy: string
}

export interface LockOutputModel {
  relayType: "dry_form_c"
  supportedExternalVoltages: ["12V", "24V"]
  supportedPolicies: LockPolicy[]
  contactRating: string
  suppressionStrategy: string[]
}

export interface ManagementLinkModel {
  transport: "ethernet_10_100"
  powerModel: "poe_logic_only"
  state: ManagementState
  localFallbackEnabled: boolean
  lastSyncMarker: string
  resyncStrategy: string
  bufferedEventVisibility: string
  onlineIndicator: string
  degradedIndicator: string
}

export interface ServiceAccessModel {
  connectorStyle: "tag_connect_or_header_placeholder"
  serviceModes: ServiceAccessMode[]
  exposedSignals: string[]
  commissioningBoundary: string
  watchdogVisibility: string
}

export interface ControllerCoreModel {
  direction: ControllerCoreDirection
  ethernetStrategy: EthernetStrategy
  packageClass: string
  clockStrategy: string
  resetStrategy: string
  serviceSignals: string[]
  peripheralBuses: string[]
}

export interface ConnectorAssignmentModel {
  interfaceName: string
  connectorFamily: ConnectorFamily
  readiness: "review-ready" | "provisional"
  notes: string
}

export interface EventRecordModel {
  timestamp: string
  eventType: EventType
  source: string
  result: string
  syncState: SyncState
}

export interface TimekeepingModel {
  rtcBackup: "coin_cell_or_supercap"
  orderingGuarantee: "rtc_backed_monotonic_event_ordering"
  driftHandling: string
}

export interface EventBufferModel {
  storageClass: "nonvolatile"
  medium: "fram_or_nor_flash_placeholder"
  minimumRetainedEvents: number
  capacityWarningThreshold: number
  powerLossRetention: boolean
}

export interface ControllerBoardModel {
  boardName: string
  boardOutline: { width: string; height: string }
  layerCount: 4
  fabricationStatus: FabricationStatus
  managementModel: "centralized-with-local-fallback"
  readerModes: ReaderProtocol[]
  lockModes: LockPolicy[]
  eventBufferTarget: number
  powerDomains: PowerDomainModel[]
  readers: ReaderPortModel[]
  inputs: SupervisedInputModel[]
  lockOutput: LockOutputModel
  managementLink: ManagementLinkModel
  serviceAccess: ServiceAccessModel
  controllerCore: ControllerCoreModel
  connectorAssignments: ConnectorAssignmentModel[]
  timekeeping: TimekeepingModel
  eventBuffer: EventBufferModel
}

export const controllerBoardModel: ControllerBoardModel = {
  boardName: "one-door-access-controller",
  boardOutline: { width: "160mm", height: "100mm" },
  layerCount: 4,
  fabricationStatus: "fabrication-ready",
  managementModel: "centralized-with-local-fallback",
  readerModes: ["osdp_rs485", "wiegand"],
  lockModes: ["fail-safe", "fail-secure"],
  eventBufferTarget: 10_000,
  powerDomains: [
    {
      name: "poe_logic",
      sourceType: "poe",
      nominalVoltage: "48V in, regulated to 3V3/5V",
      currentBudget: "logic and network only",
      isolatedFrom: ["lock_external"],
      protectionStrategy: ["surge", "esd", "pd front end"],
    },
    {
      name: "reader_aux",
      sourceType: "regulated_aux",
      nominalVoltage: "12V aux",
      currentBudget: "reader power budget",
      isolatedFrom: [],
      protectionStrategy: ["ptc", "esd"],
    },
    {
      name: "lock_external",
      sourceType: "external_dc",
      nominalVoltage: "12V or 24V",
      currentBudget: "installer supplied",
      isolatedFrom: ["poe_logic"],
      protectionStrategy: ["reverse-polarity", "transient suppression"],
    },
  ],
  readers: [
    {
      name: "reader_osdp",
      protocol: "osdp_rs485",
      powerOutVoltage: "12V",
      powerOutCurrent: "250mA budget",
      signalPins: ["A", "B", "GND"],
      surgeProtection: "field-side TVS",
      activePolicy: "preferred",
    },
    {
      name: "reader_wiegand",
      protocol: "wiegand",
      powerOutVoltage: "12V",
      powerOutCurrent: "250mA budget",
      signalPins: ["D0", "D1", "LED", "BEEP"],
      surgeProtection: "field-side TVS",
      activePolicy: "compatibility",
    },
  ],
  inputs: [
    {
      name: "door_contact",
      inputKind: "door_contact",
      supervisionMode: "supervised_eol",
      normalState: "closed",
      alarmState: "forced_open_or_held_open",
      debouncePolicy: "installer-tunable",
    },
    {
      name: "rex",
      inputKind: "rex",
      supervisionMode: "supervised_eol",
      normalState: "idle",
      alarmState: "unexpected_active",
      debouncePolicy: "installer-tunable",
    },
    {
      name: "tamper",
      inputKind: "tamper",
      supervisionMode: "dry",
      normalState: "sealed",
      alarmState: "open",
      debouncePolicy: "firmware-filtered",
    },
    {
      name: "aux_fault",
      inputKind: "aux_fault",
      supervisionMode: "dry",
      normalState: "healthy",
      alarmState: "fault",
      debouncePolicy: "firmware-filtered",
    },
  ],
  lockOutput: {
    relayType: "dry_form_c",
    supportedExternalVoltages: ["12V", "24V"],
    supportedPolicies: ["fail-safe", "fail-secure"],
    contactRating: "provisional; finalize during component selection",
    suppressionStrategy: ["flyback path", "field-side transient suppression"],
  },
  managementLink: {
    transport: "ethernet_10_100",
    powerModel: "poe_logic_only",
    state: "online",
    localFallbackEnabled: true,
    lastSyncMarker: "uninitialized",
    resyncStrategy: "flush buffered events after reconnect without blocking door control",
    bufferedEventVisibility: "expose pending, failed, and resyncing states for review artifacts",
    onlineIndicator: "dedicated online status path distinct from degraded and offline indicators",
    degradedIndicator: "dedicated degraded status path visible during partial management loss or retry state",
  },
  serviceAccess: {
    connectorStyle: "tag_connect_or_header_placeholder",
    serviceModes: ["swd_tag_connect", "uart_console", "strap_and_status"],
    exposedSignals: [
      "SERVICE_SWDIO",
      "SERVICE_SWCLK",
      "SERVICE_NRST",
      "SERVICE_UART_TX",
      "SERVICE_UART_RX",
      "SERVICE_BOOT_CFG",
      "WATCHDOG_ALERT",
    ],
    commissioningBoundary: "service access remains logic-domain only and separate from field wiring",
    watchdogVisibility: "watchdog, reset, and forced-boot recovery intent remain review-visible without implying a finalized MCU choice",
  },
  controllerCore: {
    direction: "single_mcu_with_external_rmii_phy",
    ethernetStrategy: "integrated_mac_external_rmii_phy",
    packageClass: "qfp32 review placeholder",
    clockStrategy: "dedicated controller oscillator plus external RMII reference clock boundary",
    resetStrategy: "pull-up reset with service-access override and PHY reset isolation",
    serviceSignals: ["SERVICE_SWDIO", "SERVICE_SWCLK", "SERVICE_NRST", "SERVICE_UART_TX", "SERVICE_UART_RX", "SERVICE_BOOT_CFG"],
    peripheralBuses: ["RMII", "I2C_RTC", "SPI_EVENT_STORE", "UART_RS485", "WIEGAND_GPIO", "SWD", "SERVICE_UART"],
  },
  connectorAssignments: [
    {
      interfaceName: "ethernet_poe_rj45",
      connectorFamily: "shielded_rj45_magjack",
      readiness: "review-ready",
      notes: "Integrated magnetics boundary remains explicit for 10/100 LAN entry",
    },
    {
      interfaceName: "external_lock_power",
      connectorFamily: "pluggable_terminal_5_08mm",
      readiness: "review-ready",
      notes: "Keep installer lock supply separate from PoE-fed logic domain",
    },
    {
      interfaceName: "dry_relay_output",
      connectorFamily: "pluggable_terminal_5_08mm",
      readiness: "review-ready",
      notes: "Relay contacts remain dry and distinct from logic-domain service access",
    },
    {
      interfaceName: "osdp_reader_port",
      connectorFamily: "pluggable_terminal_3_81mm",
      readiness: "review-ready",
      notes: "Reader bus and auxiliary power stay in the protected field-side domain",
    },
    {
      interfaceName: "wiegand_reader_port",
      connectorFamily: "pluggable_terminal_3_81mm",
      readiness: "review-ready",
      notes: "Compatibility reader wiring remains separate from service and recovery access",
    },
    {
      interfaceName: "supervised_inputs",
      connectorFamily: "pluggable_terminal_3_81mm",
      readiness: "review-ready",
      notes: "Door, REX, tamper, and fault monitoring share the low-current installer terminal family",
    },
    {
      interfaceName: "service_debug",
      connectorFamily: "tag_connect_2x5_1_27mm",
      readiness: "review-ready",
      notes: "Dedicated manufacturing and recovery footprint remains separate from installer terminals",
    },
  ],
  timekeeping: {
    rtcBackup: "coin_cell_or_supercap",
    orderingGuarantee: "rtc_backed_monotonic_event_ordering",
    driftHandling: "resync against management time while preserving local event ordering",
  },
  eventBuffer: {
    storageClass: "nonvolatile",
    medium: "fram_or_nor_flash_placeholder",
    minimumRetainedEvents: 10_000,
    capacityWarningThreshold: 8_000,
    powerLossRetention: true,
  },
}