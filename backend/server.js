const express = require('express');
const rateLimit = require('express-rate-limit');
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
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again after a minute',
});

app.use('/api', limiter); 
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

// **FIXED**: The root route is now placed BEFORE the static middleware.
// This is the most important route and must be checked first for all new visitors.
app.get('/', (req, res) => {
    if (req.cookies.token) {
        // If they have a valid login cookie, send them to the landing page
        res.redirect('/landing');
    } else {
        // If they DON'T have a cookie, force them to the login page
        res.redirect('/login');
    }
});

// Serve static files from the frontend folder (for CSS, images, etc.)
// Because the '/' route is handled above, this will no longer interfere with the login redirect.
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

// This is the route for your main application page, which is index.html
app.get('/app', protect, (req, res) => {
    res.sendFile(path.join(frontendDirectoryPath, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

