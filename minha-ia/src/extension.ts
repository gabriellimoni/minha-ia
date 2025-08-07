// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from "child_process";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "minha-ia" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "minha-ia.generateMessage",
    async () => {
      const diff = await getGitDiffAsText();
      console.log("diff", diff);

      vscode.window.showInformationMessage(String(diff));
    }
  );

  context.subscriptions.push(disposable);
}

async function getGitDiffAsText() {
  const gitExtension = vscode.extensions.getExtension("vscode.git");
  if (!gitExtension) {
    vscode.window.showErrorMessage("Git extension not found.");
    return;
  }

  const git = gitExtension.exports.getAPI(1);
  console.log("git", Object.keys(git));
  if (git.repositories.length === 0) {
    vscode.window.showInformationMessage(
      "No Git repositories found in the workspace."
    );
    return;
  }

  const repository = git.repositories[0];
  return getDiff(repository.rootUri.path);
}

async function getDiff(path: string): Promise<string> {
  return new Promise((res) => {
    exec(`git -C ${path} diff`, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      res(`Git Diff:\n${stdout}`);
    });
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
