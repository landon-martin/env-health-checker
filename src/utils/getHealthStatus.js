const request = require('request-promise');

module.exports = async (envUrl) => {
  console.log(`Checking health for: ${envUrl}`);
  const res = await request.get(`health.${envUrl}`, { json: true });

  res.services.forEach(service => {
    console.log(JSON.stringify(service));
    if (!service.ok) {
      return false
    }
  });
  return true;
};
