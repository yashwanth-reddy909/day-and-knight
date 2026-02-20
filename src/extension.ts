import * as vscode from 'vscode';
import { ConfigModel, type ThemeConfig } from './models/config-model';
import { hashDayToIndex, getLocalDayKey } from './util';

let statusBarItem: vscode.StatusBarItem;
type ThemeMode = 'day' | 'night';
const configModel = new ConfigModel();

// Local hour when day mode starts (inclusive).
const DAY_START_HOUR = 6;
// Local hour when night mode starts (exclusive upper bound for day).
const NIGHT_START_HOUR = 18;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	console.log('Congratulations, your extension "day-and-knight" is now active!');

	const disposable = vscode.commands.registerCommand('day-and-knight.helloWorld', () => {
		vscode.window.showInformationMessage('Hello from day-and-knight!');
	});
	context.subscriptions.push(disposable);

	const toggleCommandId = 'day-and-knight.toggle';
	const toggleCommand = vscode.commands.registerCommand(toggleCommandId, async () => {
		await toggleTheme();
	});
	context.subscriptions.push(toggleCommand);

	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, Number.MIN_SAFE_INTEGER);
	statusBarItem.text = '$(light-bulb) Day and Knight';
	statusBarItem.command = toggleCommandId;
	statusBarItem.tooltip = 'Toggle between day and night themes';
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	await applyThemeForMode(getModeForNow(new Date()));
}

// Switch between day/night theme using on status bar click.
async function toggleTheme(): Promise<void> {
	const config = configModel.getThemeConfig();
	const currentTheme = configModel.getCurrentTheme();

	let nextMode: ThemeMode;
	if (config.lightThemes.includes(currentTheme)) {
		nextMode = 'night';
	} else if (config.darkThemes.includes(currentTheme)) {
		nextMode = 'day';
	} else {
		nextMode = getModeForNow(new Date()) === 'day' ? 'night' : 'day';
	}

	await applyThemeForMode(nextMode);
}

// Derive current mode from local hour boundaries.
function getModeForNow(now: Date): ThemeMode {
	const currentHour = now.getHours();
	return currentHour >= DAY_START_HOUR && currentHour < NIGHT_START_HOUR ? 'day' : 'night';
}

// Pick day/night theme deterministically for the current date.
function pickThemeForMode(mode: ThemeMode, now: Date, config: ThemeConfig): string {
	const themes = mode === 'day' ? config.lightThemes : config.darkThemes;
	const index = hashDayToIndex(getLocalDayKey(now), themes.length);
	return themes[index];
}

// Disable OS color scheme auto-detection to avoid conflicts.
async function ensureAutoDetectColorSchemeDisabled(): Promise<void> {
	const autoDetect = configModel.getAutoDetectColorScheme();
	if (autoDetect) {
		await configModel.setAutoDetectColorScheme(false);
	}
}

// Apply the chosen theme to workspace settings and refresh UI.
async function applyThemeForMode(mode: ThemeMode): Promise<void> {
	const now = new Date();
	const config = configModel.getThemeConfig();
	const theme = pickThemeForMode(mode, now, config);

	await ensureAutoDetectColorSchemeDisabled();
	await configModel.setCurrentTheme(theme);

	updateStatusBar(mode, theme);
}

// Show current mode/theme in the status bar.
function updateStatusBar(mode: ThemeMode, theme: string): void {
	const modeLabel = mode === 'day' ? 'Day' : 'Night';
	statusBarItem.text = `$(light-bulb) ${modeLabel}: ${theme}`;
	statusBarItem.tooltip = `Current ${modeLabel.toLowerCase()} theme: ${theme}. Click to toggle.`;
}

// No async cleanup required on deactivation.
export function deactivate() {}
