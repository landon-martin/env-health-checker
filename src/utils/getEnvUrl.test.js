const getEnvUrl = require('./getEnvUrl')

test('Non nested JIRA branch name works', () => {
  const branchName = 'qaa-123'
  const url = getEnvUrl(branchName)
  expect(url).toEqual('qaa-123.alpha.bluescape.io')
})

test('Nested JIRA branch name works', () => {
  const branchName = 'test/qaa-123'
  const url = getEnvUrl(branchName)
  expect(url).toEqual('qaa-123.alpha.bluescape.io')
})

test('Middle nested JIRA branch name works', () => {
  const branchName = 'test/qaa-123/why'
  const url = getEnvUrl(branchName)
  expect(url).toEqual('qaa-123.alpha.bluescape.io')
})

test('No branch name throws error', () => {
  const branchName = ''
  expect(() => getEnvUrl(branchName)).toThrow()
})
