// A simple script to list your available models.
// Make sure you have @google/generative-ai and dotenv installed.
// Run with: node checkModels.js

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use the API key from your .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function listModels() {
  console.log("Fetching available models...");
  try {
    const result = await genAI.listModels();
    
    console.log("----------------------------------------");
    console.log("✅ Models available for your project:");
    console.log("----------------------------------------");

    for await (const m of result) {
      if (m.supportedGenerationMethods.includes('generateContent')) {
        console.log(m.name);
      }
    }
    console.log("----------------------------------------");

  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();