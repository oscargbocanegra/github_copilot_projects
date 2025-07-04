// app.js - Aplicación principal simplificada

class SurveyApp {
    constructor() {
        this.survey = null;
        this.themeManager = null;
        this.init();
    }

    async init() {
        try {
            // Inicializar theme manager
            this.themeManager = new ThemeManager();
            
            // Configurar event listeners básicos
            this.setupBasicEventListeners();
            
            console.log('✅ SurveyApp inicializada');
        } catch (error) {
            console.error('❌ Error al inicializar app:', error);
        }
    }

    setupBasicEventListeners() {
        // Restart button
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartSurvey();
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeManager.toggleTheme();
            });
        }
    }

    restartSurvey() {
        if (window.surveyInstance) {
            window.surveyInstance.restart();
        }
    }

    showToast(message, type = 'success') {
        // Crear toast simple
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Mostrar
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // Ocultar y remover
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Theme Manager simplificado
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateThemeIcon();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.surveyApp = new SurveyApp();
});