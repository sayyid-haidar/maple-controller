import { KICAD_STEP_MODELS } from "../lib/cad-models"

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

// STM32F407VET6 LQFP-100 physical pin assignments.
// Side layout (25 pins per side, clockwise from pin 1):
//   Side 1 (1-25):  top — PE2..PE6, VBAT, PC13..PC15, OSC_IN/OUT, VSS/VDD,
//                          NRST, PC0..PC3, VDDA/VSSA, PA0..PA3, VSS
//   Side 2 (26-50): right — VDD, PA4..PA7, PC4..PC5, PB0..PB2, VSS/VDD,
//                          PE7..PE15, PB10..PB11, VCAP1, VDD
//   Side 3 (51-75): bottom — PB12..PB15, PD8..PD13, VSS/VDD, PD14..PD15,
//                          PC6..PC9, PA8..PA13, VCAP2
//   Side 4 (76-100): left — VSS/VDD, PA14, PA15, PC10..PC12, PD0..PD7,
//                          VSS/VDD, PB3..PB9, BOOT0
// Note: Verify exact positions against DS8626 rev 10+ before ordering PCBs.
// Core RMII signals (PA1/PA2/PA7/PB11/PB12/PB13/PC1/PC4/PC5) are confirmed
// from multiple STM32F407 RMII reference schematics.
const stm32PinLabels = {
  // ── Side 1 (top, 1-25) ────────────────────────────────────────────────
  pin1:  "PE2_NC",       // PE2  – not used
  pin2:  "PE3_NC",       // PE3  – not used
  pin3:  "PE4_NC",       // PE4  – not used
  pin4:  "PE5_NC",       // PE5  – not used
  pin5:  "PE6_NC",       // PE6  – not used
  pin6:  "VBAT",         // VBAT – no coin-cell backup on this board
  pin7:  "PC13_NC",      // PC13 – not used
  pin8:  "PC14_NC",      // PC14 – OSC32 (not used)
  pin9:  "PC15_NC",      // PC15 – OSC32 (not used)
  pin10: "OSC_IN",       // PH0  – 25 MHz main oscillator input
  pin11: "OSC_OUT_NC",   // PH1  – oscillator output (leave NC)
  pin12: "VSS_1",        // VSS
  pin13: "VDD_1",        // VDD
  pin14: "NRST",         // Hardware reset
  pin15: "PC0_NC",       // PC0  – not used
  pin16: "ETH_MDC",      // PC1  – ETH_RMII_MDC (AF11)
  pin17: "PC2_NC",       // PC2  – not used
  pin18: "PC3_NC",       // PC3  – not used
  pin19: "VDDA",         // Analog supply
  pin20: "VSSA",         // Analog ground
  pin21: "PA0_NC",       // PA0  – not used
  pin22: "RMII_REFCLK",  // PA1  – ETH_RMII_REF_CLK (AF11)
  pin23: "ETH_MDIO",     // PA2  – ETH_MDIO (AF11)
  pin24: "PA3_NC",       // PA3  – not used
  pin25: "VSS_2",        // VSS
  // ── Side 2 (right, 26-50) ────────────────────────────────────────────
  pin26: "VDD_2",        // VDD
  pin27: "PA4_NC",       // PA4  – not used
  pin28: "PA5_NC",       // PA5  – SPI1 conflicts with RMII on PA7
  pin29: "PA6_NC",       // PA6  – not used
  pin30: "RMII_CRS_DV",  // PA7  – ETH_RMII_CRS_DV (AF11)
  pin31: "RMII_RXD0",    // PC4  – ETH_RMII_RX_D0 (AF11)
  pin32: "RMII_RXD1",    // PC5  – ETH_RMII_RX_D1 (AF11)
  pin33: "PB0_NC",       // PB0  – not used
  pin34: "PB1_NC",       // PB1  – not used
  pin35: "PB2_NC",       // PB2/BOOT1 – not used
  pin36: "VSS_3",        // VSS
  pin37: "VDD_3",        // VDD
  pin38: "MGMT_STATUS",  // PE7  – GPIO output: management status LED
  pin39: "MGMT_ONLINE",  // PE8  – GPIO output: management online
  pin40: "MGMT_DEGRADED",// PE9  – GPIO output: management degraded
  pin41: "MGMT_OFFLINE", // PE10 – GPIO output: management offline
  pin42: "RESYNC_ACTIVE",// PE11 – GPIO output: resync in progress
  pin43: "WATCHDOG_ALERT",// PE12 – GPIO input: watchdog alert
  pin44: "WIEGAND_D0",   // PE13 – GPIO input: Wiegand data 0
  pin45: "WIEGAND_D1",   // PE14 – GPIO input: Wiegand data 1
  pin46: "READER_LED",   // PE15 – GPIO output: reader LED control
  pin47: "LOCK_RELAY_DRIVE", // PB10 – GPIO output: relay low-side drive
  pin48: "RMII_TXEN",    // PB11 – ETH_RMII_TX_EN (AF11)
  pin49: "VCAP_1",       // VCAP – internal LDO decoupling (1µF to GND)
  pin50: "VDD_4",        // VDD
  // ── Side 3 (bottom, 51-75) ───────────────────────────────────────────
  pin51: "RMII_TXD0",    // PB12 – ETH_RMII_TXD0 (AF11)
  pin52: "RMII_TXD1",    // PB13 – ETH_RMII_TXD1 (AF11)
  pin53: "PB14_NC",      // PB14 – not used
  pin54: "PB15_NC",      // PB15 – not used
  pin55: "PD8_NC",       // PD8  – not used
  pin56: "PD9_NC",       // PD9  – not used
  pin57: "PD10_NC",      // PD10 – not used
  pin58: "PD11_NC",      // PD11 – not used
  pin59: "PD12_NC",      // PD12 – not used
  pin60: "PD13_NC",      // PD13 – not used
  pin61: "VSS_4",        // VSS
  pin62: "VDD_5",        // VDD
  pin63: "PD14_NC",      // PD14 – not used
  pin64: "PD15_NC",      // PD15 – not used
  pin65: "PC6_NC",       // PC6  – not used
  pin66: "PC7_NC",       // PC7  – not used
  pin67: "PC8_NC",       // PC8  – not used
  pin68: "PC9_NC",       // PC9  – not used
  pin69: "PA8_NC",       // PA8  – not used
  pin70: "SERVICE_UART_TX", // PA9  – USART1_TX (AF7)
  pin71: "SERVICE_UART_RX", // PA10 – USART1_RX (AF7)
  pin72: "PA11_NC",      // PA11 – USB D- (not used)
  pin73: "PA12_NC",      // PA12 – USB D+ (not used)
  pin74: "SERVICE_SWDIO",// PA13 – SWDIO (AF0)
  pin75: "VCAP_2",       // VCAP – internal LDO decoupling (1µF to GND)
  // ── Side 4 (left, 76-100) ────────────────────────────────────────────
  pin76: "VSS_5",        // VSS
  pin77: "VDD_6",        // VDD
  pin78: "SERVICE_SWCLK",// PA14 – SWCLK (AF0)
  pin79: "BUFFER_CS",    // PA15 – SPI3_NSS → FRAM chip-select (AF6)
  pin80: "PC10_NC",      // PC10 – not used
  pin81: "PC11_NC",      // PC11 – not used
  pin82: "PC12_NC",      // PC12 – not used
  pin83: "PD0_NC",       // PD0  – not used
  pin84: "READER_BEEP",  // PD1  – GPIO output: reader beeper
  pin85: "OSDP_RX_EN_N", // PD2  – GPIO: RS-485 receiver enable (active low)
  pin86: "POWER_FAIL_WARN",// PD3 – GPIO input: PoE power-fail warning
  pin87: "PD4_NC",       // PD4  – not used
  pin88: "OSDP_UART_TX", // PD5  – USART2_TX (AF7) → RS-485 driver
  pin89: "VSS_6",        // VSS
  pin90: "VDD_7",        // VDD
  pin91: "OSDP_UART_RX", // PD6  – USART2_RX (AF7) ← RS-485 receiver
  pin92: "OSDP_TX_EN",   // PD7  – GPIO output: RS-485 driver enable
  pin93: "BUFFER_SPI_CLK",  // PB3  – SPI3_SCK (AF6)
  pin94: "BUFFER_SPI_MISO", // PB4  – SPI3_MISO (AF6)
  pin95: "BUFFER_SPI_MOSI", // PB5  – SPI3_MOSI (AF6)
  pin96: "RTC_SCL",      // PB6  – I2C1_SCL (AF4)
  pin97: "RTC_SDA",      // PB7  – I2C1_SDA (AF4)
  pin98: "CTRL_BOOT_MODE", // BOOT0 strap
  pin99: "RTC_INT",      // PB8  – GPIO input: RTC interrupt
  pin100: "PB9_NC",      // PB9  – not used
} as const

const oscillatorPinLabels = {
  pin1: "VCC",
  pin2: "GND",
  pin3: "CLK_OUT",
  pin4: "NC",
} as const

export const ControllerCore = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    <chip
      name="U_CTRL"
      footprint="kicad:Package_QFP/LQFP-100_14x14mm_P0.5mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.lqfp100_14x14_p05 }}
      supplierPartNumbers={{ lcsc: ["C8601"] }}
      pcbX={0}
      pcbY={0}
      pinLabels={stm32PinLabels}
      pinAttributes={{
        VDD_1: { requiresPower: true },
        VDD_2: { requiresPower: true },
        VDD_3: { requiresPower: true },
        VDD_4: { requiresPower: true },
        VDD_5: { requiresPower: true },
        VDD_6: { requiresPower: true },
        VDD_7: { requiresPower: true },
        VDDA:  { requiresPower: true },
        VSS_1: { requiresGround: true },
        VSS_2: { requiresGround: true },
        VSS_3: { requiresGround: true },
        VSS_4: { requiresGround: true },
        VSS_5: { requiresGround: true },
        VSS_6: { requiresGround: true },
        VSSA:  { requiresGround: true },
      }}
    />
    <chip
      name="U_CTRL_CLK"
      footprint="soic4"
      pcbX={12}
      pcbY={-14}
      pinLabels={oscillatorPinLabels}
      pinAttributes={{
        VCC: { requiresPower: true },
        GND: { requiresGround: true },
      }}
    />
    {/* MCU bulk decoupling */}
    <capacitor name="C_CTRL_VDD_A" capacitance="100nF" footprint="0402" pcbX={-10} pcbY={-12} />
    <capacitor name="C_CTRL_VDD_B" capacitance="100nF" footprint="0402" pcbX={10}  pcbY={12}  />
    {/* VCAP decoupling — mandatory 1µF per STM32F4 design guidelines */}
    <capacitor name="C_CTRL_VCAP1" capacitance="1uF"   footprint="0603" pcbX={10}  pcbY={-2}  />
    <capacitor name="C_CTRL_VCAP2" capacitance="1uF"   footprint="0603" pcbX={10}  pcbY={2}   />
    <capacitor name="C_CTRL_VDDA"  capacitance="1uF"   footprint="0603" pcbX={-10} pcbY={-8} />
    <resistor  name="R_CTRL_RESET_PULLUP"  resistance="10k"  footprint="0402" pcbX={-16} pcbY={8}  />
    <resistor  name="R_CTRL_BOOT_PULLDOWN" resistance="10k"  footprint="0402" pcbX={-16} pcbY={14} />
    <resistor  name="R_SERVICE_NRST_LINK"  resistance="0ohm" footprint="0402" pcbX={-8}  pcbY={-18} />
    <resistor  name="R_SERVICE_BOOT_LINK"  resistance="0ohm" footprint="0402" pcbX={2}   pcbY={-18} />
    {/* Status/diagnostic passives — below MCU to keep +Y zone clear for field interfaces */}
    <resistor  name="R_SYNC_PENDING_STATUS" resistance="1k" footprint="0402" pcbX={-26} pcbY={-22} />
    <capacitor name="C_SYNC_PENDING_FILTER" capacitance="100nF" footprint="0402" pcbX={-16} pcbY={-22} />
    <resistor  name="R_MGMT_ONLINE_INDICATOR" resistance="1k" footprint="0402" pcbX={-6} pcbY={-22} />
    <capacitor name="C_MGMT_ONLINE_FILTER" capacitance="100nF" footprint="0402" pcbX={4} pcbY={-22} />
    <resistor  name="R_MGMT_DEGRADED_INDICATOR" resistance="1k" footprint="0402" pcbX={14} pcbY={-22} />
    <capacitor name="C_MGMT_DEGRADED_FILTER" capacitance="100nF" footprint="0402" pcbX={24} pcbY={-22} />
    <resistor  name="R_MGMT_OFFLINE_STATUS" resistance="1k" footprint="0402" pcbX={-26} pcbY={-30} />
    <capacitor name="C_MGMT_OFFLINE_FILTER" capacitance="100nF" footprint="0402" pcbX={-16} pcbY={-30} />
    <resistor  name="R_RESYNC_ACTIVE_STATUS" resistance="1k" footprint="0402" pcbX={-6} pcbY={-30} />
    <capacitor name="C_RESYNC_ACTIVE_FILTER" capacitance="100nF" footprint="0402" pcbX={4} pcbY={-30} />
    <resistor  name="R_POWER_FAIL_WARN_PULLUP" resistance="10k" footprint="0402" pcbX={14} pcbY={-30} />
    <capacitor name="C_POWER_FAIL_WARN_FILTER" capacitance="10nF" footprint="0402" pcbX={24} pcbY={-30} />

    {/* VDD/VSS rails */}
    <trace from=".U_CTRL > .VDD_1" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDD_2" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDD_3" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDD_4" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDD_5" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDD_6" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDD_7" to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VDDA"  to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL > .VSS_1" to="net.GND_LOGIC" />
    <trace from=".U_CTRL > .VSS_2" to="net.GND_LOGIC" />
    <trace from=".U_CTRL > .VSS_3" to="net.GND_LOGIC" />
    <trace from=".U_CTRL > .VSS_4" to="net.GND_LOGIC" />
    <trace from=".U_CTRL > .VSS_5" to="net.GND_LOGIC" />
    <trace from=".U_CTRL > .VSS_6" to="net.GND_LOGIC" />
    <trace from=".U_CTRL > .VSSA"  to="net.GND_LOGIC" />
    {/* VCAP — mandatory 1µF cap per STM32F4 design guidelines */}
    <trace from=".U_CTRL > .VCAP_1" to=".C_CTRL_VCAP1 > .pin1" />
    <trace from=".U_CTRL > .VCAP_2" to=".C_CTRL_VCAP2 > .pin1" />
    <trace from=".C_CTRL_VCAP1 > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_CTRL_VCAP2 > .pin2" to="net.GND_LOGIC" />
    {/* Ethernet RMII */}
    <trace from=".U_CTRL > .ETH_MDC"      to="net.ETH_MDC" />
    <trace from=".U_CTRL > .ETH_MDIO"     to="net.ETH_MDIO" />
    <trace from=".U_CTRL > .RMII_TXEN"    to="net.RMII_TXEN" />
    <trace from=".U_CTRL > .RMII_TXD0"    to="net.RMII_TXD0" />
    <trace from=".U_CTRL > .RMII_TXD1"    to="net.RMII_TXD1" />
    <trace from=".U_CTRL > .RMII_REFCLK"  to="net.RMII_REFCLK" />
    <trace from=".U_CTRL > .RMII_CRS_DV"  to="net.RMII_CRS_DV" />
    <trace from=".U_CTRL > .RMII_RXD0"    to="net.RMII_RXD0" />
    <trace from=".U_CTRL > .RMII_RXD1"    to="net.RMII_RXD1" />
    {/* Reset / Boot */}
    <trace from=".U_CTRL > .NRST"            to="net.CTRL_RESET_N" />
    <trace from=".U_CTRL > .CTRL_BOOT_MODE"  to="net.CTRL_BOOT_MODE" />
    {/* Service (SWD + UART) */}
    <trace from=".U_CTRL > .SERVICE_UART_TX" to="net.SERVICE_UART_TX" />
    <trace from=".U_CTRL > .SERVICE_UART_RX" to="net.SERVICE_UART_RX" />
    <trace from=".U_CTRL > .SERVICE_SWDIO"   to="net.SERVICE_SWDIO" />
    <trace from=".U_CTRL > .SERVICE_SWCLK"   to="net.SERVICE_SWCLK" />
    {/* RTC (I2C1 on PB6/PB7) */}
    <trace from=".U_CTRL > .RTC_SCL" to="net.RTC_SCL" />
    <trace from=".U_CTRL > .RTC_SDA" to="net.RTC_SDA" />
    <trace from=".U_CTRL > .RTC_INT" to="net.RTC_INT" />
    {/* FRAM SPI3 (PB3/PB4/PB5) + CS on PA15 */}
    <trace from=".U_CTRL > .BUFFER_SPI_CLK"  to="net.BUFFER_SPI_CLK" />
    <trace from=".U_CTRL > .BUFFER_SPI_MISO" to="net.BUFFER_SPI_MISO" />
    <trace from=".U_CTRL > .BUFFER_SPI_MOSI" to="net.BUFFER_SPI_MOSI" />
    <trace from=".U_CTRL > .BUFFER_CS"        to="net.BUFFER_CS" />
    {/* Status/diagnostic GPIO */}
    <trace from=".U_CTRL > .POWER_FAIL_WARN" to="net.POWER_FAIL_WARN" />
    <trace from=".U_CTRL > .LOCK_RELAY_DRIVE" to="net.LOCK_RELAY_DRIVE" />
    <trace from=".U_CTRL > .MGMT_STATUS"     to="net.MGMT_STATUS" />
    <trace from=".U_CTRL > .MGMT_ONLINE"     to="net.MGMT_ONLINE" />
    <trace from=".U_CTRL > .MGMT_DEGRADED"   to="net.MGMT_DEGRADED" />
    <trace from=".U_CTRL > .MGMT_OFFLINE"    to="net.MGMT_OFFLINE" />
    <trace from=".U_CTRL > .RESYNC_ACTIVE"   to="net.RESYNC_ACTIVE" />
    <trace from=".U_CTRL > .WATCHDOG_ALERT"  to="net.WATCHDOG_ALERT" />
    {/* OSDP RS-485 via USART2 (PD5/PD6) + direction control (PD7/PD2) */}
    <trace from=".U_CTRL > .OSDP_UART_TX"  to="net.OSDP_UART_TX" />
    <trace from=".U_CTRL > .OSDP_UART_RX"  to="net.OSDP_UART_RX" />
    <trace from=".U_CTRL > .OSDP_TX_EN"    to="net.OSDP_TX_EN" />
    <trace from=".U_CTRL > .OSDP_RX_EN_N"  to="net.OSDP_RX_EN_N" />
    {/* Wiegand / Reader control */}
    <trace from=".U_CTRL > .WIEGAND_D0"   to="net.WIEGAND_D0" />
    <trace from=".U_CTRL > .WIEGAND_D1"   to="net.WIEGAND_D1" />
    <trace from=".U_CTRL > .READER_LED"   to="net.READER_LED" />
    <trace from=".U_CTRL > .READER_BEEP"  to="net.READER_BEEP" />
    {/* External 25 MHz oscillator into PH0/OSC_IN */}
    <trace from=".U_CTRL_CLK > .VCC"     to="net.V3_3_LOGIC" />
    <trace from=".U_CTRL_CLK > .GND"     to="net.GND_LOGIC" />
    <trace from=".U_CTRL_CLK > .CLK_OUT" to="net.CTRL_OSC_OUT" />
    <trace from=".U_CTRL > .OSC_IN"      to="net.CTRL_OSC_OUT" />
    {/* Bulk MCU decoupling */}
    <trace from=".C_CTRL_VDD_A > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_CTRL_VDD_A > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_CTRL_VDD_B > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_CTRL_VDD_B > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_CTRL_VDDA > .pin1"  to="net.V3_3_LOGIC" />
    <trace from=".C_CTRL_VDDA > .pin2"  to="net.GND_LOGIC" />
    {/* Reset circuit */}
    <trace from=".R_CTRL_RESET_PULLUP > .pin1"  to="net.V3_3_LOGIC" />
    <trace from=".R_CTRL_RESET_PULLUP > .pin2"  to="net.CTRL_RESET_N" />
    <trace from=".R_CTRL_BOOT_PULLDOWN > .pin1" to="net.CTRL_BOOT_MODE" />
    <trace from=".R_CTRL_BOOT_PULLDOWN > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_SERVICE_NRST_LINK > .pin1"  to="net.SERVICE_NRST" />
    <trace from=".R_SERVICE_NRST_LINK > .pin2"  to="net.CTRL_RESET_N" />
    <trace from=".R_SERVICE_BOOT_LINK > .pin1"  to="net.SERVICE_BOOT_CFG" />
    <trace from=".R_SERVICE_BOOT_LINK > .pin2"  to="net.CTRL_BOOT_MODE" />
    {/* Management and retention-status support kept local to the MCU GPIO bank */}
    <trace from=".R_SYNC_PENDING_STATUS > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SYNC_PENDING_STATUS > .pin2" to="net.SYNC_PENDING" />
    <trace from=".C_SYNC_PENDING_FILTER > .pin1" to="net.SYNC_PENDING" />
    <trace from=".C_SYNC_PENDING_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_MGMT_ONLINE_INDICATOR > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_MGMT_ONLINE_INDICATOR > .pin2" to="net.MGMT_ONLINE" />
    <trace from=".C_MGMT_ONLINE_FILTER > .pin1" to="net.MGMT_ONLINE" />
    <trace from=".C_MGMT_ONLINE_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_MGMT_DEGRADED_INDICATOR > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_MGMT_DEGRADED_INDICATOR > .pin2" to="net.MGMT_DEGRADED" />
    <trace from=".C_MGMT_DEGRADED_FILTER > .pin1" to="net.MGMT_DEGRADED" />
    <trace from=".C_MGMT_DEGRADED_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_MGMT_OFFLINE_STATUS > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_MGMT_OFFLINE_STATUS > .pin2" to="net.MGMT_OFFLINE" />
    <trace from=".C_MGMT_OFFLINE_FILTER > .pin1" to="net.MGMT_OFFLINE" />
    <trace from=".C_MGMT_OFFLINE_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_RESYNC_ACTIVE_STATUS > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_RESYNC_ACTIVE_STATUS > .pin2" to="net.RESYNC_ACTIVE" />
    <trace from=".C_RESYNC_ACTIVE_FILTER > .pin1" to="net.RESYNC_ACTIVE" />
    <trace from=".C_RESYNC_ACTIVE_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_POWER_FAIL_WARN_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_POWER_FAIL_WARN_PULLUP > .pin2" to="net.POWER_FAIL_WARN" />
    <trace from=".C_POWER_FAIL_WARN_FILTER > .pin1" to="net.POWER_FAIL_WARN" />
    <trace from=".C_POWER_FAIL_WARN_FILTER > .pin2" to="net.GND_LOGIC" />
  </group>
)