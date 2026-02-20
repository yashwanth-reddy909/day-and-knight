import * as vscode from 'vscode';

export interface ThemeConfig {
	lightThemes: string[];
	darkThemes: string[];
}

// Fallback light theme when user config is missing/empty.
const DEFAULT_LIGHT_THEME = 'Default Light+';
// Fallback dark theme when user config is missing/empty.
const DEFAULT_DARK_THEME = 'Default Dark+';

const EXTENSION_CONFIGURATION_SECTION = 'day-and-knight';
const WORKBENCH_CONFIGURATION_SECTION = 'workbench';
const WINDOW_CONFIGURATION_SECTION = 'window';
const LIGHT_THEMES_KEY = 'light-themes';
const DARK_THEMES_KEY = 'dark-themes';
const COLOR_THEME_KEY = 'colorTheme';
const AUTO_DETECT_COLOR_SCHEME_KEY = 'autoDetectColorScheme';

export class ConfigModel {
	getThemeConfig(): ThemeConfig {
		const extensionConfig = vscode.workspace.getConfiguration(EXTENSION_CONFIGURATION_SECTION);
		return {
			lightThemes: this.sanitizeThemes(extensionConfig.get<unknown>(LIGHT_THEMES_KEY), DEFAULT_LIGHT_THEME),
			darkThemes: this.sanitizeThemes(extensionConfig.get<unknown>(DARK_THEMES_KEY), DEFAULT_DARK_THEME)
		};
	}

	getCurrentTheme(): string {
		return vscode.workspace.getConfiguration(WORKBENCH_CONFIGURATION_SECTION).get<string>(COLOR_THEME_KEY) ?? '';
	}

	async setCurrentTheme(theme: string): Promise<void> {
		await vscode.workspace
			.getConfiguration(WORKBENCH_CONFIGURATION_SECTION)
			.update(COLOR_THEME_KEY, theme, vscode.ConfigurationTarget.Workspace);
	}

	getAutoDetectColorScheme(): boolean {
		return vscode.workspace.getConfiguration(WINDOW_CONFIGURATION_SECTION).get<boolean>(AUTO_DETECT_COLOR_SCHEME_KEY, true);
	}

	async setAutoDetectColorScheme(enabled: boolean): Promise<void> {
		await vscode.workspace
			.getConfiguration(WINDOW_CONFIGURATION_SECTION)
			.update(AUTO_DETECT_COLOR_SCHEME_KEY, enabled, vscode.ConfigurationTarget.Workspace);
	}

	private sanitizeThemes(value: unknown, fallbackTheme: string): string[] {
		if (!Array.isArray(value)) {
			return [fallbackTheme];
		}

		const sanitized = value.filter(
			(entry): entry is string => typeof entry === 'string' && entry.trim().length > 0
		);
		return sanitized.length > 0 ? sanitized : [fallbackTheme];
	}
}
