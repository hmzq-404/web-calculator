function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

const operators = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
}

function operate(operator, number1, number2) {
    return operators[operator](number1, number2);
}

