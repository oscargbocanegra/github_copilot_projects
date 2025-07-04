// app.js

document.addEventListener('DOMContentLoaded', () => {
    const surveyContainer = document.getElementById('survey-container');
    let currentQuestionIndex = 0;
    let userResponses = [];

    function loadQuestion() {
        fetch('data/questions.json')
            .then(response => response.json())
            .then(data => {
                const question = data.questions[currentQuestionIndex];
                displayQuestion(question);
            });
    }

    function displayQuestion(question) {
        surveyContainer.innerHTML = `
            <h2>${question.text}</h2>
            ${question.options.map((option, index) => `
                <div>
                    <input type="radio" name="response" id="option${index}" value="${option}">
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
            <button id="next-button">Siguiente</button>
        `;

        document.getElementById('next-button').addEventListener('click', handleNext);
    }

    function handleNext() {
        const selectedOption = document.querySelector('input[name="response"]:checked');
        if (selectedOption) {
            userResponses.push(selectedOption.value);
            currentQuestionIndex++;
            if (currentQuestionIndex < userResponses.length) {
                loadQuestion();
            } else {
                showResults();
            }
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    }

    function showResults() {
        surveyContainer.innerHTML = '<h2>Gracias por completar la encuesta!</h2>';
        // Aquí se pueden agregar más detalles sobre los resultados.
    }

    loadQuestion();
});

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la encuesta
    const survey = new Survey();
    
    // Event listeners para navegación
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            survey.nextQuestion();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            survey.previousQuestion();
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            survey.submitSurvey();
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            survey.restart();
        });
    }

    // Agregar efectos visuales
    addVisualEffects();
    
    // Configuración inicial del formulario
    const form = document.getElementById('surveyForm');
    
    if (form) {
        // Prevenir envío tradicional del formulario
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            survey.submitSurvey();
            return false;
        });
    }

    // Función para actualizar el porcentaje del progress bar
    window.updateProgressBar = function(current, total) {
        const percentage = Math.round((current / total) * 100);
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        const progressBar = document.querySelector('.progress-bar');
        const progressTime = document.getElementById('progressTime');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage}%`;
        }
        
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', percentage);
        }

        // Actualizar tiempo estimado
        if (progressTime) {
            const remainingQuestions = total - current;
            const estimatedMinutes = Math.max(1, Math.ceil(remainingQuestions * 0.5));
            
            if (remainingQuestions <= 0) {
                progressTime.textContent = '¡Completado!';
            } else if (remainingQuestions <= 1) {
                progressTime.textContent = 'Casi terminado';
            } else {
                progressTime.textContent = `~${estimatedMinutes} min restantes`;
            }
        }
    };

    // Función para mostrar mensajes de validación
    window.showValidationMessage = function(message) {
        const messageElement = document.getElementById('validationMessage');
        const textElement = messageElement?.querySelector('.validation-text');
        
        if (textElement) {
            textElement.textContent = message;
        }
        
        if (messageElement) {
            messageElement.style.display = 'flex';
            messageElement.setAttribute('aria-hidden', 'false');
        }
        
        // Auto-hide después de 4 segundos
        setTimeout(() => {
            hideValidationMessage();
        }, 4000);
    };

    // Función para ocultar mensajes de validación
    window.hideValidationMessage = function() {
        const messageElement = document.getElementById('validationMessage');
        if (messageElement) {
            messageElement.style.display = 'none';
            messageElement.setAttribute('aria-hidden', 'true');
        }
    };

    // Función para marcar pregunta como opcional
    window.markQuestionOptional = function(isOptional) {
        const indicator = document.getElementById('optionalIndicator');
        if (indicator) {
            indicator.style.display = isOptional ? 'block' : 'none';
        }
    };

    console.log('Encuesta IA Generativa inicializada correctamente');
});

function addVisualEffects() {
    // Efecto de hover en botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Animación suave al cambiar preguntas
    const questionContainer = document.getElementById('questionContainer');
    if (questionContainer) {
        const observer = new MutationObserver(() => {
            questionContainer.style.opacity = '0';
            setTimeout(() => {
                questionContainer.style.opacity = '1';
            }, 100);
        });
        
        observer.observe(questionContainer, { childList: true });
    }
}

// Función para guardar progreso en localStorage (opcional)
function saveProgress(survey) {
    try {
        localStorage.setItem('surveyProgress', JSON.stringify({
            currentQuestionIndex: survey.currentQuestionIndex,
            answers: survey.answers
        }));
    } catch (error) {
        console.warn('No se pudo guardar el progreso:', error);
    }
}

// Función para cargar progreso desde localStorage (opcional)
function loadProgress(survey) {
    try {
        const saved = localStorage.getItem('surveyProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            survey.currentQuestionIndex = progress.currentQuestionIndex;
            survey.answers = progress.answers;
            return true;
        }
    } catch (error) {
        console.warn('No se pudo cargar el progreso guardado:', error);
    }
    return false;
}

// Manejo de errores globales
window.addEventListener('error', function(event) {
    console.error('Error en la encuesta:', event.error);
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('Error de promesa no manejada:', event.reason);
});