const getSha = require('./getSha')

module.exports = async (url, sha, service, timeout) => {
  let ready = false
  const startTime = Date.now()

  console.debug(`Waiting for sha of ${sha} with timeout of ${timeout} minutes...`)

  if (!sha) {
    throw Error('Sha is not defined from github context')
  }

  while (Date.now() < startTime + timeout * 60000 && !ready) {
    ready = await getSha(url, sha, service)
    await new Promise(resolve => setTimeout(resolve, 15000))
  }
  return ready
}
