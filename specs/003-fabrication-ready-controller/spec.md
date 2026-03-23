# Spec 003 — Fabrication-Ready One-Door Controller

## Status: In Progress

## Goal

Advance the one-door access controller from **review-ready** (Milestone 002) to
**fabrication-ready**: every IC and connector has a real vendor part number, a real
KiCad footprint, and validated pin-to-net assignments that match the component
datasheets.

## Definition of Done

- [ ] All IC `footprint` props use `kicad:` library paths (not generic `soic8` / `qfp48`)
- [ ] All components have `supplierPartNumbers` with at least one LCSC/JLCPCB code
- [ ] Pin labels on every IC match the physical pad numbers from the vendor datasheet
- [ ] `npm run typecheck` passes
- [ ] `tsci check netlist` passes (0 errors)
- [ ] `tsci build` passes
- [ ] `tsci snapshot --update` passes
- [ ] `tsci check placement` passes (0 overlaps / warnings)
- [ ] `src/lib/controller-types.ts` `fabricationStatus` updated to `"fabrication-ready"`

## Selected Parts

| Ref       | Function                  | Part                      | Package        | LCSC         |
|-----------|---------------------------|---------------------------|----------------|--------------|
| U_CTRL    | Main MCU                  | STM32F407VET6             | LQFP-100       | C8601        |
| U_ETH_PHY | 10/100 RMII PHY           | LAN8720A                  | QFN-24 (4×4mm) | C85278       |
| U_OSDP_XCVR | RS-485 transceiver      | MAX3485ESA+T              | SOIC-8         | C122806      |
| U_OSDP_PROTECT | RS-485 bus TVS       | PRTR5V0U2X                | SOT-363        | C2842        |
| U_RTC     | Real-time clock           | DS3231MZ#                 | SOIC-8         | C255630      |
| U_EVENT_FRAM | SPI FRAM 256Kbit       | MB85RS256                 | SOIC-8         | C92189       |
| U_POE_PD  | PoE PD controller (IEEE 802.3af) | Si3402B-ISR        | SOIC-16        | C191946      |
| U_REG_5V  | 12V→5V DC-DC buck         | TPS5430DDA                | SOIC-8         | C146598      |
| U_REG_3V3 | 5V→3.3V LDO               | AMS1117-3.3               | SOT-223-3      | C6186        |
| J_RJ45    | RJ45 MagJack 10/100       | HR911105A                 | THT (8+2 leds) | C12074       |
| J_SERVICE | TC2050 Tag-Connect 10-pin | TC2050-IDC-NL-050         | SMD 10-pad     | —            |
| J_LOCK_RELAY_TB | Dry relay output    | MKDSN 1.5/3               | 5.08mm x3      | C490129      |
| J_LOCK_POWER_TB | Lock power output   | MKDSN 1.5/3               | 5.08mm x3      | C490129      |
| J_ENTRY_INPUTS_TB | Supervised inputs | MKDSN 1.5/4               | 5.08mm x4      | C490130      |
| J_STATUS_INPUTS_TB | Status inputs    | MKDSN 1.5/4               | 5.08mm x4      | C490130      |

## MCU GPIO Assignment (STM32F407VET6)

| Function                | GPIO    | Physical Pin* |
|-------------------------|---------|---------------|
| RMII_REF_CLK            | PA1     | 15            |
| RMII_MDIO               | PA2     | 16            |
| RMII_CRS_DV             | PA7     | 23            |
| RMII_RXD0               | PC4     | 24            |
| RMII_RXD1               | PC5     | 25            |
| RMII_TX_EN              | PB11    | 30            |
| RMII_TXD0               | PB12    | 33            |
| RMII_TXD1               | PB13    | 34            |
| ETH_MDC                 | PC1     | 9             |
| ETH_MDIO                | PA2     | 16            |
| NRST (CTRL_RESET_N)     | NRST    | 7             |
| BOOT0 (CTRL_BOOT_MODE)  | BOOT0   | 60            |
| SERVICE_UART_TX         | PA9     | 42            |
| SERVICE_UART_RX         | PA10    | 43            |
| SERVICE_SWDIO           | PA13    | 46            |
| SERVICE_SWCLK           | PA14    | 49            |
| BUFFER_SPI_CLK          | PB3     | 55            |
| BUFFER_SPI_MISO         | PB4     | 56            |
| BUFFER_SPI_MOSI         | PB5     | 57            |
| RTC_SCL                 | PB6     | 58            |
| RTC_SDA                 | PB7     | 59            |
| RTC_INT                 | PB8     | 61            |
| BUFFER_CS               | PA15    | 50            |
| OSDP_UART_TX            | PD5**   | 83            |
| OSDP_UART_RX            | PD6**   | 86            |
| OSDP_TX_EN              | PD7**   | 87            |
| OSDP_RX_EN_N            | PD2**   | 78            |
| POWER_FAIL_WARN         | PD0**   | 77            |
| MGMT_STATUS             | PE7**   | 68            |
| MGMT_ONLINE             | PE8**   | 69            |
| MGMT_DEGRADED           | PE9**   | 70            |
| MGMT_OFFLINE            | PE10**  | 71            |
| RESYNC_ACTIVE           | PE11**  | 72            |
| WATCHDOG_ALERT          | PE12**  | 73            |
| WIEGAND_D0              | PE13**  | 74            |
| WIEGAND_D1              | PE14**  | 75            |
| READER_LED              | PE15**  | 76            |
| READER_BEEP             | PD1**   | 79            |

> *Pin numbers are approximate for LQFP-100. Marked ** are on PE/PD banks
>  whose exact LQFP-100 positions should be verified against DS8626 rev 10+
>  before ordering PCBs. Core RMII signals PA1-PC5 are confirmed against
>  multiple reference schematics.

## Power Architecture

```
RJ45 ──►  Si3402B PoE PD  ──(12V)──►  TPS5430 (5V DC-DC)  ──►  AMS1117-3.3
          (IEEE 802.3af)                                          (3.3V LDO)
             │PGOOD                                                    │
             └──► POWER_FAIL_WARN (MCU GPIO)                           └──► V3_3_LOGIC
```

## Notes for Implementer

- SPI FRAM uses SPI3: PB3(SCK), PB4(MISO), PB5(MOSI), PA15(CS). Wire MISO/MOSI as
  separate nets (current placeholder incorrectly shares one pin for both).
- DS3231MZ pin1=32kHz, pin2=VCC, pin3=INT/SQW, pin4=/RST, pin5=GND, pin6=VBAT,
  pin7=SCL, pin8=SDA — differs from current placeholder.
- MAX3485 pin1=RO, pin2=/RE, pin3=DE, pin4=DI, pin5=GND, pin6=A, pin7=B, pin8=VCC
  — differs from current placeholder.
- MB85RS256 pinout already matches current placeholder (1=CS, 2=SO, 3=/WP, 4=GND,
  5=SI, 6=SCK, 7=/HOLD, 8=VCC) — no changes needed on FRAM.
