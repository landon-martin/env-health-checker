const core = require('@actions/core');

const getHealthUrl = require('./utils/getHealthUrl');
const waitForHealthy = require('./utils/waitForHealthy');

try {
  const url = core.getInput('url') || getHealthUrl();
  const timeout = core.getInput('timeout');
  waitForHealthy(url, timeout);
} catch (error) {
  core.setFailed(error.message);
}
