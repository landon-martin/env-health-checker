const request = require('request-promise');

module.exports = async (envUrl) => {
  let ready = true;

  console.log(`Checking health for: ${envUrl}`);
  const res = await request.get(`https://health.${envUrl}`, { json: true });
  console.log(JSON.stringify(res));

  for (const service in res.services) {
    if (!res.services[service].ok) {
      console.log(`Service was not ready: ${JSON.stringify(service)}`);
      ready = false;
      break;
    }
  }
  if (!res.ok) {
    ready = false;
  }
  return ready;
};
