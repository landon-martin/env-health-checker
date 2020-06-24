const core = require('@actions/core');

const getEnvUrl = require('./utils/getEnvUrl');
const waitForHealthy = require('./utils/waitForHealthy');

try {
  const env = core.getInput('environment') || getEnvUrl();
  const timeout = core.getInput('timeout');

  waitForHealthy(env, timeout).then(() => {
    console.log('Environment is healthy!');
  }).catch((e) => {
    throw e;
  });
} catch (error) {
  core.setFailed(error.message);
}
