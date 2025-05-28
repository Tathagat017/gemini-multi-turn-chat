const { GoogleGenerativeAI } = require("@google/generative-ai");
const readlineSync = require("readline-sync");
require("dotenv").config();

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.GOOGLE_API_KEY;

async function runChat() {
  if (!API_KEY) {
    console.error(
      "Error: GOOGLE_API_KEY is not set in your .env file or environment variables."
    );
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  let temperatureInput = readlineSync.question(
    "Enter temperature (0.0-1.0, default 0.7): "
  );

  let maxOutputTokensInput = readlineSync.question(
    "Enter max output tokens (default 2048): "
  );

  let maxOutputTokens = parseInt(maxOutputTokensInput);
  if (isNaN(maxOutputTokens) || maxOutputTokens < 1 || maxOutputTokens > 4096) {
    console.log("Invalid max output tokens. Using default 2048.");
    maxOutputTokens = 2048;
  } else {
    console.log(`Using max output tokens: ${maxOutputTokens}`);
  }
  let temperature = parseFloat(temperatureInput);
  if (isNaN(temperature) || temperature < 0.0 || temperature > 1.0) {
    console.log("Invalid temperature. Using default 0.7.");
    temperature = 0.7;
  } else {
    console.log(`Using temperature: ${temperature}`);
  }

  const generationConfig = {
    temperature: temperature,
    maxOutputTokens: maxOutputTokens,
  };

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig,
  });

  const chat = model.startChat({
    history: [],
    systemInstruction: {
      role: "user",
      parts: [{ text: "You are a helpful and concise assistant." }],
    },
  });

  console.log("\nGemini Chat Initialized. Type 'exit' or 'quit' to end.");
  console.log("----------------------------------------------------");

  let turnCount = 0;
  let lastGeminiResponse = "";

  while (true) {
    turnCount++;
    const userInput = readlineSync.question(`You (Turn ${turnCount}): `);

    if (
      userInput.toLowerCase() === "exit" ||
      userInput.toLowerCase() === "quit"
    ) {
      console.log("Exiting chat.");
      break;
    }

    if (!userInput.trim()) {
      console.log("Gemini: Please enter some text.");
      turnCount--; // Don't count empty input as a turn
      continue;
    }

    try {
      const result = await chat.sendMessage(userInput);
      const response = result.response;
      lastGeminiResponse = response.text();
      console.log("Gemini:", lastGeminiResponse);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error.message);
      if (error.response && error.response.promptFeedback) {
        console.error("Prompt Feedback:", error.response.promptFeedback);
      }

      console.log("Chat ended due to an API error.");
      break;
    }

    if (
      turnCount < 2 &&
      (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit")
    ) {
      console.log("Please complete at least two turns before exiting.");
    }
  }
}

runChat().catch((error) => {
  console.error("Unhandled error in runChat:", error);
});
