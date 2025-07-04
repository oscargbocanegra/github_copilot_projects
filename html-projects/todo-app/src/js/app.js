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

// Event listeners principales
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addTaskButton');

    // Función para renderizar todas las tareas
    function renderAllTasks() {
        renderTasksInColumn('todo');
        renderTasksInColumn('doing');
        renderTasksInColumn('done');
        updateTaskCounts();
    }

    // Función para renderizar tareas en una columna específica
    function renderTasksInColumn(status) {
        const column = document.getElementById(`${status}-list`);
        const tasks = todoApp.getTasksByStatus(status);
        
        column.innerHTML = '';
        
        tasks.forEach(task => {
            const taskCard = createTaskCard(task);
            column.appendChild(taskCard);
        });
    }

    // Función para crear una tarjeta de tarea
    function createTaskCard(task) {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.draggable = true;
        taskCard.dataset.taskId = task.id;
        taskCard.dataset.status = task.status;

        const nextStatus = todoApp.getNextStatus(task.status);
        const nextStatusText = {
            'doing': 'Iniciar',
            'done': 'Completar',
            'todo': 'Reiniciar'
        };

        taskCard.innerHTML = `
            <div class="task-content">
                <div class="task-text">${task.text}</div>
                <div class="task-actions">
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
});

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