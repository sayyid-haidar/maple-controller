import { KICAD_STEP_MODELS } from "../lib/cad-models"

export const ETHERNET_LAN_ENTRY_RELEASE = {
  exactPart: "Abracon ARJP11A-MA",
  footprint: "kicad:Connector_RJ/RJ45_Abracon_ARJP11A-MA_Horizontal",
  shieldStrategy: "shield tabs bonded to chassis-style shield net, then RC-bled into logic ground at the LAN edge",
  poeIngress: "PoE entry lands on the dedicated magjack power taps, then feeds the PD front end through the V48 input boundary",
  preservedPowerBoundary: "LAN and PoE stay in the logic-power domain and do not source installer lock current",
  sourcingPath: "Abracon distribution plus KiCad-native Connector_RJ footprint ownership",
  alternatePolicy: "no alternate approved until a second PoE-capable magjack is validated against the same board-edge body and shield tab geometry",
  assemblySuitability: "through-hole board-edge part intended for mixed SMT plus selective-solder assembly",
  footprintReviewOwner: "LAN entry review",
  cadModelStatus: "present",
} as const

type PlacementProps = {
  pcbX?: number
  pcbY?: number
}

const ethernetMagjackPinLabels = {
  pin1: "TX_P",
  pin2: "TX_N",
  pin3: "RX_P",
  pin4: "RX_N",
  pin5: "POE_POS",
  pin6: "POE_NEG",
  pin7: "SHIELD_A",
  pin8: "SHIELD_B",
} as const

export const EthernetPoeFrontEnd = ({ pcbX = 0, pcbY = 0 }: PlacementProps) => (
  <group pcbX={pcbX} pcbY={pcbY}>
    <chip
      name="J_ETH_LAN"
      footprint={ETHERNET_LAN_ENTRY_RELEASE.footprint}
      cadModel={{ stepUrl: KICAD_STEP_MODELS.rj45_abracon_arjp11a_ma_horizontal }}
      supplierPartNumbers={{ digikey: [ETHERNET_LAN_ENTRY_RELEASE.exactPart] }}
      pcbX={-8}
      pcbY={0}
      pinLabels={ethernetMagjackPinLabels}
    />
    <resistor name="R_ETH_TXP_SER" resistance="0ohm" footprint="0402" pcbX={8} pcbY={-6} />
    <resistor name="R_ETH_TXN_SER" resistance="0ohm" footprint="0402" pcbX={8} pcbY={-2} />
    <resistor name="R_ETH_RXP_SER" resistance="0ohm" footprint="0402" pcbX={8} pcbY={2} />
    <resistor name="R_ETH_RXN_SER" resistance="0ohm" footprint="0402" pcbX={8} pcbY={6} />
    <capacitor name="C_POE_FILTER" capacitance="100nF" footprint="0402" pcbX={16} pcbY={0} />
    <resistor name="R_MGMT_STATUS" resistance="1k" footprint="0402" pcbX={24} pcbY={-6} />
    <resistor name="R_ETH_MDIO_PULLUP" resistance="1.5kohm" footprint="0402" pcbX={24} pcbY={2} />
    <resistor name="R_ETH_PHY_RESET_PULLUP" resistance="10k" footprint="0402" pcbX={24} pcbY={6} />
    <resistor name="R_ETH_SHIELD_BLEED" resistance="1Mohm" footprint="0402" pcbX={16} pcbY={10} />
    <capacitor name="C_ETH_SHIELD_Y" capacitance="1nF" footprint="0402" pcbX={22} pcbY={10} />
    <capacitor name="C_MGMT_STATUS" capacitance="100nF" footprint="0402" pcbX={30} pcbY={-6} />
    <chip
      name="U_ETH_PHY"
      footprint="kicad:Package_DFN_QFN/QFN-24-1EP_4x4mm_P0.5mm_EP2.6x2.6mm"
      cadModel={{ stepUrl: KICAD_STEP_MODELS.qfn24_1ep_4x4_p05_ep26 }}
      supplierPartNumbers={{ lcsc: ["C85278"] }}
      pcbX={38}
      pcbY={2}
      pinLabels={{
        // LAN8720A QFN-24 pinout (Microchip DS00002165B Table 2.1 + QFN checklist)
        pin1:  "VDD2A",           // Analog supply (1.2V internal LDO out / bypass)
        pin2:  "LED2_nINTSEL",    // LED2 / interrupt select (mode strap)
        pin3:  "LED1_REGOFF",     // LED1 / regulator off (mode strap)
        pin4:  "XTAL2",           // Crystal output (NC when using external clock)
        pin5:  "XTAL1_CLKIN",     // 25 MHz clock input (connect to oscillator)
        pin6:  "VDDCR",           // Internal 1.2V LDO decoupling (100 nF cap to GND)
        pin7:  "RMII_RXD1",       // RXD1/MODE1 — RMII receive data bit 1
        pin8:  "RMII_RXD0",       // RXD0/MODE0 — RMII receive data bit 0
        pin9:  "VDDIO",           // I/O supply (3.3V)
        pin10: "RMII_RXER",       // RXER/PHYAD0 — receive error / PHY address bit 0
        pin11: "RMII_CRS_DV",     // CRS_DV/MODE2 — carrier sense / RX data valid
        pin12: "ETH_MDIO",        // MDIO — management data I/O
        pin13: "ETH_MDC",         // MDC — management clock
        pin14: "nINT_REFCLKO",    // nINT / 50 MHz REF_CLK output
        pin15: "ETH_PHY_RESET_N", // nRST — active-low hardware reset
        pin16: "RMII_TXEN",       // TXEN — RMII transmit enable
        pin17: "RMII_TXD0",       // TXD0 — RMII transmit data bit 0
        pin18: "RMII_TXD1",       // TXD1 — RMII transmit data bit 1
        pin19: "VDD1A",           // Analog supply 2 (3.3V)
        pin20: "TXN",             // Transformer TX negative
        pin21: "TXP",             // Transformer TX positive
        pin22: "RXN",             // Transformer RX negative
        pin23: "RXP",             // Transformer RX positive
        pin24: "RBIAS",           // Bias resistor (6.49kΩ to GND)
        pin25: "EP_GND",          // Exposed die-pad ground (must connect to GND)
      }}
      pinAttributes={{
        VDD2A:   { requiresPower: true },
        VDDIO:   { requiresPower: true },
        VDD1A:   { requiresPower: true },
        EP_GND:  { requiresGround: true },
      }}
    />
    <capacitor name="C_PHY_VDDCR"  capacitance="100nF" footprint="0402" pcbX={38} pcbY={-8}  />
    <capacitor name="C_PHY_VDDIO"  capacitance="100nF" footprint="0402" pcbX={44} pcbY={-8}  />
    <resistor  name="R_PHY_RBIAS"  resistance="6.49kohm" footprint="0402" pcbX={48} pcbY={6} />

    <trace from=".J_ETH_LAN > .TX_P" to="net.ETH_TX_P" />
    <trace from=".J_ETH_LAN > .TX_N" to="net.ETH_TX_N" />
    <trace from=".J_ETH_LAN > .RX_P" to="net.ETH_RX_P" />
    <trace from=".J_ETH_LAN > .RX_N" to="net.ETH_RX_N" />
    <trace from=".J_ETH_LAN > .POE_POS" to="net.V48_POE_IN" />
    <trace from=".J_ETH_LAN > .POE_NEG" to="net.GND_LOGIC" />
    <trace from=".J_ETH_LAN > .SHIELD_A" to="net.ETH_SHIELD" />
    <trace from=".J_ETH_LAN > .SHIELD_B" to="net.ETH_SHIELD" />
    <trace from=".R_ETH_TXP_SER > .pin1" to="net.ETH_TX_P" />
    <trace from=".R_ETH_TXP_SER > .pin2" to="net.ETH_PHY_TX_P" />
    <trace from=".R_ETH_TXN_SER > .pin1" to="net.ETH_TX_N" />
    <trace from=".R_ETH_TXN_SER > .pin2" to="net.ETH_PHY_TX_N" />
    <trace from=".R_ETH_RXP_SER > .pin1" to="net.ETH_RX_P" />
    <trace from=".R_ETH_RXP_SER > .pin2" to="net.ETH_PHY_RX_P" />
    <trace from=".R_ETH_RXN_SER > .pin1" to="net.ETH_RX_N" />
    <trace from=".R_ETH_RXN_SER > .pin2" to="net.ETH_PHY_RX_N" />
    <trace from=".C_POE_FILTER > .pin1" to="net.V48_POE_IN" />
    <trace from=".C_POE_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_MGMT_STATUS > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_MGMT_STATUS > .pin2" to="net.MGMT_STATUS" />
    <trace from=".R_ETH_MDIO_PULLUP > .pin1" to="net.ETH_MDIO" />
    <trace from=".R_ETH_MDIO_PULLUP > .pin2" to="net.V3_3_LOGIC" />
    <trace from=".R_ETH_PHY_RESET_PULLUP > .pin1" to="net.ETH_PHY_RESET_N" />
    <trace from=".R_ETH_PHY_RESET_PULLUP > .pin2" to="net.V3_3_LOGIC" />
    <trace from=".R_ETH_SHIELD_BLEED > .pin1" to="net.ETH_SHIELD" />
    <trace from=".R_ETH_SHIELD_BLEED > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_ETH_SHIELD_Y > .pin1" to="net.ETH_SHIELD" />
    <trace from=".C_ETH_SHIELD_Y > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_MGMT_STATUS > .pin1" to="net.MGMT_STATUS" />
    <trace from=".C_MGMT_STATUS > .pin2" to="net.GND_LOGIC" />
    <trace from=".U_ETH_PHY > .VDDIO"           to="net.V3_3_LOGIC" />
    <trace from=".U_ETH_PHY > .VDD1A"           to="net.V3_3_LOGIC" />
    <trace from=".U_ETH_PHY > .VDD2A"           to="net.V3_3_LOGIC" />
    <trace from=".U_ETH_PHY > .EP_GND"          to="net.GND_LOGIC" />
    <trace from=".U_ETH_PHY > .RMII_TXEN"       to="net.RMII_TXEN" />
    <trace from=".U_ETH_PHY > .RMII_TXD0"       to="net.RMII_TXD0" />
    <trace from=".U_ETH_PHY > .RMII_TXD1"       to="net.RMII_TXD1" />
    <trace from=".U_ETH_PHY > .RMII_RXD0"       to="net.RMII_RXD0" />
    <trace from=".U_ETH_PHY > .RMII_RXD1"       to="net.RMII_RXD1" />
    <trace from=".U_ETH_PHY > .RMII_CRS_DV"     to="net.RMII_CRS_DV" />
    <trace from=".U_ETH_PHY > .nINT_REFCLKO"    to="net.RMII_REFCLK" />
    <trace from=".U_ETH_PHY > .ETH_MDC"         to="net.ETH_MDC" />
    <trace from=".U_ETH_PHY > .ETH_MDIO"        to="net.ETH_MDIO" />
    <trace from=".U_ETH_PHY > .ETH_PHY_RESET_N" to="net.ETH_PHY_RESET_N" />
    <trace from=".U_ETH_PHY > .TXP"             to="net.ETH_PHY_TX_P" />
    <trace from=".U_ETH_PHY > .TXN"             to="net.ETH_PHY_TX_N" />
    <trace from=".U_ETH_PHY > .RXP"             to="net.ETH_PHY_RX_P" />
    <trace from=".U_ETH_PHY > .RXN"             to="net.ETH_PHY_RX_N" />
    {/* LAN8720A decoupling and bias */}
    <trace from=".C_PHY_VDDCR > .pin1" to=".U_ETH_PHY > .VDDCR" />
    <trace from=".C_PHY_VDDCR > .pin2" to="net.GND_LOGIC" />
    <trace from=".C_PHY_VDDIO > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_PHY_VDDIO > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_PHY_RBIAS > .pin1" to=".U_ETH_PHY > .RBIAS" />
    <trace from=".R_PHY_RBIAS > .pin2" to="net.GND_LOGIC" />
    {/* PHY 25 MHz clock input from shared oscillator */}
    <trace from=".U_ETH_PHY > .XTAL1_CLKIN" to="net.CTRL_OSC_OUT" />
  </group>
)