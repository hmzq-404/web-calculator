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

function formatExpression(expressionString) {
    let resultExpression = [];

    for (element of expressionString) {
        if (element in operatorFunctions) {
            resultExpression.push(` ${element} `);
        } else {
            resultExpression.push(element);
        }
    }
    return resultExpression.join("");
}

function solveExpression(expressionString) {
    let expressionArray = formatExpression(expressionString).split(" ");
    let numbersArray = expressionArray
    .filter((element) => !(element in operatorFunctions));
    let operatorsArray = expressionArray
    .filter((element) => element in operatorFunctions);
}


function setButtonFunctions(event) {
    const buttonClicked = event.target;

    if (buttonClicked.textContent === "AC") {
        expressionString = "";
    } 
    else if (buttonClicked.textContent === "Del") {
        if (expressionString.length <= 0) return;

        expressionString = expressionString.slice(0, expressionString.length - 1);
    } 
    else if (buttonClicked.textContent === "=") {
        expressionString = solveExpression(expressionString);
    }
    else {
        if (expressionString.length === 9) return;
        expressionString += buttonClicked.textContent;
    }

    displayScreen.textContent = formatExpression(expressionString);
}


buttons.forEach((button) => {
    button.addEventListener("click", setButtonFunctions);
});

