// server.js - Simple Node.js/Express backend for login and registration (demo, not for production)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory user store (replace with DB in production)
let users = [];

app.post('/register', (req, res) => {
    const { firstName, lastName, email, country, username, password } = req.body;
    if (!firstName || !lastName || !email || !country || !username || !password) {
        return res.status(400).json({ error: 'All fields required.' });
    }
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'Username already exists.' });
    }
    users.push({ firstName, lastName, email, country, username, password });
    res.json({ success: true });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Don't send password back
    const { password: _, ...userData } = user;
    res.json({ success: true, user: userData });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
