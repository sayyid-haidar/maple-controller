import { KICAD_STEP_MODELS } from "../lib/cad-models"

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

export const READER_CONNECTOR_RELEASE = {
  osdpTerminalPart: "Phoenix Contact MC 1,5/4-G-3,81",
  wiegandTerminalPart: "Phoenix Contact MC 1,5/4-G-3,81",
  placementBoundary: "installer-facing field terminals remain separate from service and controller-core circuitry",
  cadModelStatus: "present",
} as const

// MAX3485ESA+T SOIC-8 pinout (Analog Devices datasheet):
const rs485TransceiverPinLabels = {
  pin1: "RO",    // Receiver output
  pin2: "RE_N",  // /RE — receiver output enable, active low
  pin3: "DE",    // DE — driver enable, active high
  pin4: "DI",    // DI — driver input
  pin5: "GND",
  pin6: "BUS_A", // A — non-inverting bus
  pin7: "BUS_B", // B — inverting bus
  pin8: "VCC",
} as const

// PRTR5V0U2X SOT-363 pinout (Nexperia datasheet): dual-channel TVS ESD protection
const rs485ProtectionPinLabels = {
  pin1: "GND",   // Common GND / field ground reference
  pin2: "BUS_A", // I/O1 — non-inverting RS-485 bus
  pin3: "BUS_B", // I/O2 — inverting RS-485 bus
  pin4: "VCC",   // Supply voltage
  pin5: "NC2",   // I/O4 — not connected
  pin6: "NC1",   // I/O3 — not connected
} as const

export const ReaderInterfaces = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    {/* Terminal blocks face +Y (top board edge for installer cable entry) — side by side */}
    <chip
      name="J_OSDP_TB"
      footprint="kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.phoenix_mc_1_5_4_g_3_81_horizontal }}
      supplierPartNumbers={{ digikey: [READER_CONNECTOR_RELEASE.osdpTerminalPart] }}
      pcbX={-10}
      pcbY={14}
      pinLabels={{ pin1: "OSDP_A", pin2: "OSDP_B", pin3: "FIELD_12V", pin4: "FIELD_GND" }}
    />
    <chip
      name="J_WIEGAND_TB"
      footprint="kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.phoenix_mc_1_5_4_g_3_81_horizontal }}
      supplierPartNumbers={{ digikey: [READER_CONNECTOR_RELEASE.wiegandTerminalPart] }}
      pcbX={10}
      pcbY={14}
      pinLabels={{ pin1: "W0_D0", pin2: "W1_D1", pin3: "LED_CTRL", pin4: "BEEP_CTRL" }}
    />
    {/* ESD protection — between terminals and transceiver */}
    <chip
      name="U_OSDP_PROTECT"
      footprint="kicad:Package_TO_SOT_SMD/SOT-23-6"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.sot_23_6 }}
      supplierPartNumbers={{ lcsc: ["C2842"] }}
      pcbX={-10}
      pcbY={4}
      pinLabels={rs485ProtectionPinLabels}
      pinAttributes={{
        VCC: { requiresPower: true },
        GND: { requiresGround: true },
      }}
    />
    {/* RS-485 transceiver — logic side, below protection */}
    <chip
      name="U_OSDP_XCVR"
      footprint="kicad:Package_SO/SOIC-8_3.9x4.9mm_P1.27mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.soic8_39x49_p127 }}
      supplierPartNumbers={{ lcsc: ["C122806"] }}
      pcbX={-10}
      pcbY={-8}
      pinLabels={rs485TransceiverPinLabels}
      pinAttributes={{
        VCC: { requiresPower: true },
        GND: { requiresGround: true },
      }}
    />
    <capacitor name="C_OSDP_XCVR_VDD" capacitance="100nF" footprint="0402" pcbX={-20} pcbY={-8} />
    {/* RS-485 termination and bias — near transceiver */}
    <resistor name="R_OSDP_A_TERM" resistance="120ohm" footprint="0402" pcbX={2} pcbY={-4} />
    <resistor name="R_OSDP_A_BIAS" resistance="1k" footprint="0402" pcbX={2} pcbY={-12} />
    <resistor name="R_OSDP_B_BIAS" resistance="1k" footprint="0402" pcbX={12} pcbY={-12} />
    <resistor name="R_OSDP_DE_PULLDOWN" resistance="10k" footprint="0402" pcbX={-20} pcbY={-16} />
    <resistor name="R_OSDP_RE_PULLDOWN" resistance="10k" footprint="0402" pcbX={-10} pcbY={-16} />
    <capacitor name="C_OSDP_A_FILTER" capacitance="10nF" footprint="0402" pcbX={2} pcbY={4} />
    <capacitor name="C_OSDP_B_FILTER" capacitance="10nF" footprint="0402" pcbX={12} pcbY={4} />
    {/* Wiegand support — near Wiegand terminal */}
    <resistor name="R_WIEGAND_D0_PULLUP" resistance="10k" footprint="0402" pcbX={10} pcbY={0} />
    <resistor name="R_WIEGAND_D1_PULLUP" resistance="10k" footprint="0402" pcbX={20} pcbY={0} />
    <capacitor name="C_WIEGAND_D0_FILTER" capacitance="10nF" footprint="0402" pcbX={10} pcbY={-8} />
    <capacitor name="C_WIEGAND_D1_FILTER" capacitance="10nF" footprint="0402" pcbX={20} pcbY={-8} />
    <resistor name="R_WIEGAND_LED_PULLUP" resistance="10k" footprint="0402" pcbX={10} pcbY={-16} />
    <resistor name="R_WIEGAND_BEEP_PULLUP" resistance="10k" footprint="0402" pcbX={20} pcbY={-16} />
    {/* Field power filtering */}
    <capacitor name="C_READER_FIELD_FILTER" capacitance="100nF" footprint="0402" pcbX={22} pcbY={4} />
    <resistor name="R_READER_AUX_PTC" resistance="1ohm" footprint="0603" pcbX={22} pcbY={-4} />

    <trace from=".U_OSDP_XCVR > .VCC" to="net.V3_3_LOGIC" />
    <trace from=".U_OSDP_XCVR > .GND" to="net.GND_LOGIC" />
    <trace from=".U_OSDP_XCVR > .DI" to="net.OSDP_UART_TX" />
    <trace from=".U_OSDP_XCVR > .RO" to="net.OSDP_UART_RX" />
    <trace from=".U_OSDP_XCVR > .DE" to="net.OSDP_TX_EN" />
    <trace from=".U_OSDP_XCVR > .RE_N" to="net.OSDP_RX_EN_N" />
    <trace from=".U_OSDP_XCVR > .BUS_A" to="net.READER_OSDP_A" />
    <trace from=".U_OSDP_XCVR > .BUS_B" to="net.READER_OSDP_B" />
    <trace from=".J_OSDP_TB > .OSDP_A" to="net.READER_OSDP_A" />
    <trace from=".J_OSDP_TB > .OSDP_B" to="net.READER_OSDP_B" />
    <trace from=".J_OSDP_TB > .FIELD_12V" to="net.V12_READER_FIELD" />
    <trace from=".J_OSDP_TB > .FIELD_GND" to="net.GND_FIELD" />
    <trace from=".J_WIEGAND_TB > .W0_D0" to="net.WIEGAND_D0" />
    <trace from=".J_WIEGAND_TB > .W1_D1" to="net.WIEGAND_D1" />
    <trace from=".J_WIEGAND_TB > .LED_CTRL" to="net.READER_LED" />
    <trace from=".J_WIEGAND_TB > .BEEP_CTRL" to="net.READER_BEEP" />
    <trace from=".U_OSDP_PROTECT > .BUS_A" to="net.READER_OSDP_A" />
    <trace from=".U_OSDP_PROTECT > .BUS_B" to="net.READER_OSDP_B" />
    <trace from=".U_OSDP_PROTECT > .GND" to="net.GND_FIELD" />
    <trace from=".U_OSDP_PROTECT > .VCC" to="net.V3_3_LOGIC" />
    <trace from=".C_OSDP_XCVR_VDD > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_OSDP_XCVR_VDD > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_OSDP_A_TERM > .pin1" to="net.READER_OSDP_A" />
    <trace from=".R_OSDP_A_TERM > .pin2" to="net.READER_OSDP_B" />
    <trace from=".R_WIEGAND_D0_PULLUP > .pin1" to="net.V12_READER_FIELD" />
    <trace from=".R_WIEGAND_D0_PULLUP > .pin2" to="net.WIEGAND_D0" />
    <trace from=".R_WIEGAND_D1_PULLUP > .pin1" to="net.V12_READER_FIELD" />
    <trace from=".R_WIEGAND_D1_PULLUP > .pin2" to="net.WIEGAND_D1" />
    <trace from=".C_READER_FIELD_FILTER > .pin1" to="net.V12_READER_FIELD" />
    <trace from=".C_READER_FIELD_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".R_READER_AUX_PTC > .pin1" to="net.V12_READER_AUX" />
    <trace from=".R_READER_AUX_PTC > .pin2" to="net.V12_READER_FIELD" />
    <trace from=".R_OSDP_A_BIAS > .pin1" to="net.READER_OSDP_A" />
    <trace from=".R_OSDP_A_BIAS > .pin2" to="net.GND_FIELD" />
    <trace from=".R_OSDP_B_BIAS > .pin1" to="net.READER_OSDP_B" />
    <trace from=".R_OSDP_B_BIAS > .pin2" to="net.GND_FIELD" />
    <trace from=".R_OSDP_DE_PULLDOWN > .pin1" to="net.OSDP_TX_EN" />
    <trace from=".R_OSDP_DE_PULLDOWN > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_OSDP_RE_PULLDOWN > .pin1" to="net.OSDP_RX_EN_N" />
    <trace from=".R_OSDP_RE_PULLDOWN > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_WIEGAND_D0_FILTER > .pin1" to="net.WIEGAND_D0" />
    <trace from=".C_WIEGAND_D0_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_WIEGAND_D1_FILTER > .pin1" to="net.WIEGAND_D1" />
    <trace from=".C_WIEGAND_D1_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".R_WIEGAND_LED_PULLUP > .pin1" to="net.V12_READER_FIELD" />
    <trace from=".R_WIEGAND_LED_PULLUP > .pin2" to="net.READER_LED" />
    <trace from=".R_WIEGAND_BEEP_PULLUP > .pin1" to="net.V12_READER_FIELD" />
    <trace from=".R_WIEGAND_BEEP_PULLUP > .pin2" to="net.READER_BEEP" />
    <trace from=".C_OSDP_A_FILTER > .pin1" to="net.READER_OSDP_A" />
    <trace from=".C_OSDP_A_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_OSDP_B_FILTER > .pin1" to="net.READER_OSDP_B" />
    <trace from=".C_OSDP_B_FILTER > .pin2" to="net.GND_FIELD" />
  </group>
)