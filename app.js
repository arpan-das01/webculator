const display = document.querySelector(".calculator_display");
const button = document.querySelectorAll(".button");
const operators = ['+', '-', '*', '/'];
let valueInDisplay = ""; // contains string of numbers and operations on display

function modifyString(event){ // modifies valueInDisplay
    if(event.target.dataset.action === undefined)
        valueInDisplay += event.target.dataset.value;
    else if(valueInDisplay === "")
        return;
    else if(event.target.dataset.action === "clear")
        clearDisplay();
    else if(event.target.dataset.action === '=')
        calculate();
    else if(operators.includes(valueInDisplay[valueInDisplay.length - 1])){
        valueInDisplay = valueInDisplay.slice(0, -1); // prevents double operator inputs
        valueInDisplay += event.target.dataset.action;
    }
    else
        valueInDisplay += event.target.dataset.action;

    display.textContent = valueInDisplay;
}

button.forEach(butn => {
    butn.addEventListener('click', modifyString);
});

function clearDisplay(){
    valueInDisplay = "";
}

function calculate(){
    if(valueInDisplay === "")
        return;
    try{
        let result = eval(valueInDisplay);
        if(!isFinite(result))
            valueInDisplay = "Error!";
        else
            valueInDisplay = String(result);
    }catch(error){
        valueInDisplay = "Syntax Error!"
    }
}