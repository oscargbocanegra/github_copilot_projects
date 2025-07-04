class ResultsManager {
    constructor() {
        this.resultsContent = document.getElementById('resultsContent');
    }

    processResults(responses) {
        const analysis = this.analyzeResponses(responses);
        const insights = this.generateInsights(analysis);
        const recommendations = this.generateRecommendations(analysis);
        
        return {
            analysis,
            insights,
            recommendations,
            timestamp: new Date().toISOString(),
            totalResponses: Object.keys(responses).length
        };
    }

    analyzeResponses(responses) {
        const analysis = {
            familiarityLevel: this.analyzeFamiliarity(responses[1]),
            toolsUsed: this.analyzeTools(responses[2]),
            workSector: responses[3],
            usageFrequency: responses[4],
            mainTasks: this.analyzeMainTasks(responses[5]),
            mainBenefit: responses[6],
            mainConcern: responses[7],
            industryImpact: responses[8],
            paymentWillingness: responses[9],
            additionalComments: responses[10] || ''
        };

        return analysis;
    }

    analyzeFamiliarity(response) {
        const levels = {
            'Nunca he usado IA generativa': 0,
            'He probado algunas herramientas básicas': 1,
            'Uso IA generativa ocasionalmente': 2,
            'Uso IA generativa regularmente': 3,
            'Soy experto/a en IA generativa': 4
        };
        
        return {
            level: levels[response] || 0,
            description: response,
            category: this.getFamiliarityCategory(levels[response] || 0)
        };
    }

    getFamiliarityCategory(level) {
        if (level === 0) return 'Principiante';
        if (level <= 1) return 'Explorador';
        if (level <= 2) return 'Usuario Ocasional';
        if (level <= 3) return 'Usuario Avanzado';
        return 'Experto';
    }

    analyzeTools(tools) {
        if (!Array.isArray(tools)) tools = [tools];
        
        const categories = {
            'Conversacional': ['ChatGPT (OpenAI)', 'Claude (Anthropic)', 'Gemini (Google)'],
            'Visual': ['DALL-E / Midjourney'],
            'Programación': ['GitHub Copilot'],
            'Otros': ['Otra herramienta'],
            'Ninguno': ['Ninguna']
        };

        const usage = {};
        Object.keys(categories).forEach(category => {
            usage[category] = tools.some(tool => categories[category].includes(tool));
        });

        return {
            tools,
            categories: usage,
            count: tools.length,
            diversity: Object.values(usage).filter(Boolean).length
        };
    }

    analyzeMainTasks(tasks) {
        if (!Array.isArray(tasks)) tasks = [tasks];
        
        const taskCategories = {
            'Creativo': ['Generación de texto y contenido', 'Diseño y creatividad'],
            'Técnico': ['Programación y desarrollo', 'Análisis de datos'],
            'Comunicación': ['Traducción'],
            'Investigación': ['Investigación', 'Educación y aprendizaje'],
            'Productividad': ['Automatización de tareas']
        };

        const usage = {};
        Object.keys(taskCategories).forEach(category => {
            usage[category] = tasks.some(task => taskCategories[category].includes(task));
        });

        return {
            tasks,
            categories: usage,
            primaryFocus: this.getPrimaryTaskFocus(usage)
        };
    }

    getPrimaryTaskFocus(usage) {
        const activeCategories = Object.entries(usage)
            .filter(([category, active]) => active)
            .map(([category]) => category);
        
        if (activeCategories.length === 0) return 'No definido';
        if (activeCategories.length === 1) return activeCategories[0];
        if (activeCategories.includes('Técnico') && activeCategories.includes('Creativo')) {
            return 'Híbrido Técnico-Creativo';
        }
        return 'Multidisciplinario';
    }

    generateInsights(analysis) {
        const insights = [];

        // Insight sobre nivel de adopción
        if (analysis.familiarityLevel.level >= 3) {
            insights.push({
                type: 'positive',
                title: 'Alto Nivel de Adopción',
                description: 'Demuestras un nivel avanzado de familiaridad con la IA generativa, lo que te posiciona bien para aprovechar las próximas innovaciones.',
                icon: '🚀'
            });
        } else if (analysis.familiarityLevel.level <= 1) {
            insights.push({
                type: 'opportunity',
                title: 'Oportunidad de Exploración',
                description: 'Hay un gran potencial para explorar más herramientas de IA generativa que podrían beneficiar tu trabajo.',
                icon: '💡'
            });
        }

        // Insight sobre diversidad de herramientas
        if (analysis.toolsUsed.diversity >= 3) {
            insights.push({
                type: 'positive',
                title: 'Usuario Diversificado',
                description: 'Utilizas una amplia gama de herramientas de IA, lo que indica una comprensión integral del ecosistema.',
                icon: '🎯'
            });
        }

        // Insight sobre enfoque de tareas
        if (analysis.mainTasks.primaryFocus === 'Híbrido Técnico-Creativo') {
            insights.push({
                type: 'insight',
                title: 'Perfil Híbrido',
                description: 'Tu uso combina aspectos técnicos y creativos, una combinación muy valiosa en el mercado actual.',
                icon: '⚡'
            });
        }

        // Insight sobre sector
        const sectorInsights = this.getSectorInsights(analysis.workSector);
        if (sectorInsights) {
            insights.push(sectorInsights);
        }

        return insights;
    }

    getSectorInsights(sector) {
        const sectorData = {
            'Tecnología y Software': {
                type: 'positive',
                title: 'Sector Líder en IA',
                description: 'El sector tecnológico está a la vanguardia de la adopción de IA generativa.',
                icon: '💻'
            },
            'Educación': {
                type: 'insight',
                title: 'Transformación Educativa',
                description: 'La IA generativa está revolucionando los métodos de enseñanza y aprendizaje.',
                icon: '📚'
            },
            'Marketing y Publicidad': {
                type: 'opportunity',
                title: 'Creatividad Potenciada',
                description: 'Tu sector puede beneficiarse enormemente de las capacidades creativas de la IA.',
                icon: '🎨'
            }
        };

        return sectorData[sector] || null;
    }

    generateRecommendations(analysis) {
        const recommendations = [];

        // Recomendaciones basadas en familiaridad
        if (analysis.familiarityLevel.level <= 1) {
            recommendations.push({
                priority: 'high',
                title: 'Comienza con ChatGPT',
                description: 'Empieza explorando ChatGPT para tareas básicas de escritura y análisis.',
                action: 'Dedica 30 minutos diarios durante una semana'
            });
        } else if (analysis.familiarityLevel.level >= 3) {
            recommendations.push({
                priority: 'medium',
                title: 'Explora APIs y Automatización',
                description: 'Considera integrar APIs de IA en tus flujos de trabajo para mayor eficiencia.',
                action: 'Investiga herramientas de automatización'
            });
        }

        // Recomendaciones basadas en herramientas
        if (!analysis.toolsUsed.categories['Visual'] && analysis.mainTasks.categories['Creativo']) {
            recommendations.push({
                priority: 'medium',
                title: 'Prueba Herramientas Visuales',
                description: 'DALL-E o Midjourney podrían complementar tu trabajo creativo.',
                action: 'Experimenta con generación de imágenes'
            });
        }

        if (!analysis.toolsUsed.categories['Programación'] && analysis.workSector === 'Tecnología y Software') {
            recommendations.push({
                priority: 'high',
                title: 'GitHub Copilot para Desarrollo',
                description: 'Como trabajas en tecnología, GitHub Copilot podría acelerar significativamente tu productividad.',
                action: 'Prueba la extensión en tu IDE'
            });
        }

        // Recomendaciones basadas en sector
        const sectorRecs = this.getSectorRecommendations(analysis.workSector);
        recommendations.push(...sectorRecs);

        return recommendations.slice(0, 5); // Máximo 5 recomendaciones
    }

    getSectorRecommendations(sector) {
        const sectorRecs = {
            'Educación': [
                {
                    priority: 'high',
                    title: 'IA para Creación de Contenido Educativo',
                    description: 'Usa IA para generar ejercicios, explicaciones y material didáctico personalizado.',
                    action: 'Crea un plan de lección con ayuda de IA'
                }
            ],
            'Marketing y Publicidad': [
                {
                    priority: 'high',
                    title: 'Automatización de Copy',
                    description: 'Utiliza IA para generar variaciones de copy publicitario y contenido de redes sociales.',
                    action: 'Prueba generar 10 variaciones de un mismo anuncio'
                }
            ],
            'Salud y Medicina': [
                {
                    priority: 'medium',
                    title: 'IA para Documentación Médica',
                    description: 'Explora herramientas de IA especializadas en documentación y análisis médico.',
                    action: 'Investiga herramientas específicas del sector salud'
                }
            ]
        };

        return sectorRecs[sector] || [];
    }

    displayResults(results) {
        const { analysis, insights, recommendations } = results;
        
        this.resultsContent.innerHTML = `
            <div class="results-summary">
                ${this.renderSummaryCards(analysis)}
            </div>
            
            <div class="insights-section">
                <h3>📊 Insights Personalizados</h3>
                ${this.renderInsights(insights)}
            </div>
            
            <div class="recommendations-section">
                <h3>💡 Recomendaciones</h3>
                ${this.renderRecommendations(recommendations)}
            </div>
            
            <div class="detailed-analysis">
                <h3>📈 Análisis Detallado</h3>
                ${this.renderDetailedAnalysis(analysis)}
            </div>
        `;

        // Agregar animaciones a los elementos
        this.animateResults();
    }

    renderSummaryCards(analysis) {
        return `
            <div class="summary-cards">
                <div class="summary-card">
                    <div class="card-icon">👤</div>
                    <div class="card-content">
                        <h4>Tu Perfil</h4>
                        <p>${analysis.familiarityLevel.category}</p>
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="card-icon">🛠️</div>
                    <div class="card-content">
                        <h4>Herramientas</h4>
                        <p>${analysis.toolsUsed.count} utilizadas</p>
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="card-icon">🎯</div>
                    <div class="card-content">
                        <h4>Enfoque Principal</h4>
                        <p>${analysis.mainTasks.primaryFocus}</p>
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="card-icon">🏢</div>
                    <div class="card-content">
                        <h4>Sector</h4>
                        <p>${analysis.workSector}</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderInsights(insights) {
        return insights.map(insight => `
            <div class="insight-card ${insight.type}">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderRecommendations(recommendations) {
        return recommendations.map(rec => `
            <div class="recommendation-card priority-${rec.priority}">
                <div class="rec-priority">${rec.priority === 'high' ? '🔥' : '💡'}</div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <div class="rec-action">
                        <strong>Próximo paso:</strong> ${rec.action}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderDetailedAnalysis(analysis) {
        return `
            <div class="analysis-grid">
                <div class="analysis-item">
                    <h5>🔧 Herramientas Utilizadas</h5>
                    <ul>
                        ${analysis.toolsUsed.tools.map(tool => `<li>${tool}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="analysis-item">
                    <h5>📋 Tareas Principales</h5>
                    <ul>
                        ${analysis.mainTasks.tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="analysis-item">
                    <h5>✨ Principal Beneficio</h5>
                    <p>${analysis.mainBenefit}</p>
                </div>
                
                <div class="analysis-item">
                    <h5>⚠️ Principal Preocupación</h5>
                    <p>${analysis.mainConcern}</p>
                </div>
                
                ${analysis.additionalComments ? `
                    <div class="analysis-item full-width">
                        <h5>💭 Comentarios Adicionales</h5>
                        <p class="user-comment">"${analysis.additionalComments}"</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    animateResults() {
        const cards = this.resultsContent.querySelectorAll('.summary-card, .insight-card, .recommendation-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Agregar estilos CSS específicos para los resultados
const resultsStyles = `
<style>
.results-summary {
    margin-bottom: var(--space-2xl);
}

.summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
}

.summary-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(102, 126, 234, 0.1);
    border-radius: var(--radius-xl);
    padding: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-md);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
}

.summary-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

[data-theme="dark"] .summary-card {
    background: rgba(26, 32, 44, 0.9);
    border-color: rgba(102, 126, 234, 0.2);
}

.card-icon {
    font-size: var(--font-size-2xl);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-gradient);
    border-radius: var(--radius-full);
}

.card-content h4 {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: var(--space-xs);
}

.card-content p {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--text-primary);
}

.insights-section, .recommendations-section, .detailed-analysis {
    margin-bottom: var(--space-2xl);
}

.insights-section h3, .recommendations-section h3, .detailed-analysis h3 {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-lg);
}

.insight-card {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-lg);
    margin-bottom: var(--space-md);
    border-radius: var(--radius-xl);
    border-left: 4px solid;
}

.insight-card.positive {
    background: rgba(67, 233, 123, 0.1);
    border-left-color: var(--warning-green);
}

.insight-card.opportunity {
    background: rgba(79, 172, 254, 0.1);
    border-left-color: var(--success-cyan);
}

.insight-card.insight {
    background: rgba(102, 126, 234, 0.1);
    border-left-color: var(--primary-blue);
}

.insight-icon {
    font-size: var(--font-size-xl);
    flex-shrink: 0;
}

.insight-content h4 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
}

.insight-content p {
    color: var(--text-secondary);
    line-height: 1.6;
}

.recommendation-card {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-lg);
    margin-bottom: var(--space-md);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(102, 126, 234, 0.1);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .recommendation-card {
    background: rgba(26, 32, 44, 0.9);
    border-color: rgba(102, 126, 234, 0.2);
}

.recommendation-card.priority-high {
    border-left: 4px solid var(--accent-coral);
}

.recommendation-card.priority-medium {
    border-left: 4px solid var(--primary-blue);
}

.rec-priority {
    font-size: var(--font-size-xl);
    flex-shrink: 0;
}

.rec-content h4 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
}

.rec-content p {
    color: var(--text-secondary);
    margin-bottom: var(--space-sm);
    line-height: 1.6;
}

.rec-action {
    background: rgba(102, 126, 234, 0.1);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
}

.rec-action strong {
    color: var(--primary-blue);
}

.analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-lg);
}

.analysis-item {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(102, 126, 234, 0.1);
    border-radius: var(--radius-xl);
    padding: var(--space-lg);
}

[data-theme="dark"] .analysis-item {
    background: rgba(26, 32, 44, 0.9);
    border-color: rgba(102, 126, 234, 0.2);
}

.analysis-item.full-width {
    grid-column: 1 / -1;
}

.analysis-item h5 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-md);
}

.analysis-item ul {
    list-style: none;
    padding: 0;
}

.analysis-item li {
    padding: var(--space-xs) 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: var(--space-lg);
}

.analysis-item li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--primary-blue);
    font-weight: bold;
}

.user-comment {
    font-style: italic;
    color: var(--text-secondary);
    background: rgba(102, 126, 234, 0.05);
    padding: var(--space-md);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--primary-blue);
}

@media (max-width: 768px) {
    .summary-cards {
        grid-template-columns: 1fr;
    }
    
    .analysis-grid {
        grid-template-columns: 1fr;
    }
    
    .summary-card {
        padding: var(--space-md);
    }
    
    .insight-card,
    .recommendation-card,
    .analysis-item {
        padding: var(--space-md);
    }
}
</style>
`;

// Insertar estilos en el head
if (!document.getElementById('results-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'results-styles';
    styleElement.innerHTML = resultsStyles;
    document.head.appendChild(styleElement);
}