// AI integration service for X-Chat AI
// Filters responses based on Raks Properties context

interface AIRequest {
  message: string;
  context?: string;
}

interface AIResponse {
  response: string;
  filtered: boolean;
  source: 'ai-assistant' | 'raks-data';
  confidence: number;
}

// Raks Properties context and filters
const RAKS_CONTEXT = {
  company: 'Raks Properties',
  location: 'Botswana',
  services: ['Property Sales', 'Location Services', 'Property Development', 'Affiliates'],
  locations: ['Francistown', 'Gaborone', 'Maun'],
  propertyTypes: ['House', 'Villa', 'Lodge', 'Commercial', 'Land'],
  priceRanges: {
    'Francistown': '500K-2.5M BWP',
    'Gaborone': '800K-5M BWP',
    'Maun': '600K-3M BWP'
  }
};

const FILTER_KEYWORDS = [
  'property', 'real estate', 'house', 'villa', 'land',
  'botswana', 'francistown', 'gaborone', 'maun',
  'buy', 'sell', 'rent', 'investment', 'development',
  'location', 'market', 'price', 'bwp'
];

class AIService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    // In a real implementation, this would come from environment variables
    this.apiKey = null; // Set your API key here
  }

  // Filter and enhance query with Raks Properties context
  private enhanceQuery(query: string): string {
    const contextPrompt = `
You are an AI assistant for Raks Properties, a real estate company in Botswana.
Context:
- Company: ${RAKS_CONTEXT.company}
- Location: ${RAKS_CONTEXT.location}
- Services: ${RAKS_CONTEXT.services.join(', ')}
- Main locations: ${RAKS_CONTEXT.locations.join(', ')}
- Property types: ${RAKS_CONTEXT.propertyTypes.join(', ')}

Please provide responses that are relevant to real estate in Botswana and Raks Properties services.
If the question is not related to real estate, politely redirect to property-related topics.

User question: ${query}`;
    
    return contextPrompt;
  }

  // Check if response is relevant to Raks Properties
  private isRelevantToRaks(response: string): boolean {
    const lowerResponse = response.toLowerCase();
    return FILTER_KEYWORDS.some(keyword => lowerResponse.includes(keyword));
  }

  // Simulate AI API call (mock implementation)
  private async mockAICall(enhancedQuery: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const query = enhancedQuery.toLowerCase();
    
    // Generate contextual responses based on query
    if (query.includes('property') || query.includes('house')) {
      return `Based on Raks Properties' portfolio in Botswana, I can help you with property information. We have excellent properties in Francistown, Gaborone, and Maun. Our current listings include modern family homes, luxury villas, and safari lodges. Prices range from BWP 500K to BWP 5M depending on location and property type. Would you like specific information about any particular area or property type?`;
    }
    
    if (query.includes('location') || query.includes('market')) {
      return `Raks Properties operates in three main locations in Botswana: Francistown (average BWP 1.2M, +12% growth), Gaborone (average BWP 2.1M, +8% growth), and Maun (average BWP 1.8M, +15% growth). Each location offers unique opportunities for buyers and investors. Which location interests you most?`;
    }
    
    if (query.includes('price') || query.includes('cost')) {
      return `Property prices with Raks Properties vary by location: Francistown: BWP 500K-2.5M, Gaborone: BWP 800K-5M, Maun: BWP 600K-3M. Prices depend on property type, size, and specific location. We offer competitive pricing and flexible payment options. Would you like a detailed price analysis for a specific area?`;
    }
    
    if (query.includes('service')) {
      return `Raks Properties offers comprehensive real estate services: Property Sales (residential & commercial), Location Services (market analysis), Property Development (custom projects), and our Affiliate Program. Each service is designed to meet your specific real estate needs in Botswana. Which service interests you?`;
    }
    
    // Default response for non-real estate queries
    return `I'm specialized in helping with real estate matters for Raks Properties in Botswana. I can assist with property searches, market information, pricing, and our services. How can I help you with your real estate needs today?`;
  }

  // Main method to get AI response with Raks filtering
  async getAIResponse(request: AIRequest): Promise<AIResponse> {
    try {
      const enhancedQuery = this.enhanceQuery(request.message);
      
      // Use mock implementation since we don't have API key
      const response = await this.mockAICall(enhancedQuery);
      
      const isRelevant = this.isRelevantToRaks(response);
      
      return {
        response,
        filtered: isRelevant,
        source: 'ai-assistant',
        confidence: isRelevant ? 0.9 : 0.5
      };
    } catch (error) {
      console.error('AI API error:', error);
      
      // Fallback to Raks Properties data
      return {
        response: `I'm here to help with Raks Properties real estate services in Botswana. We specialize in property sales, location services, and development projects across Francistown, Gaborone, and Maun. How can I assist you with your property needs?`,
        filtered: true,
        source: 'raks-data',
        confidence: 0.8
      };
    }
  }

  // Get suggestions based on user input
  getSuggestions(query: string): string[] {
    const suggestions = [];
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('property') || lowerQuery.includes('house')) {
      suggestions.push('Show me properties in Francistown', 'What types of properties do you have?', 'Property prices in Gaborone');
    }
    
    if (lowerQuery.includes('location')) {
      suggestions.push('Market trends in Maun', 'Best locations for investment', 'Location comparison');
    }
    
    if (lowerQuery.includes('price')) {
      suggestions.push('Property pricing guide', 'Compare prices by location', 'Investment opportunities');
    }
    
    if (suggestions.length === 0) {
      suggestions.push('Browse available properties', 'Learn about our services', 'Contact our team');
    }
    
    return suggestions;
  }
}

export default new AIService();
export type { AIRequest, AIResponse };