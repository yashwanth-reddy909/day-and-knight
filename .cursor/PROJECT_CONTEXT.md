# Day and Knight — Project Context

## What We're Building

A VS Code extension that switches between light (day) and dark (night) themes based on **local time**, with:

1. **Auto-switching** — Themes change automatically at configurable day/night boundaries
2. **Status bar** — Quick toggle between day and night themes
3. **Theme arrays** — Support multiple themes per mode; randomly picks one when switching

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Own config keys (`day-and-knight.light-themes`, `day-and-knight.dark-themes`) | Don't depend on `workbench.preferredLightColorTheme` / `workbench.preferredDarkColorTheme` — we manage theme arrays |
| Direct workbench updates | We write to `workbench.colorTheme` and related settings |
| `window.autoDetectColorScheme: false` required | VS Code's built-in OS-based switching would override our time-based logic |

## Related Docs

- `docs/PLAN.md` — Implementation plan
- `docs/IDEAS.md` — Idea dump and differentiation from Sundial
