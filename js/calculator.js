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
            // +-+-+3-8= -> +3-8
        // at beginning only operator pressed


        if(this.number.includes(keyInput)) {
            // update currentInput
            if (this.init) {
                this.init = false;
                this.currentInput = keyInput;
            }
            else if (!this.currentInput) {
                this.currentInput = keyInput;
            }
            // else if (this.currentInput.startsWith('0') && keyInput === '0') {
            //     // ignore leading 0s
            //     this.currentInput += keyInput;
            // }
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

module.exports = calcState;