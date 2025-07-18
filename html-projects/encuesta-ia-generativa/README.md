# 🤖 Encuesta Interactiva sobre IA Generativa

Una encuesta web moderna e interactiva diseñada para recopilar opiniones, experiencias y perspectivas sobre la
Inteligencia Artificial Generativa. El proyecto utiliza tecnologías web estándar (HTML5, CSS3, JavaScript ES6)
para ofrecer una experiencia de usuario fluida y atractiva.

## ✨ Características Principales

- **🎨 Interfaz Moderna**: Diseño contemporáneo con gradientes, animaciones y efectos visuales
- **📱 Responsive Design**: Completamente adaptable a dispositivos móviles y desktop
- **🔄 Navegación Fluida**: Sistema de navegación intuitivo con validación en tiempo real
- **📊 Análisis Personalizado**: Resultados detallados basados en las respuestas del usuario
- **⚡ Interactividad**: Efectos hover, animaciones suaves y feedback visual inmediato
- **🎯 10 Preguntas Estratégicas**: Cubre todos los aspectos importantes de la IA generativa

## 🏗️ Estructura del Proyecto

```text
encuesta-ia-generativa/
├── src/
│   ├── index.html              # Página principal de la encuesta
│   ├── css/
│   │   └── styles.css          # Estilos modernos con gradientes y animaciones
│   ├── js/
│   │   ├── app.js              # Inicialización y control principal
│   │   ├── survey.js           # Lógica de navegación y manejo de preguntas
│   │   └── results.js          # Análisis y visualización de resultados
│   └── data/
│       └── questions.json      # Base de datos de preguntas en JSON
├── assets/
│   └── fonts/                  # Fuentes personalizadas (opcional)
└── README.md                   # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, recomendado para evitar errores CORS)

### Ejecución Rápida

```bash
# 1. Clona el repositorio
git clone [url-del-repositorio]
cd encuesta-ia-generativa

# 2. Opción A: Abrir directamente
# Abre src/index.html en tu navegador

# 3. Opción B: Usar servidor local (recomendado)
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con Live Server (VS Code)
# Instala la extensión Live Server y haz clic derecho > "Open with Live Server"
```

### Acceso

- Servidor local: `http://localhost:8000/src/`
- Directamente: Abrir `src/index.html` en el navegador

## 📋 Preguntas de la Encuesta

La encuesta incluye 10 preguntas estratégicamente diseñadas:

1. **Nivel de Familiaridad** - Evalúa el conocimiento previo del usuario
2. **Herramientas Utilizadas** - Identifica las plataformas de IA que ha usado
3. **Frecuencia de Uso** - Determina los patrones de uso
4. **Propósito Principal** - Comprende las motivaciones de uso
5. **Beneficios Percibidos** - Evalúa las ventajas identificadas
6. **Principales Preocupaciones** - Identifica los riesgos percibidos
7. **Opinión sobre Regulación** - Perspectiva sobre control gubernamental
8. **Área de Mayor Impacto** - Sectores con mayor potencial
9. **Visión del Futuro** - Expectativas a 5 años
10. **Comentarios Libres** - Espacio para reflexiones adicionales

## 🎨 Características de Diseño

### Paleta de Colores

- **Primarios**: Gradientes azul-púrpura (#667eea → #764ba2)
- **Secundarios**: Rosa-coral (#f093fb → #f5576c)
- **Éxito**: Cian-azul (#4facfe → #00f2fe)
- **Advertencia**: Verde (#43e97b → #38f9d7)

### Efectos Visuales

- **Animaciones CSS**: Transiciones suaves y micro-interacciones
- **Glassmorphism**: Efectos de vidrio esmerilado
- **Gradientes Dinámicos**: Fondos animados y elementos con profundidad
- **Shadows Avanzadas**: Sistema de elevación visual
- **Hover Effects**: Feedback inmediato en interacciones

## 🛠️ Tecnologías Utilizadas

### Frontend

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript ES6+**: Clases, Async/Await, Modules

### Características Técnicas

- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Funcionalidad básica sin JavaScript
- **Accesibilidad**: Navegación por teclado y lectores de pantalla
- **Performance**: Optimización de animaciones y carga

## 📊 Sistema de Resultados

El sistema de análisis proporciona:

### Análisis Personalizado

- **Perfil de Usuario**: Basado en familiaridad y uso
- **Patrones de Comportamiento**: Frecuencia y propósitos
- **Perspectiva de Beneficios**: Evaluación de ventajas percibidas
- **Análisis de Preocupaciones**: Identificación de riesgos
- **Visión Futura**: Clasificación de optimismo/pesimismo

### Métricas Incluidas

- Nivel de adopción tecnológica
- Categorización de usuario (Novato/Intermedio/Avanzado)
- Perfil de riesgo percibido
- Índice de optimismo futuro

## 🔧 Personalización

### Modificar Preguntas

Edita `src/data/questions.json`:

```json
{
  "id": 11,
  "type": "multiple-choice",
  "question": "Tu nueva pregunta aquí",
  "options": [
    {"value": "opcion1", "text": "Texto de la opción"}
  ]
}
```

### Personalizar Estilos

Modifica las variables CSS en `src/css/styles.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #tu-color1, #tu-color2);
  --accent-color: #tu-color-acento;
}
```

### Extender Funcionalidad

- **Nuevos tipos de pregunta**: Escala Likert, selección múltiple
- **Exportación de datos**: CSV, JSON, PDF
- **Integración con APIs**: Almacenamiento en base de datos
- **Analytics**: Seguimiento de interacciones

## 🌐 Compatibilidad

### Navegadores Soportados

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos

- 📱 **Móviles**: iOS Safari, Chrome Mobile, Samsung Internet
- 💻 **Desktop**: Todos los navegadores modernos
- 📟 **Tablets**: Optimizado para pantallas medianas

### Áreas Corregidas en esta Versión

- ✅ **Inicialización consistente**: Sistema unificado de inicialización
- ✅ **Referencias DOM corregidas**: Todos los IDs referenciados existen en HTML
- ✅ **Scripts simplificados**: Eliminadas dependencias circulares
- ✅ **Compatibilidad de clases**: Survey y App trabajan sin conflictos
- ✅ **Progress bar funcional**: Actualización correcta del progreso
- ✅ **Manejo de errores mejorado**: Fallbacks para componentes opcionales
- ✅ **Event listeners seguros**: Verificación de existencia de elementos
- ✅ **Theme switching funcional**: Sistema de temas simplificado

### Próximas Mejoras

- [ ] Modo oscuro/claro avanzado
- [ ] Exportación de resultados (PDF, JSON)
- [ ] Internacionalización completa
- [ ] Análisis de resultados más detallado
- [ ] Integración con analytics
- [ ] Tests automatizados
- [ ] PWA (Progressive Web App)

## 📈 Roadmap

### Versión 2.0

- **Análisis Avanzado**: Comparación con otros usuarios
- **Dashboard Admin**: Panel de control para administradores
- **API REST**: Backend para almacenamiento de datos
- **Machine Learning**: Análisis predictivo de respuestas

### Versión 2.1

- **Gamificación**: Sistema de puntos y logros
- **Social Sharing**: Compartir resultados en redes sociales
- **Reportes Avanzados**: Gráficos interactivos

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.

---

⭐ **¿Te gustó el proyecto?** ¡Dale una estrella en GitHub!
