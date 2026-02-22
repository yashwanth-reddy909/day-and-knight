# Release v1.0.0

## Scope

- **Toggle** — Status bar / command to switch between day and night themes
- **Time-based switching** — Automatically apply day/night themes based on configured time boundaries
- **Timezone** — User configures their timezone; extension uses it for time checks

---

## Timezone Support

| Format | Example | Description |
|--------|---------|-------------|
| `UTC+X` | `UTC+5` | Hours only |
| `UTC-X` | `UTC-8` | Hours only |
| `UTC+XX:XX` | `UTC+05:30` | Hours and minutes (e.g. India) |
| `UTC-XX:XX` | `UTC-03:30` | Hours and minutes |

**Wildcard coverage**: `UTC+/-XX:XX` format supports all timezones (full hours, half-hour offsets like India/NFL, etc.).

---

## Config (v1.0.0)

```json
{
  "day-and-knight.lightThemes": ["One Light", "GitHub Light"],
  "day-and-knight.darkThemes": ["One Dark Pro", "Dracula"],
  "day-and-knight.autoUpdate": true
}
```

---

## Features

- [x] Toggle day/night theme (status bar + command)
- [x] Direct theme switching based on configured timezone
- [ ] Timezone: `UTC+/-XX` or `UTC+/-XX:XX`
- [x] Random theme selection from `lightThemes` / `darkThemes` arrays
- [x] Periodic check + apply `workbench.colorTheme`
- [x] Auto update: `day-and-knight.autoUpdate`
