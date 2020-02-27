const core = require("@actions/core");
const github = require("@actions/github");

function initActionContext() {
  const workspace = core.getInput("workspace");
  console.log(`Analyzing JS Action project @ ${workspace}...`);
  const gitEmail = core.getInput("git-email");
  console.log(`Will use ${gitEmail} for git...`);
  const gitName = core.getInput("git-name");
  console.log(`Will use ${gitName} for git...`);
  const octoToken = core.getInput("token");
  console.log(`GitHub authentication token: ${octoToken}`);
  const octokit = new github.GitHub(octoToken);
  const tempBranch = core.getInput("temp-branch");
  console.log(`Will update packages on ${tempBranch}...`);
  const targetBranch = core.getInput("target-branch");
  console.log(`Will send pull request to ${targetBranch}...`);
  const repo = process.env.GITHUB_REPOSITORY;
  console.log(`Will update ${repo}...`);
  const username = repo.split("/")[0];
  console.log(`Will use username ${username}...`);
  const project = repo.split("/")[1];
  console.log(`Will use project name ${project}...`);
  return {
    gitEmail,
    gitName,
    octokit,
    octoToken,
    project,
    repo,
    targetBranch,
    tempBranch,
    username,
    workspace
  };
}

module.exports = initActionContext;
