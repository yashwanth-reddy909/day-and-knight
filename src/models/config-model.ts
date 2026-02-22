import * as vscode from "vscode";
import { sanitizeThemes } from "../util";

export interface DayKnightConfig {
  autoUpdate: boolean;
  lightThemes: string[];
  darkThemes: string[];
}

// Fallback light theme when user config is missing/empty.
const DEFAULT_LIGHT_THEME = "Default Light+";
// Fallback dark theme when user config is missing/empty.
const DEFAULT_DARK_THEME = "Default Dark+";

const EXTENSION_CONFIGURATION_SECTION = "day-and-knight";
const WORKBENCH_CONFIGURATION_SECTION = "workbench";
const WINDOW_CONFIGURATION_SECTION = "window";
const LIGHT_THEMES_KEY = "lightThemes";
const DARK_THEMES_KEY = "darkThemes";
const COLOR_THEME_KEY = "colorTheme";
const AUTO_UPDATE_KEY = "autoUpdate";
const AUTO_DETECT_COLOR_SCHEME_KEY = "autoDetectColorScheme";

/**
 * Configuration model for the Day and Knight extension.
 * This model is responsible for getting and setting the ide configuration for the extension.
 *
 */
export class ConfigModel {
  getDayKnightConfig(): DayKnightConfig {
    const extensionConfig = vscode.workspace.getConfiguration(EXTENSION_CONFIGURATION_SECTION);
    return {
      autoUpdate: extensionConfig.get<boolean>(AUTO_UPDATE_KEY, true),
      lightThemes: sanitizeThemes(
        extensionConfig.get<unknown>(LIGHT_THEMES_KEY),
        DEFAULT_LIGHT_THEME,
      ),
      darkThemes: sanitizeThemes(extensionConfig.get<unknown>(DARK_THEMES_KEY), DEFAULT_DARK_THEME),
    };
  }

  getCurrentTheme(): string {
    return (
      vscode.workspace
        .getConfiguration(WORKBENCH_CONFIGURATION_SECTION)
        .get<string>(COLOR_THEME_KEY) ?? ""
    );
  }

  getAutoDetectColorScheme(): boolean {
    return vscode.workspace
      .getConfiguration(WINDOW_CONFIGURATION_SECTION)
      .get<boolean>(AUTO_DETECT_COLOR_SCHEME_KEY, true);
  }

  async setCurrentTheme(theme: string): Promise<void> {
    await vscode.workspace
      .getConfiguration(WORKBENCH_CONFIGURATION_SECTION)
      .update(COLOR_THEME_KEY, theme, vscode.ConfigurationTarget.Workspace);
  }

  async setAutoDetectColorScheme(enabled: boolean): Promise<void> {
    await vscode.workspace
      .getConfiguration(WINDOW_CONFIGURATION_SECTION)
      .update(AUTO_DETECT_COLOR_SCHEME_KEY, enabled, vscode.ConfigurationTarget.Workspace);
  }

  async setAutoUpdate(enabled: boolean): Promise<void> {
    await vscode.workspace
      .getConfiguration(EXTENSION_CONFIGURATION_SECTION)
      .update(AUTO_UPDATE_KEY, enabled, vscode.ConfigurationTarget.Workspace);
  }
}
