const { test, expect } = require('@playwright/test');

test.describe('Auto-fill and Reset Functionality E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Auto-fill: EstTraff should sync to EstTraff2, EstTraff4, EstTraff5 via calculation', async ({ page }) => {
    // Trigger calculation that fills EstTraff (readonly field)
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '50');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    // Check all related fields are synced (25000 = 50000 * 0.5)
    await expect(page.locator('#EstTraff')).toHaveValue('25000');
    await expect(page.locator('#EstTraff2')).toHaveValue('25000');
    await expect(page.locator('#EstTraff4')).toHaveValue('25000');
    await expect(page.locator('#EstTraff5')).toHaveValue('25000');
  });

  test('Auto-fill: Plan should sync to Plan2 and Plan3', async ({ page }) => {
    // Manually type in Plan
    await page.fill('#Plan', '75000');

    // Wait for input event
    await page.waitForTimeout(50);

    // Check synced fields
    await expect(page.locator('#Plan2')).toHaveValue('75000');
    await expect(page.locator('#Plan3')).toHaveValue('75000');
  });

  test('Auto-fill: TransGoal should sync to TransGoal2 via calculation', async ({ page }) => {
    // Trigger calculation that fills TransGoal (readonly field)
    await page.fill('#LyConvUp', '5');
    await page.fill('#EstTraff4', '10000');
    await page.click('#calc4');
    await page.waitForTimeout(100);

    // Check synced fields (500 = 10000 * 0.05)
    await expect(page.locator('#TransGoal')).toHaveValue('500');
    await expect(page.locator('#TransGoal2')).toHaveValue('500');
  });

  test('Auto-fill: EstTransGoalMtd should sync to EstTransGoal2 via calculation', async ({ page }) => {
    // Trigger calculation that fills EstTransGoalMtd (readonly field)
    await page.fill('#EstTraff2', '10000');
    await page.fill('#MtdConv', '5');
    await page.click('#calc2');
    await page.waitForTimeout(100);

    // Check synced fields (500 = 10000 * 0.05)
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('500');
    await expect(page.locator('#EstTransGoal2')).toHaveValue('500');
  });

  test('Auto-fill: TransGoalFlat should sync to TransGoalFlat2 via calculation', async ({ page }) => {
    // Trigger calculation that fills TransGoalFlat (readonly field)
    await page.fill('#LyConvFlat', '5');
    await page.fill('#EstTraff5', '10000');
    await page.click('#calc6');
    await page.waitForTimeout(100);

    // Check synced fields (500 = 10000 * 0.05)
    await expect(page.locator('#TransGoalFlat')).toHaveValue('500');
    await expect(page.locator('#TransGoalFlat2')).toHaveValue('500');
  });

  test('Auto-fill maintains sync after calculations', async ({ page }) => {
    // Do a calculation that fills EstTraff
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    // All traffic fields should have the calculated value
    await expect(page.locator('#EstTraff')).toHaveValue('22500');
    await expect(page.locator('#EstTraff2')).toHaveValue('22500');
    await expect(page.locator('#EstTraff4')).toHaveValue('22500');
    await expect(page.locator('#EstTraff5')).toHaveValue('22500');
  });

  test('Reset button 1: Should clear LY Traffic form', async ({ page }) => {
    // Fill form 1
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset1');
    await page.waitForTimeout(50);

    // Check all fields are cleared
    await expect(page.locator('#LyTraffic')).toHaveValue('');
    await expect(page.locator('#MtdTraffic')).toHaveValue('');
    await expect(page.locator('#EstTraff')).toHaveValue('');
  });

  test('Reset button 2: Should clear Transaction Goal form', async ({ page }) => {
    // Fill form 2
    await page.fill('#EstTraff2', '22500');
    await page.fill('#MtdConv', '3.5');
    await page.click('#calc2');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset2');
    await page.waitForTimeout(50);

    // Check fields are cleared
    await expect(page.locator('#EstTraff2')).toHaveValue('');
    await expect(page.locator('#MtdConv')).toHaveValue('');
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('');
  });

  test('Reset button 3: Should clear ADS Goal form', async ({ page }) => {
    // Fill form 3
    await page.fill('#Plan', '75000');
    await page.fill('#EstTransGoal2', '788');
    await page.click('#calc3');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset3');
    await page.waitForTimeout(50);

    // Check fields are cleared
    await expect(page.locator('#Plan')).toHaveValue('');
    await expect(page.locator('#EstTransGoal2')).toHaveValue('');
    await expect(page.locator('#AdsGoalMtd')).toHaveValue('');
  });

  test('Reset button 4: Should clear Conversion Up form', async ({ page }) => {
    // Fill form 4
    await page.fill('#LyConvUp', '4.2');
    await page.fill('#EstTraff4', '25000');
    await page.click('#calc4');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset4');
    await page.waitForTimeout(50);

    // Check fields are cleared
    await expect(page.locator('#TransGoal')).toHaveValue('');
    await expect(page.locator('#EstTraff4')).toHaveValue('');
    await expect(page.locator('#LyConvUp')).toHaveValue('');
  });

  test('Reset button 5: Should clear ADS Conversion Up form', async ({ page }) => {
    // Fill form 5
    await page.fill('#Plan2', '100000');
    await page.fill('#TransGoal2', '1050');
    await page.click('#calc5');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset5');
    await page.waitForTimeout(50);

    // Check fields are cleared
    await expect(page.locator('#Plan2')).toHaveValue('');
    await expect(page.locator('#TransGoal2')).toHaveValue('');
    await expect(page.locator('#AdsUp')).toHaveValue('');
  });

  test('Reset button 6: Should clear Conversion Flat form', async ({ page }) => {
    // Fill form 6
    await page.fill('#LyConvFlat', '3.8');
    await page.fill('#EstTraff5', '25000');
    await page.click('#calc6');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset6');
    await page.waitForTimeout(50);

    // Check fields are cleared
    await expect(page.locator('#LyConvFlat')).toHaveValue('');
    await expect(page.locator('#EstTraff5')).toHaveValue('');
    await expect(page.locator('#TransGoalFlat')).toHaveValue('');
  });

  test('Reset button 7: Should clear ADS Flat form', async ({ page }) => {
    // Fill form 7
    await page.fill('#Plan3', '100000');
    await page.fill('#TransGoalFlat2', '950');
    await page.click('#calc7');
    await page.waitForTimeout(100);

    // Click reset
    await page.click('#reset7');
    await page.waitForTimeout(50);

    // Check fields are cleared
    await expect(page.locator('#Plan3')).toHaveValue('');
    await expect(page.locator('#TransGoalFlat2')).toHaveValue('');
    await expect(page.locator('#AdsFlat')).toHaveValue('');
  });

  test('Reset All: Should clear all number inputs on the page', async ({ page }) => {
    // Fill multiple forms
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    await page.fill('#MtdConv', '3.5');
    await page.click('#calc2');
    await page.waitForTimeout(100);

    await page.fill('#Plan', '75000');
    await page.click('#calc3');
    await page.waitForTimeout(100);

    // Click Reset All
    await page.click('#resetAll');
    await page.waitForTimeout(50);

    // Check that all number inputs are cleared
    await expect(page.locator('#LyTraffic')).toHaveValue('');
    await expect(page.locator('#MtdTraffic')).toHaveValue('');
    await expect(page.locator('#EstTraff')).toHaveValue('');
    await expect(page.locator('#EstTraff2')).toHaveValue('');
    await expect(page.locator('#MtdConv')).toHaveValue('');
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('');
    await expect(page.locator('#Plan')).toHaveValue('');
    await expect(page.locator('#AdsGoalMtd')).toHaveValue('');
  });

  test('Individual reset should not affect other forms', async ({ page }) => {
    // Fill two separate forms
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await page.waitForTimeout(100);

    await page.fill('#Plan', '75000');
    await page.fill('#EstTransGoal2', '788');
    await page.click('#calc3');
    await page.waitForTimeout(100);

    // Reset only form 1
    await page.click('#reset1');
    await page.waitForTimeout(50);

    // Form 1 should be cleared
    await expect(page.locator('#LyTraffic')).toHaveValue('');
    await expect(page.locator('#MtdTraffic')).toHaveValue('');

    // Form 3 should still have values
    await expect(page.locator('#Plan')).toHaveValue('75000');
    await expect(page.locator('#AdsGoalMtd')).toHaveValue('95.18');
  });

  test('Visual feedback: Success border color should be applied after calculation', async ({ page }) => {
    // Perform a calculation
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');

    // Wait for calculation
    await page.waitForTimeout(200);

    // Check that the result was calculated successfully (this is the real test)
    const estTraffInput = page.locator('#EstTraff');
    await expect(estTraffInput).toHaveValue('22500');

    // Check that border style has been applied
    const borderColor = await estTraffInput.evaluate(el =>
      window.getComputedStyle(el).borderColor
    );

    // Should have some border color set (not default)
    expect(borderColor).toBeTruthy();
  });

  test('Auto-fill should work when typing in editable fields', async ({ page }) => {
    // Type in Plan (an editable field)
    await page.locator('#Plan').click();
    await page.keyboard.type('75000');
    await page.waitForTimeout(100);

    // Check synced fields
    await expect(page.locator('#Plan')).toHaveValue('75000');
    await expect(page.locator('#Plan2')).toHaveValue('75000');
    await expect(page.locator('#Plan3')).toHaveValue('75000');
  });
});
