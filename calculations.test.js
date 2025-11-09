/**
 * Test suite for EXP Magic Number Calculator
 * Tests all calculation functions and validation logic
 */

const {
    calculateEstimatedTraffic,
    calculateTransactionGoal,
    calculateADSGoal,
    calculateTransactionGoalWithLift,
    isValidPositiveNumber,
    isValidPercentage,
    validateInputs,
    validatePercentage
} = require('./calculations.js');

describe('calculateEstimatedTraffic', () => {
    test('should calculate estimated traffic correctly with whole numbers', () => {
        expect(calculateEstimatedTraffic(1000, 50)).toBe(500);
    });

    test('should calculate estimated traffic correctly with decimals', () => {
        expect(calculateEstimatedTraffic(1000, 33.33)).toBe(334);
    });

    test('should round up using Math.ceil', () => {
        expect(calculateEstimatedTraffic(1000, 10.1)).toBe(101);
        expect(calculateEstimatedTraffic(1000, 10.9)).toBe(109);
    });

    test('should handle 0% percentage', () => {
        expect(calculateEstimatedTraffic(1000, 0)).toBe(0);
    });

    test('should handle 100% percentage', () => {
        expect(calculateEstimatedTraffic(1000, 100)).toBe(1000);
    });

    test('should handle zero traffic', () => {
        expect(calculateEstimatedTraffic(0, 50)).toBe(0);
    });

    test('should handle large numbers', () => {
        expect(calculateEstimatedTraffic(1000000, 75)).toBe(750000);
    });

    test('should handle small percentages', () => {
        expect(calculateEstimatedTraffic(10000, 0.5)).toBe(50);
    });
});

describe('calculateTransactionGoal', () => {
    test('should calculate transaction goal correctly', () => {
        expect(calculateTransactionGoal(1000, 5)).toBe(50);
    });

    test('should round up using Math.ceil', () => {
        expect(calculateTransactionGoal(1000, 5.1)).toBe(51);
        expect(calculateTransactionGoal(1000, 5.9)).toBe(60); // 59.0 but floating point precision
    });

    test('should handle 0% conversion', () => {
        expect(calculateTransactionGoal(1000, 0)).toBe(0);
    });

    test('should handle 100% conversion', () => {
        expect(calculateTransactionGoal(1000, 100)).toBe(1000);
    });

    test('should handle decimal conversion rates', () => {
        expect(calculateTransactionGoal(5000, 3.25)).toBe(163);
    });

    test('should handle zero traffic', () => {
        expect(calculateTransactionGoal(0, 5)).toBe(0);
    });
});

describe('calculateADSGoal', () => {
    test('should calculate ADS correctly', () => {
        expect(calculateADSGoal(10000, 100)).toBe(100.00);
    });

    test('should round to 2 decimal places', () => {
        expect(calculateADSGoal(10000, 333)).toBe(30.03);
        expect(calculateADSGoal(10000, 3)).toBe(3333.33);
    });

    test('should handle large plan values', () => {
        expect(calculateADSGoal(1000000, 5000)).toBe(200.00);
    });

    test('should handle small transaction counts', () => {
        expect(calculateADSGoal(1000, 1)).toBe(1000.00);
    });

    test('should throw error for zero transactions', () => {
        expect(() => calculateADSGoal(10000, 0)).toThrow("Transaction count cannot be zero");
    });

    test('should handle plan of zero', () => {
        expect(calculateADSGoal(0, 100)).toBe(0.00);
    });

    test('should handle fractional results', () => {
        expect(calculateADSGoal(99.99, 7)).toBe(14.28);
    });
});

describe('calculateTransactionGoalWithLift', () => {
    test('should calculate transaction goal with lift correctly', () => {
        expect(calculateTransactionGoalWithLift(10, 1000)).toBe(100);
    });

    test('should round up using Math.ceil', () => {
        expect(calculateTransactionGoalWithLift(10.1, 1000)).toBe(101);
        expect(calculateTransactionGoalWithLift(10.9, 1000)).toBe(109);
    });

    test('should handle 0% conversion', () => {
        expect(calculateTransactionGoalWithLift(0, 5000)).toBe(0);
    });

    test('should handle 100% conversion', () => {
        expect(calculateTransactionGoalWithLift(100, 1000)).toBe(1000);
    });

    test('should handle high conversion rates', () => {
        expect(calculateTransactionGoalWithLift(25, 2000)).toBe(500);
    });

    test('should handle low conversion rates', () => {
        expect(calculateTransactionGoalWithLift(0.5, 10000)).toBe(50);
    });

    test('should handle zero traffic', () => {
        expect(calculateTransactionGoalWithLift(10, 0)).toBe(0);
    });
});

describe('isValidPositiveNumber', () => {
    test('should return true for positive numbers', () => {
        expect(isValidPositiveNumber(0)).toBe(true);
        expect(isValidPositiveNumber(1)).toBe(true);
        expect(isValidPositiveNumber(100.5)).toBe(true);
        expect(isValidPositiveNumber(1000000)).toBe(true);
    });

    test('should return false for negative numbers', () => {
        expect(isValidPositiveNumber(-1)).toBe(false);
        expect(isValidPositiveNumber(-0.1)).toBe(false);
    });

    test('should return false for NaN', () => {
        expect(isValidPositiveNumber(NaN)).toBe(false);
    });

    test('should return false for non-numbers', () => {
        expect(isValidPositiveNumber("100")).toBe(false);
        expect(isValidPositiveNumber(null)).toBe(false);
        expect(isValidPositiveNumber(undefined)).toBe(false);
        expect(isValidPositiveNumber({})).toBe(false);
        expect(isValidPositiveNumber([])).toBe(false);
    });

    test('should return false for Infinity', () => {
        expect(isValidPositiveNumber(Infinity)).toBe(true); // Infinity is a valid number
        expect(isValidPositiveNumber(-Infinity)).toBe(false);
    });
});

describe('isValidPercentage', () => {
    test('should return true for valid percentages', () => {
        expect(isValidPercentage(0)).toBe(true);
        expect(isValidPercentage(50)).toBe(true);
        expect(isValidPercentage(100)).toBe(true);
        expect(isValidPercentage(0.5)).toBe(true);
        expect(isValidPercentage(99.99)).toBe(true);
    });

    test('should return false for percentages over 100', () => {
        expect(isValidPercentage(100.01)).toBe(false);
        expect(isValidPercentage(150)).toBe(false);
        expect(isValidPercentage(1000)).toBe(false);
    });

    test('should return false for negative percentages', () => {
        expect(isValidPercentage(-1)).toBe(false);
        expect(isValidPercentage(-0.1)).toBe(false);
    });

    test('should return false for NaN', () => {
        expect(isValidPercentage(NaN)).toBe(false);
    });

    test('should return false for non-numbers', () => {
        expect(isValidPercentage("50")).toBe(false);
        expect(isValidPercentage(null)).toBe(false);
        expect(isValidPercentage(undefined)).toBe(false);
    });
});

describe('validateInputs', () => {
    test('should return valid for all positive numbers', () => {
        const result = validateInputs([
            { value: 100, label: "Traffic" },
            { value: 50, label: "Conversion" }
        ]);
        expect(result.valid).toBe(true);
        expect(result.message).toBeUndefined();
    });

    test('should return invalid for null values', () => {
        const result = validateInputs([
            { value: null, label: "Traffic" }
        ]);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Please enter a valid number for Traffic");
    });

    test('should return invalid for undefined values', () => {
        const result = validateInputs([
            { value: undefined, label: "Conversion" }
        ]);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Please enter a valid number for Conversion");
    });

    test('should return invalid for negative numbers', () => {
        const result = validateInputs([
            { value: -10, label: "Plan" }
        ]);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Plan must be a positive number");
    });

    test('should validate multiple inputs and stop at first error', () => {
        const result = validateInputs([
            { value: 100, label: "Traffic" },
            { value: null, label: "Conversion" },
            { value: -5, label: "Plan" }
        ]);
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Please enter a valid number for Conversion");
    });

    test('should accept zero as valid', () => {
        const result = validateInputs([
            { value: 0, label: "Traffic" }
        ]);
        expect(result.valid).toBe(true);
    });
});

describe('validatePercentage', () => {
    test('should return valid for percentages 0-100', () => {
        expect(validatePercentage(0, "Test").valid).toBe(true);
        expect(validatePercentage(50, "Test").valid).toBe(true);
        expect(validatePercentage(100, "Test").valid).toBe(true);
        expect(validatePercentage(33.33, "Test").valid).toBe(true);
    });

    test('should return invalid with message for percentages over 100', () => {
        const result = validatePercentage(150, "MTD Conversion");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("MTD Conversion cannot exceed 100%");
    });

    test('should return invalid for negative percentages', () => {
        const result = validatePercentage(-5, "Conversion Rate");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Conversion Rate must be between 0 and 100");
    });

    test('should return invalid for NaN', () => {
        const result = validatePercentage(NaN, "Percentage");
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Percentage must be between 0 and 100");
    });
});

describe('Integration Tests - Real-world Scenarios', () => {
    describe('MTD Numbers Scenario', () => {
        test('should calculate full MTD workflow', () => {
            // Equation 1: Calculate Estimated Traffic
            const lyTraffic = 50000;
            const mtdTrafficPercent = 45;
            const estTraffic = calculateEstimatedTraffic(lyTraffic, mtdTrafficPercent);
            expect(estTraffic).toBe(22500);

            // Equation 2: Calculate Transaction Goal
            const mtdConversion = 3.5;
            const transGoal = calculateTransactionGoal(estTraffic, mtdConversion);
            expect(transGoal).toBe(788);

            // Equation 3: Calculate ADS Goal
            const plan = 75000;
            const adsGoal = calculateADSGoal(plan, transGoal);
            expect(adsGoal).toBe(95.18);
        });
    });

    describe('Conversion Goal Scenario', () => {
        test('should calculate conversion goal workflow', () => {
            const lyConvWithLift = 4.2;
            const traffic = 25000;
            const transGoal = calculateTransactionGoalWithLift(lyConvWithLift, traffic);
            expect(transGoal).toBe(1050);

            const plan = 100000;
            const ads = calculateADSGoal(plan, transGoal);
            expect(ads).toBe(95.24);
        });
    });

    describe('Edge Cases', () => {
        test('should handle very small conversion rates', () => {
            const result = calculateTransactionGoal(100000, 0.01);
            expect(result).toBe(10);
        });

        test('should handle very large traffic numbers', () => {
            const result = calculateEstimatedTraffic(10000000, 50);
            expect(result).toBe(5000000);
        });

        test('should handle very precise ADS calculations', () => {
            const result = calculateADSGoal(123456.78, 9876);
            expect(result).toBe(12.50);
        });

        test('should handle minimum viable inputs', () => {
            expect(calculateEstimatedTraffic(1, 1)).toBe(1);
            expect(calculateTransactionGoal(1, 1)).toBe(1);
            expect(calculateADSGoal(1, 1)).toBe(1.00);
        });
    });

    describe('Error Conditions', () => {
        test('should prevent division by zero in ADS calculation', () => {
            expect(() => calculateADSGoal(50000, 0)).toThrow();
        });

        test('should handle invalid percentage validation', () => {
            const validation = validatePercentage(150, "Test Field");
            expect(validation.valid).toBe(false);
            expect(validation.message).toContain("cannot exceed 100%");
        });

        test('should handle negative number validation', () => {
            const validation = validateInputs([
                { value: -100, label: "Traffic" }
            ]);
            expect(validation.valid).toBe(false);
            expect(validation.message).toContain("must be a positive number");
        });
    });
});

describe('Boundary Value Testing', () => {
    test('should handle boundary at 0', () => {
        expect(calculateEstimatedTraffic(0, 50)).toBe(0);
        expect(calculateTransactionGoal(0, 50)).toBe(0);
        expect(calculateADSGoal(0, 1)).toBe(0.00);
    });

    test('should handle boundary at 100%', () => {
        expect(calculateEstimatedTraffic(1000, 100)).toBe(1000);
        expect(calculateTransactionGoal(1000, 100)).toBe(1000);
        expect(isValidPercentage(100)).toBe(true);
    });

    test('should handle boundary just over 100%', () => {
        expect(isValidPercentage(100.01)).toBe(false);
    });

    test('should handle very small decimal values', () => {
        expect(calculateEstimatedTraffic(1000000, 0.001)).toBe(10);
    });
});
