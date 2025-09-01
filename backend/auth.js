// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const connectDB = require('./database.js');
const router = express.Router();
const saltRounds = 10;

let db;
connectDB().then(database => db = database);

// SIGNUP
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) { return res.status(400).json({ message: 'Username and password are required.' }); }
    try {
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await usersCollection.insertOne({ username, password: hashedPassword });
        res.status(201).json({ message: 'User created! Please sign in.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup.' });
    }
});

// SIGNIN
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) { return res.status(400).json({ message: 'Username and password are required.' }); }
    try {
        const user = await db.collection('users').findOne({ username });
        if (!user) { return res.status(404).json({ message: 'User not found.' }); }
        
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user._id; // Use MongoDB's _id
            req.session.username = user.username;
            res.json({ message: `Welcome back, ${user.username}!` });
        } else {
            res.status(401).json({ message: 'Incorrect password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during signin.' });
    }
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) { return res.redirect('/app'); }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

module.exports = router;