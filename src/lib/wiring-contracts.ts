import type {
  FabricationCriticalPartModel,
  PartApprovalStatus,
} from "./controller-types"

export interface NetContract {
  name: string
  purpose: string
}

export interface InterfaceContract {
  name: string
  direction: "input" | "output" | "bidirectional" | "mixed"
  signals: string[]
  notes: string
}

export interface ConnectorFamilyAssignment {
  interfaceName: string
  connectorFamily: string
  exactPart: string
  pinCount: number
  status: PartApprovalStatus
  notes: string
  sourceOfTruthFile: string
}

export interface FabricationClosureLedgerEntry {
  interfaceName: string
  status: PartApprovalStatus
  owningFiles: string[]
  criticalPartKeys: string[]
  closureSummary: string
  blockerSummary: string | null
}

export interface FabricationSourcingRecord {
  partKey: string
  lifecycleStatus: "active" | "unknown" | "at_risk"
  sourcingPath: string
  alternateTreatment: string
  footprintReviewOwner: string
  assemblyNote: string
}

export interface ContractPreservationRecord {
  subsystem: string
  preservedContract: string
  sourceOfTruthFiles: string[]
}

export const powerNets: NetContract[] = [
  { name: "V48_POE_IN", purpose: "PoE input before PD conditioning" },
  { name: "V12_POE_INT", purpose: "Intermediate PoE-derived rail before local point-of-load regulation" },
  { name: "V12_READER_AUX", purpose: "Auxiliary reader power rail" },
  { name: "V12_READER_FIELD", purpose: "Protected reader power presented to installer wiring" },
  { name: "V24_LOCK_EXT", purpose: "Installer-provided external lock rail" },
  { name: "V12_LOCK_EXT", purpose: "Installer-provided low-voltage lock rail" },
  { name: "V5_LOGIC", purpose: "Intermediate regulated logic rail" },
  { name: "V3_3_LOGIC", purpose: "Primary controller logic rail" },
  { name: "VBAT_RTC", purpose: "Retained RTC backup domain" },
  { name: "GND_LOGIC", purpose: "Controller logic return path" },
  { name: "GND_FIELD", purpose: "Field wiring return reference" },
]

export const signalNets: NetContract[] = [
  { name: "ETH_TX_P", purpose: "Ethernet transmit positive" },
  { name: "ETH_TX_N", purpose: "Ethernet transmit negative" },
  { name: "ETH_RX_P", purpose: "Ethernet receive positive" },
  { name: "ETH_RX_N", purpose: "Ethernet receive negative" },
  { name: "ETH_PHY_TX_P", purpose: "PHY transmit positive toward the magnetics boundary" },
  { name: "ETH_PHY_TX_N", purpose: "PHY transmit negative toward the magnetics boundary" },
  { name: "ETH_PHY_RX_P", purpose: "PHY receive positive from the magnetics boundary" },
  { name: "ETH_PHY_RX_N", purpose: "PHY receive negative from the magnetics boundary" },
  { name: "RMII_TXEN", purpose: "Controller RMII transmit enable" },
  { name: "RMII_TXD0", purpose: "Controller RMII transmit data bit 0" },
  { name: "RMII_TXD1", purpose: "Controller RMII transmit data bit 1" },
  { name: "RMII_RXD0", purpose: "Controller RMII receive data bit 0" },
  { name: "RMII_RXD1", purpose: "Controller RMII receive data bit 1" },
  { name: "RMII_CRS_DV", purpose: "Controller RMII carrier sense and data valid" },
  { name: "RMII_REFCLK", purpose: "50MHz RMII reference clock boundary" },
  { name: "ETH_MDC", purpose: "PHY management clock" },
  { name: "ETH_MDIO", purpose: "PHY management data" },
  { name: "ETH_PHY_RESET_N", purpose: "PHY reset control" },
  { name: "ETH_SHIELD", purpose: "LAN shield bond kept at the board edge and RC-bled into logic return" },
  { name: "CTRL_RESET_N", purpose: "Primary controller reset line" },
  { name: "CTRL_BOOT_MODE", purpose: "Primary controller boot or recovery strap" },
  { name: "CTRL_OSC_IN", purpose: "Controller oscillator input placeholder" },
  { name: "CTRL_OSC_OUT", purpose: "Controller oscillator output placeholder" },
  { name: "OSDP_UART_TX", purpose: "Controller UART transmit feeding the RS-485 OSDP path" },
  { name: "OSDP_UART_RX", purpose: "Controller UART receive from the RS-485 OSDP path" },
  { name: "OSDP_TX_EN", purpose: "Controller RS-485 transmit enable for half-duplex OSDP" },
  { name: "OSDP_RX_EN_N", purpose: "Controller RS-485 receiver disable control for half-duplex OSDP" },
  { name: "READER_OSDP_A", purpose: "OSDP RS-485 A" },
  { name: "READER_OSDP_B", purpose: "OSDP RS-485 B" },
  { name: "WIEGAND_D0", purpose: "Wiegand data 0" },
  { name: "WIEGAND_D1", purpose: "Wiegand data 1" },
  { name: "READER_LED", purpose: "Wiegand reader LED control placeholder" },
  { name: "READER_BEEP", purpose: "Wiegand reader beeper control placeholder" },
  { name: "DOOR_CONTACT", purpose: "Door state sensing path" },
  { name: "REX_INPUT", purpose: "Request-to-exit sensing path" },
  { name: "TAMPER_INPUT", purpose: "Tamper sensing path" },
  { name: "AUX_FAULT", purpose: "Abnormal power or auxiliary fault path" },
  { name: "LOCK_RELAY_COM", purpose: "Relay common contact" },
  { name: "LOCK_RELAY_NO", purpose: "Relay normally-open contact" },
  { name: "LOCK_RELAY_NC", purpose: "Relay normally-closed contact" },
  { name: "LOCK_RELAY_DRIVE", purpose: "MCU low-side drive control for the dry relay coil" },
  { name: "MGMT_STATUS", purpose: "Management link status indication" },
  { name: "MGMT_ONLINE", purpose: "Explicit online-status indication" },
  { name: "MGMT_DEGRADED", purpose: "Explicit degraded-management indication" },
  { name: "SYNC_PENDING", purpose: "Buffered event state indication" },
  { name: "SERVICE_SWDIO", purpose: "Primary service debug data line" },
  { name: "SERVICE_SWCLK", purpose: "Primary service debug clock line" },
  { name: "SERVICE_NRST", purpose: "Primary service reset line" },
  { name: "SERVICE_UART_TX", purpose: "Service UART transmit placeholder" },
  { name: "SERVICE_UART_RX", purpose: "Service UART receive placeholder" },
  { name: "SERVICE_BOOT_CFG", purpose: "Service boot or maintenance strap placeholder" },
  { name: "WATCHDOG_ALERT", purpose: "Watchdog or recovery-state visibility path" },
  { name: "RTC_SCL", purpose: "RTC timing interface clock placeholder" },
  { name: "RTC_SDA", purpose: "RTC timing interface data placeholder" },
  { name: "RTC_INT", purpose: "RTC interrupt or wake placeholder" },
  { name: "BUFFER_SPI_CLK", purpose: "Nonvolatile event-buffer clock placeholder" },
  { name: "BUFFER_SPI_MISO", purpose: "Nonvolatile event-buffer SPI data out (MISO)" },
  { name: "BUFFER_SPI_MOSI", purpose: "Nonvolatile event-buffer SPI data in (MOSI)" },
  { name: "BUFFER_CS", purpose: "Nonvolatile event-buffer chip select placeholder" },
  { name: "POWER_FAIL_WARN", purpose: "Power-fail warning or brownout signal" },
  { name: "MGMT_OFFLINE", purpose: "Offline management state indication" },
  { name: "RESYNC_ACTIVE", purpose: "Management resynchronization status indication" },
]

export const installerInterfaces: InterfaceContract[] = [
  {
    name: "controller_core_boundary",
    direction: "mixed",
    signals: [
      "RMII_TXEN",
      "RMII_TXD0",
      "RMII_TXD1",
      "RMII_RXD0",
      "RMII_RXD1",
      "RMII_CRS_DV",
      "RMII_REFCLK",
      "ETH_MDC",
      "ETH_MDIO",
      "ETH_PHY_RESET_N",
      "CTRL_RESET_N",
      "CTRL_BOOT_MODE",
      "CTRL_OSC_IN",
      "CTRL_OSC_OUT",
      "OSDP_UART_TX",
      "OSDP_UART_RX",
      "OSDP_TX_EN",
      "OSDP_RX_EN_N",
      "WIEGAND_D0",
      "WIEGAND_D1",
      "READER_LED",
      "READER_BEEP",
    ],
    notes: "Primary controller boundary for the MAC, reset, boot, oscillator, RS-485 reader bus, and Wiegand compatibility assumptions",
  },
  {
    name: "ethernet_poe_rj45",
    direction: "bidirectional",
    signals: ["ETH_TX_P", "ETH_TX_N", "ETH_RX_P", "ETH_RX_N", "V48_POE_IN"],
    notes: "10/100 Ethernet management link with PoE-fed logic power",
  },
  {
    name: "external_lock_power",
    direction: "input",
    signals: ["V12_LOCK_EXT", "V24_LOCK_EXT", "GND_FIELD"],
    notes: "Installer provides lock voltage; keep isolated from PoE logic budget",
  },
  {
    name: "dry_relay_output",
    direction: "output",
    signals: ["LOCK_RELAY_COM", "LOCK_RELAY_NO", "LOCK_RELAY_NC"],
    notes: "Supports fail-safe and fail-secure field wiring",
  },
  {
    name: "osdp_reader_port",
    direction: "bidirectional",
    signals: ["READER_OSDP_A", "READER_OSDP_B", "V12_READER_FIELD", "GND_FIELD"],
    notes: "Preferred secure reader interface over RS-485 with protected field-side power",
  },
  {
    name: "wiegand_reader_port",
    direction: "mixed",
    signals: ["WIEGAND_D0", "WIEGAND_D1", "READER_LED", "READER_BEEP", "V12_READER_FIELD", "GND_FIELD"],
    notes: "Compatibility path for installed-base readers with visible control-line placeholders",
  },
  {
    name: "supervised_inputs",
    direction: "input",
    signals: ["DOOR_CONTACT", "REX_INPUT", "TAMPER_INPUT", "AUX_FAULT"],
    notes: "Door, egress, tamper, and power/fault monitoring with review-visible supervision placeholders",
  },
  {
    name: "service_debug",
    direction: "mixed",
    signals: [
      "MGMT_STATUS",
      "MGMT_ONLINE",
      "MGMT_DEGRADED",
      "MGMT_OFFLINE",
      "RESYNC_ACTIVE",
      "SYNC_PENDING",
      "SERVICE_SWDIO",
      "SERVICE_SWCLK",
      "SERVICE_NRST",
      "SERVICE_UART_TX",
      "SERVICE_UART_RX",
      "SERVICE_BOOT_CFG",
      "WATCHDOG_ALERT",
    ],
    notes: "Reserved for diagnostics, commissioning, watchdog visibility, boot-mode forcing, and recovery-state review paths",
  },
  {
    name: "timekeeping_and_buffering",
    direction: "mixed",
    signals: [
      "RTC_SCL",
      "RTC_SDA",
      "RTC_INT",
      "BUFFER_SPI_CLK",
      "BUFFER_SPI_MISO",
      "BUFFER_SPI_MOSI",
      "BUFFER_CS",
      "POWER_FAIL_WARN",
      "MGMT_OFFLINE",
      "RESYNC_ACTIVE",
    ],
    notes: "Reserved for RTC-backed ordering, nonvolatile buffering, and degraded/offline state visibility",
  },
]

export const fabricationClosureLedger: FabricationClosureLedgerEntry[] = [
  {
    interfaceName: "ethernet_poe_rj45",
    status: "approved",
    owningFiles: ["src/components/ethernet-poe-front-end.tsx", "src/circuits/one-door-controller.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["ethernet_magjack", "ethernet_poe_entry_boundary"],
    closureSummary: "LAN entry is fixed to the Abracon ARJP11A-MA integrated magjack with explicit PoE taps, board-edge shield treatment, and PHY-side series links.",
    blockerSummary: null,
  },
  {
    interfaceName: "external_lock_power",
    status: "approved",
    owningFiles: ["src/components/relay-lock-output.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: [],
    closureSummary: "Installer lock supply entry is fixed to the Phoenix Contact MKDS 1,5/3-5,08 5.08 mm terminal family.",
    blockerSummary: null,
  },
  {
    interfaceName: "dry_relay_output",
    status: "approved",
    owningFiles: ["src/components/relay-lock-output.tsx", "src/components/power-domains.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["lock_relay", "lock_relay_drive"],
    closureSummary: "The lock interface now uses an Omron G5LE-1-DC12 Form-C relay with a dedicated PB10-driven low-side transistor and flyback path while preserving the dry-contact boundary.",
    blockerSummary: null,
  },
  {
    interfaceName: "osdp_reader_port",
    status: "approved",
    owningFiles: ["src/components/reader-interfaces.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["reader_terminal_blocks"],
    closureSummary: "The OSDP reader port is fixed to an approved 4-position Phoenix Contact MC-series 3.81 mm terminal family.",
    blockerSummary: null,
  },
  {
    interfaceName: "wiegand_reader_port",
    status: "approved",
    owningFiles: ["src/components/reader-interfaces.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["reader_terminal_blocks"],
    closureSummary: "The Wiegand compatibility port uses the same approved 4-position Phoenix Contact MC-series 3.81 mm terminal family.",
    blockerSummary: null,
  },
  {
    interfaceName: "supervised_inputs",
    status: "approved",
    owningFiles: ["src/components/supervised-input-bank.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["supervised_input_terminal_blocks"],
    closureSummary: "Door, REX, tamper, and auxiliary fault loops are fixed to approved 4-position Phoenix Contact MC-series terminals.",
    blockerSummary: null,
  },
  {
    interfaceName: "service_debug",
    status: "approved",
    owningFiles: ["src/components/service-connectors.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["service_debug_header"],
    closureSummary: "The service interface is fixed to a 2x05 1.27 mm recovery header compatible with Harwin M50-3500542.",
    blockerSummary: null,
  },
  {
    interfaceName: "timekeeping_and_buffering",
    status: "blocked",
    owningFiles: ["src/components/retention-support.tsx", "src/circuits/one-door-controller.tsx", "src/lib/controller-types.ts"],
    criticalPartKeys: ["rtc_device", "event_fram", "rtc_backup_source"],
    closureSummary: "RTC and FRAM devices are fixed, and the board-level event buffer placeholder has been removed.",
    blockerSummary: "Approve the long-duration RTC backup source before clearing the retention workstream.",
  },
]

export const fabricationCriticalPartTraceability: Pick<
  FabricationCriticalPartModel,
  "partKey" | "status" | "sourceOfTruthFile"
>[] = [
  { partKey: "service_debug_header", status: "approved", sourceOfTruthFile: "src/components/service-connectors.tsx" },
  { partKey: "reader_terminal_blocks", status: "approved", sourceOfTruthFile: "src/components/reader-interfaces.tsx" },
  { partKey: "supervised_input_terminal_blocks", status: "approved", sourceOfTruthFile: "src/components/supervised-input-bank.tsx" },
  { partKey: "rtc_device", status: "approved", sourceOfTruthFile: "src/components/retention-support.tsx" },
  { partKey: "event_fram", status: "approved", sourceOfTruthFile: "src/components/retention-support.tsx" },
  { partKey: "rtc_backup_source", status: "blocked", sourceOfTruthFile: "src/components/retention-support.tsx" },
  { partKey: "ethernet_magjack", status: "approved", sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx" },
  { partKey: "ethernet_poe_entry_boundary", status: "approved", sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx" },
  { partKey: "lock_relay", status: "approved", sourceOfTruthFile: "src/components/relay-lock-output.tsx" },
  { partKey: "lock_relay_drive", status: "approved", sourceOfTruthFile: "src/components/relay-lock-output.tsx" },
]

export const fabricationSourcingRecords: FabricationSourcingRecord[] = [
  {
    partKey: "controller_mcu",
    lifecycleStatus: "active",
    sourcingPath: "LCSC C8601",
    alternateTreatment: "single-source exception until firmware and package-compatible alternates are qualified",
    footprintReviewOwner: "hardware architecture review",
    assemblyNote: "LQFP-100 SMT placement with released KiCad body model",
  },
  {
    partKey: "service_debug_header",
    lifecycleStatus: "active",
    sourcingPath: "Harwin M50 series distribution",
    alternateTreatment: "pin-compatible headers allowed only with identical 1.27 mm pitch, 2x05 pinout, and mating height",
    footprintReviewOwner: "fabrication closure review",
    assemblyNote: "through-hole header kept clear of installer cable entry",
  },
  {
    partKey: "reader_terminal_blocks",
    lifecycleStatus: "active",
    sourcingPath: "Phoenix Contact MC-series distribution",
    alternateTreatment: "alternates require identical 3.81 mm pitch, entry direction, and retention geometry",
    footprintReviewOwner: "fabrication closure review",
    assemblyNote: "selective-solder field terminal on installer edge",
  },
  {
    partKey: "supervised_input_terminal_blocks",
    lifecycleStatus: "active",
    sourcingPath: "Phoenix Contact MC-series distribution",
    alternateTreatment: "alternates require identical 3.81 mm pitch, entry direction, and retention geometry",
    footprintReviewOwner: "fabrication closure review",
    assemblyNote: "selective-solder field terminal on installer edge",
  },
  {
    partKey: "rtc_device",
    lifecycleStatus: "active",
    sourcingPath: "LCSC C255630",
    alternateTreatment: "single-source exception until RTC drift, package, and backup-domain equivalence are reviewed",
    footprintReviewOwner: "retention review",
    assemblyNote: "SOIC-8 SMT device with released body model",
  },
  {
    partKey: "event_fram",
    lifecycleStatus: "active",
    sourcingPath: "LCSC C92189",
    alternateTreatment: "single-source exception until SPI FRAM timing and write-endurance equivalence are reviewed",
    footprintReviewOwner: "retention review",
    assemblyNote: "SOIC-8 SMT device with released body model",
  },
  {
    partKey: "ethernet_magjack",
    lifecycleStatus: "unknown",
    sourcingPath: "Abracon ARJP11A distribution",
    alternateTreatment: "no alternate approved until shield tab geometry, body overhang, and PoE tap mapping are revalidated",
    footprintReviewOwner: "LAN entry review",
    assemblyNote: "through-hole board-edge magjack in mixed-assembly flow",
  },
  {
    partKey: "ethernet_poe_entry_boundary",
    lifecycleStatus: "active",
    sourcingPath: "0402 passive assembly path local to the LAN edge",
    alternateTreatment: "standard passive equivalents allowed if voltage class and LAN-edge placement remain unchanged",
    footprintReviewOwner: "LAN entry review",
    assemblyNote: "SMT shield-bleed and bias network held inside the LAN keepout envelope",
  },
  {
    partKey: "lock_relay",
    lifecycleStatus: "active",
    sourcingPath: "Digikey Omron relay distribution",
    alternateTreatment: "no alternate approved until drill pattern, body height, and contact rating match the released relay corridor",
    footprintReviewOwner: "lock-interface review",
    assemblyNote: "through-hole relay grouped with installer terminals and reviewed for enclosure height",
  },
  {
    partKey: "lock_relay_drive",
    lifecycleStatus: "active",
    sourcingPath: "standard SOT-23 and SOD-123 assembly path",
    alternateTreatment: "device substitutions require equivalent current gain, coil current margin, and reverse-recovery behavior",
    footprintReviewOwner: "lock-interface review",
    assemblyNote: "SMT drive parts remain on the logic side of the dry-contact corridor",
  },
  {
    partKey: "rtc_backup_source",
    lifecycleStatus: "unknown",
    sourcingPath: "not approved",
    alternateTreatment: "blocked until the backup topology and part class are explicitly approved",
    footprintReviewOwner: "retention review",
    assemblyNote: "hold-up-only placeholder remains insufficient for release",
  },
]

export const contractPreservationRecords: ContractPreservationRecord[] = [
  {
    subsystem: "ethernet_and_poe",
    preservedContract: "PoE remains limited to logic and network power; LAN entry does not source installer lock current.",
    sourceOfTruthFiles: ["src/components/ethernet-poe-front-end.tsx", "src/components/power-domains.tsx"],
  },
  {
    subsystem: "dry_lock_boundary",
    preservedContract: "The released relay keeps COM/NO/NC as a dry installer-supplied boundary while the coil stays on the logic side.",
    sourceOfTruthFiles: ["src/components/relay-lock-output.tsx", "src/components/power-domains.tsx"],
  },
  {
    subsystem: "reader_modes",
    preservedContract: "OSDP RS-485 remains preferred and Wiegand remains available without reusing the service connector.",
    sourceOfTruthFiles: ["src/components/reader-interfaces.tsx", "src/components/service-connectors.tsx"],
  },
  {
    subsystem: "retention",
    preservedContract: "RTC and FRAM remain part of the baseline; only the backup source remains blocked.",
    sourceOfTruthFiles: ["src/components/retention-support.tsx", "src/circuits/one-door-controller.tsx"],
  },
]

export const connectorFamilyAssignments: ConnectorFamilyAssignment[] = [
  {
    interfaceName: "ethernet_poe_rj45",
    connectorFamily: "shielded_rj45_magjack",
    exactPart: "Abracon ARJP11A-MA",
    pinCount: 8,
    status: "approved",
    notes: "Integrated magnetics, PoE taps, and shield tabs all terminate at the LAN edge with an explicit RC shield bleed strategy.",
    sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx",
  },
  {
    interfaceName: "external_lock_power",
    connectorFamily: "pluggable_terminal_5_08mm",
    exactPart: "Phoenix Contact MKDS 1,5/3-5,08",
    pinCount: 3,
    status: "approved",
    notes: "Installer-facing terminal for external 12V or 24V lock supply only",
    sourceOfTruthFile: "src/components/relay-lock-output.tsx",
  },
  {
    interfaceName: "dry_relay_output",
    connectorFamily: "pluggable_terminal_5_08mm",
    exactPart: "Phoenix Contact MKDS 1,5/3-5,08",
    pinCount: 3,
    status: "approved",
    notes: "Dedicated Form-C dry relay field terminal kept distinct from logic wiring",
    sourceOfTruthFile: "src/components/relay-lock-output.tsx",
  },
  {
    interfaceName: "osdp_reader_port",
    connectorFamily: "pluggable_terminal_3_81mm",
    exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
    pinCount: 4,
    status: "approved",
    notes: "Reader bus terminal reserved for RS-485 A/B, auxiliary power, and field return",
    sourceOfTruthFile: "src/components/reader-interfaces.tsx",
  },
  {
    interfaceName: "wiegand_reader_port",
    connectorFamily: "pluggable_terminal_3_81mm",
    exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
    pinCount: 4,
    status: "approved",
    notes: "Retrofit reader terminal reserved for D0, D1, LED, beeper, and field return",
    sourceOfTruthFile: "src/components/reader-interfaces.tsx",
  },
  {
    interfaceName: "supervised_inputs",
    connectorFamily: "pluggable_terminal_3_81mm",
    exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
    pinCount: 4,
    status: "approved",
    notes: "Door, REX, tamper, and fault wiring stays on installer-facing low-density terminals",
    sourceOfTruthFile: "src/components/supervised-input-bank.tsx",
  },
  {
    interfaceName: "service_debug",
    connectorFamily: "tag_connect_2x5_1_27mm",
    exactPart: "Harwin M50-3500542 2x05 1.27 mm vertical header",
    pinCount: 10,
    status: "approved",
    notes: "Programming and recovery remain separate from installer wiring",
    sourceOfTruthFile: "src/components/service-connectors.tsx",
  },
]