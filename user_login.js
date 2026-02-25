// user_login.js - Handles user login

document.addEventListener('DOMContentLoaded', function() {
    const userLoginForm = document.getElementById('userLoginForm');
    const userLoginMessage = document.getElementById('userLoginMessage');

    userLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('userLoginUsername').value.trim();
        const password = document.getElementById('userLoginPassword').value;
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            userLoginMessage.textContent = 'Login successful!';
            userLoginMessage.className = 'success';
            // Redirect or show user dashboard here
        } else {
            userLoginMessage.textContent = 'Invalid username or password.';
            userLoginMessage.className = 'error';
        }
    });
});
