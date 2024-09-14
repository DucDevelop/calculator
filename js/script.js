let inputValue = '0';
let accumulator = '0';
let afterEval = false;

const operators = '+-/*'
const number = '0123456789.'

let currentOperator = '';



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
        case '/':   return b !== 0 ?  divide(a,b) : NaN;
        default: return NaN;
    }
}

function updateDisplay(str) {
    const display = document.querySelector('.display-calculator');
    display.textContent = formatNumberDisplay(str);
}

function formatNumberDisplay(str) {
    if (str.includes('.')) {
        // allow leading 0s
        return str;
    }
    else {
        return ''+Number(str);
    }
}

function clear() {
    inputValue = '0';
    accumulator = '0';
    currentOperator = '';
    updateDisplay(accumulator);
}

function calculate() {
    return ''+operate(currentOperator, accumulator, inputValue);
}


document.querySelector('body').addEventListener('click', e => {
    
    if(e.target.classList.contains('key-calculator')) {
        const keyPressed = e.target.getAttribute('data-key');
        if (keyPressed === 'c') {
            // clear button
            return clear();
        }
        // +-+-+3-8= -> +3-8
        // at beginning only operator pressed
        if (operators.includes(keyPressed) && !currentOperator) {
            accumulator = inputValue;
            inputValue = '0';
            currentOperator = keyPressed;
            updateDisplay(accumulator);
        }
        else if (operators.includes(keyPressed) && afterEval) {
            inputValue = '0';
            currentOperator = keyPressed;
            updateDisplay(accumulator);
            afterEval = false;
        }
        else if (operators.includes(keyPressed) && currentOperator) {
            accumulator = calculate();
            inputValue = '0';
            currentOperator = keyPressed;
            updateDisplay(accumulator);
        }
        else if (keyPressed === '=' && !currentOperator) {
            // do nothing
        }
        else if (keyPressed === '=') {
            accumulator = calculate();
            afterEval = true;
            updateDisplay(accumulator);
        }
        else if (number.includes(keyPressed)) {
            if (afterEval) {
                inputValue = keyPressed;
                accumulator = '0';
                currentOperator = '';
                afterEval = false;
            }
            else if (!(inputValue.includes('.') && keyPressed === '.')) {
                inputValue += keyPressed;
            }
            updateDisplay(inputValue);
        }
    }
    
})


document.querySelector('body').addEventListener('click', (e) => {
    if(e.target.classList.contains('key-operator')) {
        // check if there are operator buttons pressed
        const pressedOperators = document.querySelectorAll('.pressed');
        // is it the same as the pressed button?
        pressedOperators.forEach(item => {
            if(item !== e.target) {
                item.classList.remove('pressed');
            }
        })
        e.target.classList.add('pressed');
        // -> yes: do nothing
        // -> no: toggle both buttons
    }

})


document.querySelector('body').addEventListener('click', (e) => {
    if(e.target.classList.contains('key-eval') || e.target.classList.contains('key-clear')) {
        const pressedOperators = document.querySelectorAll('.pressed');
        pressedOperators.forEach(item => {
            if(item !== e.target) {
                item.classList.remove('pressed');
            }
        })
    }

})
