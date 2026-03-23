import { KICAD_STEP_MODELS } from "../lib/cad-models"

export const RETENTION_RELEASE = {
  rtcPart: "DS3231MZ+",
  framPart: "MB85RS256A",
  backupSupportStatus: "blocked pending approved long-duration backup source",
  localHoldUpCapacitance: "1uF",
  architecturePreservation: "RTC and FRAM remain mandatory for offline event ordering; only the long-duration backup source stays blocked",
} as const

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

// DS3231MZ SOIC-8 pinout (Analog Devices / Maxim datasheet):
// pin1=32kHz output, pin2=VCC, pin3=/INT-SQW, pin4=/RST,
// pin5=GND, pin6=VBAT, pin7=SCL, pin8=SDA
const rtcPinLabels = {
  pin1: "CLK_OUT_32K",  // 32 kHz square-wave output (leave NC if unused)
  pin2: "VCC",
  pin3: "RTC_INT",      // /INT-SQW — alarm interrupt, active low, open drain
  pin4: "RST",          // /RST — reset output, active low; internal 50kΩ pullup
  pin5: "GND",
  pin6: "VBAT",         // Backup battery input
  pin7: "RTC_SCL",      // I2C clock
  pin8: "RTC_SDA",      // I2C data (open drain)
} as const

// MB85RS256 SOIC-8 pinout (Fujitsu datasheet) — already matches original.
const framPinLabels = {
  pin1: "CS",    // /CS — chip select, active low
  pin2: "MISO",  // SO  — serial output (MISO)
  pin3: "WP",    // /WP — write protect (tie high to disable)
  pin4: "GND",   // VSS
  pin5: "MOSI",  // SI  — serial input (MOSI)
  pin6: "SCK",   // SCK — SPI clock
  pin7: "HOLD",  // /HOLD — hold (tie high to disable)
  pin8: "VCC",   // VDD
} as const

export const RetentionSupport = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    {/* RTC and FRAM side by side — compact for near-MCU placement */}
    <chip
      name="U_RTC"
      footprint="kicad:Package_SO/SOIC-8_3.9x4.9mm_P1.27mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.soic8_39x49_p127 }}
      supplierPartNumbers={{ lcsc: ["C255630"] }}
      pcbX={0}
      pcbY={0}
      pinLabels={rtcPinLabels}
      pinAttributes={{
        VCC:  { requiresPower: true },
        VBAT: { requiresPower: true },
        GND:  { requiresGround: true },
      }}
    />
    <chip
      name="U_EVENT_FRAM"
      footprint="kicad:Package_SO/SOIC-8_3.9x4.9mm_P1.27mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.soic8_39x49_p127 }}
      supplierPartNumbers={{ lcsc: ["C92189"] }}
      pcbX={14}
      pcbY={0}
      pinLabels={framPinLabels}
      pinAttributes={{
        VCC: { requiresPower: true },
        GND: { requiresGround: true },
      }}
    />
    {/* Decoupling — directly adjacent to ICs */}
    <capacitor name="C_RTC_VDD" capacitance="100nF" footprint="0402" pcbX={-6} pcbY={6} />
    <capacitor name="C_FRAM_VDD" capacitance="100nF" footprint="0402" pcbX={20} pcbY={6} />
    <capacitor name="C_RTC_BACKUP_HOLDUP" capacitance={RETENTION_RELEASE.localHoldUpCapacitance} footprint="0603" pcbX={-6} pcbY={0} />
    <capacitor name="C_EVENT_BUFFER_HOLDUP" capacitance={RETENTION_RELEASE.localHoldUpCapacitance} footprint="0402" pcbX={20} pcbY={0} />
    {/* I2C pullups — between RTC and FRAM */}
    <resistor name="R_RTC_SCL_PULLUP" resistance="4.7k" footprint="0402" pcbX={0} pcbY={12} />
    <resistor name="R_RTC_SDA_PULLUP" resistance="4.7k" footprint="0402" pcbX={7} pcbY={12} />
    <resistor name="R_RTC_INT_PULLUP" resistance="10k" footprint="0402" pcbX={14} pcbY={12} />
    {/* SPI pullups — below FRAM */}
    <resistor name="R_BUFFER_SPI_CLK_PULLUP" resistance="10k" footprint="0402" pcbX={14} pcbY={-6} />
    <resistor name="R_BUFFER_CS_PULLUP" resistance="10k" footprint="0402" pcbX={20} pcbY={-6} />

    <trace from=".U_RTC > .RTC_INT" to="net.RTC_INT" />
    <trace from=".U_RTC > .RST" to="net.V3_3_LOGIC" />{/* internal 50kΩ pullup; tie to VCC */}
    <trace from=".U_RTC > .RTC_SCL" to="net.RTC_SCL" />
    <trace from=".U_RTC > .RTC_SDA" to="net.RTC_SDA" />
    <trace from=".U_RTC > .GND" to="net.GND_LOGIC" />
    <trace from=".U_RTC > .VBAT" to="net.VBAT_RTC" />
    <trace from=".U_RTC > .VCC" to="net.V3_3_LOGIC" />
    <trace from=".U_EVENT_FRAM > .CS" to="net.BUFFER_CS" />
    <trace from=".U_EVENT_FRAM > .MISO" to="net.BUFFER_SPI_MISO" />
    <trace from=".U_EVENT_FRAM > .WP" to="net.V3_3_LOGIC" />
    <trace from=".U_EVENT_FRAM > .GND" to="net.GND_LOGIC" />
    <trace from=".U_EVENT_FRAM > .MOSI" to="net.BUFFER_SPI_MOSI" />
    <trace from=".U_EVENT_FRAM > .SCK" to="net.BUFFER_SPI_CLK" />
    <trace from=".U_EVENT_FRAM > .HOLD" to="net.V3_3_LOGIC" />
    <trace from=".U_EVENT_FRAM > .VCC" to="net.V3_3_LOGIC" />
    <trace from=".C_RTC_VDD > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_RTC_VDD > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_FRAM_VDD > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_FRAM_VDD > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_RTC_BACKUP_HOLDUP > .pin1" to="net.VBAT_RTC" />
    <trace from=".C_RTC_BACKUP_HOLDUP > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_EVENT_BUFFER_HOLDUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_EVENT_BUFFER_HOLDUP > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_RTC_SCL_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_RTC_SCL_PULLUP > .pin2" to="net.RTC_SCL" />
    <trace from=".R_RTC_SDA_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_RTC_SDA_PULLUP > .pin2" to="net.RTC_SDA" />
    <trace from=".R_RTC_INT_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_RTC_INT_PULLUP > .pin2" to="net.RTC_INT" />
    <trace from=".R_BUFFER_SPI_CLK_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_BUFFER_SPI_CLK_PULLUP > .pin2" to="net.BUFFER_SPI_CLK" />
    <trace from=".R_BUFFER_CS_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_BUFFER_CS_PULLUP > .pin2" to="net.BUFFER_CS" />
  </group>
)