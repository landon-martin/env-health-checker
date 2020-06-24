const getHealthStatus = require('./getHealthStatus');

module.exports = async (url, timeout) => {
  return await getHealthStatus(url);
};
