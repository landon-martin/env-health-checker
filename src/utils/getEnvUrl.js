module.exports = (branchName) => {
  if (!branchName || typeof branchName !== 'string') {
    throw Error('Branch name is not defined, cant find environment url')
  }
  const jiraRegex = '[a-zA-Z]+-[0-9]{1,5}'
  const branchParts = branchName.split('/')
  const jira = branchParts.filter((part) => part.match(jiraRegex))
  if (jira.length === 0) {
    throw Error('No matches were found to convert branch name to environment name.')
  }
  return `${jira}.alpha.bluescape.io`
}
