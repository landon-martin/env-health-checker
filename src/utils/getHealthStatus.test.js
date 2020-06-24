const getHealthStatus = require('./getHealthStatus')
jest.mock('request-promise')
const rp = require('request-promise')

test('All services ok, makes health true', async () => {
  const url = 'staging.alpha.bluescape.io'
  const response = { services: { collaboration: { statusCode: 200, ok: true, time: '15ms' }, portal: { statusCode: 200, ok: true, time: '20ms' }, browser_client: { statusCode: 200, ok: true, time: '21ms' }, configuration: { statusCode: 200, ok: true, time: '28ms' }, socket_bridge: { statusCode: 200, ok: true, time: '33ms' } }, ok: true }
  jest.spyOn(rp, 'get').mockReturnValue(response)
  const health = await getHealthStatus(url)
  expect(health).toEqual(true)
})

test('One service not ok, makes health false', async () => {
  const url = 'staging.alpha.bluescape.io'
  const response = { services: { collaboration: { statusCode: 503, ok: false, time: '15ms' }, portal: { statusCode: 200, ok: true, time: '20ms' }, browser_client: { statusCode: 200, ok: true, time: '21ms' }, configuration: { statusCode: 200, ok: true, time: '28ms' }, socket_bridge: { statusCode: 200, ok: true, time: '33ms' } }, ok: true }
  jest.spyOn(rp, 'get').mockReturnValue(response)
  const health = await getHealthStatus(url)
  expect(health).toEqual(false)
})

test('Overall ok being false, makes health false', async () => {
  const url = 'staging.alpha.bluescape.io'
  const response = { services: { collaboration: { statusCode: 503, ok: false, time: '15ms' }, portal: { statusCode: 200, ok: true, time: '20ms' }, browser_client: { statusCode: 200, ok: true, time: '21ms' }, configuration: { statusCode: 200, ok: true, time: '28ms' }, socket_bridge: { statusCode: 200, ok: true, time: '33ms' } }, ok: false }
  jest.spyOn(rp, 'get').mockReturnValue(response)
  const health = await getHealthStatus(url)
  expect(health).toEqual(false)
})
