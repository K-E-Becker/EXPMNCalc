# GitHub Actions Workflows

## test.yml - Automated Testing

This workflow automatically runs the test suite whenever code is pushed to the repository.

### Triggers
- **Push to main branch**: Runs tests on every push to main
- **Pull requests to main**: Runs tests on all PRs targeting main

### What it does
1. ✅ Checks out the code
2. ✅ Sets up Node.js (tests on versions 18.x and 20.x)
3. ✅ Installs dependencies with `npm ci`
4. ✅ Runs test suite with `npm test`
5. ✅ Generates coverage report with `npm run test:coverage`
6. ✅ Uploads coverage to Codecov (optional)

### Test Matrix
The workflow tests on multiple Node.js versions to ensure compatibility:
- Node.js 18.x
- Node.js 20.x

### Coverage Reporting
Coverage reports are generated for each run. Optionally, you can:
1. Enable Codecov integration for coverage badges
2. View coverage in the Actions logs
3. Download coverage artifacts

### Viewing Results
1. Go to the **Actions** tab in your GitHub repository
2. Click on a workflow run to see detailed results
3. Check the test output and coverage reports

### Badge for README
If you create a README.md, add this badge to show test status:

```markdown
![Tests](https://github.com/K-E-Becker/EXPMNCalc/actions/workflows/test.yml/badge.svg)
```

### Troubleshooting
If tests fail in CI but pass locally:
- Check Node.js version compatibility
- Ensure package-lock.json is committed
- Verify all dependencies are listed in package.json
- Check for environment-specific issues

### Customization
To modify the workflow:
- Edit `.github/workflows/test.yml`
- Add more Node.js versions to the matrix
- Add deployment steps after tests pass
- Configure notifications for failures
