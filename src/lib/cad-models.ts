export const KICAD_STEP_MODELS = {
  lqfp100_14x14_p05:
    "https://github.com/KiCad/kicad-packages3D/raw/refs/heads/master/Package_QFP.3dshapes/LQFP-100_14x14mm_P0.5mm.step",
  pinHeader2x05_p127:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Connector_PinHeader_1.27mm.3dshapes/PinHeader_2x05_P1.27mm_Vertical.step",
  qfn24_1ep_4x4_p05_ep26:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_DFN_QFN.3dshapes/QFN-24-1EP_4x4mm_Pitch0.5mm.step",
  soic8_39x49_p127:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_SO.3dshapes/SOIC-8_3.9x4.9mm_P1.27mm.step",
  soic16_39x99_p127:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_SO.3dshapes/SOIC-16_3.9x9.9mm_P1.27mm.step",
} as const

export interface FabricationCadCoverageRecord {
  componentKey: string
  sourceOfTruthFile: string
  cadModelStatus: "present" | "missing_blocker" | "not_required"
  reviewOwner: string
  mechanicalImpact: string
}

export const FABRICATION_CAD_COVERAGE: FabricationCadCoverageRecord[] = [
  {
    componentKey: "controller_mcu",
    sourceOfTruthFile: "src/components/controller-core.tsx",
    cadModelStatus: "present",
    reviewOwner: "hardware architecture review",
    mechanicalImpact: "Primary controller package height and courtyard are visible in 3D review.",
  },
  {
    componentKey: "service_debug_header",
    sourceOfTruthFile: "src/components/service-connectors.tsx",
    cadModelStatus: "present",
    reviewOwner: "fabrication closure review",
    mechanicalImpact: "Service access clearance and mating direction remain review-visible.",
  },
  {
    componentKey: "rtc_device",
    sourceOfTruthFile: "src/components/retention-support.tsx",
    cadModelStatus: "present",
    reviewOwner: "retention review",
    mechanicalImpact: "Retention subsystem body models are available for assembly checks.",
  },
  {
    componentKey: "event_fram",
    sourceOfTruthFile: "src/components/retention-support.tsx",
    cadModelStatus: "present",
    reviewOwner: "retention review",
    mechanicalImpact: "Retention subsystem body models are available for assembly checks.",
  },
  {
    componentKey: "ethernet_magjack",
    sourceOfTruthFile: "src/components/ethernet-poe-front-end.tsx",
    cadModelStatus: "missing_blocker",
    reviewOwner: "LAN entry review",
    mechanicalImpact: "Board-edge connector overhang, shield body, and enclosure fit cannot be reviewed until the exact part is approved.",
  },
  {
    componentKey: "lock_relay",
    sourceOfTruthFile: "src/components/relay-lock-output.tsx",
    cadModelStatus: "missing_blocker",
    reviewOwner: "lock-interface review",
    mechanicalImpact: "Relay body height, creepage spacing, and terminal clearance remain unresolved.",
  },
  {
    componentKey: "reader_terminal_blocks",
    sourceOfTruthFile: "src/components/reader-interfaces.tsx",
    cadModelStatus: "missing_blocker",
    reviewOwner: "fabrication closure review",
    mechanicalImpact: "Installer cable-entry clearance still needs an explicit 3D body assignment for terminal blocks.",
  },
  {
    componentKey: "supervised_input_terminal_blocks",
    sourceOfTruthFile: "src/components/supervised-input-bank.tsx",
    cadModelStatus: "missing_blocker",
    reviewOwner: "fabrication closure review",
    mechanicalImpact: "Installer cable-entry clearance still needs an explicit 3D body assignment for terminal blocks.",
  },
]