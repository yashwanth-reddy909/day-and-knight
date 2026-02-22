import * as vscode from 'vscode';

const OUTPUT_CHANNEL_NAME = 'Day and Knight';
let outputChannel: vscode.OutputChannel | undefined;

export function initializeLogger(context: vscode.ExtensionContext): void {
	if (outputChannel) {
		return;
	}

	outputChannel = vscode.window.createOutputChannel(OUTPUT_CHANNEL_NAME);
	context.subscriptions.push(outputChannel);
}

export function log(...messages: string[]): void {
	const message = messages.join(' ');

	if (outputChannel) {
		outputChannel.appendLine(message);
		return;
	}

	console.log(`[day-and-knight] ${message}`);
}
