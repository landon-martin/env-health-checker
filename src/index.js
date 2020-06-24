const core = require('@actions/core');

const getEnvUrl = require('./utils/getEnvUrl');
const waitForHealthy = require('./utils/waitForHealthy');

try {
  const env = core.getInput('environment') || getEnvUrl();
  const timeout = core.getInput('timeout');
  waitForHealthy(env, timeout);
} catch (error) {
  core.setFailed(error.message);
}
