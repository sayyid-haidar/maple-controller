# maple-tscircuit Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-24

## Active Technologies
- On-board nonvolatile event storage for local buffering; no repository-side data store (001-door-access-controller)
- Dedicated I2C RTC with backup domain plus SPI FRAM-class event journal; no repository-side data store (002-review-ready-controller)
- TypeScript 5.x with TSX (`strict: true`) + `tscircuit`, `typescript`, repository CAD-model helpers in `src/lib/cad-models.ts` (003-fabrication-ready-controller)
- Dedicated RTC backup domain plus SPI FRAM event journal; fabrication evidence lives in spec artifacts, not runtime storage (003-fabrication-ready-controller)

- TypeScript 5.x with TSX (`strict: true`) + `tscircuit`, `typescript`, React JSX runtime types (001-door-access-controller)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x with TSX (`strict: true`): Follow standard conventions

## Recent Changes
- 003-fabrication-ready-controller: Added TypeScript 5.x with TSX (`strict: true`) + `tscircuit`, `typescript`, repository CAD-model helpers in `src/lib/cad-models.ts`
- 002-review-ready-controller: Added TypeScript 5.x with TSX (`strict: true`) + `tscircuit`, `typescript`, React JSX runtime types
- 001-door-access-controller: Added TypeScript 5.x with TSX (`strict: true`) + `tscircuit`, `typescript`, React JSX runtime types


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
