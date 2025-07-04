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

        // Language selector - CORREGIDO
        this.setupLanguageSelector();

        // Export y Share controls
        this.setupExportShareControls();
    }

    setupLanguageSelector() {
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                languageDropdown.classList.toggle('active');
            });

            languageOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = e.target.dataset.lang;
                    if (lang) {
                        this.setLanguage(lang);
                        languageDropdown.classList.remove('active');
                        this.updateLanguageDisplay(lang);
                    }
                });
            });

            // Cerrar dropdown al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-selector')) {
                    languageDropdown.classList.remove('active');
                }
            });
        }
    }

    setupExportShareControls() {
        // Export controls
        const exportBtn = document.getElementById('exportBtn');
        const exportMenu = document.getElementById('exportMenu');
        const shareBtn = document.getElementById('shareBtn');
        const shareMenu = document.getElementById('shareMenu');

        if (exportBtn && exportMenu) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                exportMenu.classList.toggle('active');
            });

            exportMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('dropdown-item')) {
                    e.preventDefault();
                    const format = e.target.dataset.format;
                    this.exportResults(format);
                    exportMenu.classList.remove('active');
                }
            });
        }

        if (shareBtn && shareMenu) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                shareMenu.classList.toggle('active');
            });

            shareMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('dropdown-item')) {
                    e.preventDefault();
                    const platform = e.target.dataset.platform;
                    this.shareResults(platform);
                    shareMenu.classList.remove('active');
                }
            });
        }

        // Cerrar dropdowns al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.export-dropdown') && exportMenu) {
                exportMenu.classList.remove('active');
            }
            if (!e.target.closest('.share-dropdown') && shareMenu) {
                shareMenu.classList.remove('active');
            }
        });
    }

    setLanguage(lang) {
        const translations = {
            es: {
                title: "🤖 Encuesta sobre IA Generativa",
                description: "Ayúdanos a entender cómo se está utilizando la Inteligencia Artificial Generativa",
                next: "Siguiente",
                previous: "Anterior",
                submit: "Enviar Encuesta",
                restart: "Realizar de nuevo"
            },
            en: {
                title: "🤖 Generative AI Survey",
                description: "Help us understand how Generative Artificial Intelligence is being used",
                next: "Next",
                previous: "Previous", 
                submit: "Submit Survey",
                restart: "Take again"
            },
            fr: {
                title: "🤖 Enquête sur l'IA Générative",
                description: "Aidez-nous à comprendre comment l'Intelligence Artificielle Générative est utilisée",
                next: "Suivant",
                previous: "Précédent",
                submit: "Soumettre l'enquête",
                restart: "Recommencer"
            }
        };

        const texts = translations[lang] || translations.es;
        
        // Actualizar textos principales
        const titleElement = document.querySelector('header h1');
        const descElement = document.querySelector('header p');
        
        if (titleElement) titleElement.textContent = texts.title;
        if (descElement) descElement.textContent = texts.description;
        
        // Actualizar botones
        this.updateButtonTexts(texts);
        
        // Guardar idioma seleccionado
        localStorage.setItem('selectedLanguage', lang);
        
        this.showToast(`Idioma cambiado a ${lang.toUpperCase()}`, 'success');
    }

    updateButtonTexts(texts) {
        const nextBtn = document.querySelector('#nextBtn .btn-text');
        const prevBtn = document.querySelector('#prevBtn .btn-text');
        const submitBtn = document.querySelector('#submitBtn .btn-text');
        const restartBtn = document.querySelector('#restartBtn .btn-text');
        
        if (nextBtn) nextBtn.textContent = texts.next;
        if (prevBtn) prevBtn.textContent = texts.previous;
        if (submitBtn) submitBtn.textContent = texts.submit;
        if (restartBtn) restartBtn.textContent = texts.restart;
    }

    updateLanguageDisplay(lang) {
        const languageToggle = document.getElementById('languageToggle');
        const languageOptions = document.querySelectorAll('.language-option');
        
        // Actualizar el texto del botón
        const codes = { es: 'ES', en: 'EN', fr: 'FR' };
        if (languageToggle) {
            languageToggle.innerHTML = `🌐 ${codes[lang] || 'ES'}`;
        }
        
        // Actualizar clases activas
        languageOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });
    }

    exportResults(format) {
        const responses = window.surveyInstance ? window.surveyInstance.getResponses() : {};
        
        switch(format) {
            case 'json':
                this.downloadJSON(responses);
                break;
            case 'pdf':
                this.showToast('Funcionalidad PDF en desarrollo', 'info');
                break;
            case 'image':
                this.downloadImage();
                break;
        }
    }

    downloadJSON(data) {
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encuesta-ia-resultados.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('Resultados descargados en JSON', 'success');
    }

    downloadImage() {
        // Capturar el contenedor de resultados como imagen
        const resultsContainer = document.getElementById('resultsContent');
        if (resultsContainer) {
            this.showToast('Funcionalidad de imagen en desarrollo', 'info');
        }
    }

    shareResults(platform) {
        switch(platform) {
            case 'link':
                this.copyToClipboard(window.location.href);
                this.showToast('Enlace copiado al portapapeles', 'success');
                break;
            case 'email':
                this.shareByEmail();
                break;
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    shareByEmail() {
        const subject = 'Resultados de Encuesta IA Generativa';
        const body = 'He completado la encuesta sobre IA Generativa. Revisa los resultados en: ' + window.location.href;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }

    restartSurvey() {
        if (window.surveyInstance) {
            window.surveyInstance.restart();
            this.showToast('Encuesta reiniciada correctamente', 'success');
        } else {
            // Si no existe surveyInstance, reiniciar manualmente
            this.manualRestart();
            this.showToast('Encuesta reiniciada', 'success');
        }
    }

    manualRestart() {
        // Limpiar localStorage
        localStorage.removeItem('surveyResponses');
        localStorage.removeItem('surveyCompleted');
        localStorage.removeItem('surveyCompletedDate');
        
        // Mostrar formulario y ocultar resultados
        const surveyForm = document.getElementById('surveyForm');
        const resultsContainer = document.getElementById('resultsContainer');
        
        if (surveyForm) {
            surveyForm.style.display = 'block';
        }
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        
        // Reinicializar la encuesta si existe
        if (window.Survey) {
            // Crear nueva instancia de Survey
            window.surveyInstance = new Survey();
        } else {
            // Recargar la página como último recurso
            window.location.reload();
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
            background: ${type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#f44336'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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
    
    // Restaurar idioma guardado
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && window.surveyApp) {
        // Usar setTimeout para asegurar que la app esté completamente inicializada
        setTimeout(() => {
            window.surveyApp.setLanguage(savedLanguage);
            window.surveyApp.updateLanguageDisplay(savedLanguage);
        }, 100);
    }
});