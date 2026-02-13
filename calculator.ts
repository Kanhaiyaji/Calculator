// Types and Interfaces for better type safety
interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: string | null;
}

type OperatorType = '+' | '-' | '*' | '/';
type NumericValue = number;

class Calculator {
  private currentValue: string = '0';
  private previousValue: string = '';
  private operator: OperatorType | null = null;
  private display: HTMLElement;

  constructor() {
    this.display = document.getElementById('display') as HTMLElement;
    this.updateDisplay();
  }

  // Arrow Function 1: Update display with template literal (ES6+)
  private updateDisplay = (): void => {
    this.display.innerText = this.currentValue;
  };

  // Arrow Function 2: Append number with decimal point support
  public appendNumber = (num: string): void => {
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
  public appendOperator = (op: OperatorType): void => {
    // If already have an operation, calculate it first
    if (this.operator !== null && this.currentValue !== '') {
      this.calculate();
    }
    
    this.previousValue = this.currentValue;
    this.operator = op;
    this.currentValue = '';
  };

  // Arrow Function 4: Calculate result with destructuring (ES6+)
  public calculate = (): void => {
    if (!this.operator || !this.previousValue || !this.currentValue) {
      return;
    }

    const [prev, current] = [Number(this.previousValue), Number(this.currentValue)];
    const result: NumericValue = this.performOperation(prev, current);

    this.currentValue = result.toString();
    this.operator = null;
    this.previousValue = '';
    this.updateDisplay();
  };

  // Arrow Function 5: Perform arithmetic operation with switch (ES6+)
  private performOperation = (prev: NumericValue, current: NumericValue): NumericValue => {
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
  public percentage = (): void => {
    const currentNum: NumericValue = Number(this.currentValue);
    
    if (this.operator === null) {
      // Convert current value to percentage
      this.currentValue = (currentNum / 100).toString();
    } else {
      // Calculate percentage of previous value
      const prevNum: NumericValue = Number(this.previousValue);
      this.currentValue = ((prevNum * currentNum) / 100).toString();
    }
    
    this.updateDisplay();
  };

  // Clear calculator state
  public clear = (): void => {
    this.currentValue = '0';
    this.previousValue = '';
    this.operator = null;
    this.updateDisplay();
  };

  // Get calculator state (utility method)
  public getState = (): CalculatorState => ({
    currentValue: this.currentValue,
    previousValue: this.previousValue,
    operator: this.operator,
  });
}

// Initialize calculator when DOM is ready
let calculator: Calculator;

document.addEventListener('DOMContentLoaded', (): void => {
  calculator = new Calculator();
});

