# 🧮 Calculadora Web - Versiones Disponibles

Una calculadora moderna y funcional desarrollada con HTML, CSS y JavaScript vanilla, disponible en dos versiones: básica y semántica con accesibilidad completa.

## 📁 Estructura del Proyecto

```
calculadora/
├── index.html                    # Versión básica funcional
├── index-semantico.html          # Versión semántica con accesibilidad
├── README.md                     # Esta documentación
├── css/
│   ├── styles.css               # Estilos para versión básica
│   └── styles-semantico.css     # Estilos para versión semántica
└── js/
    ├── calculator.js            # JavaScript versión básica
    └── calculator-semantico.js  # JavaScript con accesibilidad
```

## 🚀 Versiones Disponibles

### 📱 Versión Básica (`index.html`)
- Calculadora funcional estándar
- Interfaz moderna y responsive
- Operaciones matemáticas básicas
- Soporte para teclado

### ♿ Versión Semántica (`index-semantico.html`)
- **Accesibilidad completa** con ARIA y screen readers
- **Navegación por teclado** optimizada
- **Anuncios automáticos** de operaciones y resultados
- **HTML5 semántico** con roles y labels apropiados
- **Cumplimiento WCAG 2.1** para accesibilidad web

## ✨ Características Comunes

### Funcionalidades
- ✅ Operaciones básicas: suma (+), resta (-), multiplicación (×), división (/)
- ✅ Soporte para números decimales
- ✅ Función de limpiar (C) y borrar último dígito (⌫)
- ✅ Validación de división por cero
- ✅ Soporte completo para teclado
- ✅ Prevención de errores comunes
- ✅ Operaciones encadenadas
- ✅ Redondeo automático para precisión

### Diseño
- 🎨 Interfaz moderna con CSS Grid
- 📱 Diseño responsive (móviles y escritorio)
- ⚡ Animaciones suaves
- 🌈 Colores diferenciados por tipo de botón
- 🔍 Estados visuales claros

## 🌟 Características Específicas de la Versión Semántica

### Accesibilidad
- **Screen Reader Support**: Anuncios automáticos de operaciones
- **ARIA Labels**: Descriptivos para todos los elementos
- **Keyboard Navigation**: Navegación completa por teclado
- **Focus Management**: Indicadores visuales claros
- **Semantic HTML**: Roles y estructura apropiados
- **Live Regions**: Actualizaciones dinámicas anunciadas

### Mejoras UX
- **Anuncios Contextuales**: "Calculando...", "Resultado: X"
- **Validaciones Audibles**: Errores anunciados claramente
- **Estados de la Calculadora**: Visual y audible
- **Soporte Multi-modal**: Mouse, teclado y táctil

### Técnicas Implementadas
- `role="application"` para contexto de calculadora
- `aria-live="polite"` para anuncios no intrusivos
- `aria-atomic="true"` para anuncios completos
- Grid con `role="grid"` y `role="gridcell"`
- Screen reader only text con clase `.sr-only`

## 🎯 Uso Recomendado

### Para Desarrollo Estándar
**Usa `index.html`** si necesitas:
- Implementación rápida
- Funcionalidad básica
- Menor complejidad de código

### Para Proyectos Inclusivos
**Usa `index-semantico.html`** si necesitas:
- Cumplimiento de accesibilidad
- Soporte para usuarios con discapacidades
- Mejores prácticas de HTML semántico
- Proyectos gubernamentales o educativos

## 🚀 Cómo Usar

### Instalación
1. Clona o descarga el proyecto
2. Abre `index.html` (básica) o `index-semantico.html` (semántica)
3. ¡Listo para usar!

### Uso con Mouse/Táctil
- Haz clic en los números para ingresarlos
- Usa los operadores (+, -, ×, ÷) para operaciones
- Presiona = para calcular el resultado
- C para limpiar todo, ⌫ para borrar último dígito

### Uso con Teclado
- **Números**: 0-9
- **Operadores**: +, -, *, /
- **Calcular**: Enter o =
- **Limpiar**: Escape
- **Borrar**: Backspace
- **Decimal**: . (punto)

### Uso con Screen Reader
La versión semántica anuncia automáticamente:
- Números y operadores ingresados
- Estado de cálculos
- Resultados y errores
- Navegación por botones

## 🛠️ Tecnologías Utilizadas

### HTML5
- Estructura semántica con `<main>`, `<section>`, `<header>`
- Atributos ARIA para accesibilidad
- Roles semánticos (`application`, `grid`, `gridcell`)

### CSS3
- **Grid Layout** para botones
- **Custom Properties** (CSS Variables)
- **Media Queries** para responsive
- **Focus States** para accesibilidad
- **Hover Effects** y transiciones

### JavaScript ES6+
- **DOM Manipulation** moderna
- **Event Listeners** para teclado y mouse
- **ARIA Management** dinámico
- **State Management** robusto
- **Accessibility Announcements**

## 🧪 Testing de Accesibilidad

### Herramientas Recomendadas
```bash
# Chrome DevTools Lighthouse
# Ejecutar audit de accesibilidad

# axe-core browser extension
# Análisis automático de WCAG

# Screen reader testing
# NVDA (Windows), VoiceOver (Mac), Orca (Linux)
```

### Casos de Prueba
- [x] Navegación completa por teclado
- [x] Anuncios de screen reader apropiados
- [x] Contraste de colores suficiente
- [x] Estados de focus visibles
- [x] Elementos semánticamente correctos
- [x] Funcionalidad sin JavaScript (graceful degradation)

## 📊 Comparación de Versiones

| Característica | Básica | Semántica |
|----------------|--------|-----------|
| Funcionalidad matemática | ✅ | ✅ |
| Responsive design | ✅ | ✅ |
| Soporte teclado | ✅ | ✅+ |
| Screen readers | ❌ | ✅ |
| ARIA labels | ❌ | ✅ |
| Semantic HTML | Básico | Completo |
| WCAG 2.1 | Parcial | ✅ |
| Anuncios dinámicos | ❌ | ✅ |
| Estados visuales | Básico | Avanzado |

## 🔧 Comandos de Desarrollo

```bash
# Servir localmente
python -m http.server 8000
# o
npx live-server

# Validación HTML
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index-semantico.html \
     https://validator.w3.org/nu/?out=gnu

# Testing de accesibilidad
npm install -g axe-cli
axe http://localhost:8000/index-semantico.html
```

## 📚 Prompts de GitHub Copilot Utilizados

```
6. "Desarrolla una estructura HTML5 semántica para calculadora que incluya:
   - Container principal con clase 'calculator'
   - Display input con ID único para JavaScript
   - Grid de botones con onclick events específicos
   - Botones categorizados: números (0-9), operadores (+,-,*,/), funciones (C, ⌫, =)
   - Atributos de accesibilidad básicos"

7. "Crea una versión paralela"
```

## 🚀 Posibles Mejoras Futuras

### Para Ambas Versiones
- [ ] Funciones científicas (√, x², %)
- [ ] Historial de operaciones
- [ ] Temas de color personalizables
- [ ] Modo memoria (M+, M-, MR, MC)

### Específicas para Versión Semántica
- [ ] Soporte para múltiples idiomas
- [ ] Configuración de velocidad de anuncios
- [ ] Modo alto contraste automático
- [ ] Atajos de teclado personalizables
- [ ] Exportación de resultados accesible

---

**🎉 ¡Dos versiones de calculadora: funcional y completamente accesible!**

*Elige la versión que mejor se adapte a las necesidades de tu proyecto y usuarios.*