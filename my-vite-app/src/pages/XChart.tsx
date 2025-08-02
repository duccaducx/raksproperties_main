import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, MessageCircle, Search, Globe, TrendingUp, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIIntegration from "@/components/AIIntegration";
import aiService, { AIResponse } from "@/services/aiService";
import { fetchExternalRealtyData, ExternalRealtyData } from "@/services/externalRealtyService";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  searchResults?: SearchResult[];
  externalData?: ExternalRealtyData;
  aiResponse?: AIResponse;
}

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  relevance: number;
  type: 'property' | 'location' | 'service' | 'price' | 'external';
}

const XChart = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm X-Chart AI, your intelligent real estate assistant powered by advanced AI with Raks Properties filtering. I combine AI intelligence with our internal data and external market sources to provide comprehensive, filtered insights about Botswana real estate. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const searchInternalData = (query: string): SearchResult[] => {
    const searchQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    const properties = [
      { id: 'p1', title: 'Modern Family Home', price: 1250000, location: 'Francistown', bedrooms: 4, type: 'House' },
      { id: 'p2', title: 'Luxury Villa', price: 3500000, location: 'Gaborone', bedrooms: 5, type: 'Villa' },
      { id: 'p3', title: 'Safari Lodge Property', price: 2800000, location: 'Maun', bedrooms: 6, type: 'Lodge' }
    ];

    properties.forEach(prop => {
      if (prop.title.toLowerCase().includes(searchQuery) || 
          prop.location.toLowerCase().includes(searchQuery) ||
          searchQuery.includes('property') || searchQuery.includes('house')) {
        results.push({
          id: prop.id,
          title: prop.title,
          content: `${prop.bedrooms} bedroom ${prop.type} in ${prop.location}. Price: BWP ${prop.price.toLocaleString()}`,
          source: 'Raks Properties',
          relevance: 0.9,
          type: 'property'
        });
      }
    });

    return results;
  };

  const generateEnhancedResponse = async (query: string, internalResults: SearchResult[], externalData: ExternalRealtyData): Promise<string> => {
    const aiResponse = await aiService.getAIResponse({
      message: query,
      context: 'Raks Properties Real Estate Botswana'
    });

    let response = "**🤖 AI Analysis (Raks Filtered):**\n";
    response += aiResponse.response + "\n\n";
    
    if (internalResults.length > 0) {
      response += "📍 **Raks Properties Portfolio:**\n";
      internalResults.slice(0, 2).forEach((result, index) => {
        response += `${index + 1}. ${result.title} - ${result.content}\n`;
      });
      response += "\n";
    }

    if (externalData.properties.length > 0) {
      response += "🌐 **External Market Opportunities:**\n";
      externalData.properties.slice(0, 2).forEach((prop, index) => {
        response += `${index + 1}. ${prop.title} - BWP ${prop.price.toLocaleString()} (${prop.source})\n`;
      });
      response += "\n";
    }

    response += `**Source Quality:** AI Assistant (${Math.round(aiResponse.confidence * 100)}% confidence, ${aiResponse.filtered ? 'Filtered' : 'Unfiltered'})\n`;
    response += "📞 Contact Raks Properties at +267 71 323 746 for personalized assistance.";
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      const internalResults = searchInternalData(currentQuery);
      const externalData = await fetchExternalRealtyData(currentQuery);
      
      const responseText = await generateEnhancedResponse(currentQuery, internalResults, externalData);
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        isBot: true,
        timestamp: new Date(),
        searchResults: internalResults,
        externalData: externalData
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I encountered an issue with AI integration. Let me search our internal database for you.",
        isBot: true,
        timestamp: new Date(),
        searchResults: searchInternalData(currentQuery)
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <MessageCircle className="h-10 w-10 text-orange-600" />
            X-Chart AI Assistant
          </h1>
          <div className="flex gap-2 justify-center mt-4">
            <Badge className="bg-blue-100 text-blue-800">AI Powered</Badge>
            <Badge className="bg-green-100 text-green-800">Raks Filtered</Badge>
            <Badge className="bg-orange-100 text-orange-800">Multi-Source</Badge>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex gap-2 justify-center">
            <Button 
              variant={!showAIChat ? "default" : "outline"}
              onClick={() => setShowAIChat(false)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Integrated Chat
            </Button>
            <Button 
              variant={showAIChat ? "default" : "outline"}
              onClick={() => setShowAIChat(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Direct
            </Button>
          </div>
        </div>

        {showAIChat ? (
          <AIIntegration />
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <Filter className="h-5 w-5 text-green-600" />
                  <Globe className="h-5 w-5 text-orange-600" />
                  AI Assistant + Raks Properties + External Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[450px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id}>
                        <div className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                          {message.isBot && (
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-orange-600" />
                            </div>
                          )}
                          <div className={`max-w-[80%] p-3 rounded-lg ${
                            message.isBot ? 'bg-gray-100 text-gray-900' : 'bg-orange-600 text-white'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {!message.isBot && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-xs text-gray-500">AI + sources...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask AI about properties, filtered by Raks..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    AI responses filtered for Raks Properties relevance + external market data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default XChart;