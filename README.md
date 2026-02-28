# Day and Knight

A **VS Code extension** that automatically switches your editor theme between day and night.

It supports:
- **Auto update theme** based on local time
- Random theme selection from your configured lists
- Consistent per-day theme choice (same theme for the whole day)
- One-click manual toggle from the status bar

## Why use this extension

`day-and-knight` helps you keep your editor comfortable through the day:
- Day mode runs from **06:00 to 17:59**
- Night mode runs from **18:00 to 05:59**
- Themes are chosen from your own theme arrays

## Quick setup

1. Install the extension in **VS Code**.
2. Open your workspace `settings.json`.
3. Add your light/dark theme lists and keep auto update enabled.

Sample config:

```json
{
  "day-and-knight.autoUpdate": true,
  "day-and-knight.lightThemes": ["Default Light+", "GitHub Light", "Solarized Light"],
  "day-and-knight.darkThemes": ["Default Dark+", "One Dark Pro", "Dracula"]
}
```

## Commands

- `Day and Knight: Toggle Theme`
- `Day and Knight: Toggle to Day Theme ☀️`
- `Day and Knight: Toggle to Night Theme 🌙`
- `Day and Knight: Enable Auto Update`
- `Day and Knight: Disable Auto Update`

## Important behavior

- Clicking the status bar toggle (or running **Toggle Theme**) will:
  - switch to the opposite mode theme
  - **disable auto update**
- To resume automatic switching, you must manually run:
  - `Day and Knight: Enable Auto Update`

## How random selection works

Theme selection is random **but stable for each local day**:
- A hash is computed from the day string (`YYYY-MM-DD`)
- That hash picks an index from your theme array
- Result: you get consistency throughout a day, and natural variation across days

## Extension settings

- `day-and-knight.autoUpdate` (boolean, default: `true`)
- `day-and-knight.lightThemes` (string array, default: `["Default Light+"]`)
- `day-and-knight.darkThemes` (string array, default: `["Default Dark+"]`)

## Notes

- This extension writes the selected theme to `workbench.colorTheme`.
- It disables `window.autoDetectColorScheme` to avoid OS-level theme overrides.
- Refresh interval is 1 minute
- If a theme list is empty/invalid, a safe fallback is used (`Default Light+` / `Default Dark+`).
