document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('#task-form form');
    const taskList = document.querySelector('#task-list ul');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.querySelector('#task-title').value;
        const description = document.querySelector('#task-desc').value;
        const priority = document.querySelector('#task-priority').value;
        const dueDate = document.querySelector('#task-due-date').value;

        if (!title || !description || !priority || !dueDate) {
            showNotification('All fields are required.');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate
        };

        addTask(task);
        taskForm.reset();
    });

    function addTask(task) {
        const taskItem = document.createElement('li');
        taskItem.dataset.id = task.id;
        taskItem.classList.add(task.priority);
        taskItem.innerHTML = `
            <span>${task.title} - ${task.description} - ${task.priority} - <span class="due-date">${task.dueDate}</span></span>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Add notification for task creation
        showNotification(`Task "${task.title}" created with priority "${task.priority}" and due date "${task.dueDate}"`);

        // Save tasks to local storage
        saveTasksToLocalStorage();
    }

    function updateTask(taskId, updatedTask) {
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach((taskItem) => {
            if (taskItem.dataset.id === taskId.toString()) {
                taskItem.classList.remove(taskItem.classList[0]);
                taskItem.classList.add(updatedTask.priority);
                taskItem.innerHTML = `
                    <span>${updatedTask.title} - ${updatedTask.description} - ${updatedTask.priority} - <span class="due-date">${updatedTask.dueDate}</span></span>
                    <button class="edit-task">Edit</button>
                    <button class="delete-task">Delete</button>
                `;

                // Add notification for task update
                showNotification(`Task "${updatedTask.title}" updated with priority "${updatedTask.priority}" and due date "${updatedTask.dueDate}"`);

                // Save tasks to local storage
                saveTasksToLocalStorage();
            }
        });
    }

    function deleteTask(taskId) {
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach((taskItem) => {
            if (taskItem.dataset.id === taskId.toString()) {
                taskList.removeChild(taskItem);

                // Add notification for task deletion
                showNotification(`Task "${taskItem.querySelector('span').textContent}" deleted`);

                // Save tasks to local storage
                saveTasksToLocalStorage();
            }
        });
    }

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-task')) {
            const taskItem = event.target.parentElement;
            const taskId = taskItem.dataset.id;
            const title = taskItem.querySelector('span').textContent.split(' - ')[0];
            const description = taskItem.querySelector('span').textContent.split(' - ')[1];
            const priority = taskItem.classList[0];
            const dueDate = taskItem.querySelector('.due-date').textContent;

            document.querySelector('#task-title').value = title;
            document.querySelector('#task-desc').value = description;
            document.querySelector('#task-priority').value = priority;
            document.querySelector('#task-due-date').value = dueDate;

            taskForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const updatedTitle = document.querySelector('#task-title').value;
                const updatedDescription = document.querySelector('#task-desc').value;
                const updatedPriority = document.querySelector('#task-priority').value;
                const updatedDueDate = document.querySelector('#task-due-date').value;

                const updatedTask = {
                    id: taskId,
                    title: updatedTitle,
                    description: updatedDescription,
                    priority: updatedPriority,
                    dueDate: updatedDueDate
                };

                updateTask(taskId, updatedTask);
                taskForm.reset();
            }, { once: true });
        }

        if (event.target.classList.contains('delete-task')) {
            const taskItem = event.target.parentElement;
            const taskId = taskItem.dataset.id;
            deleteTask(taskId);
        }
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach((taskItem) => {
            const task = {
                id: taskItem.dataset.id,
                title: taskItem.querySelector('span').textContent.split(' - ')[0],
                description: taskItem.querySelector('span').textContent.split(' - ')[1],
                priority: taskItem.classList[0],
                dueDate: taskItem.querySelector('.due-date').textContent
            };
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            addTask(task);
        });
    }

    loadTasksFromLocalStorage();
});
