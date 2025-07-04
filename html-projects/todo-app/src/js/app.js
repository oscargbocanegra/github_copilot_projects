const todoList = [];

function addTask(task) {
    if (task) {
        todoList.push(task);
        updateUI();
    }
}

function removeTask(index) {
    if (index > -1 && index < todoList.length) {
        todoList.splice(index, 1);
        updateUI();
    }
}

function updateUI() {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';

    todoList.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeTask(index);

        listItem.appendChild(removeButton);
        taskListElement.appendChild(listItem);
    });
}

document.getElementById('add-task-form').onsubmit = function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    addTask(taskInput.value);
    taskInput.value = '';
};

// Variables globales para el modal actual y filtros
let currentTaskId = null;
let currentFilters = {
    user: '',
    priority: '',
    tag: ''
};

// Event listeners principales
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeDarkMode();
});

function initializeApp() {
    console.log('Inicializando aplicación...');
    
    // Mostrar loader
    showGlobalLoader();
    
    // Verificar que todoApp existe
    if (typeof todoApp === 'undefined') {
        console.error('todoApp no está definido. Verificar que todo.js se cargue primero.');
        hideGlobalLoader();
        return;
    }
    
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addTaskButton');
    
    // Verificar que los elementos existen
    if (!taskInput || !addButton) {
        console.error('Elementos del formulario no encontrados');
        hideGlobalLoader();
        return;
    }
    
    console.log('Elementos encontrados correctamente');
    
    // Inicializar selects (solo si existen los elementos)
    if (document.getElementById('assignUserSelect')) {
        populateUserSelects();
    }
    if (document.getElementById('templateSelect')) {
        populateTemplateSelect();
    }
    
    // Event listeners básicos
    addButton.addEventListener('click', handleAddTask);
    console.log('Event listener agregado al botón');
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    });
    
    // Event listeners para toolbar (solo si existen)
    if (document.querySelector('.toolbar')) {
        setupToolbarListeners();
    }
    
    // Event listeners para filtros (solo si existen)
    if (document.getElementById('userFilter')) {
        setupFilterListeners();
    }
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
    
    // Configurar drag and drop
    setupDragAndDrop();
    
    // Renderizar inicial
    setTimeout(() => {
        renderAllTasks();
        hideGlobalLoader();
        console.log('Aplicación inicializada correctamente');
        showToast('✅ Tablero cargado exitosamente', 'success');
    }, 500);
}

// Función para inicializar modo oscuro
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // Cargar preferencia guardada o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Event listener para el toggle
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animación del botón
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        showToast(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'info');
    });
    
    // Escuchar cambios en preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Función para mostrar/ocultar loader global
function showGlobalLoader() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.classList.add('active');
    }
}

function hideGlobalLoader() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
        loader.classList.remove('active');
    }
}

// Función mejorada para mostrar notificaciones
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) {
        console.log(`[${type.toUpperCase()}] ${message}`);
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icono según el tipo
    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"></path><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.11 0 2.17.2 3.16.57"></path></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };
    
    toast.innerHTML = `
        <div style="width: 20px; height: 20px; color: var(--${type === 'success' ? 'done' : type === 'error' ? 'todo' : 'primary'}-color);">
            ${icons[type] || icons.info}
        </div>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Mostrar con animación
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Ocultar después del tiempo especificado
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Función simplificada para agregar tareas
function handleAddTask() {
    console.log('handleAddTask ejecutándose...');
    
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    console.log('Texto de la tarea:', taskText);
    
    if (!taskText) {
        showToast('Por favor, ingresa el texto de la tarea', 'error');
        taskInput.focus();
        return;
    }
    
    if (typeof todoApp === 'undefined') {
        console.error('todoApp no está disponible');
        showToast('Error: Sistema no disponible', 'error');
        return;
    }
    
    try {
        // Obtener valores adicionales si existen los elementos
        const prioritySelect = document.getElementById('prioritySelect');
        const assignUserSelect = document.getElementById('assignUserSelect');
        const dueDateInput = document.getElementById('dueDateInput');
        
        const priority = prioritySelect ? prioritySelect.value : 'medium';
        const assignedUser = assignUserSelect ? assignUserSelect.value || null : null;
        const dueDate = dueDateInput ? dueDateInput.value || null : null;
        
        // Crear tarea usando la función básica
        const success = todoApp.addTask(taskText);
        
        if (success) {
            // Si se creó exitosamente, actualizar propiedades adicionales
            const tasks = todoApp.getAllTasks();
            const newTask = tasks[tasks.length - 1]; // La última tarea agregada
            
            if (newTask && priority !== 'medium') {
                newTask.priority = priority;
            }
            if (newTask && assignedUser) {
                newTask.assignedUser = assignedUser;
            }
            if (newTask && dueDate) {
                newTask.dueDate = dueDate;
            }
            
            // Guardar cambios
            todoApp.saveTasks();
            
            // Limpiar formulario
            taskInput.value = '';
            if (prioritySelect) prioritySelect.value = 'medium';
            if (assignUserSelect) assignUserSelect.value = '';
            if (dueDateInput) dueDateInput.value = '';
            
            // Actualizar interfaz
            renderAllTasks();
            
            console.log('Tarea agregada exitosamente');
            showToast('✅ Tarea agregada exitosamente', 'success');
            
            // Enfocar de nuevo el input para seguir agregando tareas
            taskInput.focus();
        } else {
            console.error('Error al agregar la tarea');
            showToast('Error al agregar la tarea', 'error');
        }
        
    } catch (error) {
        console.error('Error en handleAddTask:', error);
        showToast('Error al agregar la tarea: ' + error.message, 'error');
    }
}

// Funciones de renderizado mejoradas
function renderAllTasks() {
    console.log('Renderizando todas las tareas...');
    
    try {
        renderTasksInColumn('todo');
        renderTasksInColumn('doing');
        renderTasksInColumn('done');
        updateTaskCounts();
        console.log('Tareas renderizadas correctamente');
    } catch (error) {
        console.error('Error al renderizar tareas:', error);
        showToast('Error al renderizar tareas', 'error');
    }
}

function renderTasksInColumn(status) {
    const column = document.getElementById(`${status}-list`);
    if (!column) {
        console.error(`Columna ${status}-list no encontrada`);
        return;
    }
    
    let tasks = todoApp.getTasksByStatus(status);
    
    // Aplicar filtros si están disponibles
    if (typeof applyFilters === 'function' && currentFilters) {
        tasks = applyFilters(tasks);
    }
    
    column.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskCard = createTaskCard(task);
        taskCard.style.animationDelay = `${index * 0.1}s`;
        column.appendChild(taskCard);
    });
}

function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true;
    taskCard.dataset.taskId = task.id;
    taskCard.dataset.status = task.status;
    taskCard.setAttribute('role', 'listitem');
    taskCard.setAttribute('tabindex', '0');
    taskCard.setAttribute('aria-label', `Tarea: ${task.text}`);

    // Determinar clase de prioridad si existe
    if (task.priority) {
        taskCard.classList.add(`priority-${task.priority}`);
    }

    // Verificar si está vencida
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
    if (isOverdue) {
        taskCard.classList.add('overdue');
    }

    const nextStatus = todoApp.getNextStatus(task.status);
    const nextStatusText = {
        'doing': 'Iniciar',
        'done': 'Completar',
        'todo': 'Reiniciar'
    };

    // Información adicional solo si está disponible
    const priorityHtml = task.priority ? 
        `<div class="task-priority priority-${task.priority}" 
             title="Prioridad ${task.priority}" 
             aria-label="Prioridad ${task.priority}">
        </div>` : '';

    const dueDateHtml = task.dueDate ? 
        `<div class="task-due-date ${isOverdue ? 'overdue' : ''}" 
             title="Fecha límite: ${new Date(task.dueDate).toLocaleDateString()}">
            📅 ${new Date(task.dueDate).toLocaleDateString()}
        </div>` : '';

    const tagsHtml = task.tags && task.tags.length > 0 ?
        `<div class="task-tags">
            ${task.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>` : '';

    // Usuario asignado
    let userHtml = '';
    if (task.assignedUser && typeof todoApp.getUserById === 'function') {
        const assignedUser = todoApp.getUserById(task.assignedUser);
        if (assignedUser) {
            userHtml = `<div class="task-user" title="Asignado a: ${assignedUser.name}">
                👤 ${assignedUser.name}
            </div>`;
        }
    }

    // Comentarios
    const commentsHtml = task.comments && task.comments.length > 0 ?
        `<div class="task-comments-indicator" title="${task.comments.length} comentarios">
            💬 ${task.comments.length}
        </div>` : '';

    // Notificación
    const notificationHtml = task.notifications?.enabled ?
        `<div class="task-notification-indicator" title="Recordatorio activado">🔔</div>` : '';

    taskCard.innerHTML = `
        <div class="task-content">
            <div class="task-header">
                ${priorityHtml}
                ${userHtml}
                ${dueDateHtml}
                ${commentsHtml}
                ${notificationHtml}
                <div class="task-status" title="Estado: ${task.status}">
                    ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </div>
            </div>
            <div class="task-body">
                <div class="task-text">${task.text}</div>
            </div>
            <div class="task-footer">
                <button class="task-button move-button" onclick="moveTaskToNext('${task.id}')" title="Mover a ${nextStatus}">
                    ${nextStatusText[nextStatus] || '→'}
                </button>
                <button class="task-button delete-button" onclick="deleteTask('${task.id}')" title="Eliminar tarea">
                    🗑️
                </button>
            </div>
        </div>
    `;

    // Agregar event listeners para drag and drop
    taskCard.addEventListener('dragstart', handleDragStart);
    taskCard.addEventListener('dragend', handleDragEnd);

    return taskCard;
}

// Función para actualizar contadores de tareas
function updateTaskCounts() {
    document.getElementById('todo-count').textContent = todoApp.getTasksByStatus('todo').length;
    document.getElementById('doing-count').textContent = todoApp.getTasksByStatus('doing').length;
    document.getElementById('done-count').textContent = todoApp.getTasksByStatus('done').length;
}

// Event listener para agregar nueva tarea
addButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        todoApp.addTask(taskText);
        taskInput.value = '';
        renderAllTasks();
    }
});

// Event listener para Enter en el input
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addButton.click();
    }
});

// Funciones globales para los botones
window.moveTaskToNext = function(taskId) {
    const task = todoApp.getAllTasks().find(t => t.id === taskId);
    if (task) {
        const nextStatus = todoApp.getNextStatus(task.status);
        todoApp.moveTask(taskId, nextStatus);
        renderAllTasks();
    }
};

window.deleteTask = function(taskId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        todoApp.removeTask(taskId);
        renderAllTasks();
    }
};

// Drag and Drop functionality
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedElement = null;
}

// Configurar drop zones para las columnas
const dropZones = document.querySelectorAll('.task-list');
    
dropZones.forEach(zone => {
    zone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.parentElement.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', function(e) {
        this.parentElement.classList.remove('drag-over');
    });

    zone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.parentElement.classList.remove('drag-over');
            
        if (draggedElement) {
            const taskId = draggedElement.dataset.taskId;
            const newStatus = this.dataset.status;
                
            todoApp.moveTask(taskId, newStatus);
            renderAllTasks();
        }
    });
});

// Renderizar tareas iniciales
renderAllTasks();

// Este archivo ahora se usa para funcionalidades adicionales del tablero Kanban

// Funciones de utilidad para el tablero Kanban
const KanbanUtils = {
    // Exportar tareas a JSON
    exportTasks: function() {
        const tasks = todoApp.getAllTasks();
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'kanban-tasks.json';
        link.click();
    },

    // Importar tareas desde JSON
    importTasks: function(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const tasks = JSON.parse(e.target.result);
                // Validar estructura de tareas
                if (Array.isArray(tasks) && tasks.every(task => 
                    task.id && task.text && task.status)) {
                    todoApp.tasks = tasks;
                    todoApp.saveTasks();
                    location.reload(); // Recargar para mostrar las tareas importadas
                } else {
                    alert('Formato de archivo inválido');
                }
            } catch (error) {
                alert('Error al leer el archivo: ' + error.message);
            }
        };
        reader.readAsText(file);
    },

    // Limpiar todas las tareas
    clearAllTasks: function() {
        if (confirm('¿Estás seguro de que quieres eliminar TODAS las tareas?')) {
            todoApp.tasks = [];
            todoApp.saveTasks();
            location.reload();
        }
    },

    // Obtener estadísticas del tablero
    getStatistics: function() {
        const tasks = todoApp.getAllTasks();
        return {
            total: tasks.length,
            todo: todoApp.getTasksByStatus('todo').length,
            doing: todoApp.getTasksByStatus('doing').length,
            done: todoApp.getTasksByStatus('done').length,
            completionRate: tasks.length > 0 ? 
                Math.round((todoApp.getTasksByStatus('done').length / tasks.length) * 100) : 0
        };
    }
};

// Agregar funcionalidad de atajos de teclado
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N: Nueva tarea
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('taskInput').focus();
    }
    
    // Ctrl/Cmd + E: Exportar tareas
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        KanbanUtils.exportTasks();
    }
});

// Funciones de demostración y testing
const KanbanDemo = {
    // Agregar tareas de ejemplo
    addSampleTasks: function() {
        const sampleTasks = [
            { text: 'Revisar documentación del proyecto', status: 'todo' },
            { text: 'Implementar funcionalidad de drag and drop', status: 'doing' },
            { text: 'Configurar entorno de desarrollo', status: 'done' },
            { text: 'Diseñar interfaz de usuario', status: 'done' },
            { text: 'Realizar pruebas unitarias', status: 'todo' },
            { text: 'Optimizar rendimiento de la aplicación', status: 'doing' }
        ];

        sampleTasks.forEach(task => {
            const newTask = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                text: task.text,
                status: task.status,
                createdAt: new Date().toISOString()
            };
            todoApp.tasks.push(newTask);
        });

        todoApp.saveTasks();
        location.reload();
    }
};

// Exponer utilidades globalmente para uso en consola
window.KanbanUtils = KanbanUtils;
window.KanbanDemo = KanbanDemo;

// Mostrar estadísticas en consola al cargar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const stats = KanbanUtils.getStatistics();
        console.log('📊 Estadísticas del Tablero Kanban:', stats);
        
        if (stats.total === 0) {
            console.log('💡 Tip: Usa KanbanDemo.addSampleTasks() para agregar tareas de ejemplo');
        }
    }, 1000);
});