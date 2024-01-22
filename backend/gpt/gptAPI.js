require('dotenv').config();
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
async function callChatGPT(prompt) {
  console.log('Received prompt:', prompt); // 로그 추가
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Your Helpful assistant.' },
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
