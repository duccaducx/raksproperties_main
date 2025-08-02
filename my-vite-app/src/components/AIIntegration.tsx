import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, Filter } from 'lucide-react';
import aiService, { AIResponse } from '@/services/aiService';

interface ChatMessage {
  id: string;
  message: string;
  response: AIResponse;
  timestamp: Date;
}

interface AIIntegrationProps {
  onResponseGenerated?: (response: AIResponse) => void;
}

const AIIntegration = ({ onResponseGenerated }: AIIntegrationProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = currentMessage;
    setCurrentMessage('');

    try {
      const response = await aiService.getAIResponse({
        message: userMessage,
        context: 'Raks Properties Real Estate'
      });

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message: userMessage,
        response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setSuggestions(aiService.getSuggestions(userMessage));
      onResponseGenerated?.(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  const getSourceBadgeColor = (source: string) => {
    return source === 'ai-assistant' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Assistant
            <Badge className="bg-green-100 text-green-800">
              <Filter className="h-3 w-3 mr-1" />
              Raks Filtered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chat Messages */}
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
                
                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-gray-600" />
                      <Badge className={getSourceBadgeColor(msg.response.source)}>
                        {msg.response.source === 'ai-assistant' ? 'AI Assistant' : 'Raks Data'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.round(msg.response.confidence * 100)}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">{msg.response.response}</p>
                    {msg.response.filtered && (
                      <div className="mt-2 flex items-center gap-1">
                        <Filter className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">Filtered for Raks Properties</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">Getting response...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask about properties, locations, or services..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !currentMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Raks Properties AI:</strong> Responses are filtered to focus on real estate information relevant to Botswana and our services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIntegration;