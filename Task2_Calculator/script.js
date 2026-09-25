let currentInput = "";
let previousInput = "";
let operator = "";
let calculated = false;

const result = document.getElementById("result");
const expression = document.getElementById("expression");

// Add Value
function appendValue(value) {
  if (calculated && !["+", "-", "*", "/"].includes(value)) {
    currentInput = "";
    previousInput = "";
    operator = "";
    expression.textContent = "";
    result.textContent = "";
    calculated = false;
  }

  // Operator pressed
  if (["+", "-", "*", "/"].includes(value)) {
    if (currentInput === "" && previousInput === "") {
      return;
    }
    // If answer was already calculated
    if (calculated) {
      previousInput = currentInput;
      currentInput = "";
      calculated = false;
    } else {
      previousInput = currentInput;
      currentInput = "";
    }
    operator = value;

    // Show
    expression.textContent = previousInput + " " + displayOperator(value);
    result.textContent = "";
    return;
  }

  // Prevent multiple decimal points
  if (value === "." && currentInput.includes(".")) {
    return;
  }

  // Add number
  currentInput += value;

  // Show
  if (operator !== "") {
    expression.textContent =
      previousInput + " " + displayOperator(operator) + " " + currentInput;
  } else {
    result.textContent = currentInput;
  }
}

// Display Operators
function displayOperator(value) {
  if (value === "*") {
    return "*";
  }
  if (value === "/") {
    return "/";
  }
  if (value === "-") {
    return "−";
  }
  return value;
}

// Calculate
function calculate() {
  if (previousInput === "" || currentInput === "" || operator === "") {
    return;
  }

  const firstNumber = parseFloat(previousInput);
  const secondNumber = parseFloat(currentInput);
  let answer;

  // Addition
  if (operator === "+") {
    answer = firstNumber + secondNumber;
  }

  // Subtraction
  else if (operator === "-") {
    answer = firstNumber - secondNumber;
  }

  // Multiplication
  else if (operator === "*") {
    answer = firstNumber * secondNumber;
  }

  // Division
  else if (operator === "/") {
    if (secondNumber === 0) {
      result.textContent = "Error";
      return;
    }
    answer = firstNumber / secondNumber;
  }

  // Show expression on first line
  expression.textContent =
    previousInput + " " + displayOperator(operator) + " " + currentInput;

  // Show answer on second line
  result.textContent = "= " + answer;

  // Save answer
  currentInput = answer.toString();
  calculated = true;
}

// Clear All
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  calculated = false;
  expression.textContent = "";
  result.textContent = "0";
}

// Delete Last - One by One
function deleteLast() {
  if (calculated) {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === "") {
        result.textContent = "";
      } else {
        result.textContent = "= " + currentInput;
      }
      return;
    }

    let text = expression.textContent;
    if (text.length > 0) {
      text = text.slice(0, -1);
      expression.textContent = text;
      return;
    }
    calculated = false;
    previousInput = "";
    operator = "";
    result.textContent = "0";
    return;
  }

  // Delete Second Number
  if (operator !== "" && currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
      expression.textContent = previousInput + " " + displayOperator(operator);
    } else {
      expression.textContent =
        previousInput + " " + displayOperator(operator) + " " + currentInput;
    }
    return;
  }

  // Delete Operator
  if (operator !== "" && currentInput === "") {
    operator = "";
    expression.textContent = previousInput;
    return;
  }

  // Delete First Number
  if (previousInput === "" && currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
      result.textContent = "0";
      expression.textContent = "";
    } else {
      result.textContent = currentInput;
    }
  }
}

// Keyboard Support
document.addEventListener("keydown", function (event) {
  const key = event.key;
  // Numbers
  if (key >= "0" && key <= "9") {
    appendValue(key);
  }
  // Decimal
  else if (key === ".") {
    appendValue(".");
  }
  // Operators
  else if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendValue(key);
  }

  // Enter = Calculate
  else if (key === "Enter") {
    calculate();
  }

  // Escape = Clear
  else if (key === "Escape") {
    clearDisplay();
  }

  // Backspace = Delete
  else if (key === "Backspace") {
    deleteLast();
  }
});
