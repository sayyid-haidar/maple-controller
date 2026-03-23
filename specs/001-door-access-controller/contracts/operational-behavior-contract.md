# Operational Behavior Contract: One-Door Access Controller

## Purpose

Define the behavioral contract between the controller hardware and its management
model.

## Management Contract

- The controller is centrally managed over LAN during normal operation.
- Loss of management connectivity MUST NOT disable local door decisions.
- Local events generated during management interruption MUST be buffered for later
  synchronization.
- Reconnection MUST support a resynchronization phase that does not block normal
  door operation.
- Offline, degraded, and resyncing states should remain review-visible through
  explicit controller status paths or annotated design artifacts.
- Online, degraded, offline, and resyncing states must remain distinguishable as
  separate review-visible paths rather than a single generic management LED.
- The design should reserve a power-fail indication path so event buffering can
  be reasoned about across brownout or abrupt power interruption scenarios.
- The design should reserve service access for commissioning and recovery without
  exposing field wiring to logic-domain debug paths.

## Door-Control Contract

- A valid local or centrally provisioned access decision may command the dry
  relay lock path.
- Door contact and REX input changes must be observable as distinct events.
- The controller must support both fail-safe and fail-secure deployment policies
  through documented wiring/configuration behavior.

## Monitoring Contract

- Tamper and abnormal-power conditions must map to distinct operational events.
- The controller must expose enough status signals for review artifacts to show
  normal operation, degraded management connectivity, and buffered-event state.
- RTC-backed event ordering and nonvolatile event retention assumptions must be
  explicit enough that a reviewer can distinguish "temporarily offline but safe"
  from "state may be lost on reset" behavior.
- A service/debug path for maintenance UART or strap access should remain
  review-visible, alongside watchdog or recovery-state visibility, without
  implying that central management can override local life-safety behavior.
