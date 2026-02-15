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
  "window.autoDetectColorScheme": false,
  "day-and-knight.light-themes": ["One Light", "GitHub Light"],
  "day-and-knight.dark-themes": ["One Dark Pro", "Dracula"],
  "day-and-knight.timezone": "UTC+05:30",
  "day-and-knight.dayStart": "06:00",
  "day-and-knight.nightStart": "18:00"
}
```

---

## Features

- [ ] Toggle day/night theme (status bar + command)
- [ ] Direct theme switching based on configured timezone
- [ ] Timezone: `UTC+/-XX` or `UTC+/-XX:XX`
- [ ] Random theme selection from `light-themes` / `dark-themes` arrays
- [ ] Periodic check + apply `workbench.colorTheme`
