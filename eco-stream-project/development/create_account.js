// create_account.js - Handles user registration with extra fields

document.addEventListener('DOMContentLoaded', function() {
        // Ensure a default admin account exists
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (!users.some(u => u.username === 'admin')) {
            users.push({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@ecostream.local',
                country: 'AdminLand',
                username: 'admin',
                password: 'admin123',
                isAdmin: true
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const country = document.getElementById('registerCountry').value;
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value;
        if (!firstName || !lastName || !email || !country || !username || !password) {
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
        users.push({ firstName, lastName, email, country, username, password });
        localStorage.setItem('users', JSON.stringify(users));
        registerMessage.textContent = 'Account created successfully! You can now log in.';
        registerMessage.className = 'success';
        registerForm.reset();
    });
});
