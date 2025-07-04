// Archivo: /calculadora/calculadora/src/js/calculator.js

// Estado de la calculadora científica
let currentInput = '';
let previousInput = '';
let operation = '';
let shouldResetDisplay = false;
let memory = 0;
let history = [];
let parenthesesCount = 0;
let expression = '';

// Referencias al DOM
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const historyList = document.getElementById('historyList');

// Constantes matemáticas
const CONSTANTS = {
    pi: Math.PI,
    e: Math.E
};

// Función para manejar números y punto decimal
function handleNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        expression = '';
        shouldResetDisplay = false;
    }
    
    // Validar múltiples puntos decimales
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Limitar longitud de dígitos
    if (currentInput.length >= 15 && num !== '.') {
        return;
    }
    
    currentInput += num;
    expression += num;
    updateDisplay();
    updateHistory();
}

// Función para manejar operaciones básicas
function handleOperation(op) {
    if (currentInput === '' && previousInput === '' && expression === '') {
        return;
    }
    
    if (previousInput !== '' && currentInput !== '' && operation !== '') {
        calculate();
    }
    
    if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
    }
    
    operation = op;
    expression += ` ${convertOperatorForDisplay(op)} `;
    updateDisplay();
    updateHistory();
}

// Función para manejar funciones matemáticas
function handleFunction(func) {
    const current = parseFloat(currentInput || '0');
    let result;
    
    try {
        switch (func) {
            case 'sin':
                result = Math.sin(toRadians(current));
                break;
            case 'cos':
                result = Math.cos(toRadians(current));
                break;
            case 'tan':
                result = Math.tan(toRadians(current));
                break;
            case 'sqrt':
                if (current < 0) {
                    throw new Error('No se puede calcular raíz cuadrada de número negativo');
                }
                result = Math.sqrt(current);
                break;
            case 'pow':
                // Para potencias, necesitamos manejar como operación binaria
                if (currentInput !== '') {
                    previousInput = currentInput;
                    currentInput = '';
                    operation = '^';
                    expression += '^';
                    updateDisplay();
                    updateHistory();
                    return;
                }
                return;
            default:
                return;
        }
        
        result = Math.round(result * 1000000000) / 1000000000;
        addToHistory(`${func}(${current}) = ${result}`);
        currentInput = result.toString();
        expression = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
        
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            clearAll();
        }, 2000);
    }
}

// Función para manejar constantes
function handleConstant(constant) {
    if (shouldResetDisplay) {
        currentInput = '';
        expression = '';
        shouldResetDisplay = false;
    }
    
    const value = CONSTANTS[constant];
    currentInput = value.toString();
    expression += constant;
    updateDisplay();
    updateHistory();
}

// Función para manejar paréntesis
function handleParenthesis(paren) {
    if (paren === '(') {
        if (currentInput !== '' && !isNaN(currentInput)) {
            expression += '*';
        }
        expression += '(';
        parenthesesCount++;
    } else if (paren === ')' && parenthesesCount > 0) {
        expression += ')';
        parenthesesCount--;
    }
    
    updateHistory();
}

// Función para calcular resultado
function calculate() {
    try {
        let result;
        
        if (expression && parenthesesCount === 0) {
            // Evaluar expresión completa con paréntesis
            result = evaluateExpression(expression);
        } else if (previousInput !== '' && currentInput !== '' && operation !== '') {
            // Operación simple
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        throw new Error('División por cero');
                    }
                    result = prev / current;
                    break;
                case '^':
                    result = Math.pow(prev, current);
                    break;
                default:
                    return;
            }
        } else {
            return;
        }
        
        // Redondear para evitar problemas de precisión flotante
        result = Math.round(result * 1000000000) / 1000000000;
        
        // Agregar al historial
        const calculation = expression || `${previousInput} ${convertOperatorForDisplay(operation)} ${currentInput}`;
        addToHistory(`${calculation} = ${result}`);
        
        // Resetear estado
        currentInput = result.toString();
        previousInput = '';
        operation = '';
        expression = result.toString();
        parenthesesCount = 0;
        shouldResetDisplay = true;
        updateDisplay();
        updateHistory('');
        
    } catch (error) {
        display.value = 'Error: ' + error.message;
        setTimeout(() => {
            clearAll();
        }, 3000);
    }
}

// Función para evaluar expresiones con paréntesis
function evaluateExpression(expr) {
    // Reemplazar constantes y funciones
    expr = expr.replace(/π/g, Math.PI);
    expr = expr.replace(/e/g, Math.E);
    expr = expr.replace(/×/g, '*');
    expr = expr.replace(/÷/g, '/');
    
    // Evaluar la expresión de forma segura
    try {
        return Function('"use strict"; return (' + expr + ')')();
    } catch (e) {
        throw new Error('Expresión inválida');
    }
}

// Función para convertir grados a radianes
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Funciones de memoria
function memoryAdd() {
    const current = parseFloat(currentInput || '0');
    memory += current;
    showMemoryIndicator();
}

function memorySubtract() {
    const current = parseFloat(currentInput || '0');
    memory -= current;
    showMemoryIndicator();
}

function memoryRecall() {
    currentInput = memory.toString();
    expression = memory.toString();
    updateDisplay();
    updateHistory();
}

function memoryClear() {
    memory = 0;
    hideMemoryIndicator();
}

function showMemoryIndicator() {
    // Agregar indicador visual de que hay algo en memoria
    const indicator = document.querySelector('.memory-indicator');
    if (!indicator) {
        const memIndicator = document.createElement('div');
        memIndicator.className = 'memory-indicator';
        memIndicator.textContent = 'M';
        memIndicator.style.cssText = `
            position: absolute;
            top: 10px;
            left: 20px;
            background: #20c997;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.8rem;
        `;
        document.querySelector('.calculator').style.position = 'relative';
        document.querySelector('.calculator').appendChild(memIndicator);
    }
}

function hideMemoryIndicator() {
    const indicator = document.querySelector('.memory-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Funciones de historial
function addToHistory(calculation) {
    history.push({
        calculation: calculation,
        timestamp: new Date().toLocaleTimeString()
    });
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    if (!historyList) return;
    
    historyList.innerHTML = '';
    history.slice(-10).reverse().forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>${item.calculation}</div>
            <div style="font-size: 0.7rem; color: #adb5bd;">${item.timestamp}</div>
        `;
        historyItem.onclick = () => {
            const result = item.calculation.split(' = ')[1];
            if (result) {
                currentInput = result;
                expression = result;
                updateDisplay();
                updateHistory();
            }
        };
        historyList.appendChild(historyItem);
    });
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
}

// Función para limpiar todo
function clearAll() {
    currentInput = '';
    previousInput = '';
    operation = '';
    expression = '';
    parenthesesCount = 0;
    shouldResetDisplay = false;
    display.value = '0';
    updateHistory('');
}

// Función para borrar último dígito
function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        if (expression.length > 0) {
            expression = expression.slice(0, -1);
        }
        updateDisplay();
        updateHistory();
    }
}

// Función para actualizar pantalla
function updateDisplay(value = null) {
    if (value !== null) {
        display.value = value;
    } else {
        display.value = currentInput || '0';
    }
}

// Función para actualizar historial en pantalla
function updateHistory(value = null) {
    if (!historyDisplay) return;
    
    if (value !== null) {
        historyDisplay.textContent = value;
    } else {
        historyDisplay.textContent = expression || '';
    }
}

// Función para convertir operadores para mejor visualización
function convertOperatorForDisplay(op) {
    switch (op) {
        case '*':
            return '×';
        case '/':
            return '÷';
        case '^':
            return '^';
        default:
            return op;
    }
}

// Soporte para teclado expandido
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Prevenir comportamientos por defecto para ciertas teclas
    if (['Enter', '=', 'Escape', '(', ')'].includes(key)) {
        event.preventDefault();
    }
    
    // Números y punto decimal
    if ((key >= '0' && key <= '9') || key === '.') {
        handleNumber(key);
    }
    // Operadores
    else if (['+', '-', '*', '/', '^'].includes(key)) {
        handleOperation(key);
    }
    // Paréntesis
    else if (key === '(') {
        handleParenthesis('(');
    }
    else if (key === ')') {
        handleParenthesis(')');
    }
    // Calcular resultado
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Limpiar todo
    else if (key === 'Escape') {
        clearAll();
    }
    // Borrar último dígito
    else if (key === 'Backspace') {
        backspace();
    }
    // Funciones científicas con teclas
    else if (key.toLowerCase() === 's') {
        handleFunction('sin');
    }
    else if (key.toLowerCase() === 'c') {
        handleFunction('cos');
    }
    else if (key.toLowerCase() === 't') {
        handleFunction('tan');
    }
    else if (key.toLowerCase() === 'r') {
        handleFunction('sqrt');
    }
    else if (key.toLowerCase() === 'p') {
        handleConstant('pi');
    }
    else if (key.toLowerCase() === 'e') {
        handleConstant('e');
    }
});

// Inicializar calculadora
updateDisplay();
updateHistory('');
updateHistoryDisplay();