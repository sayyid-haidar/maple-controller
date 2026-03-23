type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

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
    <chip name="J_LOCK_POWER_TB" footprint="kicad:TerminalBlock_Phoenix/TerminalBlock_Phoenix_MKDS-1,5-3-5.08_1x03_P5.08mm_Horizontal" pcbX={12} pcbY={-16} pinLabels={lockPowerTerminalPinLabels} />
    <chip name="J_LOCK_RELAY_TB" footprint="kicad:TerminalBlock_Phoenix/TerminalBlock_Phoenix_MKDS-1,5-3-5.08_1x03_P5.08mm_Horizontal" pcbX={32} pcbY={-16} pinLabels={lockRelayTerminalPinLabels} />
    <resistor name="R_RELAY_DRIVE" resistance="330ohm" footprint="0402" pcbX={0} pcbY={0} />
    <capacitor name="C_LOCK_SNUBBER" capacitance="10nF" footprint="0402" pcbX={8} pcbY={0} />
    <resistor name="R_FAILSAFE_SELECT" resistance="10k" footprint="0402" pcbX={16} pcbY={0} />
    <resistor name="R_FAILSECURE_SELECT" resistance="10k" footprint="0402" pcbX={24} pcbY={0} />
    <capacitor name="C_LOCK_NO_FILTER" capacitance="10nF" footprint="0402" pcbX={32} pcbY={0} />
    <capacitor name="C_LOCK_NC_FILTER" capacitance="10nF" footprint="0402" pcbX={40} pcbY={0} />
    <resistor name="R_LOCK_NO_LOAD" resistance="1k" footprint="0402" pcbX={16} pcbY={8} />
    <resistor name="R_LOCK_NC_LOAD" resistance="1k" footprint="0402" pcbX={24} pcbY={8} />
    <capacitor name="C_LOCK_12V_FILTER" capacitance="100nF" footprint="0402" pcbX={32} pcbY={8} />
    <capacitor name="C_LOCK_24V_FILTER" capacitance="100nF" footprint="0402" pcbX={40} pcbY={8} />

    <trace from=".J_LOCK_POWER_TB > .V12_EXT" to="net.V12_LOCK_EXT" />
    <trace from=".J_LOCK_POWER_TB > .GND_FIELD" to="net.GND_FIELD" />
    <trace from=".J_LOCK_POWER_TB > .V24_EXT" to="net.V24_LOCK_EXT" />
    <trace from=".J_LOCK_RELAY_TB > .RELAY_COM" to="net.LOCK_RELAY_COM" />
    <trace from=".J_LOCK_RELAY_TB > .RELAY_NO" to="net.LOCK_RELAY_NO" />
    <trace from=".J_LOCK_RELAY_TB > .RELAY_NC" to="net.LOCK_RELAY_NC" />
    <trace from=".R_RELAY_DRIVE > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_RELAY_DRIVE > .pin2" to="net.LOCK_RELAY_COM" />
    <trace from=".C_LOCK_SNUBBER > .pin1" to="net.LOCK_RELAY_NO" />
    <trace from=".C_LOCK_SNUBBER > .pin2" to="net.LOCK_RELAY_NC" />
    <trace from=".R_FAILSAFE_SELECT > .pin1" to="net.V12_LOCK_EXT" />
    <trace from=".R_FAILSAFE_SELECT > .pin2" to="net.LOCK_RELAY_NO" />
    <trace from=".R_FAILSECURE_SELECT > .pin1" to="net.V24_LOCK_EXT" />
    <trace from=".R_FAILSECURE_SELECT > .pin2" to="net.LOCK_RELAY_NC" />
    <trace from=".C_LOCK_NO_FILTER > .pin1" to="net.LOCK_RELAY_NO" />
    <trace from=".C_LOCK_NO_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_LOCK_NC_FILTER > .pin1" to="net.LOCK_RELAY_NC" />
    <trace from=".C_LOCK_NC_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".R_LOCK_NO_LOAD > .pin1" to="net.LOCK_RELAY_NO" />
    <trace from=".R_LOCK_NO_LOAD > .pin2" to="net.GND_FIELD" />
    <trace from=".R_LOCK_NC_LOAD > .pin1" to="net.LOCK_RELAY_NC" />
    <trace from=".R_LOCK_NC_LOAD > .pin2" to="net.GND_FIELD" />
    <trace from=".C_LOCK_12V_FILTER > .pin1" to="net.V12_LOCK_EXT" />
    <trace from=".C_LOCK_12V_FILTER > .pin2" to="net.GND_FIELD" />
    <trace from=".C_LOCK_24V_FILTER > .pin1" to="net.V24_LOCK_EXT" />
    <trace from=".C_LOCK_24V_FILTER > .pin2" to="net.GND_FIELD" />
  </group>
)