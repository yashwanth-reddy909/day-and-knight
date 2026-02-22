# Next Release Targets

Single source of truth for items to ship in the upcoming release.

---

## Core Features

- [ ] Extension activation on startup
- [ ] Settings: `day-and-knight.lightThemes` (array), `day-and-knight.darkThemes` (array)
- [ ] Settings: `day-and-knight.autoUpdate` (boolean)
- [ ] Time-based day/night detection (local time)
- [ ] Random theme selection from configured arrays on switch
- [ ] Apply theme via `workbench.colorTheme` with `window.autoDetectColorScheme: false`

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
