let displayValue = '';

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

document.querySelector('body').addEventListener('click', e => {
    if(e.target.classList.contains('key-calculator')) {
        displayValue += e.target.getAttribute('data-key');
        updateDisplay(displayValue);
    }
    
})