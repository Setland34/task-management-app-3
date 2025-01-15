document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');
    const logoutButton = document.querySelector('#logout-button');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.querySelector('#login-username').value;
        const password = document.querySelector('#login-password').value;

        if (!username || !password) {
            showNotification('Username and password are required.');
            return;
        }

        loginUser(username, password);
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.querySelector('#register-username').value;
        const password = document.querySelector('#register-password').value;

        if (!username || !password) {
            showNotification('Username and password are required.');
            return;
        }

        registerUser(username, password);
    });

    logoutButton.addEventListener('click', () => {
        logoutUser();
    });

    function loginUser(username, password) {
        // Implement login logic here
        console.log(`Logging in user: ${username}`);
        // Example authentication logic
        if (username === 'admin' && password === 'password') {
            showNotification('Login successful.');
            // Set user session or token here
        } else {
            showNotification('Invalid username or password.');
        }
    }

    function registerUser(username, password) {
        // Implement registration logic here
        console.log(`Registering user: ${username}`);
        // Example registration logic
        if (username.length >= 3 && password.length >= 6) {
            showNotification('Registration successful.');
            // Save user credentials here
        } else {
            showNotification('Username must be at least 3 characters and password at least 6 characters.');
        }
    }

    function logoutUser() {
        // Implement logout logic here
        console.log('Logging out user');
        showNotification('Logout successful.');
        // Clear user session or token here
    }

    function checkUserPermissions(taskId) {
        // Implement user permission check logic here
        console.log(`Checking permissions for task: ${taskId}`);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
});
