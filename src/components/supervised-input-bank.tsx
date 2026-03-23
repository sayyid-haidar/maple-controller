import { KICAD_STEP_MODELS } from "../lib/cad-models"

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

export const SUPERVISED_INPUT_CONNECTOR_RELEASE = {
  exactPart: "Phoenix Contact MC 1,5/4-G-3,81",
  usageBoundary: "installer-facing low-current supervised loops only",
  sourcingPath: "Phoenix Contact MC-series distribution with shared 3.81 mm field-terminal footprint ownership",
  alternatePolicy: "3.81 mm alternates require the same entry direction and terminal retention force before approval",
  assemblySuitability: "through-hole field terminal intended for installer-side cable landing and selective solder",
  footprintReviewOwner: "fabrication closure review",
  cadModelStatus: "present",
} as const

const entryInputTerminalPinLabels = {
  pin1: "DOOR_CONTACT",
  pin2: "REX_INPUT",
  pin3: "GND_A",
  pin4: "GND_B",
} as const

const statusInputTerminalPinLabels = {
  pin1: "TAMPER_INPUT",
  pin2: "AUX_FAULT",
  pin3: "GND_C",
  pin4: "GND_D",
} as const

export const SupervisedInputBank = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    {/* Terminal blocks face +Y (top board edge for installer cable entry) */}
    <chip name="J_ENTRY_INPUTS_TB" footprint="kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal" cadModel={{ stepUrl: KICAD_STEP_MODELS.phoenix_mc_1_5_4_g_3_81_horizontal }} supplierPartNumbers={{ digikey: [SUPERVISED_INPUT_CONNECTOR_RELEASE.exactPart] }} pcbX={-10} pcbY={12} pinLabels={entryInputTerminalPinLabels} />
    <chip name="J_STATUS_INPUTS_TB" footprint="kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal" cadModel={{ stepUrl: KICAD_STEP_MODELS.phoenix_mc_1_5_4_g_3_81_horizontal }} supplierPartNumbers={{ digikey: [SUPERVISED_INPUT_CONNECTOR_RELEASE.exactPart] }} pcbX={10} pcbY={12} pinLabels={statusInputTerminalPinLabels} />
    {/* Pullups and supervision resistors — logic side, below terminals */}
    <resistor name="R_DOOR_CONTACT_PULLUP" resistance="10k" footprint="0402" pcbX={-14} pcbY={0} />
    <resistor name="R_REX_PULLUP" resistance="10k" footprint="0402" pcbX={-6} pcbY={0} />
    <resistor name="R_TAMPER_PULLUP" resistance="10k" footprint="0402" pcbX={2} pcbY={0} />
    <resistor name="R_FAULT_PULLUP" resistance="10k" footprint="0402" pcbX={10} pcbY={0} />
    <resistor name="R_DOOR_CONTACT_SUPERVISION" resistance="1k" footprint="0402" pcbX={18} pcbY={0} />
    <resistor name="R_REX_SUPERVISION" resistance="1k" footprint="0402" pcbX={26} pcbY={0} />
    {/* Filter caps and field dampers — furthest from edge */}
    <capacitor name="C_DOOR_CONTACT_FILTER" capacitance="10nF" footprint="0402" pcbX={-14} pcbY={-8} />
    <capacitor name="C_REX_FILTER" capacitance="10nF" footprint="0402" pcbX={-6} pcbY={-8} />
    <capacitor name="C_TAMPER_FILTER" capacitance="10nF" footprint="0402" pcbX={2} pcbY={-8} />
    <capacitor name="C_FAULT_FILTER" capacitance="10nF" footprint="0402" pcbX={10} pcbY={-8} />
    <resistor name="R_TAMPER_FIELD_DAMP" resistance="1k" footprint="0402" pcbX={18} pcbY={-8} />
    <resistor name="R_FAULT_FIELD_DAMP" resistance="1k" footprint="0402" pcbX={26} pcbY={-8} />

    <trace from=".J_ENTRY_INPUTS_TB > .DOOR_CONTACT" to="net.DOOR_CONTACT" />
    <trace from=".J_ENTRY_INPUTS_TB > .REX_INPUT" to="net.REX_INPUT" />
    <trace from=".J_ENTRY_INPUTS_TB > .GND_A" to="net.GND_FIELD" />
    <trace from=".J_ENTRY_INPUTS_TB > .GND_B" to="net.GND_FIELD" />
    <trace from=".J_STATUS_INPUTS_TB > .TAMPER_INPUT" to="net.TAMPER_INPUT" />
    <trace from=".J_STATUS_INPUTS_TB > .AUX_FAULT" to="net.AUX_FAULT" />
    <trace from=".J_STATUS_INPUTS_TB > .GND_C" to="net.GND_FIELD" />
    <trace from=".J_STATUS_INPUTS_TB > .GND_D" to="net.GND_FIELD" />
    <trace from=".R_DOOR_CONTACT_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_DOOR_CONTACT_PULLUP > .pin2" to="net.DOOR_CONTACT" />
    <trace from=".R_REX_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_REX_PULLUP > .pin2" to="net.REX_INPUT" />
    <trace from=".R_TAMPER_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_TAMPER_PULLUP > .pin2" to="net.TAMPER_INPUT" />
    <trace from=".R_FAULT_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_FAULT_PULLUP > .pin2" to="net.AUX_FAULT" />
    <trace from=".R_DOOR_CONTACT_SUPERVISION > .pin1" to="net.DOOR_CONTACT" />
    <trace from=".R_DOOR_CONTACT_SUPERVISION > .pin2" to="net.GND_FIELD" />
    <trace from=".R_REX_SUPERVISION > .pin1" to="net.REX_INPUT" />
    <trace from=".R_REX_SUPERVISION > .pin2" to="net.GND_FIELD" />
    <trace from=".C_DOOR_CONTACT_FILTER > .pin1" to="net.DOOR_CONTACT" />
    <trace from=".C_DOOR_CONTACT_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_REX_FILTER > .pin1" to="net.REX_INPUT" />
    <trace from=".C_REX_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_TAMPER_FILTER > .pin1" to="net.TAMPER_INPUT" />
    <trace from=".C_TAMPER_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_FAULT_FILTER > .pin1" to="net.AUX_FAULT" />
    <trace from=".C_FAULT_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".R_TAMPER_FIELD_DAMP > .pin1" to="net.TAMPER_INPUT" />
    <trace from=".R_TAMPER_FIELD_DAMP > .pin2" to="net.GND_FIELD" />
    <trace from=".R_FAULT_FIELD_DAMP > .pin1" to="net.AUX_FAULT" />
    <trace from=".R_FAULT_FIELD_DAMP > .pin2" to="net.GND_FIELD" />
  </group>
)