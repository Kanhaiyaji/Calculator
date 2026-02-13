"use strict";
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        // Arrow Function 1: Update display with template literal (ES6+)
        this.updateDisplay = () => {
            this.display.innerText = this.currentValue;
        };
        // Arrow Function 2: Append number with decimal point support
        this.appendNumber = (num) => {
            // Prevent multiple decimal points
            if (num === '.' && this.currentValue.includes('.')) {
                return;
            }
            this.currentValue = this.currentValue === '0' && num !== '.'
                ? num
                : `${this.currentValue}${num}`;
            this.updateDisplay();
        };
        // Arrow Function 3: Append operator with chained calculation support
        this.appendOperator = (op) => {
            // If already have an operation, calculate it first
            if (this.operator !== null && this.currentValue !== '') {
                this.calculate();
            }
            this.previousValue = this.currentValue;
            this.operator = op;
            this.currentValue = '';
        };
        // Arrow Function 4: Calculate result with destructuring (ES6+)
        this.calculate = () => {
            if (!this.operator || !this.previousValue || !this.currentValue) {
                return;
            }
            const [prev, current] = [Number(this.previousValue), Number(this.currentValue)];
            const result = this.performOperation(prev, current);
            this.currentValue = result.toString();
            this.operator = null;
            this.previousValue = '';
            this.updateDisplay();
        };
        // Arrow Function 5: Perform arithmetic operation with switch (ES6+)
        this.performOperation = (prev, current) => {
            switch (this.operator) {
                case '+':
                    return prev + current;
                case '-':
                    return prev - current;
                case '*':
                    return prev * current;
                case '/':
                    return current !== 0 ? prev / current : 0;
                default:
                    return 0;
            }
        };
        // Arrow Function 6: Calculate percentage
        this.percentage = () => {
            const currentNum = Number(this.currentValue);
            if (this.operator === null) {
                // Convert current value to percentage
                this.currentValue = (currentNum / 100).toString();
            }
            else {
                // Calculate percentage of previous value
                const prevNum = Number(this.previousValue);
                this.currentValue = ((prevNum * currentNum) / 100).toString();
            }
            this.updateDisplay();
        };
        this.clear = () => {
            this.currentValue = '0';
            this.previousValue = '';
            this.operator = null;
            this.updateDisplay();
        };
        this.getState = () => ({
            currentValue: this.currentValue,
            previousValue: this.previousValue,
            operator: this.operator,
        });
        this.display = document.getElementById('display');
        this.updateDisplay();
    }
}
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new Calculator();
});
