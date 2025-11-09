# Testing Guide

This document explains the testing setup for the EXP Magic Number Calculator.

## Test Framework

The project uses **Jest** as the testing framework with the following features:
- Unit testing for all calculation functions
- Integration testing for real-world scenarios
- Code coverage reporting
- 100% coverage of business logic

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage Report
```bash
npm run test:coverage
```

## Test Coverage

The test suite currently includes:

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

### Integration Test
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

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: npm test

- name: Check Coverage
  run: npm run test:coverage
```

## Notes

- The `index.js` DOM manipulation code is not covered by these tests
- To test DOM interactions, consider adding Cypress or Playwright tests
- Tests run in Node.js environment using Jest's jsdom for browser API compatibility
