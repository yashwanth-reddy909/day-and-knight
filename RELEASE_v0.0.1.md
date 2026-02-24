# Release v0.0.1

## Highlights

- Initial production-ready release of the **Day and Knight VS Code extension**
- **Auto update theme** based on local time:
  - Day: `06:00` to `17:59`
  - Night: `18:00` to `05:59`
- Random theme selection from configured light/dark arrays
- Deterministic daily selection using a hash of the local day string

---

## End-user configuration

Use workspace settings:

```json
{
  "day-and-knight.autoUpdate": true,
  "day-and-knight.lightThemes": ["Default Light+", "GitHub Light"],
  "day-and-knight.darkThemes": ["Default Dark+", "One Dark Pro"]
}
```

---

## Commands

- `Day and Knight: Toggle Theme`
- `Day and Knight: Enable Auto Update`
- `Day and Knight: Disable Auto Update`

---

## Behavior details

- Toggle action switches to the opposite mode and **disables auto update**.
- Users must run **Enable Auto Update** to turn automatic switching back on.
- Theme updates are applied through `workbench.colorTheme`.
- `window.autoDetectColorScheme` is set to `false` to prevent OS-based overrides.
