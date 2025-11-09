"use strict"

// Helper Functions for Validation and Error Handling
function getNumericValue(elementId) {
    const element = document.getElementById(elementId);
    const value = parseFloat(element.value);
    return isNaN(value) ? null : value;
}

function validateInputs(inputs) {
    for (const input of inputs) {
        if (input.value === null) {
            return { valid: false, message: `Please enter a valid number for ${input.label}` };
        }
        if (input.value < 0) {
            return { valid: false, message: `${input.label} cannot be negative` };
        }
    }
    return { valid: true };
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#d32f2f';
    errorDiv.style.padding = '10px';
    errorDiv.style.marginTop = '10px';
    errorDiv.style.border = '1px solid #d32f2f';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.backgroundColor = '#ffebee';

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function clearError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
}

function setOutput(elementId, value) {
    const element = document.getElementById(elementId);
    element.value = value;
    // Visual feedback for successful calculation
    element.style.borderColor = '#4caf50';
    setTimeout(() => {
        element.style.borderColor = '';
    }, 1000);
}

const equation1 = () => {
    clearError();

    const lyTraffic = getNumericValue("LyTraffic");
    const mtdTraffic = getNumericValue("MtdTraffic");

    const validation = validateInputs([
        { value: lyTraffic, label: "LY Traffic" },
        { value: mtdTraffic, label: "% to MTD Traffic" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    const percentValidation = validatePercentage(mtdTraffic, "% to MTD Traffic");
    if (!percentValidation.valid) {
        showError(percentValidation.message);
        return;
    }

    const estTraffic = calculateEstimatedTraffic(lyTraffic, mtdTraffic);

    setOutput("EstTraff", estTraffic);
    document.getElementById('EstTraff2').value = estTraffic;
    document.getElementById('EstTraff4').value = estTraffic;
    document.getElementById('EstTraff5').value = estTraffic;
}
document.getElementById('calc1').addEventListener('click', equation1)

const equation2 = () => {
    clearError();

    const estTraffic2 = getNumericValue("EstTraff2");
    const mtdConv = getNumericValue("MtdConv");

    const validation = validateInputs([
        { value: estTraffic2, label: "Estimated Traffic" },
        { value: mtdConv, label: "MTD Conversion" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    const percentValidation = validatePercentage(mtdConv, "MTD Conversion");
    if (!percentValidation.valid) {
        showError(percentValidation.message);
        return;
    }

    const estTransGoal = calculateTransactionGoal(estTraffic2, mtdConv);

    setOutput("EstTransGoalMtd", estTransGoal);
    document.getElementById("EstTransGoal2").value = estTransGoal;
}
document.getElementById('calc2').addEventListener('click', equation2)

const equation3 = () => {
    clearError();

    const plan = getNumericValue("Plan");
    const estTransactions = getNumericValue("EstTransGoal2");

    const validation = validateInputs([
        { value: plan, label: "Plan" },
        { value: estTransactions, label: "Estimated Transaction Goal" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    try {
        const adsGoal = calculateADSGoal(plan, estTransactions);
        setOutput("AdsGoalMtd", adsGoal);
    } catch (error) {
        showError("Estimated Transaction Goal cannot be zero (division by zero)");
    }
}
document.getElementById('calc3').addEventListener('click', equation3)

const equation4 = () => {
    clearError();

    const conversionPercent = getNumericValue("LyConvUp");
    const traffic = getNumericValue("EstTraff4");

    const validation = validateInputs([
        { value: conversionPercent, label: "LY Conversion + lift" },
        { value: traffic, label: "Estimated Traffic" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    const percentValidation = validatePercentage(conversionPercent, "LY Conversion + lift");
    if (!percentValidation.valid) {
        showError(percentValidation.message);
        return;
    }

    const trans = calculateTransactionGoalWithLift(conversionPercent, traffic);

    setOutput("TransGoal", trans);
    document.getElementById("TransGoal2").value = trans;
}
document.getElementById('calc4').addEventListener('click', equation4)

const equation5 = () => {
    clearError();

    const plan = getNumericValue("Plan2");
    const transGoal = getNumericValue("TransGoal2");

    const validation = validateInputs([
        { value: plan, label: "Plan" },
        { value: transGoal, label: "Transaction Goal" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    try {
        const ads = calculateADSGoal(plan, transGoal);
        setOutput("AdsUp", ads);
    } catch (error) {
        showError("Transaction Goal cannot be zero (division by zero)");
    }
}
document.getElementById('calc5').addEventListener('click', equation5)

const equation6 = () => {
    clearError();

    const conversionPercent = getNumericValue("LyConvFlat");
    const traffic = getNumericValue("EstTraff5");

    const validation = validateInputs([
        { value: conversionPercent, label: "LY Conversion + lift" },
        { value: traffic, label: "Estimated Traffic" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    const percentValidation = validatePercentage(conversionPercent, "LY Conversion + lift");
    if (!percentValidation.valid) {
        showError(percentValidation.message);
        return;
    }

    const trans = calculateTransactionGoalWithLift(conversionPercent, traffic);

    setOutput("TransGoalFlat", trans);
    document.getElementById("TransGoalFlat2").value = trans;
}
document.getElementById('calc6').addEventListener('click', equation6)

const equation7 = () => {
    clearError();

    const plan = getNumericValue("Plan3");
    const trans = getNumericValue("TransGoalFlat2");

    const validation = validateInputs([
        { value: plan, label: "Plan" },
        { value: trans, label: "Transaction Goal" }
    ]);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    try {
        const ads = calculateADSGoal(plan, trans);
        setOutput("AdsFlat", ads);
    } catch (error) {
        showError("Transaction Goal cannot be zero (division by zero)");
    }
}
document.getElementById('calc7').addEventListener('click', equation7)
//reset buttons
document.getElementById("reset1").addEventListener("click", function() {
    document.getElementById("LyTraffic").value = "";
    document.getElementById("MtdTraffic").value = "";
    document.getElementById("EstTraff").value = "";

});
document.getElementById("reset2").addEventListener("click", function() {
    document.getElementById("EstTraff2").value = "";
    document.getElementById("MtdConv").value = "";
    document.getElementById("EstTransGoalMtd").value = "";

});
document.getElementById("reset3").addEventListener("click", function() {
    document.getElementById("Plan").value = "";
    document.getElementById("EstTransGoal2").value = "";
    document.getElementById("AdsGoalMtd").value = "";

});
document.getElementById("reset4").addEventListener("click", function() {
    document.getElementById("TransGoal").value = "";
    document.getElementById("EstTraff4").value = "";
    document.getElementById("LyConvUp").value = "";

});
document.getElementById("reset5").addEventListener("click", function() {
    document.getElementById("Plan2").value = "";
    document.getElementById("TransGoal2").value = "";
    document.getElementById("AdsUp").value = "";

});
document.getElementById("reset6").addEventListener("click", function() {
    document.getElementById("LyConvFlat").value = "";
    document.getElementById("EstTraff5").value = "";
    document.getElementById("TransGoalFlat").value = "";
});
document.getElementById("reset7").addEventListener("click", function() {
    document.getElementById("Plan3").value = "";
    document.getElementById("TransGoalFlat2").value = "";
    document.getElementById("AdsFlat").value = "";

});
document.getElementById("resetAll").addEventListener("click", () => {
    var inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(function(input) {
        input.value = '';
    });
});




//auto fill code
document.getElementById('EstTraff').addEventListener('input', function() {
    document.getElementById('EstTraff2').value = this.value;
    document.getElementById('EstTraff4').value = this.value;
    document.getElementById('EstTraff5').value = this.value;
    
});

document.getElementById('Plan').addEventListener('input', function() {
    document.getElementById('Plan2').value = this.value;
    document.getElementById('Plan3').value = this.value;
   
    
});

document.getElementById('TransGoal').addEventListener('input', function() {
    document.getElementById('TransGoal2').value = this.value;
   
    
});

document.getElementById("EstTransGoalMtd").addEventListener('input', function() {
    document.getElementById('EstTransGoal2').value = this.value;
   
    
});

document.getElementById('TransGoalFlat').addEventListener('input', function() {
    document.getElementById('TransGoalFlat2').value = this.value;
});