// Funcionalidades de compartir
class ShareManager {
    constructor() {
        this.baseUrl = window.location.origin + window.location.pathname;
    }

    shareResults(platform, responses) {
        switch (platform) {
            case 'link':
                this.copyToClipboard();
                break;
            case 'email':
                this.shareByEmail(responses);
                break;
            default:
                console.warn('Plataforma de compartir no soportada:', platform);
        }
    }

    shareToSocial(platform) {
        const text = encodeURIComponent('¡He completado la Encuesta sobre IA Generativa! 🤖');
        const url = encodeURIComponent(this.baseUrl);
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            default:
                console.warn('Plataforma social no soportada:', platform);
                return;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.baseUrl);
            this.showToast('¡Enlace copiado al portapapeles!', 'success');
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err);
            this.showToast('Error al copiar el enlace', 'error');
        }
    }

    shareByEmail(responses) {
        const subject = encodeURIComponent('Resultados de Encuesta IA Generativa');
        const body = encodeURIComponent(`He completado la encuesta sobre IA Generativa.\n\nVer encuesta: ${this.baseUrl}`);
        
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    showToast(message, type = 'success') {
        // Usar el sistema de toast del app principal
        if (window.app && window.app.showToast) {
            window.app.showToast(message, type);
        } else {
            console.log(`Toast ${type}: ${message}`);
        }
    }
}