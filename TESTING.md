# Testing Guide

This document explains the testing setup for the EXP Magic Number Calculator.

## Test Framework

The project uses two complementary testing frameworks:
- **Jest**: Unit and integration testing for business logic
- **Playwright**: End-to-end (E2E) testing for full browser workflows

### Jest (Unit/Integration Tests)
- Unit testing for all calculation functions
- Integration testing for real-world scenarios
- Code coverage reporting
- 100% coverage of business logic

### Playwright (E2E Tests)
- Full browser automation testing
- Tests actual user interactions
- Validates DOM manipulation and UI behavior
- Tests all 7 calculation workflows
- Validates error handling in the browser
- Tests auto-fill and reset functionality

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run Unit Tests Only
```bash
npm test
```

### Run E2E Tests Only
```bash
npm run test:e2e
```

### Run All Tests (Unit + E2E)
```bash
npm run test:all
```

### Run Tests in Watch Mode
```bash
npm run test:watch              # Unit tests
npm run test:e2e:headed         # E2E tests with visible browser
npm run test:e2e:ui             # E2E tests with Playwright UI
```

### Run Tests with Coverage Report
```bash
npm run test:coverage           # Unit test coverage
```

### View E2E Test Report
```bash
npm run test:e2e:report         # Opens HTML report in browser
```

## Test Coverage

### Unit/Integration Tests (Jest)
- **61 test cases** covering:
  - All 4 calculation functions
  - All 4 validation functions
  - Edge cases and boundary conditions
  - Real-world retail forecasting scenarios
  - Error handling

- **100% coverage** of `calculations.js`:
  - 100% of statements
  - 95%+ of branches
  - 100% of functions
  - 100% of lines

### E2E Tests (Playwright)
- **43 test cases** covering:
  - All 7 calculation workflows through the UI
  - Full MTD workflow (equations 1 → 2 → 3)
  - Edge cases (decimals, small %, large numbers)
  - Error message display and validation
  - Division by zero error handling
  - HTML5 validation attributes
  - Auto-fill synchronization across forms
  - All 7 individual reset buttons
  - "Reset All" functionality
  - Visual feedback (success borders)
  - Readonly field protection

### Total Test Coverage
- **104 total tests** (61 unit + 43 E2E)
- **All critical user flows tested end-to-end**
- **Both business logic AND UI interactions validated**

## Test Structure

### Unit Tests

Tests are organized by function in `calculations.test.js`:

1. **calculateEstimatedTraffic** - 8 tests
   - Validates traffic estimation based on LY data and MTD percentage
   - Tests whole numbers, decimals, edge cases (0%, 100%, large numbers)

2. **calculateTransactionGoal** - 6 tests
   - Validates transaction goal calculation from traffic and conversion
   - Tests rounding behavior, zero values, decimal rates

3. **calculateADSGoal** - 7 tests
   - Validates Average Dollar Sale calculation
   - Tests decimal precision, division by zero error, edge cases

4. **calculateTransactionGoalWithLift** - 7 tests
   - Validates transaction goals with conversion lift
   - Tests various percentage ranges and traffic values

5. **Validation Functions** - 23 tests
   - Tests input validation logic
   - Tests percentage validation
   - Tests positive number validation

### Integration Tests

Real-world scenarios that test multiple calculations together:

1. **MTD Numbers Scenario**
   - Tests the complete workflow: Traffic → Transaction Goal → ADS
   - Uses realistic retail management data

2. **Conversion Goal Scenario**
   - Tests conversion with lift projections
   - Validates end-to-end ADS calculation

3. **Edge Cases**
   - Very small conversion rates (0.01%)
   - Very large traffic numbers (millions)
   - Minimum viable inputs (all 1s)

4. **Error Conditions**
   - Division by zero protection
   - Invalid percentage handling
   - Negative number rejection

## Test Examples

### Basic Calculation Test
```javascript
test('should calculate estimated traffic correctly', () => {
    expect(calculateEstimatedTraffic(1000, 50)).toBe(500);
});
```

### Error Handling Test
```javascript
test('should throw error for zero transactions', () => {
    expect(() => calculateADSGoal(10000, 0))
        .toThrow("Transaction count cannot be zero");
});
```

### Integration Test (Jest)
```javascript
test('should calculate full MTD workflow', () => {
    const estTraffic = calculateEstimatedTraffic(50000, 45);
    expect(estTraffic).toBe(22500);

    const transGoal = calculateTransactionGoal(estTraffic, 3.5);
    expect(transGoal).toBe(788);

    const adsGoal = calculateADSGoal(75000, transGoal);
    expect(adsGoal).toBe(95.18);
});
```

### E2E Test (Playwright)
```javascript
test('Full MTD workflow: Equation 1 → 2 → 3', async ({ page }) => {
    await page.goto('/');

    // Step 1: Calculate Estimated Traffic
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await expect(page.locator('#EstTraff')).toHaveValue('22500');

    // Step 2: Calculate Transaction Goal
    await page.fill('#MtdConv', '3.5');
    await page.click('#calc2');
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('788');

    // Step 3: Calculate ADS Goal
    await page.fill('#Plan', '75000');
    await page.click('#calc3');
    await expect(page.locator('#AdsGoalMtd')).toHaveValue('95.18');
});
```

## Why These Tests Matter for Retail Management

The test suite ensures that:

1. **Forecasts are Accurate**: Math errors in projections can lead to missed targets or overstaffing
2. **Edge Cases are Handled**: Unusual scenarios (0% conversion, extremely high traffic) don't break calculations
3. **Data Validation Works**: Invalid inputs are caught before bad data enters reports
4. **Division by Zero is Prevented**: Prevents "Infinity" or "NaN" from appearing in manager reports
5. **Rounding is Consistent**: Math.ceil ensures consistent rounding for headcount/transaction planning

## Adding New Tests

When adding new calculations:

1. Add the calculation function to `calculations.js`
2. Export it in the module.exports block
3. Create a new `describe` block in `calculations.test.js`
4. Test normal cases, edge cases, and error conditions
5. Run `npm run test:coverage` to ensure 100% coverage is maintained

## CI/CD Integration

### GitHub Actions

This project includes automated testing via GitHub Actions. Every push to `main` and every pull request automatically runs:

1. ✅ Unit tests (Jest) on Node.js 18.x and 20.x
2. ✅ Coverage report generation
3. ✅ E2E tests (Playwright) in headless Chromium
4. ✅ Playwright test report uploads
5. ✅ Optional Codecov integration

**Workflow File:** `.github/workflows/test.yml`

**View Results:**
- Go to the **Actions** tab in your GitHub repository
- Each push/PR will show test results
- Failed tests will block PR merges (if branch protection is enabled)

**Status Badge:**
Add this to a README.md to show test status:
```markdown
![Tests](https://github.com/K-E-Becker/EXPMNCalc/actions/workflows/test.yml/badge.svg)
```

### Local CI Testing

You can simulate CI locally using:
```bash
npm ci              # Clean install (like CI does)
npm test            # Run tests
npm run test:coverage  # Generate coverage
```

## Notes

- The `index.js` DOM manipulation code is not covered by these tests
- To test DOM interactions, consider adding Cypress or Playwright tests
- Tests run in Node.js environment using Jest's jsdom for browser API compatibility
