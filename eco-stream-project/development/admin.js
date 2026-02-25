// admin.js - Handles admin login, dashboard, contact form, and navbar active indicator

// Utility: Check login state
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Utility: Redirect to login if not logged in
function requireAdminLogin() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Utility: Logout
function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// Login page logic
if (window.location.pathname.endsWith('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('loginForm');
        const loginMessage = document.getElementById('loginMessage');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('loginUsername').value.trim();
                const password = document.getElementById('loginPassword').value;
                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('adminLoggedIn', 'true');
                    window.location.href = 'admin.html';
                } else {
                    loginMessage.textContent = 'Invalid username or password.';
                    loginMessage.style.color = '#DC3545';
                }
            });
        }
    });
}

// Admin dashboard logic
if (window.location.pathname.endsWith('admin.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        requireAdminLogin();
        // Money earned
        const moneyEarned = localStorage.getItem('moneyEarned') || '0';
        document.getElementById('moneyEarned').textContent = '$' + moneyEarned;
        // EVs in stock
        const evStock = localStorage.getItem('evStock') || '0';
        document.getElementById('evStock').textContent = evStock;
        // Contact requests/messages
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        } catch (e) { contacts = []; }
        document.getElementById('contactCount').textContent = contacts.length;
        const messagesList = document.getElementById('messagesList');
        if (contacts.length === 0) {
            messagesList.innerHTML = '<li>No contact messages yet.</li>';
        } else {
            messagesList.innerHTML = '';
            // Show newest first
            contacts.slice().reverse().forEach(function(msg) {
                messagesList.innerHTML += `<li><strong>${msg.name}</strong> (${msg.email})<br>${msg.message}</li>`;
            });
        }
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', adminLogout);
    });
}

// Navbar active indicator (all pages)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    // Get current file name from location (works for file:// and http(s)://)
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // For file://, pathname may include full path, so check href ends with currentPage
    navLinks.forEach(link => {
        // Remove any previous active class
        link.classList.remove('active');
        // Highlight if href ends with currentPage
        if (link.href.endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
});

// Contact form logic (contact.html)
if (window.location.pathname.endsWith('contact.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Get values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                if (!name || !email || !message) {
                    formMessage.textContent = 'Please fill in all required fields.';
                    formMessage.style.color = '#DC3545';
                    return;
                }
                // Save to localStorage with key 'contacts'
                let contacts = [];
                try {
                    contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                } catch (e) { contacts = []; }
                contacts.push({ name, email, message });
                localStorage.setItem('contacts', JSON.stringify(contacts));
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = '#28A745';
                contactForm.reset();
            });
        }
    });
}
