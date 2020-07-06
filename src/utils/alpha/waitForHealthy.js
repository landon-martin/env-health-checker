const getHealthStatus = require('./getHealthStatus')

module.exports = async (url, timeout) => {
  let ready = false
  const startTime = Date.now()

  while (Date.now() < startTime + timeout * 60000 && !ready) {
    ready = await getHealthStatus(url)
    await new Promise(resolve => setTimeout(resolve, 15000))
  }
  return ready
}
