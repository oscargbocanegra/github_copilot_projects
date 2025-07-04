// Variables globales para el estado de la calculadora
let currentInput = '';
let previousInput = '';
let operation = '';
let shouldResetDisplay = false;
let displayExpression = '';

// Funciones de operaciones matemáticas
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error: División por cero';
    }
    return a / b;
}

// Función para actualizar la pantalla
function updateDisplay(value) {
    const display = document.getElementById('display');
    if (value === '') {
        display.value = '0';
    } else {
        display.value = value;
    }
}

// Función para manejar números y punto decimal
function handleNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Evitar múltiples puntos decimales
    if (number === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Limitar la longitud del número
    if (currentInput.length >= 12) {
        return;
    }
    
    currentInput += number;
    
    // Mostrar la expresión completa si hay una operación pendiente
    if (operation && previousInput) {
        displayExpression = previousInput + ' ' + operation + ' ' + currentInput;
        updateDisplay(displayExpression);
    } else {
        updateDisplay(currentInput);
    }
}

// Función para manejar operadores
function handleOperation(op) {
    if (currentInput === '' && previousInput === '') return;
    
    // Si hay una operación pendiente, calcular primero
    if (previousInput !== '' && currentInput !== '' && operation !== '') {
        calculate();
        // Después del cálculo, currentInput contiene el resultado
    }
    
    // Si no hay input actual pero sí hay un resultado previo
    if (currentInput === '' && previousInput !== '') {
        currentInput = previousInput;
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    
    // Convertir * a × para mostrar
    let displayOp = op === '*' ? '×' : op;
    
    // Mostrar la operación en la pantalla
    displayExpression = previousInput + ' ' + displayOp;
    updateDisplay(displayExpression);
}

// Función para realizar el cálculo
function calculate() {
    if (previousInput === '' || currentInput === '' || operation === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
        updateDisplay('Error');
        return;
    }

    // Mostrar la expresión completa antes del resultado
    let displayOp = operation === '*' ? '×' : operation;
    displayExpression = previousInput + ' ' + displayOp + ' ' + currentInput + ' =';
    updateDisplay(displayExpression);
    
    // Pequeña pausa para mostrar la expresión completa
    setTimeout(() => {
        switch (operation) {
            case '+':
                result = add(prev, current);
                break;
            case '-':
                result = subtract(prev, current);
                break;
            case '*':
                result = multiply(prev, current);
                break;
            case '/':
                result = divide(prev, current);
                break;
            default:
                return;
        }
        
        // Manejar errores en el resultado
        if (typeof result === 'string') {
            updateDisplay(result);
            clear();
            return;
        }
        
        // Redondear resultado para evitar problemas de precisión flotante
        if (result % 1 !== 0) {
            result = Math.round(result * 100000000) / 100000000;
        }
        
        currentInput = result.toString();
        operation = '';
        previousInput = '';
        shouldResetDisplay = true;
        displayExpression = '';
        updateDisplay(currentInput);
    }, 300);
}

// Función para limpiar todo
function clear() {
    currentInput = '';
    previousInput = '';
    operation = '';
    shouldResetDisplay = false;
    displayExpression = '';
    updateDisplay('');
}

// Función para borrar el último dígito
function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        
        // Actualizar la pantalla con la expresión si existe
        if (operation && previousInput) {
            let displayOp = operation === '*' ? '×' : operation;
            displayExpression = previousInput + ' ' + displayOp + ' ' + currentInput;
            updateDisplay(displayExpression);
        } else {
            updateDisplay(currentInput);
        }
    } else if (operation && previousInput) {
        // Si no hay currentInput, borrar la operación
        operation = '';
        currentInput = previousInput;
        previousInput = '';
        displayExpression = '';
        updateDisplay(currentInput);
    }
}

// Soporte para teclado
document.addEventListener('keydown', function(event) {
    // Números
    if (event.key >= '0' && event.key <= '9') {
        handleNumber(event.key);
    }
    // Punto decimal
    else if (event.key === '.') {
        handleNumber('.');
    }
    // Operadores
    else if (event.key === '+') {
        handleOperation('+');
    }
    else if (event.key === '-') {
        handleOperation('-');
    }
    else if (event.key === '*') {
        handleOperation('*');
    }
    else if (event.key === '/') {
        event.preventDefault(); // Evitar búsqueda rápida en Firefox
        handleOperation('/');
    }
    // Igual
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    }
    // Limpiar
    else if (event.key === 'Escape') {
        clear();
    }
    // Borrar
    else if (event.key === 'Backspace') {
        deleteLast();
    }
});

// Inicializar la calculadora
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay('');
});