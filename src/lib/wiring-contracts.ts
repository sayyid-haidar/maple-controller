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
  notes: string
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

export const provisionalParts = [
  "Primary MCU with integrated Ethernet MAC and enough GPIO/UART/SPI/I2C margin for one-door control",
  "External RMII PHY with 10/100 Ethernet support and manageable clocking/reset boundary",
  "RJ45 magjack footprint and integrated magnetics selection",
  "PoE PD controller footprint and power conversion chain",
  "Dry relay package, coil drive topology, and contact rating",
  "Tag-Connect or equivalent compact service-access footprint",
  "Terminal block family for field-side lock and input wiring",
  "Field-side surge clamp and resettable fuse selections for reader and input wiring",
  "RTC backup source and low-power timekeeping device",
  "FRAM or NOR flash device for offline event buffering",
]

export const connectorFamilyAssignments: ConnectorFamilyAssignment[] = [
  {
    interfaceName: "ethernet_poe_rj45",
    connectorFamily: "shielded_rj45_magjack",
    notes: "Integrated magnetics and shield handling stay at the LAN edge",
  },
  {
    interfaceName: "external_lock_power",
    connectorFamily: "pluggable_terminal_5_08mm",
    notes: "Installer-facing terminal for external 12V or 24V lock supply only",
  },
  {
    interfaceName: "dry_relay_output",
    connectorFamily: "pluggable_terminal_5_08mm",
    notes: "Dedicated Form-C dry relay field terminal kept distinct from logic wiring",
  },
  {
    interfaceName: "osdp_reader_port",
    connectorFamily: "pluggable_terminal_3_81mm",
    notes: "Reader bus terminal reserved for RS-485 A/B, auxiliary power, and field return",
  },
  {
    interfaceName: "wiegand_reader_port",
    connectorFamily: "pluggable_terminal_3_81mm",
    notes: "Retrofit reader terminal reserved for D0, D1, LED, beeper, and field return",
  },
  {
    interfaceName: "supervised_inputs",
    connectorFamily: "pluggable_terminal_3_81mm",
    notes: "Door, REX, tamper, and fault wiring stays on installer-facing low-density terminals",
  },
  {
    interfaceName: "service_debug",
    connectorFamily: "tag_connect_2x5_1_27mm",
    notes: "Programming and recovery remain separate from installer wiring",
  },
]