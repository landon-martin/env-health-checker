const request = require('request-promise');

module.exports = async (healthUrl) => {
  console.log(`Checking health for: ${healthUrl}`);
  const res = await request.get(healthUrl, { json: true });

  res.services.forEach(service => {
    console.log(JSON.stringify(service));
    if (!service.ok) {
      return false
    }
  });
  return true;
};
