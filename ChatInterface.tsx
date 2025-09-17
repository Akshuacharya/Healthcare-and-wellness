import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Lightbulb, Shield } from 'lucide-react';

interface ChatInterfaceProps {
  user: {
    name: string;
    avatar: string;
    currentMood: string;
    streakDays: number;
  };
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi ${user.name}! 👋 I'm your AI mental health companion. I'm here to listen, support, and help you navigate your emotional well-being. How are you feeling today?`,
      timestamp: new Date(),
      suggestions: ['I feel stressed about exams', 'I need motivation', 'I want to practice mindfulness', 'Tell me about anxiety management']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = {
    stress: {
      responses: [
        "I understand that you're feeling stressed. Stress is a normal response, especially as a student. Let's work through this together.",
        "It sounds like you're going through a challenging time. Remember, it's okay to feel overwhelmed sometimes.",
        "Stress can feel overwhelming, but you have the strength to manage it. Let's explore some strategies that might help."
      ],
      suggestions: [
        "Try the 4-7-8 breathing technique",
        "Take a 10-minute walk outside",
        "Practice progressive muscle relaxation",
        "Write down three things you're grateful for"
      ]
    },
    anxiety: {
      responses: [
        "Anxiety can be really difficult to deal with. Thank you for sharing this with me. You're not alone in this.",
        "I hear that you're feeling anxious. These feelings are valid, and there are effective ways to manage them.",
        "Anxiety affects many students. Let's focus on some grounding techniques that can help you feel more centered."
      ],
      suggestions: [
        "Use the 5-4-3-2-1 grounding technique",
        "Try guided meditation for anxiety",
        "Practice mindful breathing",
        "Challenge anxious thoughts with facts"
      ]
    },
    motivation: {
      responses: [
        "I'm here to help boost your motivation! Remember, every small step forward is progress worth celebrating.",
        "Motivation can come and go, but you have inner strength that's always there. Let's tap into that together.",
        "You've already shown strength by reaching out. That's the first step towards positive change!"
      ],
      suggestions: [
        "Set one small, achievable goal for today",
        "Reflect on your past achievements",
        "Create a vision board for your goals",
        "Practice positive affirmations"
      ]
    },
    default: {
      responses: [
        "Thank you for sharing that with me. I'm here to listen and support you through whatever you're experiencing.",
        "I appreciate you opening up. Your feelings and experiences are important and valid.",
        "It takes courage to share your thoughts. How can I best support you right now?"
      ],
      suggestions: [
        "Tell me more about how you're feeling",
        "What would help you feel better right now?",
        "Would you like some coping strategies?",
        "Let's explore this feeling together"
      ]
    }
  };

  const getAIResponse = (userMessage: string): { content: string; suggestions: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('stress') || message.includes('overwhelmed') || message.includes('pressure')) {
      const responseData = aiResponses.stress;
      return {
        content: responseData.responses[Math.floor(Math.random() * responseData.responses.length)],
        suggestions: responseData.suggestions
      };
    }
    
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried') || message.includes('nervous')) {
      const responseData = aiResponses.anxiety;
      return {
        content: responseData.responses[Math.floor(Math.random() * responseData.responses.length)],
        suggestions: responseData.suggestions
      };
    }
    
    if (message.includes('motivation') || message.includes('unmotivated') || message.includes('lazy') || message.includes('procrastinating')) {
      const responseData = aiResponses.motivation;
      return {
        content: responseData.responses[Math.floor(Math.random() * responseData.responses.length)],
        suggestions: responseData.suggestions
      };
    }
    
    const responseData = aiResponses.default;
    return {
      content: responseData.responses[Math.floor(Math.random() * responseData.responses.length)],
      suggestions: responseData.suggestions
    };
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const aiResponseData = getAIResponse(content);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponseData.content,
      timestamp: new Date(),
      suggestions: aiResponseData.suggestions
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-white/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">AI Mental Health Companion</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online • Private & Encrypted</span>
                <Shield size={14} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white/80 text-gray-800 shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {/* AI Suggestions */}
                {message.type === 'ai' && message.suggestions && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-500 font-medium">Suggested actions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-left text-xs p-2 bg-white/60 hover:bg-white/80 rounded-lg text-gray-700 transition-all duration-200 border border-white/50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className={`flex items-center space-x-2 mt-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-400'
                  }`}>
                    {message.type === 'user' ? (
                      <span className="text-white text-xs">{user.avatar}</span>
                    ) : (
                      <Bot className="text-white" size={12} />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md">
                <div className="bg-white/80 rounded-2xl p-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-6 border-t border-white/30">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share what's on your mind..."
              className="flex-1 px-4 py-3 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            🔒 Your conversations are private and encrypted. I'm here to support, not replace professional help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;