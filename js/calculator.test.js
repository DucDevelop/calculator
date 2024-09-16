const calcState = require("./calculator");

beforeEach(() => {
    calcState.clear();
});
  

describe('calculator logic', () => {
    test('1+2= is equal to 3', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('=');
        const result = calcState.currentState.input;
        expect(result).toBe('3');
    });
    test('1+c1+1= is equal to 2', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('c');
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('1');
        calcState.updateState('=');
        const result = calcState.currentState.input;
        expect(result).toBe('2');
    });
    test('1+2=+7 is equal to 10', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('=');
        calcState.updateState('+');
        calcState.updateState('7');
        calcState.updateState('=');
        const result = calcState.currentState.input;
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
        const result = calcState.currentState.input;
        expect(result).toBe('7.5');
    });
    test('1+2-', () => {
        calcState.updateState('1');
        calcState.updateState('+');
        calcState.updateState('2');
        calcState.updateState('-');

        const input = calcState.currentState.input;
        const acc = calcState.currentState.accumulator;
        const operator = calcState.currentState.operator;
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

        const result = calcState.currentState.input;

        expect(result).toBe('NaN');
    });
    test('Handle leading 0s 005+', () => {
        calcState.updateState('0');
        calcState.updateState('0');
        calcState.updateState('5');

        const result = calcState.currentState.input;

        expect(result).toBe('5');
    });
    test('Handle leading multiple .', () => {
        calcState.updateState('0');
        calcState.updateState('.');
        calcState.updateState('5');
        calcState.updateState('.');
        calcState.updateState('.');
        calcState.updateState('5');

        const result = calcState.currentState.input;

        expect(result).toBe('0.55');
    });
    test('Delete key', () => {
        calcState.updateState('0');
        calcState.updateState('.');
        calcState.updateState('5');
        calcState.updateState('.');
        calcState.updateState('.');
        calcState.updateState('Backspace');
        const result = calcState.currentState.input;

        expect(result).toBe('0.');
    });
    test('Delete key 2', () => {
        calcState.updateState('0');
        calcState.updateState('.');
        calcState.updateState('Backspace');
        calcState.updateState('Backspace');
        const result = calcState.currentState.input;

        expect(result).toBe('0');
    });
    test('Delete key 3', () => {
        calcState.updateState('0');
        calcState.updateState('+');
        calcState.updateState('Backspace');
        calcState.updateState('Backspace');
        const result = calcState.currentState.input;

        expect(result).toBe(null);
    });
    test('Backspace after operand 5*Backspace=', () => {
        calcState.updateState('5');
        calcState.updateState('*');
        calcState.updateState('Backspace');
        const result = calcState.currentState.input;

        expect(result).toBe(null);
    });

});