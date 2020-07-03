const waitForSha = require('./waitForSha')

test('Throw on undefined sha', async () => {
  await expect(async () => await waitForSha('', undefined, 3)).rejects.toThrow()
})
