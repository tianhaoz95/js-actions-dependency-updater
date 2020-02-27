async function shouldOpenPullRequest(context) {
  const pullRequestList = await context.octokit.pulls.list({
    owner: context.username,
    repo: context.project
  });
  for (const pullRequest of pullRequestList.data) {
    if (
      pullRequest.title === context.pullRequestTitle &&
      pullRequest.state === "open"
    ) {
      return false;
    }
  }
  return true;
}

async function maybeOpenPullRequest(context) {
  const openPullRequest = await shouldOpenPullRequest(context);
  if (openPullRequest) {
    await context.octokit.pulls.create({
      owner: context.username,
      repo: context.project,
      title: context.pullRequestTitle,
      head: context.tempBranch,
      base: context.targetBranch
    });
  }
}

module.exports = maybeOpenPullRequest;
