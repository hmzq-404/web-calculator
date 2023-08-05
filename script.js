const displayScreen = document.querySelector(".display-screen");
const buttons = document.querySelectorAll(".button");
let expressionString = "";

const operatorFunctions = {
    "+": (number1, number2) => number1 + number2,
    "-": (number1, number2) => number1 - number2,
    "×": (number1, number2) => number1 * number2,
    "÷": (number1, number2) => number1 / number2
}

function operate(operator, number1, number2) {
    return operatorFunctions[operator](number1, number2);
}

function solveExpression() {
    let expressionArray = expressionString.split(" ");
    let numbersArray = expressionArray.filter((element) => !(element in operatorFunctions));
    let operatorsArray = expressionArray.filter((element) => element in operatorFunctions);
}


function setButtonFunctions(event) {
    const buttonClicked = event.target;

    if (buttonClicked.textContent === "AC") {
        expressionString = "";
    } 
    else if (buttonClicked.textContent === "Del") {
        if (expressionString.length <= 0) return;

        expressionString = expressionString.slice(0, expressionString.length - 1);

        if (expressionString[expressionString.length - 1 ] in operatorFunctions) {
            expressionString = expressionString.slice(0, expressionString.length - 2);
        }
    } 
    else if (buttonClicked.textContent === "=") {
        solveExpression();
    }
    else {
        if (expressionString.split(" ").join("").length >= 10) return;
        if (buttonClicked.textContent in operatorFunctions) {
            expressionString += ` ${buttonClicked.textContent} `;
        } else {
            expressionString += buttonClicked.textContent;
        }
    }

    // Remove spaces from the expression
    displayScreen.textContent = expressionString.split(" ").join("");
}


buttons.forEach((button) => {
    button.addEventListener("click", setButtonFunctions);
});

