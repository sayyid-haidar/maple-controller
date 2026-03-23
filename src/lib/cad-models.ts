export const KICAD_STEP_MODELS = {
  lqfp100_14x14_p05:
    "https://github.com/KiCad/kicad-packages3D/raw/refs/heads/master/Package_QFP.3dshapes/LQFP-100_14x14mm_P0.5mm.step",
  pinHeader2x05_p127:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Connector_PinHeader_1.27mm.3dshapes/PinHeader_2x05_P1.27mm_Vertical.step",
  phoenix_mc_1_5_4_g_3_81_horizontal:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Connector_Phoenix_MC.3dshapes/PhoenixContact_MC_1,5_4-G-3.81_1x04_P3.81mm_Horizontal.step",
  phoenix_mkds_1_5_3_5_08_horizontal:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/TerminalBlock_Phoenix.3dshapes/TerminalBlock_Phoenix_MKDS-1,5-3-5.08_1x03_P5.08mm_Horizontal.step",
  qfn24_1ep_4x4_p05_ep26:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_DFN_QFN.3dshapes/QFN-24-1EP_4x4mm_Pitch0.5mm.step",
  rj45_abracon_arjp11a_ma_horizontal:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Connector_RJ.3dshapes/RJ45_Abracon_ARJP11A-MA_Horizontal.step",
  relay_spdt_omron_g5le_1:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Relay_THT.3dshapes/Relay_SPDT_Omron-G5LE-1.step",
  soic8_39x49_p127:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_SO.3dshapes/SOIC-8_3.9x4.9mm_P1.27mm.step",
  soic16_39x99_p127:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_SO.3dshapes/SOIC-16_3.9x9.9mm_P1.27mm.step",
  sot_223:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_TO_SOT_SMD.3dshapes/SOT-223.step",
  sot_23_3:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_TO_SOT_SMD.3dshapes/SOT-23-3.step",
  sot_23_6:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Package_TO_SOT_SMD.3dshapes/SOT-23-6.step",
  d_sod_123:
    "https://raw.githubusercontent.com/KiCad/kicad-packages3D/master/Diode_SMD.3dshapes/D_SOD-123.step",
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
    cadModelStatus: "present",
    reviewOwner: "LAN entry review",
    mechanicalImpact: "Board-edge connector overhang, shield body, and enclosure fit stay review-visible with the released LAN-entry part.",
  },
  {
    componentKey: "lock_relay",
    sourceOfTruthFile: "src/components/relay-lock-output.tsx",
    cadModelStatus: "present",
    reviewOwner: "lock-interface review",
    mechanicalImpact: "Relay body height, creepage spacing, and terminal clearance remain visible in 3D review.",
  },
  {
    componentKey: "reader_terminal_blocks",
    sourceOfTruthFile: "src/components/reader-interfaces.tsx",
    cadModelStatus: "present",
    reviewOwner: "fabrication closure review",
    mechanicalImpact: "Installer cable-entry clearance and connector body overhang remain visible in 3D review.",
  },
  {
    componentKey: "supervised_input_terminal_blocks",
    sourceOfTruthFile: "src/components/supervised-input-bank.tsx",
    cadModelStatus: "present",
    reviewOwner: "fabrication closure review",
    mechanicalImpact: "Installer cable-entry clearance and connector body spacing remain visible in 3D review.",
  },
]