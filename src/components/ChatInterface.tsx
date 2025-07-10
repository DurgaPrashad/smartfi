import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, TrendingUp, PieChart, Target, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your SmartFi AI assistant powered by Google's Gemini. I can help you with financial planning, investment analysis, goal tracking, and personalized recommendations. Try asking me about your portfolio performance or financial goals!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQueries = [
    "How can I optimize my investment portfolio?",
    "When will I reach my retirement goal?", 
    "Should I pay off my home loan early?",
    "Which SIPs are underperforming?",
    "How much should I invest monthly?",
    "Can I afford a new car loan?"
  ];

  const generateAIResponse = async (userMessage: string): Promise<string> => {
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
              text: `You are a professional financial advisor AI assistant. The user asks: "${userMessage}". Please provide helpful, accurate financial advice focusing on practical investment strategies, portfolio optimization, retirement planning, and tax savings. Keep responses concise and actionable. Do not use asterisks or markdown formatting in your response.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response at this time. Please try again.";
      
      return aiResponseText.replace(/\*/g, ''); // Remove any asterisks
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return getLocalFallbackResponse(userMessage);
    }
  };

  const getLocalFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('investment')) {
      return "Based on your current portfolio analysis, your equity allocation looks good at 54.8%. Your mutual funds show strong performance with 13.3% returns in Axis Bluechip. Consider rebalancing by increasing small-cap exposure to 15-20%. Your HDFC Midcap fund at 6% returns is underperforming - consider switching to Parag Parikh Flexi Cap Fund for better diversification.";
    } else if (lowerMessage.includes('retirement') || lowerMessage.includes('retire')) {
      return "With your current investment rate of ₹15K per month at 12% annual returns, you can accumulate ₹9.8 Crores in 32 years. To reach ₹10 Crores, increase monthly investment to ₹16K or continue current rate for 1 additional year. Consider increasing SIPs by 10% annually and adding NPS for extra tax benefits.";
    } else if (lowerMessage.includes('loan') || lowerMessage.includes('debt')) {
      return "Priority should be clearing credit card debt at 18-24% interest first. Your home loan at 8.5% can continue for tax benefits. Your EMI-to-income ratio at 25% is healthy, allowing for additional loans if needed. Instead of prepaying home loan, invest extra amount in equity for higher returns.";
    } else if (lowerMessage.includes('sip') || lowerMessage.includes('underperform')) {
      return "Your HDFC Midcap Fund is underperforming at 6.0% returns versus market benchmark of 12.1%. Consider stopping this SIP and redirecting funds to Motilal Oswal Midcap 30 Fund or increasing allocation to your top performers like SBI Small Cap Fund (15.0% returns) and Axis Bluechip Fund (13.3% returns).";
    } else {
      return "Thank you for your question! I can help you with investment portfolio optimization, SIP performance analysis, goal planning and tracking, debt management strategies, retirement planning, and tax-saving recommendations. Feel free to ask specific questions about your finances for personalized advice.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "AI Response Generated",
        description: "Your financial insight is ready!",
      });
      
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Let me provide you with some general financial guidance based on your query.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4">
      {/* Chat Header */}
      <Card className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 shadow-xl">
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">SmartFi AI Assistant</h2>
              <p className="text-emerald-100 text-xs sm:text-sm">Powered by Google Gemini</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Suggested Queries */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-gray-700 text-base sm:text-lg">Quick Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQueries.map((query, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-xs sm:text-sm p-2 h-auto justify-start"
                onClick={() => handleSuggestedQuery(query)}
              >
                {query}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardContent className="p-0">
          <div className="h-64 sm:h-96 overflow-y-auto p-3 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                }`}>
                  {message.type === 'user' ? <User className="w-3 h-3 sm:w-4 sm:h-4" /> : <Bot className="w-3 h-3 sm:w-4 sm:h-4" />}
                </div>
                <div className={`max-w-[75%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center justify-center">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-3 sm:p-4 bg-gray-50/50">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your finances..."
                className="flex-1 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 flex-shrink-0"
                size="sm"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4 text-center">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-emerald-500" />
            <h3 className="font-semibold text-xs sm:text-sm">Portfolio Analysis</h3>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">AI-powered investment insights</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4 text-center">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold text-xs sm:text-sm">Goal Planning</h3>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">Smart financial roadmaps</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4 text-center">
            <PieChart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold text-xs sm:text-sm">Risk Assessment</h3>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">Personalized risk profiling</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-3 sm:p-4 text-center">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold text-xs sm:text-sm">Tax Optimization</h3>
            <p className="text-xs text-gray-600 mt-1 hidden sm:block">Maximize tax savings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
