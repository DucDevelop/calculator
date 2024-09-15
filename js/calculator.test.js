const calcState = require("./calculator");


describe('calculator logic', () => {
    test('1+2= is equal to 3', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('=');
        const result = calcState.currentInput;
        expect(result).toBe('3');
    });
    test('1+2=+7 is equal to 10', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('=');
        calcState.updateState('+');
        calcState.updateState('7');
        calcState.updateState('=');
        const result = calcState.currentInput;
        expect(result).toBe('10');
    });
    test('3*5*-+/2= is equal to 7.5', () => {
        calcState.updateState('3');
        calcState.updateState('*');
        calcState.updateState('5');
        calcState.updateState('*');
        calcState.updateState('-');
        calcState.updateState('+');
        calcState.updateState('/');
        calcState.updateState('2');
        calcState.updateState('=');
        const result = calcState.currentInput;
        expect(result).toBe('7.5');
    });
    test('1+2-', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('-');

        const input = calcState.currentInput;
        const acc = calcState.accumulator;
        const operator = calcState.currentOperator;
        expect(input).toBe(null);
        expect(acc).toBe('3');
        expect(operator).toBe('-');
    });
    test('1+2/0= is equal to NaN', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('/');
        calcState.updateState('0');
        calcState.updateState('=');

        const result = calcState.currentInput;

        expect(result).toBe('NaN');
    });

});