class Results {
    constructor(answers, questions) {
        this.answers = answers;
        this.questions = questions;
    }

    displayResults() {
        const resultsContent = document.getElementById('resultsContent');
        let resultsHtml = '<div class="results-summary">';

        // Análisis de familiaridad con IA
        const familiarityLevel = this.getFamiliarityLevel();
        resultsHtml += this.createResultSection(
            '🎯 Tu nivel de familiaridad con IA generativa',
            this.getFamiliarityDescription(familiarityLevel)
        );

        // Análisis de uso
        const usagePattern = this.getUsagePattern();
        resultsHtml += this.createResultSection(
            '📈 Tu patrón de uso',
            this.getUsageDescription(usagePattern)
        );

        // Perspectiva sobre beneficios
        const benefits = this.getBenefitsPerspective();
        resultsHtml += this.createResultSection(
            '✨ Tu perspectiva sobre beneficios',
            benefits
        );

        // Preocupaciones principales
        const concerns = this.getConcernsPerspective();
        resultsHtml += this.createResultSection(
            '⚠️ Tus principales preocupaciones',
            concerns
        );

        // Visión del futuro
        const futureOutlook = this.getFutureOutlook();
        resultsHtml += this.createResultSection(
            '🔮 Tu visión del futuro',
            futureOutlook
        );

        // Comentario personal si existe
        if (this.answers[10] && this.answers[10].trim()) {
            resultsHtml += this.createResultSection(
                '💭 Tu comentario personal',
                `"${this.answers[10]}"`
            );
        }

        resultsHtml += '</div>';
        resultsContent.innerHTML = resultsHtml;
    }

    createResultSection(title, content) {
        return `
            <div class="result-item">
                <h4>${title}</h4>
                <p>${content}</p>
            </div>
        `;
    }

    getFamiliarityLevel() {
        return this.answers[1] || 'nada_familiarizado';
    }

    getFamiliarityDescription(level) {
        const descriptions = {
            'muy_familiarizado': 'Eres un usuario avanzado de IA generativa. Tienes experiencia práctica y comprendes bien las capacidades y limitaciones de estas herramientas.',
            'algo_familiarizado': 'Tienes una experiencia moderada con IA generativa. Has explorado sus funcionalidades y entiendes su potencial básico.',
            'poco_familiarizado': 'Estás en las primeras etapas de conocimiento sobre IA generativa. Tienes una comprensión básica pero limitada experiencia práctica.',
            'nada_familiarizado': 'La IA generativa es un territorio nuevo para ti. Esta encuesta te ha introducido a conceptos que pueden ser completamente nuevos.'
        };
        return descriptions[level] || descriptions['nada_familiarizado'];
    }

    getUsagePattern() {
        const tools = this.answers[2] || 'ninguna';
        const frequency = this.answers[3] || 'nunca';
        const purpose = this.answers[4] || 'trabajo';

        return { tools, frequency, purpose };
    }

    getUsageDescription(pattern) {
        const toolDescriptions = {
            'chatgpt': 'Te enfocas principalmente en herramientas de texto como ChatGPT',
            'copilot': 'Utilizas IA para programación con GitHub Copilot',
            'midjourney': 'Te interesan las herramientas de generación visual',
            'multiple': 'Eres un usuario versátil que utiliza múltiples herramientas',
            'ninguna': 'Aún no has explorado estas herramientas prácticamente'
        };

        const frequencyDescriptions = {
            'diariamente': 'y las usas diariamente',
            'semanalmente': 'y las usas regularmente',
            'mensualmente': 'con uso ocasional',
            'ocasionalmente': 'de forma esporádica',
            'nunca': 'pero aún no las has usado'
        };

        const purposeDescriptions = {
            'trabajo': 'enfocándote en productividad laboral',
            'educacion': 'priorizando el aprendizaje',
            'creatividad': 'explorando la creatividad',
            'entretenimiento': 'buscando entretenimiento',
            'investigacion': 'realizando investigación'
        };

        return `${toolDescriptions[pattern.tools]} ${frequencyDescriptions[pattern.frequency]}, ${purposeDescriptions[pattern.purpose]}.`;
    }

    getBenefitsPerspective() {
        const benefit = this.answers[5];
        const descriptions = {
            'eficiencia': 'Valoras principalmente cómo la IA puede hacer tu trabajo más eficiente y productivo.',
            'creatividad': 'Ves a la IA como una herramienta para potenciar la creatividad humana.',
            'accesibilidad': 'Aprecias cómo la IA democratiza el acceso a capacidades avanzadas.',
            'aprendizaje': 'Reconoces el potencial de la IA para transformar la educación y el aprendizaje.',
            'automatizacion': 'Te enfocas en los beneficios de automatizar tareas repetitivas.'
        };
        return descriptions[benefit] || 'Tienes una perspectiva equilibrada sobre los beneficios de la IA.';
    }

    getConcernsPerspective() {
        const concern = this.answers[6];
        const descriptions = {
            'empleos': 'Te preocupa principalmente el impacto en el empleo y el mercado laboral.',
            'desinformacion': 'Tu mayor inquietud es la propagación de información falsa y deepfakes.',
            'privacidad': 'Priorizas las preocupaciones sobre privacidad y protección de datos.',
            'dependencia': 'Te inquieta que podamos volvernos demasiado dependientes de la tecnología.',
            'etica': 'Te enfocas en la necesidad de marcos éticos y regulatorios apropiados.'
        };
        return descriptions[concern] || 'Tienes preocupaciones equilibradas sobre los riesgos de la IA.';
    }

    getFutureOutlook() {
        const outlook = this.answers[9];
        const descriptions = {
            'muy_optimista': 'Tienes una visión muy positiva del futuro de la IA generativa y crees que revolucionará muchos aspectos de la vida.',
            'optimista': 'Mantienes una perspectiva optimista, creyendo que los beneficios superarán los problemas.',
            'neutral': 'Adoptas una postura equilibrada, reconociendo tanto oportunidades como desafíos.',
            'preocupado': 'Tienes reservas sobre el desarrollo futuro y crees que los riesgos podrían superar los beneficios.',
            'muy_preocupado': 'Mantienes serias preocupaciones sobre las consecuencias futuras de la IA generativa.'
        };
        return descriptions[outlook] || 'Tienes una perspectiva reflexiva sobre el futuro de la IA.';
    }
}

function calculateResults(answers) {
    const results = {};
    answers.forEach(answer => {
        if (results[answer]) {
            results[answer]++;
        } else {
            results[answer] = 1;
        }
    });
    return results;
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    for (const [answer, count] of Object.entries(results)) {
        const resultItem = document.createElement('div');
        resultItem.textContent = `${answer}: ${count}`;
        resultsContainer.appendChild(resultItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const answers = JSON.parse(localStorage.getItem('surveyAnswers')) || [];
    const results = calculateResults(answers);
    displayResults(results);
});