# Data Model: Fabrication-Ready Controller Hardware

## Entity: FabricationReadyBoardRevision

**Purpose**: The concrete one-door controller revision that preserves the
Feature 001 and 002 architecture while adding the evidence required for a
fabrication-ready claim.

**Fields**:

- `boardName`: stable board identifier
- `boardOutline`: width, height, and board-edge constraints
- `layerCount`: fixed 4-layer target
- `fabricationStatus`: `review-ready | fabrication-blocked | fabrication-ready`
- `inheritsArchitectureFrom`: `001-door-access-controller` and `002-review-ready-controller`
- `releaseGate`: named fabrication release gate for first article
- `eventBufferTarget`: minimum retained event count

**Relationships**:

- Has one `EthernetPhysicalImplementation`
- Has one `LockOutputPhysicalImplementation`
- Has one `RetentionClosure`
- Has many `FabricationCriticalPart`
- Has many `ConnectorDecision`
- Has one `ManufacturingReadinessPackage`
- Has one `ProcurementReadinessPackage`
- Has one `BringUpVerificationPackage`
- Has one `ContractPreservationStatement`

**Validation Rules**:

- Must preserve the dry-relay external-lock boundary
- Must preserve PoE-fed logic and networking
- Must not be marked `fabrication-ready` while any blocker remains open

## Entity: FabricationCriticalPart

**Purpose**: A part or subassembly whose exact selection, package, footprint, or
source treatment can block first-article fabrication.

**Fields**:

- `partKey`: stable identifier such as `ethernet_magjack`, `lock_relay`, `rtc_backup_cap`
- `subsystem`: Ethernet, relay, retention, service, power, connector, or reader I/O
- `status`: `approved | blocked | pending_review`
- `electricalRole`: what the part does in the design
- `package`: physical package or assembly style
- `footprint`: final intended footprint
- `sourceOfTruthFile`: TSX or `src/lib/` file that owns the decision
- `requiresAlternate`: boolean

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`
- Has zero or one `ApprovedBomLine`
- Has zero or one `FabricationBlocker`

**Validation Rules**:

- Must have either an approved BOM line or an explicit blocker
- Must identify the owning file and subsystem

## Entity: ApprovedBomLine

**Purpose**: The final release-ready record for one fabrication-critical part.

**Fields**:

- `manufacturer`: approved manufacturer name
- `manufacturerPartNumber`: exact MPN
- `supplierPaths`: known purchasing paths
- `approvedAlternates`: exact alternates or `none`
- `lifecycleStatus`: `active | unknown | at_risk`
- `assemblySuitability`: statement for intended assembly process
- `cadModelStatus`: `present | not_required | missing_blocker`

**Relationships**:

- Belongs to one `FabricationCriticalPart`

**Validation Rules**:

- Must include an exact MPN and sourcing expectation
- Must state alternate treatment or justified single-source exception

## Entity: FabricationBlocker

**Purpose**: A named unresolved issue that prevents the board from being treated
as fabrication-ready.

**Fields**:

- `blockerName`: concise release-blocking title
- `appliesTo`: affected part or subsystem
- `reason`: why the part cannot yet be approved
- `closureCriteria`: measurable exit criteria
- `owner`: responsible reviewer or workstream
- `impactArea`: sourcing, footprint, assembly, mechanical, or verification

**Relationships**:

- Belongs to one `FabricationCriticalPart`

**Validation Rules**:

- Closure criteria must be objective and reviewable
- No blocker may coexist with `fabrication-ready` board status

## Entity: EthernetPhysicalImplementation

**Purpose**: The approved LAN-entry hardware and layout constraints.

**Fields**:

- `lanEntryStrategy`: `integrated_magjack` or `connector_plus_magnetics`
- `phyBoundary`: RMII PHY ownership and related support parts
- `poeHandling`: PoE extraction and protection assumptions
- `shieldStrategy`: shield/chassis/logic-ground treatment notes
- `boardEdgeConstraints`: keepout, overhang, and enclosure-facing notes
- `footprintStatus`: `approved | blocked`

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`
- Depends on several `FabricationCriticalPart` records

**Validation Rules**:

- Must identify an exact board-edge physical implementation
- Must preserve separation from external lock wiring

## Entity: LockOutputPhysicalImplementation

**Purpose**: The approved dry-relay switching path for installer-supplied lock power.

**Fields**:

- `relayPackage`: exact relay package and mounting style
- `contactForm`: Form-C dry contact
- `coilDriveStrategy`: transistor or driver assumption plus logic control boundary
- `suppressionStrategy`: RC, diode, TVS, or approved equivalent
- `terminalCompatibility`: installer-facing terminal decision
- `creepageNotes`: spacing and placement assumptions for release review

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`
- Depends on relay and protection `FabricationCriticalPart` records

**Validation Rules**:

- Must preserve the existing external-power dry-contact contract
- Must identify the exact relay and suppression treatment or stay blocked

## Entity: RetentionClosure

**Purpose**: The approved RTC, FRAM, and backup-domain closure for offline event
ordering and power-loss resilience.

**Fields**:

- `rtcPartStatus`: approved or blocked
- `framPartStatus`: approved or blocked
- `backupSupportPart`: approved capacitor or backup source path
- `powerFailHandling`: minimum expected behavior during loss of logic power
- `boardLevelPlaceholderStatus`: closure status for board-level placeholder parts

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`
- Depends on RTC and event-buffer `FabricationCriticalPart` records

**Validation Rules**:

- Board-level placeholders must be removed or turned into explicit blockers
- Must define how retained time and persisted events are verified at bring-up

## Entity: ConnectorDecision

**Purpose**: The exact approved physical connection strategy for one external or service interface.

**Fields**:

- `interfaceName`: Ethernet, relay, external lock power, OSDP, Wiegand, supervised inputs, or service
- `family`: approved connector family
- `exactPart`: specific connector or terminal part
- `pinCount`: required populated positions
- `placementNotes`: access and serviceability notes
- `status`: `approved | blocked`

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`

**Validation Rules**:

- Every field-facing and service-facing interface must have a connector decision
- Service access must remain distinct from installer wiring

## Entity: ManufacturingReadinessPackage

**Purpose**: The DFM and assembly evidence set required for first-article release.

**Fields**:

- `assemblyMethod`: expected assembly path and assumptions
- `criticalFootprintReviews`: list of footprints that require explicit review
- `boardEdgeChecks`: Ethernet and service-access mechanical checks
- `handlingConstraints`: process or handling notes for relays, terminals, or tall parts
- `placementValidationRequired`: boolean

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`

**Validation Rules**:

- Must reference all fabrication-critical footprints
- Must require placement validation when relevant footprints move or change

## Entity: ProcurementReadinessPackage

**Purpose**: The sourcing and lifecycle evidence set required for ordering confidence.

**Fields**:

- `criticalPartCoverage`: percentage or list of covered critical parts
- `alternatePolicy`: approved alternate treatment rule
- `lifecycleReviewPolicy`: how lifecycle risk is recorded
- `singleSourceExceptions`: justified exceptions
- `releaseDecision`: `acceptable | blocked`

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`

**Validation Rules**:

- Every fabrication-critical approved part must have sourcing treatment
- Procurement risk must be explicit before release

## Entity: BringUpVerificationPackage

**Purpose**: The minimum first-article test set required before the board can be
treated as fabrication-ready.

**Fields**:

- `powerChecks`: logic, reader auxiliary, and external-lock-domain checks
- `ethernetChecks`: link, PoE intake, and management visibility checks
- `relayChecks`: actuation and dry-contact verification
- `readerChecks`: OSDP and Wiegand continuity checks
- `retentionChecks`: RTC and event-buffer persistence checks
- `serviceChecks`: programming and recovery access checks

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`

**Validation Rules**:

- Must cover every critical subsystem named in FR-013
- Must be executable without undocumented bench-only knowledge

## Entity: ContractPreservationStatement

**Purpose**: The explicit record that exact part lock-in did not silently change
accepted electrical or operational behavior.

**Fields**:

- `powerBoundaryStatus`: preserved or changed
- `readerSupportStatus`: preserved or changed
- `serviceSeparationStatus`: preserved or changed
- `retentionStatus`: preserved or changed
- `scopeChangeNotes`: required only when a contract changes

**Relationships**:

- Belongs to `FabricationReadyBoardRevision`

**Validation Rules**:

- Any deviation from Feature 001 or 002 contracts must be explicitly documented
- An empty scope-change record implies full preservation of the accepted architecture

## State Transitions

### Release State

`review-ready -> fabrication-blocked -> fabrication-ready`

Rules:

- `fabrication-blocked` is required whenever any fabrication-critical item lacks
  an approved BOM line or manufacturable footprint
- `fabrication-ready` requires completed manufacturing, procurement, and bring-up packages

### Part Approval State

`pending_review -> approved`

`pending_review -> blocked`

`blocked -> approved`

Rules:

- A blocked part must carry closure criteria and owner-visible status
- Approval requires exact part, footprint, and source treatment