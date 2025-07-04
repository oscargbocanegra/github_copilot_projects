// Funcionalidades de exportación
class ExportManager {
    constructor() {
        this.formats = ['pdf', 'image', 'json'];
    }

    exportResults(format, responses) {
        switch (format) {
            case 'pdf':
                this.exportToPDF(responses);
                break;
            case 'image':
                this.exportToImage(responses);
                break;
            case 'json':
                this.exportToJSON(responses);
                break;
            default:
                console.warn('Formato de exportación no soportado:', format);
        }
    }

    exportToJSON(responses) {
        const data = {
            timestamp: new Date().toISOString(),
            responses: responses,
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        this.downloadFile(blob, 'encuesta-ia-resultados.json');
    }

    exportToPDF(responses) {
        // Simulación de exportación PDF
        console.log('Exportando a PDF...', responses);
        alert('Funcionalidad de PDF en desarrollo. Usa JSON por ahora.');
    }

    exportToImage(responses) {
        // Simulación de exportación a imagen
        console.log('Exportando a imagen...', responses);
        alert('Funcionalidad de imagen en desarrollo. Usa JSON por ahora.');
    }

    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
