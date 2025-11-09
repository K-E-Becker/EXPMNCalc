const { test, expect } = require('@playwright/test');

test.describe('Calculator E2E Tests - All 7 Calculations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('EXP Magic Number Calculator');
  });

  test('Equation 1: Calculate Estimated Traffic from LY Traffic and MTD %', async ({ page }) => {
    // Input values
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');

    // Click calculate
    await page.click('#calc1');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result
    await expect(page.locator('#EstTraff')).toHaveValue('22500');

    // Verify auto-fill to other traffic fields
    await expect(page.locator('#EstTraff2')).toHaveValue('22500');
    await expect(page.locator('#EstTraff4')).toHaveValue('22500');
    await expect(page.locator('#EstTraff5')).toHaveValue('22500');
  });

  test('Equation 2: Calculate Transaction Goal from Traffic and MTD Conversion', async ({ page }) => {
    // Input values
    await page.fill('#EstTraff2', '22500');
    await page.fill('#MtdConv', '3.5');

    // Click calculate
    await page.click('#calc2');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result (22500 * 0.035 = 787.5, ceils to 788)
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('788');

    // Verify auto-fill
    await expect(page.locator('#EstTransGoal2')).toHaveValue('788');
  });

  test('Equation 3: Calculate ADS Goal from Plan and Transaction Goal', async ({ page }) => {
    // Input values
    await page.fill('#Plan', '75000');
    await page.fill('#EstTransGoal2', '788');

    // Click calculate
    await page.click('#calc3');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result (75000 / 788 = 95.18)
    await expect(page.locator('#AdsGoalMtd')).toHaveValue('95.18');
  });

  test('Full MTD workflow: Equation 1 → 2 → 3', async ({ page }) => {
    // Step 1: Calculate Estimated Traffic
    await page.fill('#LyTraffic', '50000');
    await page.fill('#MtdTraffic', '45');
    await page.click('#calc1');
    await page.waitForTimeout(100);
    await expect(page.locator('#EstTraff')).toHaveValue('22500');

    // Step 2: Calculate Transaction Goal (uses auto-filled EstTraff2)
    await page.fill('#MtdConv', '3.5');
    await page.click('#calc2');
    await page.waitForTimeout(100);
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('788');

    // Step 3: Calculate ADS Goal
    await page.fill('#Plan', '75000');
    await page.click('#calc3');
    await page.waitForTimeout(100);
    await expect(page.locator('#AdsGoalMtd')).toHaveValue('95.18');
  });

  test('Equation 4: Calculate Transaction Goal with Conversion Lift', async ({ page }) => {
    // Input values
    await page.fill('#LyConvUp', '4.2');
    await page.fill('#EstTraff4', '25000');

    // Click calculate
    await page.click('#calc4');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result (25000 * 0.042 = 1050)
    await expect(page.locator('#TransGoal')).toHaveValue('1050');

    // Verify auto-fill
    await expect(page.locator('#TransGoal2')).toHaveValue('1050');
  });

  test('Equation 5: Calculate ADS from Plan and Transaction Goal (Conversion Up)', async ({ page }) => {
    // Input values
    await page.fill('#Plan2', '100000');
    await page.fill('#TransGoal2', '1050');

    // Click calculate
    await page.click('#calc5');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result (100000 / 1050 = 95.24)
    await expect(page.locator('#AdsUp')).toHaveValue('95.24');
  });

  test('Equation 6: Calculate Transaction Goal Flat Conversion', async ({ page }) => {
    // Input values
    await page.fill('#LyConvFlat', '3.8');
    await page.fill('#EstTraff5', '25000');

    // Click calculate
    await page.click('#calc6');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result (25000 * 0.038 = 950)
    await expect(page.locator('#TransGoalFlat')).toHaveValue('950');

    // Verify auto-fill
    await expect(page.locator('#TransGoalFlat2')).toHaveValue('950');
  });

  test('Equation 7: Calculate ADS from Plan and Transaction Goal (Flat)', async ({ page }) => {
    // Input values
    await page.fill('#Plan3', '100000');
    await page.fill('#TransGoalFlat2', '950');

    // Click calculate
    await page.click('#calc7');

    // Wait for calculation
    await page.waitForTimeout(100);

    // Verify result (100000 / 950 = 105.26)
    await expect(page.locator('#AdsFlat')).toHaveValue('105.26');
  });

  test('Edge case: Calculate with decimal percentages', async ({ page }) => {
    // Test with precise decimal values
    await page.fill('#LyTraffic', '10000');
    await page.fill('#MtdTraffic', '33.33');

    await page.click('#calc1');
    await page.waitForTimeout(100);

    // 10000 * 0.3333 = 3333
    await expect(page.locator('#EstTraff')).toHaveValue('3333');
  });

  test('Edge case: Calculate with very small percentages', async ({ page }) => {
    // Test with small conversion rate
    await page.fill('#EstTraff2', '100000');
    await page.fill('#MtdConv', '0.5');

    await page.click('#calc2');
    await page.waitForTimeout(100);

    // 100000 * 0.005 = 500
    await expect(page.locator('#EstTransGoalMtd')).toHaveValue('500');
  });

  test('Edge case: Calculate with large numbers', async ({ page }) => {
    // Test with large traffic
    await page.fill('#LyTraffic', '1000000');
    await page.fill('#MtdTraffic', '75');

    await page.click('#calc1');
    await page.waitForTimeout(100);

    // 1000000 * 0.75 = 750000
    await expect(page.locator('#EstTraff')).toHaveValue('750000');
  });
});
