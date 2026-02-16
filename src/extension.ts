// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { countReset } from 'console';
import * as vscode from 'vscode';


let statusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	/**
	 * sample success message
	 */
	console.log('Congratulations, your extension "day-and-knight" is now active!');

	/**
	 * sample hello world command
	 */
	const disposable = vscode.commands.registerCommand('day-and-knight.helloWorld', () => {
		vscode.window.showInformationMessage('Hello from day-and-knight!');
	});
	context.subscriptions.push(disposable);

	/**
	 * toggle command for the status bar item
	 */
	const toggleCommandId = 'day-and-knight.toggle';
	const toggleCommand = vscode.commands.registerCommand(toggleCommandId, toggleTheme);
	context.subscriptions.push(toggleCommand);

	/**
	 * create a status bar item
	*/
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, Number.MIN_SAFE_INTEGER);
	// TODO: custom logo for the status bar item
	statusBarItem.text = `$(light-bulb) Day and Knight`;
	statusBarItem.command = toggleCommandId;
	// TODO: this should show when hovering over the status bar item "Is it a day already?" or "Is it a knight already?" based on the theme/time of day
	statusBarItem.tooltip = 'Is it a day already?';
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);
}

function toggleTheme() {
	const lightTheme = "Default Light+";
	const darkTheme = "Default Dark+";

	if (vscode.workspace.getConfiguration('workbench').get('colorTheme') === lightTheme) {
		vscode.workspace.getConfiguration('workbench').update('colorTheme', darkTheme);
	} else if (vscode.workspace.getConfiguration('workbench').get('colorTheme') === darkTheme) {
		vscode.workspace.getConfiguration('workbench').update('colorTheme', lightTheme);
	} else {
		vscode.window.showInformationMessage('Theme is not set to light or dark');
		vscode.workspace.getConfiguration('workbench').update('colorTheme', lightTheme);
		vscode.window.showInformationMessage('Theme set to light');
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
