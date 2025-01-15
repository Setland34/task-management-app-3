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

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    function handleExampleQuery() {
        const exampleQuery = "Send 0.005 ETH to john2879.base.eth";
        handleAgentExecutorStream(exampleQuery);
    }

    function handleAgentExecutorStream(query) {
        const events = agentExecutor.stream(
            {"messages": [("user", query)]},
            stream_mode="values",
        );
        for (const event of events) {
            prettyPrintEventMessages(event);
        }
    }

    function prettyPrintEventMessages(event) {
        event["messages"][-1].pretty_print();
    }

    handleExampleQuery();
});

import './tasks.js';
