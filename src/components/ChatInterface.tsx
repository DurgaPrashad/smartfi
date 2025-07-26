import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, TrendingUp, PieChart, Target, DollarSign, Database } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useFiMCP } from '@/contexts/FiMCPContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const { data, analyzeFinancialData, isDemoMode, demoPhoneNumber } = useFiMCP();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your SmartFi AI assistant powered by Google's Gemini and Fi MCP data. ${isDemoMode ? `I have access to your ${demoPhoneNumber} demo financial data.` : 'Connect your financial accounts to get personalized insights.'} Ask me about your net worth, investments, credit score, or financial planning!`,
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
    "What's my current net worth?",
    "Analyze my mutual fund portfolio performance",
    "How is my credit score and what can I improve?",
    "Review my monthly spending patterns",
    "What's my EPF balance and retirement planning?",
    "Provide comprehensive financial analysis"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get AI financial analysis using Gemini + Fi MCP data
      const analysis = await analyzeFinancialData(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: analysis,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting financial analysis:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error while analyzing your financial data. Please ensure you\'re connected to Fi MCP and try again. If the issue persists, try asking a more specific question about your finances.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Analysis Error",
        description: "Failed to analyze financial data. Please try again.",
        variant: "destructive",
      });
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
