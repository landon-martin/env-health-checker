const getSha = require('./getSha')

module.exports = async (url, sha, timeout) => {
  let ready = false
  const startTime = Date.now()

  if (!sha) {
    throw Error('Sha is not defined')
  }

  while (Date.now() < startTime + timeout * 60000 && !ready) {
    ready = await getSha(url, sha)
  }
  return ready
}
