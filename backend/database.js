// database.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
    if (db) return db;
    try {
        await client.connect();
        db = client.db("HealthAI"); // You can name your database here
        console.log("Successfully connected to MongoDB Atlas.");
        return db;
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit if connection fails
    }
}

module.exports = connectDB;