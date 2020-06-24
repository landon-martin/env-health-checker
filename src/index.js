const core = require('@actions/core');

const getEnvUrl = require('./utils/getEnvUrl');
const waitForHealthy = require('./utils/waitForHealthy');

let env;
let timeout;

try {
  env = core.getInput('environment') || getEnvUrl();
  timeout = core.getInput('timeout');
} catch (error) {
  core.setFailed(error.message);
}

waitForHealthy(env, timeout).then((ready) => {
  if (!ready) {
    throw Error('Environment was not ready in time');
  }
  console.log('Environment is healthy!');
}).catch((error) => {
  core.setFailed(error.message);
});
