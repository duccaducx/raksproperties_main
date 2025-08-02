import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Home, DollarSign, Users, Calendar } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  relevance: number;
  type: 'property' | 'location' | 'service' | 'price';
}

interface AISearchEngineProps {
  onResultSelect?: (result: SearchResult) => void;
}

const AISearchEngine = ({ onResultSelect }: AISearchEngineProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulated data from different pages
  const pageData = {
    properties: [
      { id: 'p1', title: 'Modern Family Home in Francistown', price: 1250000, location: 'Francistown', bedrooms: 4, type: 'House' },
      { id: 'p2', title: 'Luxury Villa in Gaborone', price: 3500000, location: 'Gaborone', bedrooms: 5, type: 'Villa' },
      { id: 'p3', title: 'Safari Lodge Property in Maun', price: 2800000, location: 'Maun', bedrooms: 6, type: 'Lodge' }
    ],
    locations: [
      { name: 'Francistown', avgPrice: 1200000, properties: 45, growth: '+12%' },
      { name: 'Gaborone', avgPrice: 2100000, properties: 78, growth: '+8%' },
      { name: 'Maun', avgPrice: 1800000, properties: 23, growth: '+15%' }
    ],
    services: [
      { name: 'Property Sales', description: 'Buy and sell residential and commercial properties' },
      { name: 'Location Services', description: 'Market analysis and location insights' },
      { name: 'Property Development', description: 'Custom development projects' },
      { name: 'Affiliate Program', description: 'Earn commissions by referring clients' }
    ]
  };

  const searchData = (searchQuery: string): SearchResult[] => {
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search properties
    pageData.properties.forEach(prop => {
      if (prop.title.toLowerCase().includes(query) || 
          prop.location.toLowerCase().includes(query) ||
          prop.type.toLowerCase().includes(query)) {
        results.push({
          id: prop.id,
          title: prop.title,
          content: `${prop.bedrooms} bedroom ${prop.type} in ${prop.location}. Price: BWP ${prop.price.toLocaleString()}`,
          source: 'Property Sales',
          relevance: 0.9,
          type: 'property'
        });
      }
    });

    // Search locations
    pageData.locations.forEach(loc => {
      if (loc.name.toLowerCase().includes(query)) {
        results.push({
          id: `loc-${loc.name}`,
          title: `${loc.name} Market Overview`,
          content: `Average price: BWP ${loc.avgPrice.toLocaleString()}, ${loc.properties} properties available, Market growth: ${loc.growth}`,
          source: 'Location Services',
          relevance: 0.8,
          type: 'location'
        });
      }
    });

    // Search services
    pageData.services.forEach(service => {
      if (service.name.toLowerCase().includes(query) || 
          service.description.toLowerCase().includes(query)) {
        results.push({
          id: `service-${service.name}`,
          title: service.name,
          content: service.description,
          source: 'Services',
          relevance: 0.7,
          type: 'service'
        });
      }
    });

    // Price-related searches
    if (query.includes('price') || query.includes('cost') || query.includes('bwp')) {
      results.push({
        id: 'price-info',
        title: 'Property Pricing Information',
        content: 'Francistown: BWP 500K-2.5M, Gaborone: BWP 800K-5M, Maun: BWP 600K-3M. Prices vary by location, size, and property type.',
        source: 'Market Data',
        relevance: 0.85,
        type: 'price'
      });
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const searchResults = searchData(query);
      setResults(searchResults);
      setIsSearching(false);
    }, 800);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property': return <Home className="h-4 w-4" />;
      case 'location': return <MapPin className="h-4 w-4" />;
      case 'service': return <Users className="h-4 w-4" />;
      case 'price': return <DollarSign className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'property': return 'bg-blue-100 text-blue-800';
      case 'location': return 'bg-green-100 text-green-800';
      case 'service': return 'bg-purple-100 text-purple-800';
      case 'price': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 mb-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search properties, locations, services..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button 
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching across all pages...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Found {results.length} results across multiple pages
          </p>
          {results.map((result) => (
            <Card 
              key={result.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onResultSelect?.(result)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    {getTypeIcon(result.type)}
                    {result.title}
                  </h3>
                  <Badge className={getTypeColor(result.type)}>
                    {result.source}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{result.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">
                    Type: {result.type}
                  </span>
                  <span className="text-xs text-orange-600">
                    {Math.round(result.relevance * 100)}% match
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {query && !isSearching && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No results found. Try searching for properties, locations, or services.</p>
        </div>
      )}
    </div>
  );
};

export default AISearchEngine;