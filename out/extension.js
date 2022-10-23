"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    class MyItem {
        constructor(detail, name) {
            this.detail = detail;
            this.description = '';
            this.label = `${name}`;
        }
    }
    ;
    let items = [
        { 'desc': "Ex. ('abc','def')", "name": "With Quotes" },
        { 'desc': "Ex. (1,2)", "name": "Without Quotes" }
    ];
    const options = items.map((item) => {
        return new MyItem(item.desc, item.name);
    });
    const sqlin = vscode.commands.registerCommand('sql-in-statements.sqlin', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const pick = await vscode.window.showQuickPick(options, {
                canPickMany: false
            });
            var option = pick?.label;
            const document = editor.document;
            const selection = editor.selection;
            const rows = document.getText(selection);
            if (selection.isEmpty) {
                vscode.window.showErrorMessage('Please make a selection.');
            }
            else {
                const strings = rows.split(/\r?\n/);
                console.log(option);
                var newString = '';
                for (let i = 0; i < strings.length; i++) {
                    if (option === 'With Quotes') {
                        newString = newString + '\'' + strings[i] + '\',';
                    }
                    else {
                        newString = newString + strings[i] + ',';
                    }
                }
                newString = 'in (' + newString.substring(0, newString.length - 1) + ')';
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, newString);
                });
            }
        }
        else {
            vscode.window.showErrorMessage('No editor window is open.');
        }
    });
    context.subscriptions.push(sqlin);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map