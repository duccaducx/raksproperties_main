// External Realty Data Service for Raks Properties

export interface ExternalProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  source: string;
  relevance: number;
  type: string;
  bedrooms?: number;
  description: string;
}

export interface MarketData {
  location: string;
  averagePrice: number;
  growth: string;
  demandFactors: string[];
  investmentOutlook: string;
}

export interface ExternalRealtyData {
  properties: ExternalProperty[];
  marketTrends: MarketData[];
  comparativeData: {
    regionalAverage: number;
    botswanaAverage: number;
    premiumAverage: number;
  };
  insights: string[];
}

// Simulated external data sources relevant to Botswana real estate
const externalDataSources = {
  properties: [
    {
      id: 'ext1',
      title: 'Luxury Villa - Phakalane Golf Estate',
      price: 4500000,
      location: 'Gaborone',
      source: 'Botswana Property Network',
      relevance: 0.95,
      type: 'Villa',
      bedrooms: 5,
      description: 'Premium golf estate property with modern amenities'
    },
    {
      id: 'ext2',
      title: 'Commercial Complex - Main Mall Area',
      price: 15000000,
      location: 'Gaborone',
      source: 'Commercial Real Estate Hub',
      relevance: 0.90,
      type: 'Commercial',
      description: 'Prime commercial space in central business district'
    },
    {
      id: 'ext3',
      title: 'Safari Lodge Investment Opportunity',
      price: 8500000,
      location: 'Maun',
      source: 'Tourism Property Exchange',
      relevance: 0.88,
      type: 'Lodge',
      bedrooms: 12,
      description: 'Established safari lodge with high tourism potential'
    }
  ],
  marketTrends: [
    {
      location: 'Gaborone',
      averagePrice: 2100000,
      growth: '+15%',
      demandFactors: ['Government sector growth', 'Urban expansion', 'International business'],
      investmentOutlook: 'Strong - sustained growth expected'
    },
    {
      location: 'Francistown',
      averagePrice: 1200000,
      growth: '+12%',
      demandFactors: ['Mining industry', 'Cross-border trade', 'Industrial development'],
      investmentOutlook: 'Positive - mining sector support'
    },
    {
      location: 'Maun',
      averagePrice: 1800000,
      growth: '+18%',
      demandFactors: ['Tourism boom', 'Safari industry', 'Delta access'],
      investmentOutlook: 'Excellent - tourism driving demand'
    }
  ]
};

export const fetchExternalRealtyData = async (query: string): Promise<ExternalRealtyData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const searchQuery = query.toLowerCase();
  
  // Filter properties based on query
  const filteredProperties = externalDataSources.properties.filter(prop => 
    prop.title.toLowerCase().includes(searchQuery) ||
    prop.location.toLowerCase().includes(searchQuery) ||
    prop.type.toLowerCase().includes(searchQuery) ||
    searchQuery.includes('property') ||
    searchQuery.includes('investment')
  );
  
  // Generate insights based on query
  const insights = [
    'Botswana property market showing 14% average growth across major cities',
    'Tourism sector driving significant demand in Maun and surrounding areas',
    'Gaborone remains the premium market with highest property values',
    'Mining industry continues to support Francistown property stability',
    'International investment increasing in commercial and luxury residential sectors'
  ];
  
  return {
    properties: filteredProperties.length > 0 ? filteredProperties : externalDataSources.properties.slice(0, 2),
    marketTrends: externalDataSources.marketTrends,
    comparativeData: {
      regionalAverage: 1400000,
      botswanaAverage: 1700000,
      premiumAverage: 3200000
    },
    insights: insights.slice(0, 3)
  };
};

export const getMarketComparison = (location: string): MarketData | null => {
  return externalDataSources.marketTrends.find(trend => 
    trend.location.toLowerCase() === location.toLowerCase()
  ) || null;
};