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
