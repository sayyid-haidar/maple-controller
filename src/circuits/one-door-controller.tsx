import { ControllerCore } from "../components/controller-core"
import { EthernetPoeFrontEnd } from "../components/ethernet-poe-front-end"
import { PowerDomains } from "../components/power-domains"
import { ReaderInterfaces } from "../components/reader-interfaces"
import { RetentionSupport } from "../components/retention-support"
import { RelayLockOutput } from "../components/relay-lock-output"
import { ServiceConnectors } from "../components/service-connectors"
import { SupervisedInputBank } from "../components/supervised-input-bank"
import { controllerBoardModel } from "../lib/controller-types"

export const OneDoorController = () => (
  <board
    width={controllerBoardModel.boardOutline.width}
    height={controllerBoardModel.boardOutline.height}
    layers={controllerBoardModel.layerCount}
    routingDisabled
  >
    <group pcbX={-60} pcbY={-26}>
      <EthernetPoeFrontEnd />
    </group>

    <group pcbX={4} pcbY={-45}>
      <PowerDomains />
    </group>

    <group pcbX={-4} pcbY={0}>
      <ControllerCore />
    </group>

    <group pcbX={30} pcbY={8}>
      <ReaderInterfaces />
    </group>

    <group pcbX={54} pcbY={-28}>
      <RetentionSupport />
    </group>

    <group pcbX={-52} pcbY={34}>
      <SupervisedInputBank />
    </group>

    <group pcbX={36} pcbY={40}>
      <RelayLockOutput />
    </group>

    <group pcbX={-76} pcbY={0}>
      <ServiceConnectors />
    </group>

    <capacitor name="C_EVENT_BUFFER_PLACEHOLDER" capacitance="1uF" footprint="0402" pcbX={-60} pcbY={40} />
    <resistor name="R_SYNC_PENDING_STATUS" resistance="1k" footprint="0402" pcbX={-52} pcbY={40} />
    <capacitor name="C_SYNC_PENDING_FILTER" capacitance="100nF" footprint="0402" pcbX={-44} pcbY={40} />
    <resistor name="R_MGMT_OFFLINE_STATUS" resistance="1k" footprint="0402" pcbX={-36} pcbY={40} />
    <capacitor name="C_MGMT_OFFLINE_FILTER" capacitance="100nF" footprint="0402" pcbX={-28} pcbY={40} />
    <resistor name="R_RESYNC_ACTIVE_STATUS" resistance="1k" footprint="0402" pcbX={-20} pcbY={40} />
    <capacitor name="C_RESYNC_ACTIVE_FILTER" capacitance="100nF" footprint="0402" pcbX={-12} pcbY={40} />
    <resistor name="R_POWER_FAIL_WARN_PULLUP" resistance="10k" footprint="0402" pcbX={-4} pcbY={40} />
    <capacitor name="C_POWER_FAIL_WARN_FILTER" capacitance="10nF" footprint="0402" pcbX={4} pcbY={40} />
    <resistor name="R_RTC_SCL_PULLUP" resistance="4.7k" footprint="0402" pcbX={16} pcbY={40} />
    <resistor name="R_RTC_SDA_PULLUP" resistance="4.7k" footprint="0402" pcbX={24} pcbY={40} />
    <resistor name="R_RTC_INT_PULLUP" resistance="10k" footprint="0402" pcbX={32} pcbY={40} />
    <resistor name="R_BUFFER_SPI_CLK_PULLUP" resistance="10k" footprint="0402" pcbX={40} pcbY={-40} />
    <resistor name="R_BUFFER_CS_PULLUP" resistance="10k" footprint="0402" pcbX={48} pcbY={-40} />
    <resistor name="R_MGMT_ONLINE_INDICATOR" resistance="1k" footprint="0402" pcbX={-60} pcbY={32} />
    <capacitor name="C_MGMT_ONLINE_FILTER" capacitance="100nF" footprint="0402" pcbX={-52} pcbY={32} />
    <resistor name="R_MGMT_DEGRADED_INDICATOR" resistance="1k" footprint="0402" pcbX={-44} pcbY={32} />
    <capacitor name="C_MGMT_DEGRADED_FILTER" capacitance="100nF" footprint="0402" pcbX={-36} pcbY={32} />
    <resistor name="R_SERVICE_UART_TX_PULLUP" resistance="10k" footprint="0402" pcbX={-28} pcbY={32} />
    <resistor name="R_SERVICE_UART_RX_PULLUP" resistance="10k" footprint="0402" pcbX={-20} pcbY={32} />
    <resistor name="R_SERVICE_BOOT_CFG_PULLUP" resistance="10k" footprint="0402" pcbX={-12} pcbY={32} />
    <capacitor name="C_WATCHDOG_ALERT_FILTER" capacitance="10nF" footprint="0402" pcbX={-4} pcbY={32} />

    <trace from=".C_EVENT_BUFFER_PLACEHOLDER > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".C_EVENT_BUFFER_PLACEHOLDER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_SYNC_PENDING_STATUS > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SYNC_PENDING_STATUS > .pin2" to="net.SYNC_PENDING" />
    <trace from=".C_SYNC_PENDING_FILTER > .pin1" to="net.SYNC_PENDING" />
    <trace from=".C_SYNC_PENDING_FILTER > .pin2" to="net.GND_LOGIC" />
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
    <trace from=".R_MGMT_ONLINE_INDICATOR > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_MGMT_ONLINE_INDICATOR > .pin2" to="net.MGMT_ONLINE" />
    <trace from=".C_MGMT_ONLINE_FILTER > .pin1" to="net.MGMT_ONLINE" />
    <trace from=".C_MGMT_ONLINE_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_MGMT_DEGRADED_INDICATOR > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_MGMT_DEGRADED_INDICATOR > .pin2" to="net.MGMT_DEGRADED" />
    <trace from=".C_MGMT_DEGRADED_FILTER > .pin1" to="net.MGMT_DEGRADED" />
    <trace from=".C_MGMT_DEGRADED_FILTER > .pin2" to="net.GND_LOGIC" />
    <trace from=".R_SERVICE_UART_TX_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SERVICE_UART_TX_PULLUP > .pin2" to="net.SERVICE_UART_TX" />
    <trace from=".R_SERVICE_UART_RX_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SERVICE_UART_RX_PULLUP > .pin2" to="net.SERVICE_UART_RX" />
    <trace from=".R_SERVICE_BOOT_CFG_PULLUP > .pin1" to="net.V3_3_LOGIC" />
    <trace from=".R_SERVICE_BOOT_CFG_PULLUP > .pin2" to="net.SERVICE_BOOT_CFG" />
    <trace from=".C_WATCHDOG_ALERT_FILTER > .pin1" to="net.WATCHDOG_ALERT" />
    <trace from=".C_WATCHDOG_ALERT_FILTER > .pin2" to="net.GND_LOGIC" />
  </board>
)

export default OneDoorController