"use strict"

const equation1 = () => {
    let lyTraffic = document.getElementById("LyTraffic").value
    let mtdTrafficPercent = parseFloat(document.getElementById("MtdTraffic").value) / 100;
    let estTraffic = Math.ceil(lyTraffic * mtdTrafficPercent)
    document.getElementById("EstTraff").value = estTraffic;
    document.getElementById('EstTraff2').value = estTraffic;
    document.getElementById('EstTraff4').value = estTraffic;
    document.getElementById('EstTraff5').value = estTraffic;
}
document.getElementById('calc1').addEventListener('click', equation1)

const equation2 = () => {
    let estTraffic2 = document.getElementById("EstTraff2").value
    let mtdConversion = parseFloat(document.getElementById("MtdConv").value) / 100
    let estTransGoal = Math.ceil(estTraffic2 * mtdConversion)
    document.getElementById("EstTransGoalMtd").value = estTransGoal
    document.getElementById("EstTransGoal2").value = estTransGoal
    
}
document.getElementById('calc2').addEventListener('click', equation2)

const equation3 = () => {
    let plan = document.getElementById("Plan").value
    let estTransactions = document.getElementById("EstTransGoal2").value
    let adsGoal = parseFloat(plan / estTransactions).toFixed(2)
    document.getElementById("AdsGoalMtd").value = adsGoal
   
}
document.getElementById('calc3').addEventListener('click', equation3)

const equation4 = () => {
    let conversion = parseFloat(document.getElementById("LyConvUp").value) / 100
    let traffic = document.getElementById("EstTraff4").value
    let trans = Math.ceil(conversion * traffic)
    document.getElementById("TransGoal").value = trans
    document.getElementById("TransGoal2").value = trans
}
document.getElementById('calc4').addEventListener('click', equation4)

const equation5 = () => {
    let plan = document.getElementById("Plan2").value
    let transGoal = document.getElementById("TransGoal2").value
    let ads = parseFloat(plan / transGoal).toFixed(2)
    document.getElementById("AdsUp").value = ads
}
document.getElementById('calc5').addEventListener('click', equation5)

const equation6 = () => {
    let conversion = parseFloat(document.getElementById("LyConvFlat").value) / 100
    let traffic = document.getElementById("EstTraff5").value
    let trans = Math.ceil(conversion * traffic)
    document.getElementById("TransGoalFlat").value = trans
    document.getElementById("TransGoalFlat2").value = trans
}
document.getElementById('calc6').addEventListener('click', equation6)

const equation7 = () => {
    let plan = document.getElementById("Plan3").value
    let trans = document.getElementById("TransGoalFlat2").value
    let ads = parseFloat(plan / trans).toFixed(2)
    document.getElementById("AdsFlat").value = ads
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
module.exports = {

}