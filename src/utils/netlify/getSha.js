const request = require('request-promise')

module.exports = async (envUrl, sha) => {
  let res

  console.log(`Checking sha for: ${envUrl}`)

  try {
    res = await request.get(`https://client.${envUrl}/dist/version/version.json`, { json: true, rejectUnauthorized: false })
  } catch (e) {
    console.error('Request failed')
    return false
  }
  console.log(JSON.stringify(res))

  if (res.gitSha !== sha) {
    console.log(`Sha doesn't match: ${res.gitSha} != ${sha}`)
    return false
  }
  return true
}
