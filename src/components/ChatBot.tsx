import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini AI instance
let genAI: GoogleGenerativeAI | null = null;

try {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found in environment variables');
  }
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
} catch (error) {
  console.error('Error initializing Gemini AI:', error);
}

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I help you today? Choose one of the options below or enter your question.",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Check API key on component mount
  useEffect(() => {
    if (!GEMINI_API_KEY) {
      setApiError('Gemini API key is missing. Please check your environment variables.');
      console.error('Gemini API key is missing');
    } else if (!genAI) {
      setApiError('Failed to initialize Gemini AI. Please try again later.');
      console.error('Gemini AI initialization failed');
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputText('');
    setIsLoading(true);
    setApiError(null);

    try {
      if (!genAI) {
        throw new Error('Gemini AI not properly initialized');
      }

      // Get response from Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Add agriculture context to the prompt
      const prompt = `As an AI farming assistant, please help with this question about agriculture: ${text}. Please provide a clear, practical, and detailed answer focusing on farming techniques, crop management, and agricultural best practices.`;
      
      console.log('Sending request to Gemini...', { prompt });
      const result = await model.generateContent(prompt);
      console.log('Received result from Gemini:', result);
      
      const response = await result.response;
      const botMessage = response.text();

      if (!botMessage) {
        throw new Error('Empty response from Gemini');
      }

      console.log('Processed response:', botMessage);

      // Add bot response
      setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
    } catch (error) {
      console.error('Error getting response:', error);
      let errorMessage = "I apologize for the inconvenience. ";
      
      if (!GEMINI_API_KEY) {
        errorMessage += "The API key is not properly configured.";
      } else if (error instanceof Error && error.message.includes('Empty response')) {
        errorMessage += "I received an empty response. Please try asking your question again.";
      } else {
        errorMessage += "I'm having trouble connecting to the AI service. Please try again in a moment.";
      }
      
      setMessages(prev => [...prev, { text: errorMessage, isUser: false }]);
      setApiError(errorMessage);
    }

    setIsLoading(false);
  };

  const quickQuestions = [
    "Which crops can I grow in Rajasthan?",
    "I have a question about pest control",
    "How to improve soil fertility?",
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 right-4 sm:right-6 w-[95%] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 text-white flex justify-between items-center"
        whileHover={{ backgroundColor: '#60A5FA' }}
      >
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-2xl bg-white/10 p-2 rounded-lg"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🌱
          </motion.span>
          <h3 className="font-semibold text-lg">FarmAI Assistant</h3>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => document.dispatchEvent(new CustomEvent('closeChatBot'))}
          className="text-white hover:text-gray-200 transition-colors bg-white/10 p-2 rounded-lg"
        >
          <span className="text-xl">×</span>
        </motion.button>
      </motion.div>

      {/* Messages Container */}
      <div className="h-[380px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-600"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{apiError}</span>
            </div>
          </motion.div>
        )}
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`inline-block p-4 rounded-2xl max-w-[85%] shadow-sm ${
                message.isUser
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
              }`}
            >
              {message.text}
            </motion.div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-blue-400"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-blue-400"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-blue-400"
            />
          </motion.div>
        )}
      </div>

      {/* Quick Questions */}
      <motion.div 
        className="p-4 border-t border-gray-100 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: '#EFF6FF' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage(question)}
              className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-500 py-2 px-4 rounded-full transition-all duration-200 shadow-sm hover:shadow"
            >
              {question}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Input Area */}
      <motion.div 
        className="p-4 border-t border-gray-100 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-3">
          <motion.input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputText);
              }
            }}
            placeholder="Type your question..."
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage(inputText)}
            disabled={isLoading || !inputText.trim()}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <motion.div 
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              'Send'
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatBot; 