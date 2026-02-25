// admin_dashboard.js - Shows contact/email submissions to admin and handles logout

document.addEventListener('DOMContentLoaded', function() {
    // Redirect to login if not logged in
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('adminWelcome').textContent = `Welcome, ${user.firstName} ${user.lastName}!`;

    // Show user details
    const adminSubmissions = document.getElementById('adminSubmissions');
    let html = `<div class="user-details-panel" style="margin-bottom:1.5rem;">
        <h4>User Details</h4>
        <ul style="list-style:none;padding:0;">
            <li><strong>First Name:</strong> ${escapeHtml(user.firstName)}</li>
            <li><strong>Last Name:</strong> ${escapeHtml(user.lastName)}</li>
            <li><strong>Email:</strong> ${escapeHtml(user.email)}</li>
            <li><strong>Country:</strong> ${escapeHtml(user.country)}</li>
            <li><strong>Username:</strong> ${escapeHtml(user.username)}</li>
        </ul>
    </div>`;

    // Display contact/email submissions (simulate with localStorage for demo)
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    if (submissions.length === 0) {
        html += '<p>No contact or email submissions yet.</p>';
    } else {
        html += '<table class="submissions-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Business</th><th>Service</th><th>Message</th><th>Date</th></tr></thead><tbody>';
        submissions.slice().reverse().forEach(sub => {
            html += `<tr><td>${escapeHtml(sub.name)}</td><td>${escapeHtml(sub.email)}</td><td>${escapeHtml(sub.phone)}</td><td>${escapeHtml(sub.business)}</td><td>${escapeHtml(sub.service)}</td><td>${escapeHtml(sub.message)}</td><td>${escapeHtml(sub.date)}</td></tr>`;
        });
        html += '</tbody></table>';
    }
    adminSubmissions.innerHTML = html;

    document.getElementById('adminLogout').onclick = function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    };

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/[&<>"']/g, function(c) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c];
        });
    }
});
