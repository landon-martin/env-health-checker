const request = require('request-promise')

module.exports = async (envUrl, sha, service) => {
  let res

  console.log(`Checking sha for: ${envUrl}`)

  try {
    res = await request.get(`https://${service}.${envUrl}/dist/version/version.json`, { json: true, rejectUnauthorized: false })
  } catch (e) {
    console.error('Request failed')
    return false
  }
  if (res.gitSha !== sha) {
    console.log(`Sha doesn't match: ${res.gitSha} != ${sha}`)
    return false
  }
  return true
}
