import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles, Crown, Lock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatTab = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI financial assistant powered by Google's Gemini. I can help you with investment advice, portfolio analysis, and financial planning. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!user?.isPremium && messages.length >= 6) {
      toast({
        title: "Premium Feature",
        description: "Upgrade to Premium for unlimited AI conversations.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const apiKey = "AIzaSyCKxef2OEUNjIeH3XMD5nXbMJ-cUVYE_PI";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional financial advisor AI assistant. The user asks: "${currentInput}". Please provide helpful, accurate financial advice. Keep responses concise and practical. Do not use asterisks or markdown formatting in your response.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response at this time. Please try again.";
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText.replace(/\*/g, ''), // Remove any asterisks
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      
      toast({
        title: "AI Response Generated",
        description: "Your financial insight is ready!",
      });
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getLocalAIResponse(currentInput),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('portfolio') || input.includes('investment')) {
      return "Based on your current portfolio analysis, I can see you have a good diversification across mutual funds, stocks, and EPF. Your SBI Small Cap Fund is performing exceptionally well with 15% returns. Consider rebalancing by reducing allocation to underperforming HDFC Midcap Fund and increasing your small-cap exposure.";
    } else if (input.includes('goal') || input.includes('retirement')) {
      return "Your retirement goal of ₹5Cr by age 60 is achievable with your current investment rate. To optimize, I recommend increasing your monthly SIP by ₹3,000 and shifting 20% allocation to ELSS funds for tax benefits. This could help you reach your goal 3 years earlier.";
    } else if (input.includes('risk') || input.includes('safe')) {
      return "Your current risk profile is moderate with 60% equity and 40% debt allocation. Given your age and goals, you could afford to increase equity allocation to 70% for better long-term returns. Consider adding index funds for lower cost exposure.";
    } else if (input.includes('tax') || input.includes('save')) {
      return "You can optimize your tax savings by investing ₹1.5L annually in ELSS funds under Section 80C. Additionally, consider NPS for extra ₹50K deduction under 80CDD. Your current tax liability can be reduced by approximately ₹46,800 annually.";
    } else {
      return "I understand you're looking for financial guidance. As your AI assistant, I can help with portfolio analysis, investment recommendations, goal planning, risk assessment, and tax optimization. Could you be more specific about what aspect of your finances you'd like to discuss?";
    }
  };

  const quickQuestions = [
    "How can I optimize my portfolio?",
    "When can I retire comfortably?",
    "Should I increase my SIP amount?",
    "How to reduce my tax liability?"
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">AI Financial Assistant</h2>
          <p className="text-sm sm:text-base text-gray-600">Get personalized financial advice powered by Google Gemini</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={user?.isPremium ? "default" : "secondary"} className={`text-xs ${user?.isPremium ? "bg-gradient-to-r from-emerald-500 to-blue-500" : ""}`}>
            {user?.isPremium ? "Unlimited" : `${Math.max(0, 5 - Math.floor(messages.length / 2))} questions left`}
          </Badge>
          {!user?.isPremium && (
            <Link to="/payment">
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xs sm:text-sm">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Chat with SmartFi AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 max-h-64 sm:max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-3xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                    <AvatarFallback className={`text-xs sm:text-sm ${message.isUser ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"}`}>
                      {message.isUser ? user?.name?.charAt(0) || 'U' : 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-2 sm:p-3 ${
                    message.isUser 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                    <AvatarFallback className="bg-emerald-500 text-white text-xs sm:text-sm">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {!user?.isPremium && messages.length <= 2 && (
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-3">Try asking:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto py-2 px-3 text-xs sm:text-sm"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about your finances..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading || (!user?.isPremium && messages.length >= 6)}
              className="text-sm"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim() || (!user?.isPremium && messages.length >= 6)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 flex-shrink-0"
              size="sm"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          {!user?.isPremium && messages.length >= 6 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-xs sm:text-sm text-gray-600 mb-3">You've reached the free tier limit</p>
              <Link to="/payment">
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xs sm:text-sm">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Upgrade for Unlimited Chat
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatTab;
