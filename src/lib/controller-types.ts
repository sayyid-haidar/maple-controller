export const FABRICATION_STATUSES = [
  "exploratory",
  "review-ready",
  "fabrication-blocked",
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

export const PART_APPROVAL_STATUSES = ["approved", "blocked"] as const

export type PartApprovalStatus = (typeof PART_APPROVAL_STATUSES)[number]

export const LIFECYCLE_STATUSES = ["active", "unknown", "at_risk"] as const

export type LifecycleStatus = (typeof LIFECYCLE_STATUSES)[number]

export const CAD_MODEL_STATUSES = ["present", "not_required", "missing_blocker"] as const

export type CadModelStatus = (typeof CAD_MODEL_STATUSES)[number]

export const BLOCKER_IMPACT_AREAS = ["sourcing", "footprint", "assembly", "mechanical", "verification"] as const

export type BlockerImpactArea = (typeof BLOCKER_IMPACT_AREAS)[number]

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
  exactPart: string
  pinCount: number
  readiness: PartApprovalStatus
  notes: string
  sourceOfTruthFile: string
}

export interface ApprovedBomLineModel {
  manufacturer: string
  manufacturerPartNumber: string
  supplierPaths: string[]
  approvedAlternates: string[]
  lifecycleStatus: LifecycleStatus
  assemblySuitability: string
  cadModelStatus: CadModelStatus
}

export interface FabricationBlockerModel {
  blockerName: string
  appliesTo: string
  reason: string
  closureCriteria: string
  owner: string
  impactArea: BlockerImpactArea
}

export interface FabricationCriticalPartModel {
  partKey: string
  subsystem: string
  status: PartApprovalStatus
  electricalRole: string
  package: string
  footprint: string
  sourceOfTruthFile: string
  requiresAlternate: boolean
  approvedBomLine?: ApprovedBomLineModel
  blocker?: FabricationBlockerModel
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
  medium: "spi_fram_mb85rs256a"
  minimumRetainedEvents: number
  capacityWarningThreshold: number
  powerLossRetention: boolean
}

export interface ReleaseGateModel {
  gateName: string
  requiredEvidence: string[]
  blockingPartKeys: string[]
  status: "blocked" | "ready"
}

export interface RetentionClosureModel {
  rtcPartStatus: PartApprovalStatus
  framPartStatus: PartApprovalStatus
  backupSupportPart: string
  localHoldUpCapacitance: string
  powerFailHandling: string
  boardLevelPlaceholderStatus: "cleared" | "blocked"
}

export interface ManufacturingReadinessPackageModel {
  assemblyMethod: string
  criticalFootprintReviews: string[]
  boardEdgeChecks: string[]
  handlingConstraints: string[]
  placementValidationRequired: boolean
}

export interface ProcurementReadinessPackageModel {
  criticalPartCoverage: string
  alternatePolicy: string
  lifecycleReviewPolicy: string
  singleSourceExceptions: string[]
  releaseDecision: "acceptable" | "blocked"
}

export interface BringUpVerificationPackageModel {
  powerChecks: string[]
  ethernetChecks: string[]
  relayChecks: string[]
  readerChecks: string[]
  retentionChecks: string[]
  serviceChecks: string[]
}

export interface ControllerBoardModel {
  boardName: string
  boardOutline: { width: string; height: string }
  layerCount: 4
  fabricationStatus: FabricationStatus
  inheritsArchitectureFrom: string[]
  releaseGate: ReleaseGateModel
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
  fabricationCriticalParts: FabricationCriticalPartModel[]
  manufacturingReadiness: ManufacturingReadinessPackageModel
  procurementReadiness: ProcurementReadinessPackageModel
  bringUpVerification: BringUpVerificationPackageModel
  retentionClosure: RetentionClosureModel
  timekeeping: TimekeepingModel
  eventBuffer: EventBufferModel
}

export const controllerBoardModel: ControllerBoardModel = {
  boardName: "one-door-access-controller",
  boardOutline: { width: "160mm", height: "100mm" },
  layerCount: 4,
  fabricationStatus: "fabrication-blocked",
  inheritsArchitectureFrom: ["001-door-access-controller", "002-review-ready-controller"],
  releaseGate: {
    gateName: "first-article fabrication release",
    requiredEvidence: [
      "approved-or-blocked fabrication ledger",
      "exact connector decisions",
      "manufacturing package",
      "procurement package",
      "bring-up package",
      "validated circuit artifacts",
    ],
    blockingPartKeys: ["ethernet_magjack", "ethernet_poe_entry_boundary", "lock_relay", "lock_relay_drive", "rtc_backup_source"],
    status: "blocked",
  },
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
    contactRating: "relay footprint and rating remain blocked until the final dry-contact device is approved",
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
    watchdogVisibility: "watchdog, reset, and forced-boot recovery remain available through the approved service header without crossing into installer wiring",
  },
  controllerCore: {
    direction: "single_mcu_with_external_rmii_phy",
    ethernetStrategy: "integrated_mac_external_rmii_phy",
    packageClass: "STM32F407VET6 in LQFP-100",
    clockStrategy: "dedicated controller oscillator plus external RMII reference clock boundary",
    resetStrategy: "pull-up reset with service-access override and PHY reset isolation",
    serviceSignals: ["SERVICE_SWDIO", "SERVICE_SWCLK", "SERVICE_NRST", "SERVICE_UART_TX", "SERVICE_UART_RX", "SERVICE_BOOT_CFG"],
    peripheralBuses: ["RMII", "I2C_RTC", "SPI_EVENT_STORE", "UART_RS485", "WIEGAND_GPIO", "SWD", "SERVICE_UART"],
  },
  connectorAssignments: [
    {
      interfaceName: "ethernet_poe_rj45",
      connectorFamily: "shielded_rj45_magjack",
      exactPart: "PoE-capable integrated magjack TBD",
      pinCount: 8,
      readiness: "blocked",
      notes: "Integrated magnetics boundary remains explicit for 10/100 LAN entry, but the exact PoE-capable part and board-edge treatment are still open blockers",
      sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx",
    },
    {
      interfaceName: "external_lock_power",
      connectorFamily: "pluggable_terminal_5_08mm",
      exactPart: "Phoenix Contact MKDS 1,5/3-5,08",
      pinCount: 3,
      readiness: "approved",
      notes: "Installer lock supply stays on a dedicated 5.08 mm field terminal and remains separate from the PoE-fed logic domain",
      sourceOfTruthFile: "src/components/relay-lock-output.tsx",
    },
    {
      interfaceName: "dry_relay_output",
      connectorFamily: "pluggable_terminal_5_08mm",
      exactPart: "Phoenix Contact MKDS 1,5/3-5,08",
      pinCount: 3,
      readiness: "approved",
      notes: "Field relay contacts remain on the same approved installer terminal family even though the relay device itself is still blocked",
      sourceOfTruthFile: "src/components/relay-lock-output.tsx",
    },
    {
      interfaceName: "osdp_reader_port",
      connectorFamily: "pluggable_terminal_3_81mm",
      exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
      pinCount: 4,
      readiness: "approved",
      notes: "Reader bus and auxiliary power stay in the protected field-side domain on an approved 3.81 mm installer terminal family",
      sourceOfTruthFile: "src/components/reader-interfaces.tsx",
    },
    {
      interfaceName: "wiegand_reader_port",
      connectorFamily: "pluggable_terminal_3_81mm",
      exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
      pinCount: 4,
      readiness: "approved",
      notes: "Compatibility reader wiring remains installer-facing and separate from service and recovery access",
      sourceOfTruthFile: "src/components/reader-interfaces.tsx",
    },
    {
      interfaceName: "supervised_inputs",
      connectorFamily: "pluggable_terminal_3_81mm",
      exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
      pinCount: 4,
      readiness: "approved",
      notes: "Door, REX, tamper, and fault monitoring stay on approved low-current installer terminals",
      sourceOfTruthFile: "src/components/supervised-input-bank.tsx",
    },
    {
      interfaceName: "service_debug",
      connectorFamily: "tag_connect_2x5_1_27mm",
      exactPart: "Harwin M50-3500542 2x05 1.27 mm vertical header",
      pinCount: 10,
      readiness: "approved",
      notes: "Dedicated manufacturing and recovery footprint remains separate from installer terminals and supports header-based recovery during bring-up",
      sourceOfTruthFile: "src/components/service-connectors.tsx",
    },
  ],
  fabricationCriticalParts: [
    {
      partKey: "controller_mcu",
      subsystem: "controller",
      status: "approved",
      electricalRole: "primary controller MCU with Ethernet MAC, service access, RTC, and SPI retention buses",
      package: "LQFP-100",
      footprint: "kicad:Package_QFP/LQFP-100_14x14mm_P0.5mm",
      sourceOfTruthFile: "src/components/controller-core.tsx",
      requiresAlternate: false,
      approvedBomLine: {
        manufacturer: "STMicroelectronics",
        manufacturerPartNumber: "STM32F407VET6",
        supplierPaths: ["LCSC C8601"],
        approvedAlternates: [],
        lifecycleStatus: "active",
        assemblySuitability: "standard SMT assembly with released KiCad body model",
        cadModelStatus: "present",
      },
    },
    {
      partKey: "service_debug_header",
      subsystem: "service",
      status: "approved",
      electricalRole: "isolated SWD, UART, reset, and boot-strapping recovery access",
      package: "2x05 vertical header, 1.27 mm pitch",
      footprint: "kicad:Connector_PinHeader_1.27mm/PinHeader_2x05_P1.27mm_Vertical",
      sourceOfTruthFile: "src/components/service-connectors.tsx",
      requiresAlternate: false,
      approvedBomLine: {
        manufacturer: "Harwin",
        manufacturerPartNumber: "M50-3500542",
        supplierPaths: ["Harwin M50 series", "header-compatible 2x05 1.27 mm assembly path"],
        approvedAlternates: [],
        lifecycleStatus: "active",
        assemblySuitability: "through-hole or selective-solder compatible header footprint",
        cadModelStatus: "present",
      },
    },
    {
      partKey: "reader_terminal_blocks",
      subsystem: "reader_io",
      status: "approved",
      electricalRole: "installer-facing reader bus and compatibility wiring termination",
      package: "4-position horizontal pluggable terminal",
      footprint: "kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal",
      sourceOfTruthFile: "src/components/reader-interfaces.tsx",
      requiresAlternate: false,
      approvedBomLine: {
        manufacturer: "Phoenix Contact",
        manufacturerPartNumber: "MC 1,5/4-G-3,81",
        supplierPaths: ["Phoenix Contact MC series", "3.81 mm pluggable terminal distribution"],
        approvedAlternates: [],
        lifecycleStatus: "active",
        assemblySuitability: "THT field terminal compatible with installer-side service access spacing",
        cadModelStatus: "missing_blocker",
      },
    },
    {
      partKey: "supervised_input_terminal_blocks",
      subsystem: "supervised_inputs",
      status: "approved",
      electricalRole: "installer-facing supervised input termination for door, REX, tamper, and auxiliary fault loops",
      package: "4-position horizontal pluggable terminal",
      footprint: "kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal",
      sourceOfTruthFile: "src/components/supervised-input-bank.tsx",
      requiresAlternate: false,
      approvedBomLine: {
        manufacturer: "Phoenix Contact",
        manufacturerPartNumber: "MC 1,5/4-G-3,81",
        supplierPaths: ["Phoenix Contact MC series", "3.81 mm pluggable terminal distribution"],
        approvedAlternates: [],
        lifecycleStatus: "active",
        assemblySuitability: "THT field terminal compatible with installer-side cable entry",
        cadModelStatus: "missing_blocker",
      },
    },
    {
      partKey: "rtc_device",
      subsystem: "retention",
      status: "approved",
      electricalRole: "maintain local timebase for event ordering during offline operation",
      package: "SOIC-8",
      footprint: "kicad:Package_SO/SOIC-8_3.9x4.9mm_P1.27mm",
      sourceOfTruthFile: "src/components/retention-support.tsx",
      requiresAlternate: false,
      approvedBomLine: {
        manufacturer: "Analog Devices",
        manufacturerPartNumber: "DS3231MZ+",
        supplierPaths: ["LCSC C255630"],
        approvedAlternates: [],
        lifecycleStatus: "active",
        assemblySuitability: "standard SMT assembly with released KiCad body model",
        cadModelStatus: "present",
      },
    },
    {
      partKey: "event_fram",
      subsystem: "retention",
      status: "approved",
      electricalRole: "retain the offline event journal across logic power loss",
      package: "SOIC-8",
      footprint: "kicad:Package_SO/SOIC-8_3.9x4.9mm_P1.27mm",
      sourceOfTruthFile: "src/components/retention-support.tsx",
      requiresAlternate: false,
      approvedBomLine: {
        manufacturer: "Fujitsu",
        manufacturerPartNumber: "MB85RS256A",
        supplierPaths: ["LCSC C92189"],
        approvedAlternates: [],
        lifecycleStatus: "active",
        assemblySuitability: "standard SMT assembly with released KiCad body model",
        cadModelStatus: "present",
      },
    },
    {
      partKey: "ethernet_magjack",
      subsystem: "ethernet",
      status: "blocked",
      electricalRole: "board-edge 10/100 Ethernet entry with PoE-capable magnetics and shield treatment",
      package: "integrated magjack",
      footprint: "TBD board-edge magjack footprint",
      sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx",
      requiresAlternate: true,
      blocker: {
        blockerName: "Exact LAN entry not yet approved",
        appliesTo: "Ethernet board-edge hardware",
        reason: "The PHY is selected, but the PoE-capable magjack, shield treatment, and final board-edge footprint are not yet locked",
        closureCriteria: "Approve one PoE-capable LAN entry implementation with exact footprint, shield strategy, and sourcing path",
        owner: "LAN entry review",
        impactArea: "mechanical",
      },
    },
    {
      partKey: "ethernet_poe_entry_boundary",
      subsystem: "ethernet",
      status: "blocked",
      electricalRole: "PoE ingress and center-tap treatment between LAN entry and PD front end",
      package: "connector-adjacent support network",
      footprint: "TBD until LAN entry is approved",
      sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx",
      requiresAlternate: false,
      blocker: {
        blockerName: "PoE ingress boundary unresolved",
        appliesTo: "Ethernet PoE entry support parts",
        reason: "The final LAN entry part determines center-tap routing, PoE extraction, and protection ownership",
        closureCriteria: "Approve the LAN entry hardware and implement the final PoE ingress network around it",
        owner: "LAN entry review",
        impactArea: "verification",
      },
    },
    {
      partKey: "lock_relay",
      subsystem: "relay",
      status: "blocked",
      electricalRole: "dry-contact switching device for installer-supplied lock power",
      package: "SPDT relay",
      footprint: "TBD final relay footprint",
      sourceOfTruthFile: "src/components/relay-lock-output.tsx",
      requiresAlternate: true,
      blocker: {
        blockerName: "Exact relay package not yet approved",
        appliesTo: "Lock relay device",
        reason: "Field terminals exist, but the electromechanical relay body, contact rating, and assembly constraints are still unresolved",
        closureCriteria: "Approve one relay device with exact package, rating, and placement assumptions",
        owner: "lock-interface review",
        impactArea: "assembly",
      },
    },
    {
      partKey: "lock_relay_drive",
      subsystem: "relay",
      status: "blocked",
      electricalRole: "coil-drive and suppression path for the final relay device",
      package: "transistor and suppression support network",
      footprint: "TBD final relay support footprints",
      sourceOfTruthFile: "src/components/relay-lock-output.tsx",
      requiresAlternate: false,
      blocker: {
        blockerName: "Relay drive path unresolved",
        appliesTo: "Relay coil drive and suppression network",
        reason: "The current passive-only placeholder path does not yet implement the real relay coil or suppression network",
        closureCriteria: "Implement the final coil-drive path and suppression network tied to the approved relay device",
        owner: "lock-interface review",
        impactArea: "verification",
      },
    },
    {
      partKey: "rtc_backup_source",
      subsystem: "retention",
      status: "blocked",
      electricalRole: "maintain RTC continuity during logic power loss",
      package: "backup energy storage or battery path",
      footprint: "0603 local hold-up placeholder only",
      sourceOfTruthFile: "src/components/retention-support.tsx",
      requiresAlternate: true,
      blocker: {
        blockerName: "RTC backup source unresolved",
        appliesTo: "RTC backup support",
        reason: "A local capacitor is modeled, but the long-duration backup strategy is not yet approved as a real release part",
        closureCriteria: "Promote the RTC backup support into an approved part or explicitly bound the acceptable hold-up strategy",
        owner: "retention review",
        impactArea: "sourcing",
      },
    },
  ],
  manufacturingReadiness: {
    assemblyMethod: "mixed SMT plus through-hole assembly for terminals and service header",
    criticalFootprintReviews: [
      "LAN entry footprint",
      "relay body footprint",
      "5.08 mm lock terminals",
      "3.81 mm reader and supervised-input terminals",
      "service header footprint",
    ],
    boardEdgeChecks: [
      "LAN connector overhang and keepout",
      "service header access clearance",
      "terminal entry orientation",
    ],
    handlingConstraints: [
      "review tall connector and relay body heights against enclosure",
      "maintain service-access clearance from installer wiring",
    ],
    placementValidationRequired: true,
  },
  procurementReadiness: {
    criticalPartCoverage: "service, connector, MCU, RTC, and FRAM decisions approved; Ethernet entry, relay, and RTC backup source still blocked",
    alternatePolicy: "Critical electromechanical parts require an explicit alternate or a justified single-source exception",
    lifecycleReviewPolicy: "Record lifecycle risk on every fabrication-critical part before clearing the release gate",
    singleSourceExceptions: ["STM32F407VET6", "DS3231MZ+", "MB85RS256A"],
    releaseDecision: "blocked",
  },
  bringUpVerification: {
    powerChecks: [
      "Verify PoE intake to intermediate rails and 3.3 V logic regulation",
      "Verify reader auxiliary rail and field-return behavior",
    ],
    ethernetChecks: [
      "Verify PHY power, reset, and reference clock behavior",
      "Verify LAN link and PoE ingress only after the final board-edge entry is approved",
    ],
    relayChecks: [
      "Verify final relay actuation, coil suppression, and contact continuity once the relay implementation is approved",
    ],
    readerChecks: [
      "Verify OSDP continuity on A/B plus reader auxiliary power",
      "Verify Wiegand D0/D1, LED, and beeper compatibility paths",
    ],
    retentionChecks: [
      "Verify RTC visibility and interrupt behavior",
      "Verify FRAM event retention across simulated logic power loss",
      "Verify the approved RTC backup strategy once finalized",
    ],
    serviceChecks: [
      "Verify SWD access, UART console, reset, boot strap, and watchdog visibility",
    ],
  },
  retentionClosure: {
    rtcPartStatus: "approved",
    framPartStatus: "approved",
    backupSupportPart: "1uF local hold-up capacitor only; long-duration backup remains blocked",
    localHoldUpCapacitance: "1uF",
    powerFailHandling: "RTC and FRAM are present, but the long-duration RTC backup source remains an explicit blocker until approved",
    boardLevelPlaceholderStatus: "cleared",
  },
  timekeeping: {
    rtcBackup: "coin_cell_or_supercap",
    orderingGuarantee: "rtc_backed_monotonic_event_ordering",
    driftHandling: "resync against management time while preserving local event ordering",
  },
  eventBuffer: {
    storageClass: "nonvolatile",
    medium: "spi_fram_mb85rs256a",
    minimumRetainedEvents: 10_000,
    capacityWarningThreshold: 8_000,
    powerLossRetention: true,
  },
}