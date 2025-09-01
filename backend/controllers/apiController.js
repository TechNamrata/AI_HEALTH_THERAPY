// In backend/controllers/apiController.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeHealth = async (req, res) => {
    const { problem } = req.body;
    const userProfile = req.user.healthProfile;

    if (!problem) {
        return res.status(400).json({ message: "Health query is required." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const systemPrompt = `You are an elite AI Health Therapist. Analyze the user's problem based on their input and their health profile.
        USER HEALTH PROFILE:
        - Age: ${userProfile.age || 'Not provided'}
        - Gender: ${userProfile.gender || 'Not provided'}
        - Height: ${userProfile.height || 'Not provided'} cm
        - Weight: ${userProfile.weight || 'Not provided'} kg
        - BMI: ${userProfile.bmi || 'Not provided'}
        - Known Chronic Diseases: ${userProfile.diseases.join(', ') || 'None'}
        
        Provide a structured JSON response. The JSON response MUST follow this exact schema: {"summary": "Brief, empathetic summary.", "mentalHealthScore": "Score 1-10.", "physicalHealthScore": "Score 1-10.", "symptoms": [{"name": "Symptom", "location": "A single word: head, chest, abdomen, arms, legs"}], "possibleConditions": [{"name": "Condition Name", "description": "Brief explanation.", "seriousness": "Low | Medium | High"}], "remedies": [{"type": "Home | Lifestyle | Medical", "name": "Remedy", "details": "Details."}], "personalizedTip": "A single, actionable, positive tip."}. Provide at least 3 possible conditions and 4 remedies. The location MUST be one of the specified options. IMPORTANT: Your entire response must be ONLY the JSON object, with no other text or markdown formatting.`;

        const result = await model.generateContent([systemPrompt, problem]);
        let responseText = result.response.text();

        // --- NEW CODE TO CLEAN THE RESPONSE ---
        // Find the first '{' and the last '}' to extract the JSON object
        const firstBracket = responseText.indexOf('{');
        const lastBracket = responseText.lastIndexOf('}');
        if (firstBracket !== -1 && lastBracket !== -1) {
            responseText = responseText.substring(firstBracket, lastBracket + 1);
        }
        // --- END OF NEW CODE ---

        // Attempt to parse the cleaned JSON response
        const parsedResponse = JSON.parse(responseText);
        res.status(200).json(parsedResponse);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ message: "Failed to get analysis from AI." });
    }
};