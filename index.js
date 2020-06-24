const core = require('@actions/core');
const github = require('@actions/github');

try {
  const env = core.getInput('environment');
  const timeout = core.getInput('timeout');
  console.log(env);
  console.log(timeout);
} catch (error) {
  core.setFailed(error.message);
}
