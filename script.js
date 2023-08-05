const operatorFunctions = {
    "+": (number1, number2) => number1 + number2,
    "-": (number1, number2) => number1 - number2,
    "×": (number1, number2) => number1 * number2,
    "÷": (number1, number2) => number1 / number2
}

function operate(operator, number1, number2) {
    return operatorFunctions[operator](number1, number2);
}


const displayScreen = document.querySelector(".display-screen");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const buttonClicked = event.target;

        if (buttonClicked.innerText === "AC") {
            displayScreen.innerText = "";
        } 
        else if (buttonClicked.innerText === "Del" && buttonClicked.innerText.length > 0) {
            displayScreen.innerText = displayScreen.innerText.slice(0, displayScreen.innerText.length - 1);
        } 
        else {
            if (displayScreen.innerText.length === 10) {
                alert("Cannot enter more than 10 characters");
                return;
            }
            displayScreen.innerText += buttonClicked.innerText;
        }
    });
});

