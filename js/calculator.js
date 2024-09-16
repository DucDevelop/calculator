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
    currentState : {
        input : '0',
        accumulator : null,
        operator : null,
        init : true,
        display : {first : '', second : '0'},
    },
    lastState : {},

    updateState : function (keyInput) {
        this.lastState = this.currentState;
        if (keyInput === 'c') {
            // clear button
            this.clear();
        }
        if (keyInput === 'Backspace') {
            if (this.currentState.input) {
                if (this.currentState.input.length > 1) {
                    this.currentState.input = this.currentState.input.slice(0, this.currentState.input.length - 1);
                }
                else {
                    this.currentState.input = '0';
                }
            }

        }
            // +-+-+3-8= -> +3-8
        // at beginning only operator pressed
        else if(this.number.includes(keyInput)) {
            // update currentState.input
            if (this.currentState.init) {
                this.currentState.init = false;
                this.currentState.input = keyInput;
            }
            else if (!this.currentState.input) {
                this.currentState.input = keyInput;
            }
            else if (this.currentState.input.match(/^0/g) && !this.currentState.input.includes('.') && keyInput !== '.') {
                // ignore leading 0s
                this.currentState.input = keyInput;
                
            }
            else if (!(this.currentState.input.includes('.') && keyInput === '.')) {
                this.currentState.input += keyInput;
            }
        }

        else if(!this.currentState.accumulator && !this.operator && this.operators.includes(keyInput)) {
            // load accumulator and operator
            this.currentState.accumulator = this.currentState.input;
            this.currentState.operator = keyInput;
            this.currentState.input = null;
        }
        else if(this.currentState.operator && this.operators.includes(keyInput) && !this.currentState.input) {
            // override operator
            this.currentState.operator = keyInput;
        }
        else if(this.operators.includes(keyInput) && this.currentState.input) {
            // load accumulator and operator
            this.currentState.accumulator = ''+this.calculate();
            this.currentState.input = null;
            this.currentState.operator = keyInput;
        }
        else if(keyInput === '=' && this.currentState.accumulator && this.currentState.operator && this.currentState.input) {
            // load accumulator and operator
            this.currentState.input = ''+this.calculate();
            this.currentState.accumulator = null;
            this.currentState.operator = null;
            this.currentState.init = true;
        }
        
    },
    clear : function () {
        this.currentState.input = '0';
        this.currentState.accumulator = null;
        this.currentState.operator = null;
        this.currentState.init = true;
        this.currentState.display = {first : '', second : '0'};
    },

    calculate : function () {
        let a = +this.currentState.accumulator;
        let b = +this.currentState.input;
        switch(this.currentState.operator) {
            case '+':   return add(a,b);
            case '-':   return subtract(a,b);
            case '*':   return multiply(a,b);
            case '/':   return b !== 0 ?  divide(a,b) : NaN;
            default: return NaN;
        }
    },

    updateDisplay : function (keyInput) {

        if (keyInput === '=' && this.lastState.accumulator && this.lastState.input && this.lastState.operator) {
            this.currentState.display.first += this.currentState.display.second;
        }
        if (this.operators.includes(keyInput)) {
            this.currentState.display.first = `${this.currentState.accumulator} ${this.currentState.operator} `;
        }
        if (this.currentState.input) {
            this.currentState.display.second = `${this.currentState.input}`;
        }
        else {
            this.currentState.display.second = '0';
        }
    },
}

module.exports = calcState;