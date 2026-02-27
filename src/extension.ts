import * as vscode from "vscode";
import { ConfigModel } from "./models/config-model";
import { hashDayToIndex, getLocalDayKey } from "./util";
import { initializeLogger, log } from "./logger/main";

const Commands = {
  TOGGLE: "day-and-knight.toggle",
  TOGGLE_TO_DAY_THEME: "day-and-knight.toggleToDayTheme",
  TOGGLE_TO_NIGHT_THEME: "day-and-knight.toggleToNightTheme",
  ENABLE_AUTO_UPDATE: "day-and-knight.enableAutoUpdate",
  DISABLE_AUTO_UPDATE: "day-and-knight.disableAutoUpdate",
};

type ThemeMode = "day" | "night";
const configModel = new ConfigModel();

let statusBarItem: vscode.StatusBarItem;
let runInterval: NodeJS.Timeout | undefined = undefined;

const CHECK_INTERVAL_MS = 1000 * 60 * 1;
const DAY_START_HOUR = 6;
const NIGHT_START_HOUR = 18;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  initializeLogger(context);
  const dayNightConfig = configModel.getDayKnightConfig();
  log(`Extension "day-and-knight" 🌙 is now running! Auto update: ${dayNightConfig.autoUpdate}`);

  registerCommands(context);

  // status bar to quick toggle
  statusBarItem = initializeStatusBarItem(Commands.TOGGLE);
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Apply theme once at startup, then optionally continue auto updates.
  if (dayNightConfig.autoUpdate) {
    void enableAutoUpdate(context);
  }
}

function registerCommands(context: vscode.ExtensionContext): void {
  const toggleDisposable = vscode.commands.registerCommand(Commands.TOGGLE, () => {
    void toggleTheme();
  });
  context.subscriptions.push(toggleDisposable);

  const toggleToDayThemeDisposable = vscode.commands.registerCommand(
    Commands.TOGGLE_TO_DAY_THEME,
    () => {
      void toggleToDayTheme();
    },
  );
  context.subscriptions.push(toggleToDayThemeDisposable);

  const toggleToNightThemeDisposable = vscode.commands.registerCommand(
    Commands.TOGGLE_TO_NIGHT_THEME,
    () => {
      void toggleToNightTheme();
    },
  );
  context.subscriptions.push(toggleToNightThemeDisposable);

  const enableAutoUpdateDisposable = vscode.commands.registerCommand(
    Commands.ENABLE_AUTO_UPDATE,
    () => {
      void enableAutoUpdate(context);
    },
  );
  context.subscriptions.push(enableAutoUpdateDisposable);

  const disableAutoUpdateDisposable = vscode.commands.registerCommand(
    Commands.DISABLE_AUTO_UPDATE,
    () => {
      void disableAutoUpdate();
    },
  );
  context.subscriptions.push(disableAutoUpdateDisposable);
}

// create a status bar item to show the current theme
function initializeStatusBarItem(command: string): vscode.StatusBarItem {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    Number.MIN_SAFE_INTEGER,
  );
  statusBarItem.text = "$(light-bulb) Day and Knight";
  statusBarItem.command = command;
  statusBarItem.tooltip = "Toggle between day and night themes";
  return statusBarItem;
}

// Disable OS color scheme auto-detection to avoid conflicts.
async function ensureAutoDetectColorSchemeDisabled(): Promise<void> {
  const autoDetect = configModel.getAutoDetectColorScheme();
  if (autoDetect) {
    await configModel.setAutoDetectColorScheme(false);
  }
}

// Enable auto update - set autoUpdate to true and start the interval
// Run applyThemeForMode once at the invocation and then every CHECK_INTERVAL_MS
async function enableAutoUpdate(context: vscode.ExtensionContext): Promise<void> {
  await configModel.setAutoUpdate(true);

  // already running - do nothing
  if (runInterval) {
    log(`Auto update already enabled`);
    return;
  }

  await applyThemeForMode(getAutoMode());
  // start auto update every CHECK_INTERVAL_MS
  runInterval = setInterval(() => {
    void applyThemeForMode(getAutoMode());
  }, CHECK_INTERVAL_MS);

  log(`Auto update enabled`);
  // cleanup the interval on extension deactivation
  context.subscriptions.push(new vscode.Disposable(() => clearInterval(runInterval)));
}

// Disable auto update - set autoUpdate to false and clear the interval
async function disableAutoUpdate(): Promise<void> {
  await configModel.setAutoUpdate(false);
  if (runInterval) {
    clearInterval(runInterval);
    runInterval = undefined;
    log(`Auto update disabled`);
  } else {
    log(`Auto update already disabled`);
  }
}

// Switch between day/night theme using on status bar click.
async function toggleTheme(): Promise<void> {
  await disableAutoUpdate();
  const config = configModel.getDayKnightConfig();

  const currentTheme = configModel.getCurrentTheme();

  let nextMode: ThemeMode;
  if (config.lightThemes.includes(currentTheme)) {
    nextMode = "night";
  } else if (config.darkThemes.includes(currentTheme)) {
    nextMode = "day";
  } else {
    nextMode = getAutoMode() === "day" ? "night" : "day";
  }

  await applyThemeForMode(nextMode);
}

// Switch directly to day theme from command palette.
async function toggleToDayTheme(): Promise<void> {
  await disableAutoUpdate();
  await applyThemeForMode("day");
}

// Switch directly to night theme from command palette.
async function toggleToNightTheme(): Promise<void> {
  await disableAutoUpdate();
  await applyThemeForMode("night");
}

// Get the mode based on the local time
function getAutoMode(): ThemeMode {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= DAY_START_HOUR && currentHour < NIGHT_START_HOUR ? "day" : "night";
}

// Apply the chosen theme to workspace settings and refresh UI.
async function applyThemeForMode(mode: ThemeMode): Promise<void> {
  const now = new Date();
  const config = configModel.getDayKnightConfig();

  // randomize the theme from the list of themes for the given mode
  // use the hash of the local day - to be consistent for the day
  const availableThemes = mode === "day" ? config.lightThemes : config.darkThemes;
  const index = hashDayToIndex(getLocalDayKey(now), availableThemes.length);
  const theme = availableThemes[index];

  // since vs code ve 1.42.0 automatically changing the theme based on OS
  // need to disable auto detect color scheme to avoid conflicts
  await ensureAutoDetectColorSchemeDisabled();

  const currentTheme = configModel.getCurrentTheme();
  if (currentTheme !== theme) {
    await configModel.setCurrentTheme(theme);
  }

  updateStatusBar(mode, theme);
}

// Show current mode/theme in the status bar.
function updateStatusBar(mode: ThemeMode, theme: string): void {
  const modeLabel = mode === "day" ? "Day" : "Night";
  statusBarItem.text = `$(light-bulb) ${modeLabel}: ${theme}`;
  statusBarItem.tooltip = `Current ${modeLabel.toLowerCase()} theme: ${theme}. Click to toggle.`;
}

// No async cleanup required on deactivation.
export function deactivate() {}
