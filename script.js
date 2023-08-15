const displayScreen = document.querySelector(".display-screen");
const buttons = document.querySelectorAll(".button");
let expressionString = "";
let expressionSolved = false;

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

function reduceExpressionArray(numbersArray, operatorsArray, multiplyDivideOnly=false) {
    let numbersCombined = 0;

    for (let index = 0; index < operatorsArray.length; index++) {
        let operator = operatorsArray[index];
        let number1 = numbersArray[index - numbersCombined];
        let number2 = numbersArray[index - numbersCombined + 1];

        if (multiplyDivideOnly) {
            if (operator === "×" || operator === "÷") {
                numbersArray[index] = operate(operator, number1, number2);
                numbersArray.splice(index - numbersCombined + 1, 1);
                operatorsArray[index] = "";
                numbersCombined++;
            }
        } else {
            numbersArray[index] = operate(operator, number1, number2);
            numbersArray.splice(index - numbersCombined + 1, 1);
            operatorsArray[index] = "";
            numbersCombined++;
        }
    }

    operatorsArray = operatorsArray.filter(operator => operator in operatorFunctions);

    return [numbersArray, operatorsArray];
}


function solveExpression(expressionString) {
    while (canCombineOperators(expressionString)) {
        expressionString = combineOperators(expressionString);
    }

    let expressionArray = formatExpression(expressionString).split(" ");
    let numbersArray = expressionArray
    .filter(element => !(element in operatorFunctions)) || [];

    numbersArray = numbersArray.map(numberString => parseInt(numberString));

    let operatorsArray = expressionArray
    .filter(element => element in operatorFunctions) || [];

    if (operatorsArray.length !== numbersArray.length - 1) {
        return "Syntax Error";
    }

    [numbersArray, operatorsArray] = reduceExpressionArray(
        numbersArray,
        operatorsArray,
        multiplyDivideOnly=true
    );

    [numbersArray, operatorsArray] = reduceExpressionArray(
        numbersArray,
        operatorsArray
    );

    return `${numbersArray[0]}`;
}


function setButtonFunctions(event) {
    const buttonClicked = event.target;

    if (expressionSolved) {
        expressionString = "";
        expressionSolved = false;
    }

    if (buttonClicked.textContent === "AC") {
        expressionString = "";
    } 
    else if (buttonClicked.textContent === "Del") {
        if (expressionString.length <= 0) return;

        expressionString = expressionString.slice(0, expressionString.length - 1);
    } 
    else if (buttonClicked.textContent === "=") {
        expressionString = solveExpression(expressionString);
        expressionSolved = true;
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

