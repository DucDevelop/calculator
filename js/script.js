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


let calcState = {
    operators : '+-/*',
    number : '0123456789.',
    currentInput : '0',
    accumulator : null,
    currentOperator : null,
    init : true,

    updateState : function (keyInput) {
        if (keyInput === 'c') {
            // clear button
            this.clear();
        }
        if (keyInput === 'Backspace') {
            if (this.currentInput) {
                if (this.currentInput.length > 1) {
                    this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1);
                }
                else {
                    this.currentInput = '0';
                }
            }

        }
            // +-+-+3-8= -> +3-8
        // at beginning only operator pressed
        else if(this.number.includes(keyInput)) {
            // update currentInput
            if (this.init) {
                this.init = false;
                this.currentInput = keyInput;
            }
            else if (!this.currentInput) {
                this.currentInput = keyInput;
            }
            else if (this.currentInput.match(/^0/g) && !this.currentInput.includes('.') && keyInput !== '.') {
                // ignore leading 0s
                this.currentInput = keyInput;
                
            }
            else if (!(this.currentInput.includes('.') && keyInput === '.')) {
                this.currentInput += keyInput;
            }
        }

        else if(!this.accumulator && !this.operator && this.operators.includes(keyInput)) {
            // load accumulator and operator
            this.accumulator = this.currentInput;
            this.currentOperator = keyInput;
            this.currentInput = null;
        }
        else if(this.currentOperator && this.operators.includes(keyInput) && !this.currentInput) {
            // override operator
            this.currentOperator = keyInput;
        }
        else if(this.operators.includes(keyInput) && this.currentInput) {
            // load accumulator and operator
            this.accumulator = ''+this.calculate();
            this.currentInput = null;
            this.currentOperator = keyInput;
        }
        else if(keyInput === '=' && this.accumulator && this.currentOperator && this.currentInput) {
            // load accumulator and operator
            this.currentInput = ''+this.calculate();
            this.accumulator = null;
            this.currentOperator = null;
            this.init = true;
        }
    },
    clear : function () {
        this.currentInput = '0';
        this.accumulator = null;
        this.currentOperator = null;
        this.init = true;
    },

    calculate : function () {
        let a = +this.accumulator;
        let b = +this.currentInput;
        switch(this.currentOperator) {
            case '+':   return add(a,b);
            case '-':   return subtract(a,b);
            case '*':   return multiply(a,b);
            case '/':   return b !== 0 ?  divide(a,b) : NaN;
            default: return NaN;
        }
    },
}



function updateDisplay(str) {
    const display = document.querySelector('.display-calculator');
    display.textContent = formatNumberDisplay(str);
}



function formatNumberDisplay(str) {
    if (str) {
        if (str.includes('.')) {
            // allow leading 0s
            let tmp = str.split('.')
            return ''+Number(tmp[0]) + '.' + tmp[1];
        }
        else {
            return ''+Number(str);
        }
    }

}


function validateKeyboardInput(key) {
    const operators = '+-/*cC=EnterBackspace';
    const number = '0123456789.';
    return operators.includes(key) || number.includes(key);
}


document.querySelector('body').addEventListener('click', e => {
    if(e.target.classList.contains('key-calculator')) {
        calcState.updateState(e.target.getAttribute('data-key'));
    }
    updateDisplay(calcState.currentInput);
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


document.querySelector('body').addEventListener('keydown', (e) => {
    if(validateKeyboardInput(e.key)) {
        const key = e.key === 'Enter'? '=' : e.key;
        calcState.updateState(key);
    }
    updateDisplay(calcState.currentInput);
})





