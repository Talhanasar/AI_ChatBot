const express = require('express');
const dotenv = require("dotenv");
const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Your bot token from BotFather
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Function to fetch model response with timeout and stream words in chunks
const getModelResponse = async (userMessage, chatId) => {
  try {
    const timeout = 30000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await axios({
      method: "post",
      url: "https://1480-35-153-180-241.ngrok-free.app/ask",
      data: {
        text: userMessage,
        max_tokens: 512,
        temperature: 0.7
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const currentMessage = response.data.answer;
    
    if (currentMessage) {
      await bot.sendMessage(chatId, currentMessage, { parse_mode: 'Markdown' });
      return currentMessage;
    }

    return "I'm sorry, I couldn't generate a response. Please try again.";

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error("Request timed out");
      return "I'm sorry, the response took too long. Please try asking a shorter or simpler question.";
    }
    console.error("Error fetching model response:", error);
    return "I'm sorry, but there was an error processing your request. Please try again.";
  }
};

// Handle incoming messages
bot.on("message", async (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  console.log(`Received message from user ${userId}: ${userMessage}`);

  if (userMessage === '/start') {
    const welcomeMessage = "👋 Welcome! I'm your AI assistant bot. I'm here to help answer your questions and engage in conversation. Feel free to ask me anything!";
    bot.sendMessage(chatId, welcomeMessage);
    return;
  }

  // Send "typing" action to show the bot is processing
  bot.sendChatAction(chatId, "typing");

  // Get and stream the model response
  await getModelResponse(userMessage, chatId);
});

// Express route for checking server status
app.get('/', (req, res) => {
  res.send('Bot is running...');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});