function TodoApp() {
    // Cargar tareas desde localStorage o usar array vacío
    this.tasks = JSON.parse(localStorage.getItem('kanban-tasks')) || [];

    // Agregar nueva tarea (siempre empieza en "todo")
    this.addTask = function(taskText) {
        const newTask = {
            id: Date.now().toString(),
            text: taskText,
            status: 'todo',
            createdAt: new Date().toISOString()
        };
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    };

    // Eliminar tarea por ID
    this.removeTask = function(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    };

    // Mover tarea a diferente estado
    this.moveTask = function(taskId, newStatus) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            this.saveTasks();
        }
    };

    // Obtener tareas por estado
    this.getTasksByStatus = function(status) {
        return this.tasks.filter(task => task.status === status);
    };

    // Obtener todas las tareas
    this.getAllTasks = function() {
        return this.tasks;
    };

    // Guardar tareas en localStorage
    this.saveTasks = function() {
        localStorage.setItem('kanban-tasks', JSON.stringify(this.tasks));
    };

    // Obtener el siguiente estado para una tarea
    this.getNextStatus = function(currentStatus) {
        const statusFlow = {
            'todo': 'doing',
            'doing': 'done',
            'done': 'todo'
        };
        return statusFlow[currentStatus];
    };

    // Obtener el estado anterior para una tarea
    this.getPreviousStatus = function(currentStatus) {
        const statusFlow = {
            'todo': 'done',
            'doing': 'todo',
            'done': 'doing'
        };
        return statusFlow[currentStatus];
    };
}

// Crear instancia global de la aplicación
const todoApp = new TodoApp();

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