const display = document.querySelector(".calculator_display");
const button = document.querySelectorAll(".button");
const operators = ['+', '-', '*', '/'];
let valueInDisplay = ""; // contains string of numbers and operations on display
let errorFlag = 0; // 0=no error, 1=syntax error, 2=error

function modifyString(input){ // modifies valueInDisplay
    let lastCharInDisplay = valueInDisplay.slice(-1);

    if(input === "clear")
        clearDisplay();
    else if(input === '=')
        calculate();
    else if(!operators.includes(input))
        valueInDisplay += input; // adds digits to valueInDisplay
    else if(valueInDisplay === '-' && operators.includes(input))
        return; // prevents changing - to other operators first
    else if(valueInDisplay === "" && input !== '-')
        return; // prevents typing operator first except -
    else if(operators.includes(lastCharInDisplay) && operators.includes(input)){
        valueInDisplay = valueInDisplay.slice(0, -1); // replaces last operator with new one
        valueInDisplay += input;
    }
    else
        valueInDisplay += input;

    updateDisplay();
}

function clearDisplay(){
    valueInDisplay = "";
}

function calculate(){
    if(valueInDisplay === "")
        return;
    try{
        let result = eval(valueInDisplay);
        if(!isFinite(result))
            errorFlag = 2;
        else
            valueInDisplay = String(result);
    }
    catch{
        errorFlag = 1; // syntax error
    }
}

function updateDisplay(){
    if(errorFlag === 1){
        display.textContent = "Syntax Error!";
        valueInDisplay = "";
        errorFlag = 0;
    }
    else if(errorFlag === 2){
        display.textContent = "Error!";
        valueInDisplay = "";
        errorFlag = 0;
    }
    else
        display.textContent = valueInDisplay;
}

button.forEach(butn => { // handles mouse clicks
    butn.addEventListener('click', (event) => {
        let input = event.target.dataset.value || event.target.dataset.action;
        modifyString(input);
    });
});