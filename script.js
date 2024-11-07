let currentInput = ''; // Stores the current input as a string
let firstNumber = null; // Stores the first number in the operation
let secondNumber = null; // Stores the second number in the operation
let currentOperator = null; // Stores the selected operator
const display = document.getElementById('display');


// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return 'Cannot divide by 0';
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

// Append numbers to the display and update current input
function appendNumber(number) {
    if (currentInput.length < 10) { // Limit length for display
        currentInput += number;
        updateDisplay();
    }
}

function updateDisplay() {
    display.value = currentInput;
}

// Set the operator and handle operations if there was a previous input
function setOperator(operator) {
    if (currentInput === '' && operator === '-') {
        // Allow negative sign if first input
        currentInput = '-';
        updateDisplay();
        return;
    }
    if (firstNumber !== null && currentOperator) {
        // If operator already selected, perform the calculation
        secondNumber = parseFloat(currentInput);
        let result = operate(currentOperator, firstNumber, secondNumber);
        if (typeof result === 'string') {
            display.value = result; // Error message
            resetCalculator();
            return;
        }
        firstNumber = Math.round(result * 100) / 100; // Rounding for display
        currentInput = '';
        updateDisplay();
    } else {
        // Store first number and reset input
        firstNumber = parseFloat(currentInput);
        currentInput = '';
    }
    currentOperator = operator;
}

function calculate() {
    if (currentOperator && currentInput) {
        secondNumber = parseFloat(currentInput);
        let result = operate(currentOperator, firstNumber, secondNumber);
        if (typeof result === 'string') {
            display.value = result;
            resetCalculator();
            return;
        }
        display.value = Math.round(result * 100) / 100;
        resetCalculator();
    }
}


function clearDisplay() {
    currentInput = '';
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    updateDisplay();
}
function resetCalculator() {
    currentInput = '';
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
}
