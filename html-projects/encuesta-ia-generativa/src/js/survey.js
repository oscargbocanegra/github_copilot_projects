// survey.js

class Survey {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.responses = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            await this.loadQuestions();
            this.setupEventListeners();
            this.renderQuestion();
            this.updateCounter();
            this.updateNavigationButtons();
            this.isInitialized = true;
            console.log('✅ Survey inicializada correctamente');
        } catch (error) {
            console.error('❌ Error al inicializar survey:', error);
            this.handleLoadError();
        }
    }

    async loadQuestions() {
        try {
            // Intentar cargar desde archivo JSON
            const response = await fetch('data/questions.json').catch(() => ({ ok: false }));
            
            if (response.ok) {
                const data = await response.json();
                this.questions = data.survey?.questions || data.questions || [];
            }
            
            // Si no hay preguntas, usar datos embebidos
            if (!this.questions || this.questions.length === 0) {
                this.questions = this.getEmbeddedQuestions();
            }

            console.log('✅ Preguntas cargadas:', this.questions.length);
        } catch (error) {
            console.error('Error loading questions:', error);
            this.questions = this.getEmbeddedQuestions();
        }
    }

    setupEventListeners() {
        // Navegación
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextQuestion();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousQuestion();
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitSurvey();
            });
        }

        // Submit del formulario
        const form = document.getElementById('surveyForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitSurvey();
            });
        }
    }

    getEmbeddedQuestions() {
        return [
            {
                id: 1,
                type: "radio",
                required: true,
                question: "¿Cuál es tu nivel de familiaridad con la IA Generativa?",
                options: [
                    "Nunca he usado IA generativa",
                    "He probado algunas herramientas básicas",
                    "Uso IA generativa ocasionalmente",
                    "Uso IA generativa regularmente",
                    "Soy experto/a en IA generativa"
                ]
            },
            {
                id: 2,
                type: "checkbox",
                required: true,
                question: "¿Qué herramientas de IA generativa has utilizado?",
                options: [
                    "ChatGPT (OpenAI)",
                    "Claude (Anthropic)",
                    "Gemini (Google)",
                    "GitHub Copilot",
                    "DALL-E / Midjourney",
                    "Otra herramienta",
                    "Ninguna"
                ]
            },
            {
                id: 3,
                type: "radio",
                required: true,
                question: "¿En qué sector trabajas principalmente?",
                options: [
                    "Tecnología y Software",
                    "Educación",
                    "Marketing y Publicidad",
                    "Salud y Medicina",
                    "Finanzas",
                    "Arte y Creatividad",
                    "Investigación",
                    "Otro"
                ]
            },
            {
                id: 4,
                type: "radio",
                required: true,
                question: "¿Con qué frecuencia utilizas IA generativa?",
                options: [
                    "Diariamente",
                    "Varias veces por semana",
                    "Una vez por semana",
                    "Varias veces al mes",
                    "Raramente",
                    "Nunca"
                ]
            },
            {
                id: 5,
                type: "checkbox",
                required: true,
                question: "¿Para qué tareas principales utilizas la IA generativa?",
                options: [
                    "Generación de texto y contenido",
                    "Programación y desarrollo",
                    "Diseño y creatividad",
                    "Análisis de datos",
                    "Traducción",
                    "Investigación",
                    "Educación y aprendizaje",
                    "Automatización de tareas"
                ]
            },
            {
                id: 6,
                type: "radio",
                required: true,
                question: "¿Cuál consideras el principal beneficio de la IA generativa?",
                options: [
                    "Aumento de productividad",
                    "Creatividad potenciada",
                    "Acceso democratizado a herramientas avanzadas",
                    "Automatización de tareas repetitivas",
                    "Aprendizaje y educación mejorados",
                    "Reducción de costos"
                ]
            },
            {
                id: 7,
                type: "radio",
                required: true,
                question: "¿Cuál es tu principal preocupación sobre la IA generativa?",
                options: [
                    "Pérdida de empleos",
                    "Problemas de privacidad",
                    "Información incorrecta o sesgada",
                    "Dependencia excesiva de la tecnología",
                    "Falta de creatividad humana",
                    "Aspectos éticos y de responsabilidad"
                ]
            },
            {
                id: 8,
                type: "radio",
                required: true,
                question: "¿En qué área crees que la IA generativa tendrá mayor impacto?",
                options: [
                    "Educación",
                    "Salud y medicina",
                    "Entretenimiento y medios",
                    "Programación y desarrollo",
                    "Arte y diseño",
                    "Investigación científica",
                    "Atención al cliente"
                ]
            },
            {
                id: 9,
                type: "radio",
                required: true,
                question: "¿Estarías dispuesto/a a pagar por herramientas de IA generativa premium?",
                options: [
                    "Sí, ya pago por algunas",
                    "Sí, consideraría pagar",
                    "Tal vez, dependiendo del precio",
                    "No, prefiero opciones gratuitas",
                    "No, no veo el valor",
                    "No estoy seguro/a"
                ]
            },
            {
                id: 10,
                type: "textarea",
                required: false,
                question: "¿Tienes algún comentario adicional sobre la IA generativa?",
                placeholder: "Comparte tus pensamientos, experiencias o predicciones sobre el futuro de la IA generativa..."
            }
        ];
    }

    handleLoadError() {
        const container = document.getElementById('questionContainer');
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 40px;">
                    <h3 style="color: #f56565; margin-bottom: 15px;">❌ Error al cargar la encuesta</h3>
                    <p style="color: #718096; margin-bottom: 20px;">No se pudieron cargar las preguntas. Por favor, recarga la página.</p>
                    <button onclick="location.reload()" class="btn btn-primary">
                        🔄 Recargar página
                    </button>
                </div>
            `;
        }
    }

    renderQuestion() {
        const container = document.getElementById('questionContainer');
        if (!container) {
            console.error('Container de preguntas no encontrado');
            return;
        }

        // Verificar que tenemos preguntas y que el índice es válido
        if (!this.questions || this.questions.length === 0) {
            console.error('No hay preguntas disponibles');
            return;
        }

        if (this.currentQuestionIndex >= this.questions.length) {
            console.error('Índice de pregunta fuera de rango');
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        if (!question) {
            console.error('Pregunta no encontrada en índice:', this.currentQuestionIndex);
            return;
        }

        // Ocultar placeholder si existe
        const placeholder = document.getElementById('questionPlaceholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }

        // Limpiar contenedor
        container.innerHTML = '';

        // Crear elemento de pregunta
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options" id="options-${question.id}">
                ${this.generateOptions(question)}
            </div>
        `;

        container.appendChild(questionDiv);

        // Mostrar indicador opcional si aplica
        this.updateOptionalIndicator(question.required);

        // Restaurar respuesta previa si existe
        this.restorePreviousResponse(question);

        // Añadir event listeners
        this.addQuestionEventListeners(question);
    }

    generateOptions(question) {
        if (!question.options && question.type !== 'textarea') {
            return '<p style="color: red;">Error: Opciones no definidas para esta pregunta</p>';
        }

        switch (question.type) {
            case 'radio':
                return question.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" 
                               id="q${question.id}_${index}" 
                               name="question_${question.id}" 
                               value="${option}">
                        <label for="q${question.id}_${index}">${option}</label>
                    </div>
                `).join('');

            case 'checkbox':
                return question.options.map((option, index) => `
                    <div class="option">
                        <input type="checkbox" 
                               id="q${question.id}_${index}" 
                               name="question_${question.id}" 
                               value="${option}">
                        <label for="q${question.id}_${index}">${option}</label>
                    </div>
                `).join('');

            case 'textarea':
                return `
                    <textarea class="text-input" 
                              id="q${question.id}_text" 
                              name="question_${question.id}" 
                              placeholder="${question.placeholder || 'Escribe tu respuesta aquí...'}"
                              rows="4"></textarea>
                `;

            default:
                return '<p style="color: red;">Tipo de pregunta no soportado</p>';
        }
    }

    addQuestionEventListeners(question) {
        const optionsContainer = document.getElementById(`options-${question.id}`);
        if (!optionsContainer) return;

        switch (question.type) {
            case 'radio':
                const radioInputs = optionsContainer.querySelectorAll('input[type="radio"]');
                radioInputs.forEach(input => {
                    input.addEventListener('change', (e) => {
                        this.saveResponse(question.id, e.target.value);
                        this.updateNavigationButtons();
                        this.hideValidationMessage();
                        
                        // Añadir clase selected al option padre
                        optionsContainer.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                        e.target.closest('.option').classList.add('selected');
                    });
                });
                break;

            case 'checkbox':
                const checkboxInputs = optionsContainer.querySelectorAll('input[type="checkbox"]');
                checkboxInputs.forEach(input => {
                    input.addEventListener('change', () => {
                        const checkedValues = Array.from(checkboxInputs)
                            .filter(cb => cb.checked)
                            .map(cb => cb.value);
                        
                        this.saveResponse(question.id, checkedValues);
                        this.updateNavigationButtons();
                        this.hideValidationMessage();
                        
                        // Añadir clase selected a opciones marcadas
                        input.closest('.option').classList.toggle('selected', input.checked);
                    });
                });
                break;

            case 'textarea':
                const textarea = optionsContainer.querySelector('textarea');
                if (textarea) {
                    textarea.addEventListener('input', (e) => {
                        this.saveResponse(question.id, e.target.value);
                        this.updateNavigationButtons();
                        this.hideValidationMessage();
                    });
                }
                break;
        }
    }

    restorePreviousResponse(question) {
        const savedResponse = this.responses[question.id];
        if (!savedResponse) return;

        const optionsContainer = document.getElementById(`options-${question.id}`);
        if (!optionsContainer) return;

        switch (question.type) {
            case 'radio':
                const radioInput = optionsContainer.querySelector(`input[value="${savedResponse}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                    radioInput.closest('.option').classList.add('selected');
                }
                break;

            case 'checkbox':
                if (Array.isArray(savedResponse)) {
                    savedResponse.forEach(value => {
                        const checkboxInput = optionsContainer.querySelector(`input[value="${value}"]`);
                        if (checkboxInput) {
                            checkboxInput.checked = true;
                            checkboxInput.closest('.option').classList.add('selected');
                        }
                    });
                }
                break;

            case 'textarea':
                const textarea = optionsContainer.querySelector('textarea');
                if (textarea) {
                    textarea.value = savedResponse;
                }
                break;
        }
    }

    saveResponse(questionId, response) {
        this.responses[questionId] = response;
        // Guardar en localStorage como backup
        localStorage.setItem('surveyResponses', JSON.stringify(this.responses));
    }

    updateOptionalIndicator(required) {
        const indicator = document.getElementById('optionalIndicator');
        if (indicator) {
            if (required === false) {
                indicator.style.display = 'block';
                indicator.textContent = 'Pregunta opcional';
            } else {
                indicator.style.display = 'none';
            }
        }
    }

    updateCounter() {
        const currentElement = document.getElementById('currentQuestion');
        const totalElement = document.getElementById('totalQuestions');
        
        if (currentElement) {
            currentElement.textContent = this.currentQuestionIndex + 1;
        }
        if (totalElement) {
            totalElement.textContent = this.questions.length;
        }

        // Actualizar progress bar
        this.updateProgressBar();
    }

    updateProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (this.questions.length > 0) {
            const percentage = Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100);
            
            if (progressFill) {
                progressFill.style.width = `${percentage}%`;
            }
            if (progressPercentage) {
                progressPercentage.textContent = `${percentage}%`;
            }
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }

        // Verificar si la pregunta actual está respondida o es opcional
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isAnswered = this.isQuestionAnswered(currentQuestion);
        const isOptional = currentQuestion?.required === false;
        
        if (nextBtn) {
            nextBtn.disabled = !isAnswered && !isOptional;
        }

        // Mostrar botón submit en la última pregunta
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        
        if (nextBtn && submitBtn) {
            if (isLastQuestion) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-flex';
                submitBtn.disabled = !this.isAllRequiredQuestionsAnswered();
            } else {
                nextBtn.style.display = 'inline-flex';
                submitBtn.style.display = 'none';
            }
        }
    }

    isQuestionAnswered(question) {
        const response = this.responses[question.id];
        
        switch (question.type) {
            case 'radio':
            case 'textarea':
                return response && response.length > 0;
            case 'checkbox':
                return response && Array.isArray(response) && response.length > 0;
            default:
                return false;
        }
    }

    isAllRequiredQuestionsAnswered() {
        return this.questions.every(question => {
            if (question.required === false) return true;
            return this.isQuestionAnswered(question);
        });
    }

    nextQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        // Validar si la pregunta es requerida y no está respondida
        if (currentQuestion.required !== false && !this.isQuestionAnswered(currentQuestion)) {
            this.showValidationMessage('Por favor, selecciona una respuesta antes de continuar.');
            return;
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.updateNavigationButtons();
            this.updateCounter();
            this.hideValidationMessage();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
            this.updateNavigationButtons();
            this.updateCounter();
            this.hideValidationMessage();
        }
    }

    showValidationMessage(message) {
        if (typeof window.showValidationMessage === 'function') {
            window.showValidationMessage(message);
        } else {
            const validationMessage = document.getElementById('validationMessage');
            if (validationMessage) {
                const textElement = validationMessage.querySelector('.validation-text');
                if (textElement) {
                    textElement.textContent = message;
                }
                validationMessage.style.display = 'flex';
                validationMessage.setAttribute('aria-hidden', 'false');
            }
        }
    }

    hideValidationMessage() {
        if (typeof window.hideValidationMessage === 'function') {
            window.hideValidationMessage();
        } else {
            const validationMessage = document.getElementById('validationMessage');
            if (validationMessage) {
                validationMessage.style.display = 'none';
                validationMessage.setAttribute('aria-hidden', 'true');
            }
        }
    }

    submitSurvey() {
        if (!this.isAllRequiredQuestionsAnswered()) {
            this.showValidationMessage('Por favor, completa todas las preguntas requeridas antes de enviar.');
            return;
        }

        // Guardar respuestas
        localStorage.setItem('surveyResponses', JSON.stringify(this.responses));
        localStorage.setItem('surveyCompleted', 'true');
        localStorage.setItem('surveyCompletedDate', new Date().toISOString());

        // Mostrar resultados
        this.showResults();
    }

    showResults() {
        // Ocultar formulario
        const surveyForm = document.getElementById('surveyForm');
        const resultsContainer = document.getElementById('resultsContainer');
        
        if (surveyForm) surveyForm.style.display = 'none';
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            
            // Procesar y mostrar resultados
            if (window.ResultsManager) {
                const resultsManager = new ResultsManager();
                const results = resultsManager.processResults(this.responses);
                resultsManager.displayResults(results);
            } else {
                // Fallback si ResultsManager no está disponible
                this.showBasicResults();
            }
        }
    }

    showBasicResults() {
        const resultsContent = document.getElementById('resultsContent');
        if (resultsContent) {
            resultsContent.innerHTML = `
                <div class="basic-results">
                    <h3>¡Encuesta Completada!</h3>
                    <p>Gracias por completar la encuesta sobre IA Generativa.</p>
                    <div class="response-summary">
                        <h4>Resumen de respuestas:</h4>
                        <ul>
                            ${Object.entries(this.responses).map(([id, response]) => 
                                `<li><strong>Pregunta ${id}:</strong> ${Array.isArray(response) ? response.join(', ') : response}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    restart() {
        this.currentQuestionIndex = 0;
        this.responses = {};
        localStorage.removeItem('surveyResponses');
        localStorage.removeItem('surveyCompleted');
        localStorage.removeItem('surveyCompletedDate');
        
        // Mostrar formulario y ocultar resultados
        const surveyForm = document.getElementById('surveyForm');
        const resultsContainer = document.getElementById('resultsContainer');
        
        if (surveyForm) surveyForm.style.display = 'block';
        if (resultsContainer) resultsContainer.style.display = 'none';
        
        this.renderQuestion();
        this.updateNavigationButtons();
        this.updateCounter();
    }

    // Métodos públicos para navegación
    goToNext() {
        this.nextQuestion();
    }

    goToPrevious() {
        this.previousQuestion();
    }

    submit() {
        this.submitSurvey();
    }

    getResponses() {
        return this.responses;
    }

    getQuestions() {
        return this.questions;
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.responses = {};
        localStorage.removeItem('surveyResponses');
        localStorage.removeItem('surveyCompleted');
        localStorage.removeItem('surveyCompletedDate');
        
        if (this.questions.length > 0) {
            this.renderQuestion();
            this.updateNavigationButtons();
            this.updateCounter();
        }
    }
}

// Exportar para uso global
window.Survey = Survey;

document.addEventListener('DOMContentLoaded', () => {
    new Survey();
});