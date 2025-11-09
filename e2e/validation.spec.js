const { test, expect } = require('@playwright/test');

test.describe('Validation and Error Handling E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Should show error when calculating with empty inputs', async ({ page }) => {
    // Try to calculate without filling inputs
    await page.click('#calc1');

    // Wait for error message
    await page.waitForTimeout(100);

    // Check if error message is displayed
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('valid number');
  });

  test('Should show error when percentage exceeds 100%', async ({ page }) => {
    // Fill with >100% value
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '150');

    await page.click('#calc1');
    await page.waitForTimeout(100);

    // Check error message
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('cannot exceed 100%');
  });

  test('Should show error for division by zero (Equation 3)', async ({ page }) => {
    // Set transaction goal to 0
    await page.fill('#Plan', '75000');
    await page.fill('#EstTransGoal2', '0');

    await page.click('#calc3');
    await page.waitForTimeout(100);

    // Check error message
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('division by zero');
  });

  test('Should show error for division by zero (Equation 5)', async ({ page }) => {
    // Set transaction goal to 0
    await page.fill('#Plan2', '100000');
    await page.fill('#TransGoal2', '0');

    await page.click('#calc5');
    await page.waitForTimeout(100);

    // Check error message
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('division by zero');
  });

  test('Should show error for division by zero (Equation 7)', async ({ page }) => {
    // Set transaction goal to 0
    await page.fill('#Plan3', '100000');
    await page.fill('#TransGoalFlat2', '0');

    await page.click('#calc7');
    await page.waitForTimeout(100);

    // Check error message
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('division by zero');
  });

  test('Error message should auto-dismiss after 5 seconds', async ({ page }) => {
    // Trigger an error
    await page.click('#calc1');

    // Error should be visible
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();

    // Wait 5.5 seconds
    await page.waitForTimeout(5500);

    // Error should be hidden
    await expect(errorMessage).toBeHidden();
  });

  test('Should clear previous errors when new calculation succeeds', async ({ page }) => {
    // First, trigger an error
    await page.click('#calc1');
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();

    // Now do a successful calculation
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    // Error should be cleared
    await expect(errorMessage).toBeHidden();
  });

  test('HTML5 validation: min attribute should prevent negative numbers', async ({ page }) => {
    // Try to input negative number
    const lyTrafficInput = page.locator('#LyTraffic');
    await lyTrafficInput.fill('-100');

    // Check if HTML5 validation prevents it
    const validationMessage = await lyTrafficInput.evaluate(el => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('HTML5 validation: required fields should be marked', async ({ page }) => {
    // Check that required fields have the attribute
    const lyTrafficInput = page.locator('#LyTraffic');
    const isRequired = await lyTrafficInput.getAttribute('required');
    expect(isRequired).not.toBeNull();

    const mtdTrafficInput = page.locator('#MtdTraffic');
    const isMtdRequired = await mtdTrafficInput.getAttribute('required');
    expect(isMtdRequired).not.toBeNull();
  });

  test('HTML5 validation: max attribute on percentage fields', async ({ page }) => {
    // Check percentage fields have max="100"
    const mtdTrafficInput = page.locator('#MtdTraffic');
    const maxValue = await mtdTrafficInput.getAttribute('max');
    expect(maxValue).toBe('100');

    const mtdConvInput = page.locator('#MtdConv');
    const mtdConvMax = await mtdConvInput.getAttribute('max');
    expect(mtdConvMax).toBe('100');
  });

  test('Readonly fields should not be editable', async ({ page }) => {
    // Check that result fields are readonly
    const estTraffInput = page.locator('#EstTraff');
    const isReadonly = await estTraffInput.getAttribute('readonly');
    expect(isReadonly).not.toBeNull();

    // Try to type in readonly field (should not change)
    await estTraffInput.click();
    await page.keyboard.type('12345');
    await expect(estTraffInput).toHaveValue('');
  });

  test('Should handle multiple validation errors gracefully', async ({ page }) => {
    // Test 1: Empty input error
    await page.click('#calc2');
    await page.waitForTimeout(100);
    let errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();

    // Test 2: Different error - percentage over 100
    await page.fill('#EstTraff2', '10000');
    await page.fill('#MtdConv', '150');
    await page.click('#calc2');
    await page.waitForTimeout(100);
    await expect(errorMessage).toContainText('exceed 100%');

    // Test 3: Successful calculation clears errors
    await page.fill('#MtdConv', '5');
    await page.click('#calc2');
    await page.waitForTimeout(100);
    await expect(errorMessage).toBeHidden();
  });

  test('Should validate percentage in conversion lift fields', async ({ page }) => {
    // Test percentage over 100 in LyConvUp
    await page.fill('#LyConvUp', '150');
    await page.fill('#EstTraff4', '10000');
    await page.click('#calc4');
    await page.waitForTimeout(100);

    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('exceed 100%');
  });

  test('Should accept 0 as a valid input', async ({ page }) => {
    // 0% should be valid
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '0');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    // Should calculate to 0 without error
    await expect(page.locator('#EstTraff')).toHaveValue('0');
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeHidden();
  });

  test('Should accept 100 as a valid percentage', async ({ page }) => {
    // 100% should be valid
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '100');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    // Should calculate to full amount without error
    await expect(page.locator('#EstTraff')).toHaveValue('50000');
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeHidden();
  });
});
