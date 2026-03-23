import { KICAD_STEP_MODELS } from "../lib/cad-models"

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

export const PowerDomains = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    <chip
      name="U_POE_PD"
      footprint="kicad:Package_SO/SOIC-16_3.9x9.9mm_P1.27mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.soic16_39x99_p127 }}
      supplierPartNumbers={{ lcsc: ["C191946"] }}
      pcbX={0}
      pcbY={0}
      pinLabels={{ pin1: "VIN", pin2: "GND", pin3: "V12_OUT", pin4: "PGOOD" }}
      pinAttributes={{ VIN: { requiresPower: true }, GND: { requiresGround: true } }}
    />
    <chip
      name="U_REG_5V"
      footprint="kicad:Package_SO/SOIC-8_3.9x4.9mm_P1.27mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.soic8_39x49_p127 }}
      supplierPartNumbers={{ lcsc: ["C146598"] }}
      pcbX={16}
      pcbY={0}
      pinLabels={{ pin1: "VIN", pin2: "GND", pin3: "VOUT" }}
      pinAttributes={{ VIN: { requiresPower: true }, GND: { requiresGround: true }, VOUT: { providesPower: true, providesVoltage: 5 } }}
    />
    <chip
      name="U_REG_3V3"
      footprint="kicad:Package_TO_SOT_SMD/SOT-223-3_TabPin2"
      supplierPartNumbers={{ lcsc: ["C6186"] }}
      pcbX={32}
      pcbY={0}
      pinLabels={{ pin1: "GND", pin2: "VOUT", pin3: "VIN" }}
      pinAttributes={{ VIN: { requiresPower: true }, GND: { requiresGround: true }, VOUT: { providesPower: true, providesVoltage: 3.3 } }}
    />
    <capacitor name="C_POE_PRIMARY" capacitance="100nF" footprint="0402" pcbX={-8} pcbY={8} />
    <capacitor name="C_POE_BULK" capacitance="47uF" footprint="1206" pcbX={0} pcbY={10} />
    <capacitor name="C_5V_LOGIC" capacitance="10uF" footprint="0805" pcbX={16} pcbY={10} />
    <capacitor name="C_LOGIC_3V3" capacitance="100nF" footprint="0402" pcbX={32} pcbY={10} />
    <resistor name="R_READER_AUX_FEED" resistance="0ohm" footprint="0402" pcbX={48} pcbY={0} />
    <capacitor name="C_READER_AUX" capacitance="10uF" footprint="0805" pcbX={48} pcbY={10} />
    <resistor name="R_LOCK_EXT_SENSE" resistance="10k" footprint="0402" pcbX={64} pcbY={0} />
    <capacitor name="C_LOCK_EXT_FILTER" capacitance="100nF" footprint="0402" pcbX={64} pcbY={10} />

    <trace from=".U_POE_PD > .VIN" to="net.V48_POE_IN" />
    <trace from=".U_POE_PD > .GND" to="net.GND_LOGIC" />
    <trace from=".U_POE_PD > .V12_OUT" to="net.V12_POE_INT" />
    <trace from=".U_POE_PD > .PGOOD" to="net.POWER_FAIL_WARN" />
    <trace from=".U_REG_5V > .VIN" to="net.V12_POE_INT" />
    <trace from=".U_REG_5V > .GND" to="net.GND_LOGIC" />
    <trace from=".U_REG_5V > .VOUT" to="net.V5_LOGIC" />
    <trace from=".U_REG_3V3 > .VIN" to="net.V5_LOGIC" />
    <trace from=".U_REG_3V3 > .GND" to="net.GND_LOGIC" />
    <trace from=".U_REG_3V3 > .VOUT" to="net.V3_3_LOGIC" />
    <trace from=".C_POE_PRIMARY > .pin1" to="net.V48_POE_IN" />
    <trace from=".C_POE_PRIMARY > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_POE_BULK > .pin1" to="net.V12_POE_INT" />
    <trace from=".C_POE_BULK > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_5V_LOGIC > .pin1" to="net.V5_LOGIC" />
    <trace from=".C_5V_LOGIC > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_LOGIC_3V3 > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_LOGIC_3V3 > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_READER_AUX_FEED > .pin1" to="net.V12_POE_INT" />
    <trace from=".R_READER_AUX_FEED > .pin2" to="net.V12_READER_AUX" />
    <trace from=".C_READER_AUX > .pin1" to="net.V12_READER_AUX" />
    <trace from=".C_READER_AUX > .pin2" to="net.GND_FIELD" />
    <trace from=".R_LOCK_EXT_SENSE > .pin1" to="net.V24_LOCK_EXT" />
    <trace from=".R_LOCK_EXT_SENSE > .pin2" to="net.LOCK_RELAY_COM" />
    <trace from=".C_LOCK_EXT_FILTER > .pin1" to="net.V12_LOCK_EXT" />
    <trace from=".C_LOCK_EXT_FILTER > .pin2" to="net.GND_FIELD" />
  </group>
)