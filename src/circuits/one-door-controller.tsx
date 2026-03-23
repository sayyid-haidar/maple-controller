import { ControllerCore } from "../components/controller-core"
import { EthernetPoeFrontEnd } from "../components/ethernet-poe-front-end"
import { PowerDomains } from "../components/power-domains"
import { ReaderInterfaces } from "../components/reader-interfaces"
import { RetentionSupport } from "../components/retention-support"
import { RelayLockOutput } from "../components/relay-lock-output"
import { ServiceConnectors } from "../components/service-connectors"
import { SupervisedInputBank } from "../components/supervised-input-bank"
import { controllerBoardModel } from "../lib/controller-types"
// ── Board Zone Map ──────────────────────────────────────────────────
// TOP edge (+Y): all installer field terminals (supervised inputs, readers, relay/lock)
// LEFT edge (-X): Ethernet RJ45 magjack + PHY
// CENTER: STM32F407 MCU
// RIGHT of center: retention (RTC + FRAM) near MCU I2C/SPI pins
// BOTTOM center (-Y): power domains for balanced distribution
// BOTTOM left: service/debug header

const ethernetPlacementConstraint = {
  groupX: -58,
  groupY: 0,
  boardEdge: "left enclosure edge, vertically centered",
  keepout: "reserve the connector overhang at the left board edge and keep tall logic-side parts 3 mm clear of the shield body",
  shieldBoundary: "service header remains out of the LAN shield corridor",
} as const

const supervisedInputPlacementConstraint = {
  groupX: -44,
  groupY: 34,
  boardEdge: "top-left installer edge",
  cableEntry: "terminals face top edge for straight installer cable entry",
} as const

const readerPlacementConstraint = {
  groupX: 5,
  groupY: 34,
  boardEdge: "top-center installer edge",
  cableEntry: "OSDP and Wiegand terminals side-by-side facing top edge",
} as const

const relayPlacementConstraint = {
  groupX: 48,
  groupY: 32,
  fieldEdge: "top-right installer edge",
  creepage: "keep relay body and 5.08 mm terminals grouped away from low-voltage logic routing",
  cableEntry: "relay and external-lock terminals face top edge for straight installer cable entry",
} as const

const retentionPlacementConstraint = {
  groupX: 28,
  groupY: -5,
  proximity: "near MCU I2C (PB6/PB7) and SPI3 (PB3-PB5/PA15) pins for short traces",
} as const

const powerPlacementConstraint = {
  groupX: 0,
  groupY: -36,
  distribution: "center-bottom for balanced power distribution to all board zones",
} as const

const servicePlacementConstraint = {
  groupX: -55,
  groupY: -32,
  isolation: "lower-left logic corner, outside the LAN shield corridor and away from installer wiring",
} as const

const releaseCandidateBoundaryNotes = {
  ethernet: "LAN entry stays at the left board edge and remains separate from the service connector corridor.",
  relay: "Dry-contact switching remains isolated from PoE-derived logic rails except for the relay coil drive.",
  retention: "Only RTC backup-source closure remains open; RTC and FRAM stay integrated into the candidate.",
} as const

export const OneDoorController = () => (
  <board
    width={controllerBoardModel.boardOutline.width}
    height={controllerBoardModel.boardOutline.height}
    layers={controllerBoardModel.layerCount}
    routingDisabled
  >
    <group pcbX={ethernetPlacementConstraint.groupX} pcbY={ethernetPlacementConstraint.groupY}>
      <EthernetPoeFrontEnd />
    </group>

    <group pcbX={powerPlacementConstraint.groupX} pcbY={powerPlacementConstraint.groupY}>
      <PowerDomains />
    </group>

    <group pcbX={0} pcbY={0}>
      <ControllerCore />
    </group>

    <group pcbX={readerPlacementConstraint.groupX} pcbY={readerPlacementConstraint.groupY}>
      <ReaderInterfaces />
    </group>

    <group pcbX={retentionPlacementConstraint.groupX} pcbY={retentionPlacementConstraint.groupY}>
      <RetentionSupport />
    </group>

    <group pcbX={supervisedInputPlacementConstraint.groupX} pcbY={supervisedInputPlacementConstraint.groupY}>
      <SupervisedInputBank />
    </group>

    <group pcbX={relayPlacementConstraint.groupX} pcbY={relayPlacementConstraint.groupY}>
      <RelayLockOutput />
    </group>

    <group pcbX={servicePlacementConstraint.groupX} pcbY={servicePlacementConstraint.groupY}>
      <ServiceConnectors />
    </group>

  </board>
)

export default OneDoorController