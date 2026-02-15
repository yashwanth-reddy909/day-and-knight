# Next Release Targets

Single source of truth for items to ship in the upcoming release.

---

## Core Features

- [ ] Extension activation on startup
- [ ] Settings: `day-and-knight.light-themes` (array), `day-and-knight.dark-themes` (array)
- [ ] Settings: `day-and-knight.dayStart`, `day-and-knight.nightStart` (e.g. `"06:00"`, `"18:00"`)
- [ ] Time-based day/night detection (local time)
- [ ] Random theme selection from configured arrays on switch
- [ ] Apply theme via `workbench.colorTheme`
- [ ] Interval/scheduler for periodic checks (`day-and-knight.intervalMinutes`)

## Status Bar

- [ ] Status bar item showing current mode (day/night)
- [ ] Click to toggle between day and night theme

## Commands

- [ ] Switch to day theme
- [ ] Switch to night theme
- [ ] Toggle day/night theme
- [ ] Pause/disable automation

## Polish

- [ ] Document `window.autoDetectColorScheme: false` requirement in README
- [ ] Handle edge cases: empty arrays, invalid theme names, missing themes
- [ ] Package keywords for discoverability ("auto night mode", "theme switcher", "day night")
- [ ] Publish on Open VSX (Cursor/VSCodium)

## Out of Scope (Later Releases)

- Sunrise/sunset (geo)
- daySettings / nightSettings (font size, etc.)
- Theme fade/transition
- Per-day-of-week schedule
- Workspace overrides
