const request = require('request-promise');

module.exports = async (envUrl) => {
  console.log(`Checking health for: ${envUrl}`);
  const res = await request.get(`https://health.${envUrl}`, { json: true });

  res.services.forEach(service => {
    if (!service.ok) {
      console.log(`Service was not ready: ${JSON.stringify(service)}`)
      return false
    }
  });
  return true;
};
