const display = document.querySelector(".calculator_display");
const button = document.querySelectorAll(".button");
const operators = ['+', '-', '*', '/'];
let valueInDisplay = ""; // contains string of numbers and operations on display

function modifyString(event){ // modifies valueInDisplay
    if(event.target.dataset.action === undefined)
        valueInDisplay += event.target.dataset.value;
    else if(valueInDisplay === "" && event.target.dataset.action === '-') // allows negative numbers
        valueInDisplay += event.target.dataset.action; 
    else if(valueInDisplay === "")
        return; // prevents clicking operator first
    else if(event.target.dataset.action === "clear")
        clearDisplay();
    else if(event.target.dataset.action === '=')
        calculate();
    else if(valueInDisplay.length === 1 && operators.includes(valueInDisplay[valueInDisplay.length - 1]))
        return; // prevents clicking operators after clicking '-'
    else if(operators.includes(valueInDisplay[valueInDisplay.length - 1])){
        valueInDisplay = valueInDisplay.slice(0, -1); // prevents double operator inputs by replacement
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
    }
    catch{
        valueInDisplay = "Syntax Error!";
    }
}