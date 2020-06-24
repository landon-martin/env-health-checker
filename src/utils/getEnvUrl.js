module.exports = (branchName) => {
  if (!branchName) {
    throw Error('Branch name is not defined, cant find environment url');
  }
  const jiraRegex = '[a-zA-Z]+-[0-9]{1,5}';
  const branchParts = branchName.split('/');
  const jira = branchParts.filter((part) => part.match(jiraRegex));
  return `${jira}.alpha.bluescape.io`;
};
