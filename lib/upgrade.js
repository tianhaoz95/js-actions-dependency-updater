async function upgradeNodeModules(context) {
  let infoOutput = "";
  let errorOuput = "";
  await exec.exec(`git checkout -b ${context.tempBranch}`);
  await exec.exec("npm", ["install"], {
    cwd: context.workspace
  });
  await exec.exec("git", ["config", "--global", "user.name", context.gitUser]);
  await exec.exec("git add -A");
  await exec.exec('git commit -m "chore(js-action-bot): update node modules"');
  await exec.exec(
    "git",
    [
      "push",
      "-f",
      `https://github.com/${context.repo}.git`,
      context.tempBranch
    ],
    {
      stdout: data => {
        infoOutput += data.toString();
      },
      stderr: data => {
        errorOuput += data.toString();
      }
    }
  );
  console.log(infoOutput);
  console.log(errorOuput);
}

module.exports = upgradeNodeModules;
