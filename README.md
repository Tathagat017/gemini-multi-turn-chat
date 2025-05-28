# Gemini Multi-Turn Chat

This is a Node.js application that implements a multi-turn chat interface using Google's Gemini AI model. It allows users to have interactive conversations with the Gemini AI model through a command-line interface.

The chat session object that maintains conversational context across multiple .sendMessage() calls. "history" key is array of messages which helps gemini internall in keepin track.

## Features

- Interactive chat interface with Gemini AI
- Configurable temperature and max output tokens
- Multi-turn conversation support
- Environment variable support for API key

## Prerequisites

- Node.js (v14 or higher)
- A Google AI API key (Gemini API)

## Setup

1. Clone this repository : https://github.com/Tathagat017/gemini-multi-turn-chat.git
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

## Running the Application

Start the chat application:

```bash
npm start
```

When prompted:

1. Enter a temperature value (0.0-1.0, default is 0.7)
   - Lower values (e.g., 0.2) make responses more focused and deterministic
   - Higher values (e.g., 0.8) make responses more creative and diverse
2. Enter max output tokens (default is 2048)
   - This controls the maximum length of the AI's responses

## Usage

- Type your messages and press Enter to send them to Gemini
- Type 'exit' or 'quit' to end the conversation
- The chat will continue until you choose to exit
- Empty messages are not counted as turns

## Dependencies

- @google/generative-ai: Google's Generative AI SDK
- dotenv: Environment variable management
- readline-sync: Synchronous readline interface for user input

## Error Handling

The application includes error handling for:

- Missing API key
- Invalid temperature values
- Invalid max output tokens
- API communication errors
- General runtime errors
