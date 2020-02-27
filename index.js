const initActionContext = require('./lib/init');
const upgradeNodeModules = require('./lib/upgrade');
const maybeOpenPullRequest = require('./lib/pull');

async function main() {
  const actionContext = await initActionContext();
  await upgradeNodeModules(actionContext);
  await maybeOpenPullRequest(actionContext);
}

main();