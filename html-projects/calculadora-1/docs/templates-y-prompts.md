# 📚 Templates y Prompts para el Proyecto Calculadora

Registro completo de prompts utilizados y recomendados para crear una calculadora funcional con HTML, CSS y JavaScript.

## 🎯 Estructura de Prompts Efectivos

### 1. Anatomía de un Prompt Efectivo
```
[CONTEXTO] + [ACCIÓN ESPECÍFICA] + [REQUISITOS] + [FORMATO/ESTILO]
```

**Ejemplo:**
```
Crea una calculadora HTML5 + JavaScript con interfaz moderna, funciones básicas (+,-,*,/), soporte para teclado y validación de errores como división por cero.
```

## 🧮 Prompts Utilizados en el Proyecto Calculadora

### 📱 Prompts Iniciales de Creación

**1. Estructura Básica de la Calculadora:**
```
Crea una calculadora en HTML con CSS y JavaScript
```

**2. Corrección de Funcionalidad:**
```
No puedo realizar operaciones, modifica la calculadora para usarla correctamente
```

**3. Mejora Visual de Operaciones:**
```
Haz que las operaciones aparezcan en la barra de texto, recuerda indicarme cual es el archivo a actualizar
```

**4. Cambio de Estilo:**
```
Deja el fondo blanco
```

**5. Documentación de Prompts:**
```
Registra los prompts usados y los que deberíamos tener para crear este proyecto calculadora
```

### 🔧 Prompts Recomendados para Desarrollo Completo

#### Estructura HTML

**Prompt Básico:**
```
Crea la estructura HTML5 para una calculadora con:
- Pantalla de visualización (input readonly)
- Grid de botones 4x4 para números y operadores
- Botones diferenciados por tipo (números, operadores, funciones)
- Semántica HTML correcta con clases apropiadas
```

**Prompt Avanzado:**
```
Desarrolla una estructura HTML5 semántica para calculadora que incluya:
- Container principal con clase "calculator"
- Display input con ID único para JavaScript
- Grid de botones con onclick events específicos
- Botones categorizados: números (0-9), operadores (+,-,*,/), funciones (C, ⌫, =)
- Atributos de accesibilidad básicos
```

#### Estilos CSS

**Prompt Básico:**
```
Diseña estilos CSS modernos para la calculadora con:
- Layout CSS Grid para los botones
- Colores diferenciados por tipo de botón
- Efectos hover y transiciones suaves
- Diseño responsive para móviles
```

**Prompt Avanzado:**
```
Implementa estilos CSS3 profesionales para calculadora:
- CSS Grid layout 4x4 responsive
- Esquema de colores: números (gris), operadores (naranja), igual (verde), limpiar (rojo)
- Efectos visuales: sombras, border-radius, hover con transform
- Tipografía legible con font-family sans-serif
- Media queries para dispositivos móviles
- Animaciones sutiles en clicks y hover
```

**Prompt de Personalización:**
```
Modifica los estilos CSS para:
- Cambiar el fondo de gradiente a blanco sólido
- Mantener contraste y legibilidad
- Agregar borde sutil a la calculadora
- Conservar todos los efectos visuales existentes
```

#### JavaScript Funcional

**Prompt Básico:**
```
Implementa la lógica JavaScript para calculadora con:
- Variables para estado actual (números, operadores)
- Funciones para manejar clicks de botones
- Operaciones matemáticas básicas (+,-,*,/)
- Validación de división por cero
```

**Prompt de Funcionalidad Avanzada:**
```
Desarrolla JavaScript completo para calculadora que incluya:
- Manejo de estado: currentInput, previousInput, operation
- Funciones separadas: handleNumber(), handleOperation(), calculate()
- Validaciones: múltiples decimales, límite de dígitos, división por cero
- Soporte para teclado con event listeners
- Función de borrar último dígito y limpiar todo
- Manejo de operaciones encadenadas
```

**Prompt de Mejora UX:**
```
Mejora el JavaScript para mostrar operaciones en tiempo real:
- Mostrar expresión completa mientras se escribe
- Visualizar "5 + 3" antes de mostrar resultado
- Convertir * a × para mejor legibilidad
- Agregar pausa visual antes de mostrar resultado
- Manejar correctamente el borrado de operaciones
```

#### Validaciones y Testing

**Prompt de Validación:**
```
Agrega validaciones robustas al JavaScript:
- Prevenir múltiples puntos decimales
- Limitar longitud de números a 12 dígitos
- Validar entrada de teclado
- Manejar casos edge: operadores consecutivos, cálculos vacíos
- Redondeo automático para precisión flotante
```

**Prompt de Testing:**
```
Crea casos de prueba para validar:
- Operaciones básicas funcionan correctamente
- División por cero muestra error apropiado
- Soporte de teclado responde a todas las teclas
- Operaciones encadenadas calculan correctamente
- Funciones de limpieza resetean estado
```

### 🎨 Prompts para Características Específicas

#### Soporte para Teclado

```
Implementa soporte completo para teclado en la calculadora:
- Números 0-9 para entrada de dígitos
- Operadores +, -, *, / para operaciones
- Enter o = para calcular resultado
- Escape para limpiar todo
- Backspace para borrar último dígito
- Punto (.) para decimales
- Prevenir comportamientos por defecto del navegador
```

#### Manejo de Errores

```
Agrega manejo robusto de errores:
- División por cero con mensaje claro
- Entrada inválida con validación
- Overflow de números con límites
- Estados inconsistentes con reset automático
- Mensajes de error amigables al usuario
```

#### Responsive Design

```
Optimiza la calculadora para dispositivos móviles:
- Media queries para pantallas pequeñas
- Tamaños de botón apropiados para táctil
- Tipografía escalable
- Espaciado adecuado para dedos
- Máximo ancho y centrado en desktop
```

## 🔍 Prompts de Debugging

### Identificar Problemas
```
Analiza este código de calculadora y identifica:
- Funciones que no están conectadas correctamente
- Errores en el manejo de estado
- Problemas de validación de entrada
- Issues de responsive design
- Bugs en operaciones encadenadas
```

### Refactoring
```
Refactoriza este código JavaScript para mejorar:
- Legibilidad y organización del código
- Separación de responsabilidades
- Manejo de errores más robusto
- Performance y optimización
- Comentarios y documentación
```

## 📱 Prompts de Mejoras Futuras

### Funcionalidades Avanzadas
```
Agrega funcionalidades científicas a la calculadora:
- Funciones matemáticas: sqrt, pow, sin, cos, tan
- Constantes: π, e
- Memoria: M+, M-, MR, MC
- Historial de operaciones
- Paréntesis para agrupación
```

### Personalización
```
Implementa opciones de personalización:
- Temas de color (claro, oscuro, colorido)
- Tamaños de fuente ajustables
- Sonidos de botones opcionales
- Configuración de precisión decimal
- Guardado de preferencias en localStorage
```

### Accesibilidad
```
Mejora la accesibilidad de la calculadora:
- Atributos ARIA apropiados
- Navegación por teclado completa
- Anuncios de screen reader
- Alto contraste para visibilidad
- Indicadores de foco visibles
```

## 🎯 Estrategias de Prompting

### 1. Desarrollo Incremental
- Comienza con estructura básica
- Agrega funcionalidad paso a paso
- Itera sobre mejoras específicas
- Testea cada componente individualmente

### 2. Especificidad en Prompts
- Define claramente qué archivo modificar
- Especifica comportamiento deseado
- Incluye casos edge a considerar
- Menciona estándares a seguir

### 3. Contexto en Solicitudes
- Proporciona código existente relevante
- Explica el problema específico
- Define el resultado esperado
- Incluye restricciones o limitaciones

## 📝 Checklist de Prompts por Fase

### Fase 1: Estructura Base
- [X] HTML semántico con grid de botones
- [X] CSS básico con layout responsive
- [X] JavaScript con funciones stub
- [X] Conexión entre archivos verificada

### Fase 2: Funcionalidad Core
- [X] Operaciones matemáticas básicas
- [X] Manejo de estado de calculadora
- [X] Validaciones de entrada
- [X] Display de números y operadores

### Fase 3: Mejoras UX
- [X] Soporte para teclado
- [X] Visualización de operaciones
- [X] Animaciones y transiciones
- [X] Manejo de errores amigable

### Fase 4: Pulimento
- [X] Responsive design completo
- [X] Accesibilidad básica
- [X] Testing de casos edge
- [X] Documentación completa


## 💡 Tips para Prompts Efectivos

### ✅ Buenos Prompts
- "Modifica el JavaScript para mostrar operaciones en tiempo real en la pantalla"
- "Agrega validación para prevenir múltiples puntos decimales"
- "Implementa soporte de teclado con preventDefault para división"

### ❌ Prompts Vagos
- "Mejora la calculadora"
- "Hazla más bonita"
- "Arregla los bugs"

### 🎯 Estructura Recomendada
1. **Contexto**: "En esta calculadora HTML/CSS/JS..."
2. **Acción**: "Modifica/Agrega/Crea..."
3. **Especificación**: "...para que muestre operaciones en tiempo real..."
4. **Archivo**: "...actualizando el archivo js/calculator.js"

---

## 📊 Resumen de Prompts del Proyecto

| Orden | Prompt | Archivo Afectado | Funcionalidad |
|-------|--------|------------------|---------------|
| 1 | "Crea una calculadora en HTML con CSS y JS" | Todos | Estructura inicial |
| 2 | "No puedo realizar operaciones, modifica para usarla correctamente" | calculator.js | Funcionalidad core |
| 3 | "Haz que las operaciones aparezcan en la barra de texto" | calculator.js | UX mejorada |
| 4 | "Deja el fondo blanco" | styles.css | Personalización visual |
| 5 | "Registra los prompts usados..." | templates-y-prompts.md | Documentación |

---

**🎉 ¡Calculadora completamente funcional y documentada!**

*Este documento sirve como guía para replicar y mejorar el proyecto de calculadora usando GitHub Copilot de manera efectiva.*