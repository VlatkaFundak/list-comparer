import * as vscode from 'vscode';
import * as fs from 'fs';
import { getDifferences } from '../utils/diffUtils';

export function compareFiles(filePath1: string, filePath2: string, options: string) {
    fs.readFile(filePath1, 'utf8', (err, data1) => {
        if (err) {
            vscode.window.showErrorMessage(`Error reading file: ${filePath1}`);
            return;
        }

        fs.readFile(filePath2, 'utf8', (err, data2) => {
            if (err) {
                vscode.window.showErrorMessage(`Error reading file: ${filePath2}`);
                return;
            }

            // Compare the files and show the differences
            const results = getDifferences(data1, data2, options);
            results.forEach((result, index) => {
                const uri = vscode.Uri.parse(`untitled:result${index + 1}.txt`);
                vscode.workspace.openTextDocument(uri).then(doc => {
                    const edit = new vscode.WorkspaceEdit();
                    edit.insert(uri, new vscode.Position(0, 0), result.content);
                    return vscode.workspace.applyEdit(edit).then(success => {
                        if (success) {
                            vscode.window.showTextDocument(doc, { preview: false });
                        } else {
                            vscode.window.showErrorMessage('Error displaying results.');
                        }
                    });
                });
            });
        });
    });
}

export function deactivate() {}