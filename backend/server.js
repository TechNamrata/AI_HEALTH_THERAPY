const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect } = require('./middleware/authMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Cookie parser

// Define paths for Express config
const frontendDirectoryPath = path.join(__dirname, '../frontend');

// API Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/apiRoutes'));

// --- Page Serving Routes ---

// Serve static files from the frontend folder
app.use(express.static(frontendDirectoryPath));

// Auth pages (unprotected)
app.get('/login', (req, res) => {
    res.sendFile(path.join(frontendDirectoryPath, 'login.html'));
});

// Protected page serving
app.get('/landing', protect, (req, res) => {
    res.sendFile(path.join(frontendDirectoryPath, 'landing.html'));
});

app.get('/onboarding', protect, (req, res) => {
    // Redirect if already onboarded
    if (req.user && req.user.onboarded) {
        return res.redirect('/landing');
    }
    res.sendFile(path.join(frontendDirectoryPath, 'onboarding.html'));
});

app.get('/app', protect, (req, res) => {
    res.sendFile(path.join(frontendDirectoryPath, 'index.html'));
});

// Root route - redirect based on auth
app.get('/', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/landing');
    } else {
        res.redirect('/login');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));