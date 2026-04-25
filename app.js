const display = document.querySelector(".calculator_display");
const button = document.querySelectorAll(".button");
let valueInDisplay=""; // contains string of numbers and operations on display

function modifyString(event){ //modifies valueInDisplay 
    valueInDisplay += event.target.dataset.value;
    display.textContent=valueInDisplay;
}

button.forEach(butn => {
    butn.addEventListener('click', modifyString);
});
