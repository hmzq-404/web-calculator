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
    let resultExpression = "";

    for (let index = 0; index < expressionString.length; index++) {
        let character = expressionString[index];
        if (character in operatorFunctions) {
            // Collapses extra space between operators
            if (expressionString[index + 1] in operatorFunctions || index === expressionString.length - 1) {
                resultExpression += ` ${character}`;
            } else {
                resultExpression += ` ${character} `;
            }
        } else {
            resultExpression += character;
        }
    }
    return resultExpression;
}

function canCombineOperators(expressionString) {
    return expressionString.includes("++") ||
        expressionString.includes("--") ||
        expressionString.includes("+-") ||
        expressionString.includes("-+");
}

function combineOperators(expressionString) {
    return expressionString.replace("++", "+")
        .replace("--", "+")
        .replace("+-", "-")
        .replace("-+", "-");
}


function solveExpression(expressionString) {
    while (canCombineOperators(expressionString)) {
        expressionString = combineOperators(expressionString);
    }

    let expressionArray = formatExpression(expressionString).split(" ");
    let numbersArray = expressionArray
    .filter((element) => !(element in operatorFunctions));
    let operatorsArray = expressionArray
    .filter((element) => element in operatorFunctions);

    if (operatorsArray.length !== numbersArray.length - 1) {
        return "Syntax Error";
    }
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

