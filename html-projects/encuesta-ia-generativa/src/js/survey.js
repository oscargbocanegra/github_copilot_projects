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
        }
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
                          placeholder="${question.placeholder}"
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
        const progressFill = document.getElementById('progressFill');
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    updateQuestionCounter() {
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.questions.length;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        // Previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;

        // Next/Submit button
        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        const hasAnswer = this.hasCurrentAnswer();

        if (isLastQuestion) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
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
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.updateProgress();
            this.updateQuestionCounter();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
            this.updateProgress();
            this.updateQuestionCounter();
        }
    }

    submitSurvey() {
        if (Object.keys(this.answers).length === this.questions.length) {
            this.showResults();
        }
    }

    showResults() {
        document.querySelector('.survey-container').style.display = 'none';
        document.getElementById('resultsContainer').style.display = 'block';
        
        const resultsManager = new Results(this.answers, this.questions);
        resultsManager.displayResults();
    }

    restart() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        document.querySelector('.survey-container').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
        this.renderQuestion();
        this.updateProgress();
        this.updateQuestionCounter();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Survey();
});