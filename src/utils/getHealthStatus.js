const request = require('request-promise')

module.exports = async (envUrl) => {
  let res

  console.log(`Checking health for: ${envUrl}`)

  try {
    res = await request.get(`https://health.${envUrl}`, { json: true, rejectUnauthorized: false })
  } catch (e) {
    console.error('Reqest failed')
    return false
  }
  console.log(JSON.stringify(res))

  for (const service in res.services) {
    if (!res.services[service].ok) {
      console.warn(`Service was not ok: ${JSON.stringify(service)}`)
      return false
    }
  }
  if (!res.ok) {
    console.warn('Overall status is not ok')
    return false
  }
  return true
}
