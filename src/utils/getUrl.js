const github = require('@actions/github');

module.exports = () => {
  console.log(JSON.stringify(github.context.payload.head.ref));
};
