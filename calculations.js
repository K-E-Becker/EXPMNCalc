/**
 * Pure calculation functions for EXP Magic Number Calculator
 * These functions contain the business logic without DOM dependencies
 */

/**
 * Calculate estimated traffic based on last year's traffic and MTD percentage
 * @param {number} lyTraffic - Last year's traffic
 * @param {number} mtdTrafficPercent - Month-to-date traffic percentage (0-100)
 * @returns {number} Estimated traffic (rounded up)
 */
function calculateEstimatedTraffic(lyTraffic, mtdTrafficPercent) {
    const percent = mtdTrafficPercent / 100;
    return Math.ceil(lyTraffic * percent);
}

/**
 * Calculate estimated transaction goal based on traffic and conversion rate
 * @param {number} estTraffic - Estimated traffic
 * @param {number} mtdConversionPercent - MTD conversion percentage (0-100)
 * @returns {number} Estimated transaction goal (rounded up)
 */
function calculateTransactionGoal(estTraffic, mtdConversionPercent) {
    const conversion = mtdConversionPercent / 100;
    return Math.ceil(estTraffic * conversion);
}

/**
 * Calculate ADS (Average Dollar Sale) goal
 * @param {number} plan - Financial plan/goal amount
 * @param {number} estTransactions - Estimated number of transactions
 * @returns {number} ADS goal (rounded to 2 decimal places)
 * @throws {Error} If estTransactions is 0 (division by zero)
 */
function calculateADSGoal(plan, estTransactions) {
    if (estTransactions === 0) {
        throw new Error("Transaction count cannot be zero");
    }
    return parseFloat((plan / estTransactions).toFixed(2));
}

/**
 * Calculate transaction goal with conversion lift
 * @param {number} conversionPercent - LY conversion + lift percentage (0-100)
 * @param {number} traffic - Estimated traffic
 * @returns {number} Transaction goal (rounded up)
 */
function calculateTransactionGoalWithLift(conversionPercent, traffic) {
    const conversion = conversionPercent / 100;
    return Math.ceil(conversion * traffic);
}

/**
 * Validation functions
 */

/**
 * Check if a value is a valid positive number
 * @param {any} value - Value to check
 * @returns {boolean} True if valid number >= 0
 */
function isValidPositiveNumber(value) {
    return typeof value === 'number' && !isNaN(value) && value >= 0;
}

/**
 * Check if a percentage is within valid range
 * @param {number} percent - Percentage to check
 * @returns {boolean} True if between 0 and 100
 */
function isValidPercentage(percent) {
    return isValidPositiveNumber(percent) && percent <= 100;
}

/**
 * Validate inputs for a calculation
 * @param {Array<{value: number, label: string}>} inputs - Array of input objects
 * @returns {{valid: boolean, message?: string}} Validation result
 */
function validateInputs(inputs) {
    for (const input of inputs) {
        if (input.value === null || input.value === undefined) {
            return { valid: false, message: `Please enter a valid number for ${input.label}` };
        }
        if (!isValidPositiveNumber(input.value)) {
            return { valid: false, message: `${input.label} must be a positive number` };
        }
    }
    return { valid: true };
}

/**
 * Validate percentage input
 * @param {number} value - Percentage value
 * @param {string} label - Label for error message
 * @returns {{valid: boolean, message?: string}} Validation result
 */
function validatePercentage(value, label) {
    if (!isValidPercentage(value)) {
        if (value > 100) {
            return { valid: false, message: `${label} cannot exceed 100%` };
        }
        return { valid: false, message: `${label} must be between 0 and 100` };
    }
    return { valid: true };
}

// Export for Node.js (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateEstimatedTraffic,
        calculateTransactionGoal,
        calculateADSGoal,
        calculateTransactionGoalWithLift,
        isValidPositiveNumber,
        isValidPercentage,
        validateInputs,
        validatePercentage
    };
}
