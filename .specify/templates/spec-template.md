# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## User Scenarios & Testing *(mandatory)*

For this repository, every user story MUST identify the affected components,
nets, footprints, or board constraints and state the command, snapshot, or other
artifact that proves the story works independently.

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when a required footprint, package, or component source is missing,
  provisional, or ambiguous?
- How does the design handle unconnected nets, accidental shorts, or inconsistent
  net naming?
- What happens when component placement, outline, or routing exceeds board-size or
  manufacturing constraints?
- How is fabrication readiness handled when placement is valid but routing or DRC
  remains intentionally incomplete?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST express new circuit behavior in TypeScript/TSX using explicit components, values, nets, and footprints.
- **FR-002**: System MUST document any new board or mechanical constraints needed for correct placement or fabrication.  
- **FR-003**: Users MUST be able to verify the feature independently through defined `tsci` commands, snapshots, or equivalent review artifacts.
- **FR-004**: System MUST preserve strict TypeScript guarantees for new props, helpers, and configuration objects.
- **FR-005**: System MUST declare whether the resulting design is exploratory, review-ready, or fabrication-ready.

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **Circuit Element**: A component, subcircuit, or helper with defined electrical purpose, footprint, and connectivity.
- **Net / Constraint**: A named electrical connection or physical/manufacturing rule that the feature depends on.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: The primary user story can be validated with the declared `tsci` and TypeScript commands without unresolved netlist or build failures.
- **SC-002**: Reviewers can identify affected components, nets, footprints, and board constraints directly from the spec and implementation.
- **SC-003**: The feature can be demonstrated with a snapshot, rendered output, or equivalent artifact without requiring undocumented manual interpretation.
- **SC-004**: Fabrication readiness status is unambiguous for the resulting design.
