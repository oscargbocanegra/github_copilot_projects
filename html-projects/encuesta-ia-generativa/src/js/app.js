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
    const survey = new Survey();
    
    // Event listeners para navegación
    document.getElementById('nextBtn').addEventListener('click', () => {
        survey.nextQuestion();
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        survey.previousQuestion();
    });
    
    document.getElementById('submitBtn').addEventListener('click', () => {
        survey.submitSurvey();
    });
    
    document.getElementById('restartBtn').addEventListener('click', () => {
        survey.restart();
    });

    // Agregar efectos visuales
    addVisualEffects();
});

function addVisualEffects() {
    // Efecto de hover en botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Animación suave al cambiar preguntas
    const questionContainer = document.getElementById('questionContainer');
    const observer = new MutationObserver(() => {
        questionContainer.style.opacity = '0';
        setTimeout(() => {
            questionContainer.style.opacity = '1';
        }, 100);
    });
    
    observer.observe(questionContainer, { childList: true });
}

// Función para guardar progreso en localStorage (opcional)
function saveProgress(survey) {
    localStorage.setItem('surveyProgress', JSON.stringify({
        currentQuestionIndex: survey.currentQuestionIndex,
        answers: survey.answers
    }));
}

// Función para cargar progreso desde localStorage (opcional)
function loadProgress(survey) {
    const saved = localStorage.getItem('surveyProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        survey.currentQuestionIndex = progress.currentQuestionIndex;
        survey.answers = progress.answers;
        return true;
    }
    return false;
}