# maple-tscircuit Copilot Instructions

- Treat this repository as a tscircuit TypeScript/TSX hardware project, not a generic React app.
- Keep circuit intent explicit: name nets clearly, keep footprints intentional, and mark provisional parts instead of guessing.
- Preserve strict TypeScript contracts and prefer reusable pure TSX subcircuits over monolithic board files.
- When changing circuit structure, validate with `npm run typecheck`, `tsci check netlist`, `tsci build`, and `tsci snapshot`; run `tsci check placement` for board-outline, connector, footprint, or placement changes.
- Use the `.github/skills/tscircuit/` skill for detailed `tsci` workflow guidance, templates, and helper resources when working on PCB design tasks.