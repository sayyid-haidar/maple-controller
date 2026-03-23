type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

const servicePinLabels = {
  pin1: "VTREF",
  pin2: "SWDIO",
  pin3: "GND_A",
  pin4: "SWCLK",
  pin5: "GND_B",
  pin6: "NRST",
  pin7: "UART_TX",
  pin8: "UART_RX",
  pin9: "BOOT_CFG",
  pin10: "WATCHDOG",
} as const

export const ServiceConnectors = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    <chip
      name="J_SERVICE"
      footprint="kicad:Connector_PinHeader_1.27mm/PinHeader_2x05_P1.27mm_Vertical"
      pcbX={0}
      pcbY={0}
      pinLabels={servicePinLabels}
      pinAttributes={{
        VTREF: { requiresPower: true, includeInBoardPinout: true },
        GND_A: { requiresGround: true, includeInBoardPinout: true },
        GND_B: { requiresGround: true, includeInBoardPinout: true },
      }}
    />
    <capacitor name="C_SERVICE_VREF" capacitance="100nF" footprint="0402" pcbX={10} pcbY={0} />
    <resistor name="R_SERVICE_SWDIO_SERIES" resistance="47ohm" footprint="0402" pcbX={10} pcbY={-8} />
    <resistor name="R_SERVICE_SWCLK_SERIES" resistance="47ohm" footprint="0402" pcbX={20} pcbY={-8} />
    <resistor name="R_SERVICE_UART_TX_SERIES" resistance="47ohm" footprint="0402" pcbX={30} pcbY={-8} />
    <resistor name="R_SERVICE_UART_RX_SERIES" resistance="47ohm" footprint="0402" pcbX={40} pcbY={-8} />
    <resistor name="R_SERVICE_NRST_PULLUP" resistance="10k" footprint="0402" pcbX={20} pcbY={8} />
    <resistor name="R_SERVICE_BOOT_CFG_TAG_PULLUP" resistance="10k" footprint="0402" pcbX={30} pcbY={8} />

    <trace from=".J_SERVICE > .VTREF" to="net.V3_3_LOGIC" />
    <trace from=".J_SERVICE > .SWDIO" to=".R_SERVICE_SWDIO_SERIES > .pin1" />
    <trace from=".J_SERVICE > .GND_A" to="net.GND_LOGIC" />
    <trace from=".J_SERVICE > .SWCLK" to=".R_SERVICE_SWCLK_SERIES > .pin1" />
    <trace from=".J_SERVICE > .GND_B" to="net.GND_LOGIC" />
    <trace from=".J_SERVICE > .NRST" to="net.SERVICE_NRST" />
    <trace from=".J_SERVICE > .UART_TX" to=".R_SERVICE_UART_TX_SERIES > .pin1" />
    <trace from=".J_SERVICE > .UART_RX" to=".R_SERVICE_UART_RX_SERIES > .pin1" />
    <trace from=".J_SERVICE > .BOOT_CFG" to="net.SERVICE_BOOT_CFG" />
    <trace from=".J_SERVICE > .WATCHDOG" to="net.WATCHDOG_ALERT" />
    <trace from=".C_SERVICE_VREF > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_SERVICE_VREF > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_SERVICE_SWDIO_SERIES > .pin2" to="net.SERVICE_SWDIO" />
    <trace from=".R_SERVICE_SWCLK_SERIES > .pin2" to="net.SERVICE_SWCLK" />
    <trace from=".R_SERVICE_UART_TX_SERIES > .pin2" to="net.SERVICE_UART_TX" />
    <trace from=".R_SERVICE_UART_RX_SERIES > .pin2" to="net.SERVICE_UART_RX" />
    <trace from=".R_SERVICE_NRST_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SERVICE_NRST_PULLUP > .pin2" to="net.SERVICE_NRST" />
    <trace from=".R_SERVICE_BOOT_CFG_TAG_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SERVICE_BOOT_CFG_TAG_PULLUP > .pin2" to="net.SERVICE_BOOT_CFG" />
  </group>
)