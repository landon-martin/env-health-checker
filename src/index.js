const core = require('@actions/core')
const github = require('@actions/github')
const _ = require('lodash')

const getAlphaEnvUrl = require('./utils/alpha/getEnvUrl')
const waitForHealthy = require('./utils/alpha/waitForHealthy')

const getNetlifyEnvUrl = require('./utils/netlify/getEnvUrl')
const waitForSha = require('./utils/netlify/waitForSha')

let env
const outputVar = core.getInput('output-variable')
const timeout = core.getInput('timeout')
const isNetlify = core.getInput('is-netlify')

if (false) {
  const prNum = github.context.payload.number
  try {
    const baseEnv = core.getInput('environment')
    if (!baseEnv) {
      throw Error('environment is required if is-netlify is true')
    }
    const env = getNetlifyEnvUrl(prNum, baseEnv)
    // Set the environment variable to be exported
    if (outputVar) {
      core.exportVariable(outputVar, env)
    }
  } catch (error) {
    core.setFailed(error.message)
  }

  waitForSha(env, github.context.sha, timeout).then((ready) => {
    if (!ready) {
      throw Error('Environment was not ready in time')
    }
    console.log('Environment is healthy!')
  }).catch((error) => {
    core.setFailed(error.message)
  })
} else {
  const branchName = _.get(github.context, ['payload', 'pull_request', 'head', 'ref']) || _.get(github.context, ['ref'])

  try {
    const env = core.getInput('environment') || getAlphaEnvUrl(branchName)
    // Set the environment variable to be exported
    if (outputVar) {
      core.exportVariable(outputVar, env)
    }
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
}
