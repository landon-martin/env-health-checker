# env-health-checker

## DEPRECATED by Bluescape/wait-for-env-action - https://github.com/Bluescape/wait-for-env-action

## Description
This GitHub Action plugin will poll the health endpoint of a Bluescape Environment the environment is ready, or the timeout is hit.

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An example workflow is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
- `environment` (optional): The domain of the environment to wait on. Ex. staging.alpha.bluescape.com
- `timeout` (optional): The amount of time (in minutes) to wait for the environment to be healthy.

## Example Workflow
Before a precommit, run a health check on the environment.
```yaml
name: E2E Precommit Testing

on: [deployment, pull_request]

jobs:
  npm_setup:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 10.X
        uses: actions/setup-node@v1
        with:
          node-version: 10.x
      - name: Wait For Environment to be healthy
        uses: landon-martin/env-health-checker@v1.0.4
        with:
          environment: staging.alpha.bluescape.io
          timeout: 10
```
