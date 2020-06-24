const core = require('@actions/core');

const getUrl = require('./utils/getUrl');

try {
  const env = core.getInput('environment') || getUrl();
  const timeout = core.getInput('timeout');

} catch (error) {
  core.setFailed(error.message);
}
