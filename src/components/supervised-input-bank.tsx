type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

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
    <chip name="J_ENTRY_INPUTS_TB" footprint="kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal" pcbX={-20} pcbY={-16} pinLabels={entryInputTerminalPinLabels} />
    <chip name="J_STATUS_INPUTS_TB" footprint="kicad:Connector_Phoenix_MC/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal" pcbX={0} pcbY={-16} pinLabels={statusInputTerminalPinLabels} />
    <resistor name="R_DOOR_CONTACT_PULLUP" resistance="10k" footprint="0402" pcbX={0} pcbY={0} />
    <resistor name="R_REX_PULLUP" resistance="10k" footprint="0402" pcbX={8} pcbY={0} />
    <resistor name="R_TAMPER_PULLUP" resistance="10k" footprint="0402" pcbX={16} pcbY={0} />
    <resistor name="R_FAULT_PULLUP" resistance="10k" footprint="0402" pcbX={24} pcbY={0} />
    <resistor name="R_DOOR_CONTACT_SUPERVISION" resistance="1k" footprint="0402" pcbX={32} pcbY={0} />
    <resistor name="R_REX_SUPERVISION" resistance="1k" footprint="0402" pcbX={40} pcbY={0} />
    <capacitor name="C_DOOR_CONTACT_FILTER" capacitance="10nF" footprint="0402" pcbX={0} pcbY={8} />
    <capacitor name="C_REX_FILTER" capacitance="10nF" footprint="0402" pcbX={8} pcbY={8} />
    <capacitor name="C_TAMPER_FILTER" capacitance="10nF" footprint="0402" pcbX={16} pcbY={8} />
    <capacitor name="C_FAULT_FILTER" capacitance="10nF" footprint="0402" pcbX={24} pcbY={8} />
    <resistor name="R_TAMPER_FIELD_DAMP" resistance="1k" footprint="0402" pcbX={32} pcbY={8} />
    <resistor name="R_FAULT_FIELD_DAMP" resistance="1k" footprint="0402" pcbX={40} pcbY={8} />

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