import * as vscode from 'vscode';
import { compareFiles } from './commands/compareFiles';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.compareFiles', async () => {
        const fileUris = await vscode.window.showOpenDialog({ 
            canSelectMany: true, 
            filters: { 'Text Files': ['txt'] },
            openLabel: 'Select Two Text Files'
        });

        if (fileUris && fileUris.length === 2) {
            const thirdParam = await vscode.window.showInputBox({ prompt: 'Enter a third parameter for comparison' });

            if (thirdParam) {
                compareFiles(fileUris[0].fsPath, fileUris[1].fsPath, thirdParam);
            }
        } else {
            vscode.window.showErrorMessage('Please select exactly two text files.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}