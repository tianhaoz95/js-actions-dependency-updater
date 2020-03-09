const exec = require("@actions/exec");

async function upgradeNodeModules(context) {
  let infoOutput = "";
  let errorOuput = "";
  await exec.exec(`git checkout -b ${context.tempBranch}`);
  await exec.exec("npm", ["install"], {
    cwd: context.workspace
  });
  await exec.exec("git", [
    "config",
    "--global",
    "user.email",
    context.gitEmail
  ]);
  await exec.exec("git", ["config", "--global", "user.name", context.gitUser]);
  await exec.exec("git add -A");
  let dateObj = new Date();
  let date = ("0" + dateObj.getDate()).slice(-2);
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  let displayTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  await exec.exec(`git commit -m "chore(js-action-bot): update node modules" -m "Last update @ ${displayTime}"`);
  await exec.exec(
    "git",
    [
      "push",
      "-f",
      `https://${context.username}:${context.octoToken}@github.com/${context.repo}.git`,
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
