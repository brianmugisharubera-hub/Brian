// register.js - Handles user registration

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        if (!username || !email || !password) {
            registerMessage.textContent = 'Please fill in all fields.';
            registerMessage.className = 'error';
            return;
        }
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.username === username)) {
            registerMessage.textContent = 'Username already exists.';
            registerMessage.className = 'error';
            return;
        }
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        registerMessage.textContent = 'Account created successfully! You can now log in.';
        registerMessage.className = 'success';
        registerForm.reset();
    });
});
