const github = require('@actions/github');

module.exports = () => {
  const branchName = github.context.payload.pull_request.head.ref;
  const jiraRegex = '[a-zA-Z]+-[0-9]{1,5}';
  const branchParts = branchName.split('/');
  const jira = branchParts.filter((part) => part.match(jiraRegex));
  return `health.${jira}.alpha.bluescape.io`;
};
