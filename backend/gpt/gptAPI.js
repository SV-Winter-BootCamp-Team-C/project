require('dotenv').config();
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
async function callChatGPT(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are helpful assistant with a Informative and Evaluative tone and with a Formal and Narrative style.' },
        { role: 'user', content: prompt },
      ],
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { callChatGPT };

