const display = document.getElementById('display');

// Add value to display
function appendToDisplay(value) {
    if (display.innerText === '0' && value !== '.') {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

// Clear the display
function clearDisplay() {
    display.innerText = '0';
}

// Remove the last digit
function backspace() {
    display.innerText = display.innerText.slice(0, -1) || '0';
}

// Calculate the result
function calculateResult() {
    try {
        let expression = display.innerText;

        // Ensure the parentheses are balanced
        expression = balanceParentheses(expression);

        // Replace log() with Math.log10() for logarithms (base 10)
        expression = expression.replace(/log\(([^)]+)\)/g, (match, p1) => `Math.log10(${p1})`);

        // Replace sin(), cos(), tan() with their respective Math functions
        // Convert degrees to radians (degrees * (Math.PI / 180))
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => `Math.sin(${p1} * (Math.PI / 180))`);
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => `Math.cos(${p1} * (Math.PI / 180))`);
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => `Math.tan(${p1} * (Math.PI / 180))`);

        // Handle division by zero
        if (expression.includes('/0')) {
            throw new Error("Cannot divide by zero");
        }

        // Perform the calculation using eval
        let result = eval(expression);
        
        // Display the result
        display.innerText = result;
    } catch (e) {
        // If an error occurs, display "Error"
        display.innerText = 'Error';
    }
}

// Function to balance the parentheses
function balanceParentheses(expression) {
    const openParentheses = (expression.match(/\(/g) || []).length;
    const closeParentheses = (expression.match(/\)/g) || []).length;

    // If there's an unmatched opening parenthesis, add a closing parenthesis
    if (openParentheses > closeParentheses) {
        expression += ')';
    }
    
    return expression;
}

// Enable keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ('0123456789+-*/%.'.includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
