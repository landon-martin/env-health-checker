const core = require('@actions/core')
const github = require('@actions/github')
const _ = require('lodash');

const getEnvUrl = require('./utils/getEnvUrl')
const waitForHealthy = require('./utils/waitForHealthy')

let env
let timeout

try {
  const branchName = _.get(github.context, ['payload', 'pull_request', 'head', 'ref']) || _.get(github.context, ['ref'])
  env = core.getInput('environment') || getEnvUrl(branchName)
  timeout = core.getInput('timeout')
} catch (error) {
  core.setFailed(error.message)
}

waitForHealthy(env, timeout).then((ready) => {
  if (!ready) {
    throw Error('Environment was not ready in time')
  }
  console.log('Environment is healthy!')
}).catch((error) => {
  core.setFailed(error.message)
})
