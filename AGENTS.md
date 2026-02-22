# Day and Knight — Agent Guidance

For AI agents working on this codebase.

## Project

VS Code extension: auto theme switcher based on local time (day/night). Supports **arrays of themes** with random selection; writes directly to `workbench.colorTheme`.

## Key Files

- `src/extension.ts` — Entry point
- `.cursor/rules/` — Project rules (always apply)
- `docs/NEXT_RELEASE.md` — Next release targets
- `docs/IDEAS.md` — Ideas, differentiation from Sundial

## Conventions

1. Config: `day-and-knight.lightThemes`, `day-and-knight.darkThemes` (arrays)
2. Requires: `window.autoDetectColorScheme: false`
3. Do not use `workbench.preferredLightColorTheme` / `workbench.preferredDarkColorTheme` for our config — we own `day-and-knight.*` and update workbench directly
