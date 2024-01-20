require('dotenv').config();
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});
async function callChatGPT() {
    try {
        const response = await openai.chat.completions.create({
            messages: [{role: "system", content: "Your Helpful assistant."}],
            model: "gpt-3.5-turbo",
        });
        console.log(response.choices[0]);
    } catch (error) {
        console.error(error);
        return null;
    } 
}

module.exports = { callChatGPT };
