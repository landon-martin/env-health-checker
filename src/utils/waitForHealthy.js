const getHealthStatus = require('./getHealthStatus');

module.exports = (url) => {
  return getHealthStatus();
};
