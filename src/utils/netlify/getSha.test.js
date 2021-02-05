const getSha = require('./getSha')
jest.mock('request-promise')
const rp = require('request-promise')

test('Git sha matches, returns true', async () => {
  const url = 'staging.alpha.bluescape.io'
  const sha = '213'
  const response = {
    name: 'Bluescape Browser Client',
    buildDate: '1593645683975',
    gitSha: '213'
  }
  jest.spyOn(rp, 'get').mockReturnValue(response)
  const health = await getSha(url, sha, 'netlify')
  expect(health).toEqual(true)
})

test('Git sha doesnt match, returns false', async () => {
  const url = 'staging.alpha.bluescape.io'
  const sha = '321'
  const response = {
    name: 'Bluescape Browser Client',
    buildDate: '1593645683975',
    gitSha: '213'
  }
  jest.spyOn(rp, 'get').mockReturnValue(response)
  const health = await getSha(url, sha, 'netlify')
  expect(health).toEqual(false)
})
