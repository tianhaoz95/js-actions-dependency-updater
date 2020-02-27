const core = require('@actions/core');
const github = require("@actions/github");

function initActionContext() {
  const workspace = core.getInput('workspace');
  console.log(`Analyzing JS Action project @ ${workspace}...`);
  const gitEmail = core.getInput('git-email');
  console.log(`Will use ${gitEmail} for git...`);
  const gitName = core.getInput('git-name');
  console.log(`Will use ${gitName} for git...`);
  const octoToken = core.getInput('token');
  console.log(`GitHub authentication token: ${octoToken}`);
  const octokit = new github.GitHub(octoToken);
  return {
    gitEmail,
    gitName,
    octokit,
    octoToken,
    workspace,
  };
}