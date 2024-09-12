let displayValue = '';
const operators = '+-/*'
let operatorPresent = '';
let [leftOperand, rightOperand] = ['', ''];

function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}

let opStr = '2 + 3';

function operate(operator, a, b) {
    switch(operator) {
        case '+':   return add(a,b);
        case '-':   return subtract(a,b);
        case '*':   return multiply(a,b);
        case '/':   return divide(a,b);
        default: return NaN;
    }
}

function updateDisplay(str) {
    const display = document.querySelector('.display-calculator');
    display.textContent = str;
}

function clear() {
    displayValue = '';
}

function extractOperands(str) {
    const operatorIdx = str.split('').findIndex(x => operators.includes(x));
    return [str.slice(0,operatorIdx), str.substr(operatorIdx, 1), str.slice(operatorIdx + 1)];
}




document.querySelector('body').addEventListener('click', e => {
    
    if(e.target.classList.contains('key-calculator')) {
        const keyPressed = e.target.getAttribute('data-key');
        if(keyPressed === '=') {
            [leftOperand, operatorPresent, rightOperand] = extractOperands(displayValue);
            displayValue = operate(operatorPresent, leftOperand, rightOperand);
        }
        else {
            displayValue += keyPressed;
        }
        updateDisplay(displayValue);
    
        
    }
    
})