// survey.js

class Survey {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.loadQuestions();
    }

    async loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            const data = await response.json();
            this.questions = data.questions;
            this.renderQuestion();
            this.updateProgress();
            this.updateQuestionCounter();
        } catch (error) {
            console.error('Error loading questions:', error);
            // Fallback con preguntas predefinidas si falla la carga
            this.loadFallbackQuestions();
        }
    }

    loadFallbackQuestions() {
        this.questions = [
            {
                id: 1,
                type: "multiple-choice",
                question: "¿Qué tan familiarizado/a estás con la IA generativa?",
                options: [
                    { value: "muy_familiarizado", text: "Muy familiarizado - La uso frecuentemente" },
                    { value: "algo_familiarizado", text: "Algo familiarizado - La he probado varias veces" },
                    { value: "poco_familiarizado", text: "Poco familiarizado - Solo he oído hablar de ella" },
                    { value: "nada_familiarizado", text: "Nada familiarizado - Es la primera vez que escucho el término" }
                ]
            }
            // ... más preguntas predefinidas si es necesario
        ];
        this.renderQuestion();
        this.updateProgress();
        this.updateQuestionCounter();
    }

    renderQuestion() {
        const container = document.getElementById('questionContainer');
        const question = this.questions[this.currentQuestionIndex];
        
        if (!question) return;

        let optionsHtml = '';
        
        if (question.type === 'multiple-choice') {
            optionsHtml = `
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option" onclick="this.querySelector('input').click()">
                            <input type="radio" 
                                   name="question_${question.id}" 
                                   value="${option.value}" 
                                   id="option_${question.id}_${index}"
                                   ${this.answers[question.id] === option.value ? 'checked' : ''}>
                            <label for="option_${question.id}_${index}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (question.type === 'text') {
            optionsHtml = `
                <textarea class="text-input" 
                          name="question_${question.id}" 
                          placeholder="${question.placeholder || 'Escribe tu respuesta aquí...'}"
                          rows="6">${this.answers[question.id] || ''}</textarea>
            `;
        }

        container.innerHTML = `
            <div class="question">
                <h3>${question.question}</h3>
                ${optionsHtml}
            </div>
        `;

        // Add event listeners
        this.addEventListeners();
        this.updateNavigationButtons();
        
        // Ocultar mensaje de validación al cargar nueva pregunta
        if (window.hideValidationMessage) {
            window.hideValidationMessage();
        }
    }

    addEventListeners() {
        const question = this.questions[this.currentQuestionIndex];
        
        if (question.type === 'multiple-choice') {
            const radioButtons = document.querySelectorAll(`input[name="question_${question.id}"]`);
            radioButtons.forEach(radio => {
                radio.addEventListener('change', () => {
                    this.answers[question.id] = radio.value;
                    this.updateSelectedOption();
                    this.updateNavigationButtons();
                });
            });

            // Handle option div clicks
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const radio = option.querySelector('input[type="radio"]');
                    if (radio) {
                        radio.checked = true;
                        this.answers[question.id] = radio.value;
                        this.updateSelectedOption();
                        this.updateNavigationButtons();
                    }
                });
            });
        } else if (question.type === 'text') {
            const textarea = document.querySelector(`textarea[name="question_${question.id}"]`);
            textarea.addEventListener('input', () => {
                this.answers[question.id] = textarea.value;
                this.updateNavigationButtons();
            });
        }
    }

    updateSelectedOption() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            const radio = option.querySelector('input[type="radio"]');
            if (radio && radio.checked) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    updateProgress() {
        // Actualizar progress bar usando la función global
        if (window.updateProgressBar) {
            window.updateProgressBar(this.currentQuestionIndex + 1, this.questions.length);
        }
        
        // Fallback si la función global no está disponible
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        const progressBar = document.querySelector('.progress-bar');
        
        if (progressFill && progressPercentage) {
            const percentage = Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100);
            progressFill.style.width = `${percentage}%`;
            progressPercentage.textContent = `${percentage}%`;
            
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', percentage);
            }
        }
    }

    updateQuestionCounter() {
        const currentElement = document.getElementById('currentQuestion');
        const totalElement = document.getElementById('totalQuestions');
        
        if (currentElement) {
            currentElement.textContent = this.currentQuestionIndex + 1;
        }
        
        if (totalElement) {
            totalElement.textContent = this.questions.length;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        // Previous button
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }

        // Next/Submit button
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        const hasAnswer = this.hasCurrentAnswer();

        if (isLastQuestion) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) {
                submitBtn.style.display = 'inline-flex';
                submitBtn.disabled = !hasAnswer;
            }
        } else {
            if (nextBtn) {
                nextBtn.style.display = 'inline-flex';
                nextBtn.disabled = !hasAnswer;
            }
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    hasCurrentAnswer() {
        const questionId = this.questions[this.currentQuestionIndex].id;
        const answer = this.answers[questionId];
        
        if (this.questions[this.currentQuestionIndex].type === 'text') {
            return answer && answer.trim().length > 0;
        }
        
        return answer !== undefined && answer !== '';
    }

    nextQuestion() {
        if (!this.hasCurrentAnswer()) {
            if (window.showValidationMessage) {
                window.showValidationMessage('Por favor, selecciona una respuesta antes de continuar.');
            }
            return;
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.updateProgress();
            this.updateQuestionCounter();
            
            // Scroll to top suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
            this.updateProgress();
            this.updateQuestionCounter();
            
            // Scroll to top suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    submitSurvey() {
        if (!this.hasCurrentAnswer()) {
            if (window.showValidationMessage) {
                window.showValidationMessage('Por favor, completa la respuesta antes de enviar.');
            }
            return;
        }

        if (Object.keys(this.answers).length === this.questions.length) {
            this.showResults();
        } else {
            if (window.showValidationMessage) {
                window.showValidationMessage('Por favor, responde todas las preguntas antes de enviar.');
            }
        }
    }

    showResults() {
        document.querySelector('.survey-container').style.display = 'none';
        document.getElementById('resultsContainer').style.display = 'block';
        
        const resultsManager = new Results(this.answers, this.questions);
        resultsManager.displayResults();
        
        // Scroll to top suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    restart() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        document.querySelector('.survey-container').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
        this.renderQuestion();
        this.updateProgress();
        this.updateQuestionCounter();
        
        // Scroll to top suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Survey();
});