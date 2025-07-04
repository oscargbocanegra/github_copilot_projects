# 📋 Tablero Kanban - Todo App

Una aplicación moderna de gestión de tareas con interfaz tipo Kanban, construida con HTML, CSS y JavaScript vanilla. Permite organizar tareas en tres estados: **To Do**, **Doing** y **Done** con funcionalidad drag & drop y persistencia local.

## ✨ Características

- 🎯 **Tablero Kanban** con 3 columnas (To Do, Doing, Done)
- 🖱️ **Drag & Drop** para mover tareas entre columnas
- ➕ **Agregar tareas** con formulario intuitivo
- 🗑️ **Eliminar tareas** con confirmación
- 🔄 **Mover tareas** con botones de acción
- 💾 **Persistencia local** usando localStorage
- 📊 **Contadores** de tareas por columna
- 📱 **Diseño responsivo** para todos los dispositivos
- 🎨 **Interfaz profesional** con animaciones suaves
- ⌨️ **Atajos de teclado** (Ctrl+N para nueva tarea)

## 🏗️ Estructura del Proyecto

```
todo-app/
├── src/
│   ├── index.html          # Página principal con estructura Kanban
│   ├── css/
│   │   └── styles.css      # Estilos profesionales con variables CSS
│   └── js/
│       ├── app.js          # Lógica de interfaz y eventos
│       └── todo.js         # Clase TodoApp y gestión de datos
├── README.md               # Documentación del proyecto
└── package.json            # Configuración opcional de npm
```

## 🚀 Instalación y Uso

### Instalación Local

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd todo-app
   ```

2. **Abre la aplicación:**
   ```bash
   # Opción 1: Abrir directamente en el navegador
   open src/index.html
   
   # Opción 2: Usar servidor local (recomendado)
   python -m http.server 8000
   # Luego visita: http://localhost:8000/src
   ```

### Uso de la Aplicación

#### 📝 **Gestión de Tareas**
- **Agregar tarea**: Escribe en el campo superior y presiona "Agregar Tarea" o Enter
- **Mover tarea**: Arrastra entre columnas o usa los botones de acción
- **Eliminar tarea**: Haz clic en el botón 🗑️ (aparece confirmación)

#### ⌨️ **Atajos de Teclado**
- `Ctrl + N` (o `Cmd + N`): Enfocar campo de nueva tarea
- `Ctrl + E` (o `Cmd + E`): Exportar tareas a JSON
- `Enter`: Agregar tarea cuando el campo está enfocado

#### 🎮 **Funciones Avanzadas (Consola)**
```javascript
// Agregar tareas de ejemplo
KanbanDemo.addSampleTasks()

// Ver estadísticas
KanbanUtils.getStatistics()

// Exportar tareas
KanbanUtils.exportTasks()

// Limpiar todas las tareas
KanbanUtils.clearAllTasks()
```

## 🎨 Diseño y UX

### **Características Visuales**
- **Paleta de colores** moderna y profesional
- **Tipografía Inter** de Google Fonts
- **Sombras y efectos** de profundidad
- **Animaciones fluidas** en interacciones
- **Estados hover** y focus refinados

### **Estados de Tareas**
- 🔴 **To Do**: Tareas pendientes (rojo)
- 🟡 **Doing**: Tareas en progreso (amarillo)
- 🟢 **Done**: Tareas completadas (verde)

### **Responsive Design**
- **Desktop** (>1024px): Vista completa de 3 columnas
- **Tablet** (768-1024px): Diseño adaptativo
- **Mobile** (<768px): Columnas apiladas verticalmente

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Clases, módulos, localStorage
- **Google Fonts**: Tipografía Inter
- **Responsive Design**: Mobile-first approach

## 📊 Funcionalidades Técnicas

### **Persistencia de Datos**
```javascript
// Los datos se guardan automáticamente en localStorage
localStorage.getItem('kanban-tasks')
```

### **Gestión de Estados**
```javascript
// Flujo de estados de tareas
todo → doing → done → todo (cíclico)
```

### **Drag & Drop API**
- Implementación nativa del HTML5 Drag & Drop
- Feedback visual durante el arrastre
- Zonas de drop responsivas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### **Ideas para Contribuir**
- 🏷️ Agregar etiquetas/categorías a las tareas
- 📅 Implementar fechas límite
- 🔍 Sistema de búsqueda y filtros
- 🌙 Modo oscuro
- 📤 Exportar/importar en diferentes formatos
- 🔔 Notificaciones
- 👥 Colaboración multi-usuario

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.


   - Descripción detallada del problema
   - Pasos para reproducir
   - Navegador y versión
   - Screenshots si es necesario


---

### 🎯 **Estado del Proyecto**: ✅ Completado y funcional

**Versión**: 1.0.0  
**Última actualización**: Julio 2025