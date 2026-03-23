import { KICAD_STEP_MODELS } from "../lib/cad-models"

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

export const LOCK_RELAY_RELEASE = {
  exactPart: "Omron G5LE-1-DC12",
  driveTransistor: "MMBT2222A",
  flybackDiode: "B5819W",
  installerTerminal: "Phoenix Contact MKDS 1,5/3-5,08",
  creepageBoundary: "relay body and external lock terminals stay grouped on the installer edge with a dedicated dry-contact corridor back to the logic domain",
  preservedLockBoundary: "relay coil is logic-powered, but COM/NO/NC remain a dry installer-supplied switching boundary",
  sourcingPath: "Omron relay distribution plus KiCad-native Relay_THT footprint ownership",
  alternatePolicy: "no alternate approved until the replacement keeps the same contact form, drill pattern, and body envelope",
  assemblySuitability: "through-hole relay with SMT low-side driver and flyback diode assembled on the logic side of the dry-contact corridor",
  footprintReviewOwner: "lock-interface review",
  cadModelStatus: "present",
} as const

const lockPowerTerminalPinLabels = {
  pin1: "V12_EXT",
  pin2: "GND_FIELD",
  pin3: "V24_EXT",
} as const

const lockRelayTerminalPinLabels = {
  pin1: "RELAY_COM",
  pin2: "RELAY_NO",
  pin3: "RELAY_NC",
} as const

export const RelayLockOutput = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    {/* Terminal blocks face +Y (top board edge for installer cable entry) */}
    <chip
      name="J_LOCK_POWER_TB"
      footprint="kicad:TerminalBlock_Phoenix/TerminalBlock_Phoenix_MKDS-1,5-3-5.08_1x03_P5.08mm_Horizontal"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.phoenix_mkds_1_5_3_5_08_horizontal }}
      supplierPartNumbers={{ digikey: [LOCK_RELAY_RELEASE.installerTerminal] }}
      pcbX={-10}
      pcbY={16}
      pinLabels={lockPowerTerminalPinLabels}
    />
    <chip
      name="J_LOCK_RELAY_TB"
      footprint="kicad:TerminalBlock_Phoenix/TerminalBlock_Phoenix_MKDS-1,5-3-5.08_1x03_P5.08mm_Horizontal"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.phoenix_mkds_1_5_3_5_08_horizontal }}
      supplierPartNumbers={{ digikey: [LOCK_RELAY_RELEASE.installerTerminal] }}
      pcbX={14}
      pcbY={16}
      pinLabels={lockRelayTerminalPinLabels}
    />
    {/* Relay body — center of group */}
    <chip
      name="K_LOCK_RELAY"
      footprint="kicad:Relay_THT/Relay_SPDT_Omron-G5LE-1"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.relay_spdt_omron_g5le_1 }}
      supplierPartNumbers={{ digikey: [LOCK_RELAY_RELEASE.exactPart] }}
      pcbX={4}
      pcbY={2}
      pinLabels={{ pin1: "COIL_A", pin2: "COIL_B", pin3: "COM", pin4: "NO", pin5: "NC" }}
    />
    {/* Driver + flyback — logic side, below relay */}
    <chip
      name="Q_LOCK_DRIVER"
      footprint="kicad:Package_TO_SOT_SMD/SOT-23"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.sot_23_3 }}
      supplierPartNumbers={{ lcsc: [LOCK_RELAY_RELEASE.driveTransistor] }}
      pcbX={-6}
      pcbY={-10}
      pinLabels={{ pin1: "B", pin2: "E", pin3: "C" }}
      pinAttributes={{ E: { requiresGround: true } }}
    />
    <chip
      name="D_LOCK_FLYBACK"
      footprint="kicad:Diode_SMD/D_SOD-123"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.d_sod_123 }}
      supplierPartNumbers={{ lcsc: [LOCK_RELAY_RELEASE.flybackDiode] }}
      pcbX={10}
      pcbY={-10}
      pinLabels={{ pin1: "A", pin2: "K" }}
    />
    <resistor name="R_RELAY_BASE" resistance="1kohm" footprint="0402" pcbX={-16} pcbY={-10} />
    <resistor name="R_RELAY_BASE_PULLDOWN" resistance="100kohm" footprint="0402" pcbX={-16} pcbY={-4} />
    {/* Field-side filter caps — near terminals */}
    <capacitor name="C_LOCK_12V_FILTER" capacitance="100nF" footprint="0402" pcbX={-10} pcbY={8} />
    <capacitor name="C_LOCK_24V_FILTER" capacitance="100nF" footprint="0402" pcbX={14} pcbY={8} />
    <capacitor name="C_LOCK_CONTACT_DAMP" capacitance="1nF" footprint="0402" pcbX={24} pcbY={8} />

    <trace from=".J_LOCK_POWER_TB > .V12_EXT" to="net.V12_LOCK_EXT" />
    <trace from=".J_LOCK_POWER_TB > .GND_FIELD" to="net.GND_FIELD" />
    <trace from=".J_LOCK_POWER_TB > .V24_EXT" to="net.V24_LOCK_EXT" />
    <trace from=".J_LOCK_RELAY_TB > .RELAY_COM" to="net.LOCK_RELAY_COM" />
    <trace from=".J_LOCK_RELAY_TB > .RELAY_NO" to="net.LOCK_RELAY_NO" />
    <trace from=".J_LOCK_RELAY_TB > .RELAY_NC" to="net.LOCK_RELAY_NC" />
    <trace from=".K_LOCK_RELAY > .COM" to="net.LOCK_RELAY_COM" />
    <trace from=".K_LOCK_RELAY > .NO" to="net.LOCK_RELAY_NO" />
    <trace from=".K_LOCK_RELAY > .NC" to="net.LOCK_RELAY_NC" />
    <trace from=".K_LOCK_RELAY > .COIL_A" to="net.V12_POE_INT" />
    <trace from=".K_LOCK_RELAY > .COIL_B" to="net.LOCK_RELAY_COIL_LOW" />
    <trace from=".Q_LOCK_DRIVER > .C" to="net.LOCK_RELAY_COIL_LOW" />
    <trace from=".Q_LOCK_DRIVER > .E" to="net.GND_LOGIC" />
    <trace from=".Q_LOCK_DRIVER > .B" to=".R_RELAY_BASE > .pin2" />
    <trace from=".R_RELAY_BASE > .pin1" to="net.LOCK_RELAY_DRIVE" />
    <trace from=".R_RELAY_BASE_PULLDOWN > .pin1" to="net.LOCK_RELAY_DRIVE" />
    <trace from=".R_RELAY_BASE_PULLDOWN > .pin2" to="net.GND_LOGIC" />
    <trace from=".D_LOCK_FLYBACK > .A" to="net.LOCK_RELAY_COIL_LOW" />
    <trace from=".D_LOCK_FLYBACK > .K" to="net.V12_POE_INT" />
    <trace from=".C_LOCK_12V_FILTER > .pin1" to="net.V12_LOCK_EXT" />
    <trace from=".C_LOCK_12V_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_LOCK_24V_FILTER > .pin1" to="net.V24_LOCK_EXT" />
    <trace from=".C_LOCK_24V_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_LOCK_CONTACT_DAMP > .pin1" to="net.LOCK_RELAY_NO" />
    <trace from=".C_LOCK_CONTACT_DAMP > .pin2" to="net.LOCK_RELAY_COM" />
  </group>
)