Continuous Integration and Deployment
Overview

This project uses GitHub Actions to automate testing and deployment. The CI/CD pipeline ensures that new code changes do not break existing functionality and that updates are deployed efficiently.

Continuous Integration (CI)

The CI pipeline automatically runs whenever:

A pull request is opened

Code is pushed to the main branch

The workflow performs the following steps:

Checkout Repository
Downloads the latest version of the code.

Setup Node.js Environment
Installs Node.js to run the application.

Install Dependencies
Runs:

npm install

Run Automated Tests

npm test

If any tests fail, the workflow stops and the pull request cannot be merged until the issue is resolved.

Continuous Deployment (CD)

Once code is successfully merged into the main branch, the deployment process can be triggered automatically.

Deployment ensures that:

The latest version of the application is always available.

Manual deployment errors are minimized.

Benefits to Development Workflow

Using CI/CD automation improves development by:

Early Bug Detection

Tests run automatically on every pull request, catching bugs before code is merged.

Improved Code Quality

Developers must ensure their code passes all tests before merging changes.

Faster Development

Automation removes manual steps for testing and deployment.

Reliable Releases

Only code that passes the automated test suite is deployed