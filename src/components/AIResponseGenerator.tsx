import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Home, DollarSign, TrendingUp } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  relevance: number;
  type: 'property' | 'location' | 'service' | 'price';
}

interface AIResponseGeneratorProps {
  query: string;
  searchResults: SearchResult[];
  onNavigate?: (page: string) => void;
}

const AIResponseGenerator = ({ query, searchResults, onNavigate }: AIResponseGeneratorProps) => {
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [references, setReferences] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query && searchResults.length > 0) {
      generateResponse();
    }
  }, [query, searchResults]);

  const generateResponse = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const topResults = searchResults.slice(0, 3);
      setReferences(topResults);
      
      let aiResponse = '';
      const queryLower = query.toLowerCase();
      
      // Generate contextual response based on search results
      if (queryLower.includes('price') || queryLower.includes('cost')) {
        aiResponse = generatePriceResponse(topResults);
      } else if (queryLower.includes('location') || queryLower.includes('area')) {
        aiResponse = generateLocationResponse(topResults);
      } else if (queryLower.includes('property') || queryLower.includes('house')) {
        aiResponse = generatePropertyResponse(topResults);
      } else if (queryLower.includes('service') || queryLower.includes('help')) {
        aiResponse = generateServiceResponse(topResults);
      } else {
        aiResponse = generateGeneralResponse(topResults);
      }
      
      setResponse(aiResponse);
      setIsGenerating(false);
    }, 1200);
  };

  const generatePriceResponse = (results: SearchResult[]) => {
    const priceResults = results.filter(r => r.type === 'price' || r.type === 'property');
    return `Based on current market data from our Property Sales and Location Services pages, here's what I found about pricing in Botswana:\n\n${priceResults.map(r => `• ${r.content}`).join('\n')}\n\nFor specific property valuations, I recommend scheduling an appointment with our team. We also offer market analysis reports through our Location Services.`;
  };

  const generateLocationResponse = (results: SearchResult[]) => {
    const locationResults = results.filter(r => r.type === 'location' || r.type === 'property');
    return `Here's comprehensive location information from our database:\n\n${locationResults.map(r => `• ${r.content}`).join('\n')}\n\nOur Location Services page provides detailed market insights for all major cities in Botswana. Each location offers unique investment opportunities based on economic growth and development plans.`;
  };

  const generatePropertyResponse = (results: SearchResult[]) => {
    const propertyResults = results.filter(r => r.type === 'property');
    return `I found several relevant properties in our Property Sales database:\n\n${propertyResults.map(r => `• ${r.content}`).join('\n')}\n\nThese properties are available for immediate viewing. Our Property Development team can also create custom solutions if you don't find exactly what you're looking for.`;
  };

  const generateServiceResponse = (results: SearchResult[]) => {
    const serviceResults = results.filter(r => r.type === 'service');
    return `Raks Properties offers comprehensive real estate services:\n\n${serviceResults.map(r => `• ${r.title}: ${r.content}`).join('\n')}\n\nWe also have an Affiliate Program where you can earn commissions by referring clients. Contact us at +267 71 323 746 to learn more about any of these services.`;
  };

  const generateGeneralResponse = (results: SearchResult[]) => {
    return `Based on information from multiple pages of our website, here's what I found:\n\n${results.map(r => `• From ${r.source}: ${r.content}`).join('\n')}\n\nFor more detailed information, you can visit the specific pages mentioned above or contact our team directly.`;
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Property Sales': return <Home className="h-4 w-4" />;
      case 'Location Services': return <MapPin className="h-4 w-4" />;
      case 'Market Data': return <TrendingUp className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getPageRoute = (source: string) => {
    switch (source) {
      case 'Property Sales': return '/property-sales';
      case 'Location Services': return '/location-services';
      case 'Services': return '/property-development';
      case 'Affiliates': return '/affiliates';
      default: return '/';
    }
  };

  if (!query || searchResults.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {isGenerating ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
              <p className="text-gray-600">Analyzing information from multiple pages...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-4">
              <div className="mb-3">
                <Badge className="bg-green-100 text-green-800 mb-2">
                  AI Generated Response
                </Badge>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-gray-800 leading-relaxed">
                  {response}
                </p>
              </div>
            </CardContent>
          </Card>

          {references.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Referenced Information
                </h4>
                <div className="space-y-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="border-l-2 border-orange-200 pl-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {getSourceIcon(ref.source)}
                          {ref.title}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigate?.(getPageRoute(ref.source))}
                          className="text-xs"
                        >
                          View Page
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600">{ref.content}</p>
                      <p className="text-xs text-orange-600 mt-1">
                        Source: {ref.source} • {Math.round(ref.relevance * 100)}% relevance
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AIResponseGenerator;