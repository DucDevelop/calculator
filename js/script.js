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


function operate(operator, a, b) {
    a = +a;
    b = +b;
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
    // const operatorIdx = str.split('').findIndex(x => operators.includes(x));
    // return [str.slice(0,operatorIdx), str.slice(operatorIdx + 1)];
    let operands = Array.from(str.matchAll(/(.*)[\*\-\+\/]{1}(.*)/g))[0];
    console.log([operands[1],operands[2]]);
    return [operands[1],operands[2]];
}




document.querySelector('body').addEventListener('click', e => {
    
    if(e.target.classList.contains('key-calculator')) {
        const keyPressed = e.target.getAttribute('data-key');
        if (keyPressed === 'c') {
            // clear button
            displayValue = '';
            operatorPresent = '';
        }
        else if(keyPressed === '=') {
            // hit = sign
            [leftOperand, rightOperand] = extractOperands(displayValue);
            displayValue = operate(operatorPresent, leftOperand, rightOperand);
            operatorPresent = '=';
        }
        else if(operators.includes(keyPressed) && operatorPresent && operators.includes(operatorPresent)) {
            // clicked operator but already existent: use case 2-7+
            [leftOperand, rightOperand] = extractOperands(displayValue);
            displayValue = operate(operatorPresent, leftOperand, rightOperand) + keyPressed;
            operatorPresent = keyPressed;
        }
        else if(operators.includes(keyPressed) && operatorPresent === '=') {
            // clicked operator after evaluation =
            operatorPresent = keyPressed;
            displayValue += keyPressed;
        }
        else if (operatorPresent === '=' && !operators.includes(keyPressed)) {
            // after pressing = and a number reset
            displayValue = keyPressed;
            operatorPresent = '';
        }

        else if (operators.includes(keyPressed)) {
            // pressing operator
            operatorPresent = keyPressed;
            displayValue += keyPressed;
        }
        else {
            displayValue += keyPressed;
        }
        updateDisplay(displayValue);
    }
    
})