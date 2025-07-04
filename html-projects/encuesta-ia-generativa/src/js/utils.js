// Utilidades generales para la encuesta
class Utils {
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Funciones globales de validación
window.showValidationMessage = function(message) {
    const validationMessage = document.getElementById('validationMessage');
    const validationText = validationMessage.querySelector('.validation-text');
    
    if (validationText) {
        validationText.textContent = message;
        validationMessage.style.display = 'flex';
        validationMessage.setAttribute('aria-hidden', 'false');
    }
};

window.hideValidationMessage = function() {
    const validationMessage = document.getElementById('validationMessage');
    if (validationMessage) {
        validationMessage.style.display = 'none';
        validationMessage.setAttribute('aria-hidden', 'true');
    }
};

window.updateProgressBar = function(current, total) {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressFill && progressPercentage) {
        const percentage = Math.round((current / total) * 100);
        progressFill.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage}%`;
        
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', percentage);
        }
    }
};