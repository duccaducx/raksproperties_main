import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, TrendingUp, Building, Users, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LocationData {
  id: number;
  city: string;
  region: string;
  population: string;
  averagePrice: number;
  priceGrowth: string;
  topProperties: number;
  image: string;
  description: string;
  highlights: string[];
  marketTrend: 'up' | 'stable' | 'down';
  rating: number;
}

const LocationServices = () => {
  const [selectedCity, setSelectedCity] = useState("all");

  const locations: LocationData[] = [
    {
      id: 1,
      city: "Gaborone",
      region: "South-East District",
      population: "250,000+",
      averagePrice: 1800000,
      priceGrowth: "+12%",
      topProperties: 156,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      description: "Capital city with the highest property values and commercial opportunities",
      highlights: ["Government Hub", "Business District", "Shopping Centers", "International Airport"],
      marketTrend: "up",
      rating: 4.8
    },
    {
      id: 2,
      city: "Francistown",
      region: "North-East District",
      population: "100,000+",
      averagePrice: 950000,
      priceGrowth: "+8%",
      topProperties: 89,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
      description: "Second largest city with affordable housing and growing infrastructure",
      highlights: ["Mining Hub", "Railway Junction", "Educational Centers", "Growing Economy"],
      marketTrend: "up",
      rating: 4.5
    },
    {
      id: 3,
      city: "Maun",
      region: "North-West District",
      population: "65,000+",
      averagePrice: 1200000,
      priceGrowth: "+15%",
      topProperties: 45,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
      description: "Gateway to Okavango Delta with high tourism investment potential",
      highlights: ["Tourism Capital", "Safari Lodges", "Airport Hub", "Delta Access"],
      marketTrend: "up",
      rating: 4.7
    },
    {
      id: 4,
      city: "Kasane",
      region: "Chobe District",
      population: "10,000+",
      averagePrice: 1100000,
      priceGrowth: "+18%",
      topProperties: 28,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500",
      description: "Premium tourism destination with luxury property opportunities",
      highlights: ["Chobe National Park", "River Front", "Luxury Tourism", "Cross-border Trade"],
      marketTrend: "up",
      rating: 4.6
    },
    {
      id: 5,
      city: "Palapye",
      region: "Central District",
      population: "35,000+",
      averagePrice: 750000,
      priceGrowth: "+6%",
      topProperties: 34,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
      description: "Growing town with university and emerging residential developments",
      highlights: ["University Town", "Railway Station", "Agricultural Hub", "Affordable Housing"],
      marketTrend: "stable",
      rating: 4.2
    },
    {
      id: 6,
      city: "Serowe",
      region: "Central District",
      population: "50,000+",
      averagePrice: 680000,
      priceGrowth: "+4%",
      topProperties: 22,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      description: "Historic town with cultural significance and development potential",
      highlights: ["Cultural Heritage", "Traditional Architecture", "Government Offices", "Growing Market"],
      marketTrend: "stable",
      rating: 4.0
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BW', {
      style: 'currency',
      currency: 'BWP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'stable':
        return <div className="h-4 w-4 bg-yellow-500 rounded-full" />;
      default:
        return <div className="h-4 w-4 bg-red-500 rounded-full" />;
    }
  };

  const filteredLocations = selectedCity === "all" 
    ? locations 
    : locations.filter(loc => loc.city.toLowerCase() === selectedCity);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Location Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore high-ranking properties across Botswana's major cities and towns
          </p>
        </div>

        <Tabs value={selectedCity} onValueChange={setSelectedCity} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="all">All Cities</TabsTrigger>
            {locations.map(location => (
              <TabsTrigger key={location.id} value={location.city.toLowerCase()}>
                {location.city}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCity} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={location.image}
                      alt={location.city}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-600 text-white flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        {location.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {location.region}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-orange-600" />
                        {location.city}
                      </span>
                      {getTrendIcon(location.marketTrend)}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">{location.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <p className="text-sm font-semibold">{location.population}</p>
                        <p className="text-xs text-gray-500">Population</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Building className="h-4 w-4 text-gray-600" />
                        </div>
                        <p className="text-sm font-semibold">{location.topProperties}</p>
                        <p className="text-xs text-gray-500">Properties</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Average Price</span>
                        <span className="text-sm font-semibold text-green-600">
                          {location.priceGrowth} growth
                        </span>
                      </div>
                      <p className="text-xl font-bold text-orange-600">
                        {formatPrice(location.averagePrice)}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {location.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        View Properties
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Market Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Botswana Real Estate Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {locations.reduce((sum, loc) => sum + loc.topProperties, 0)}
                </div>
                <p className="text-sm text-gray-600">Total Properties</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">+10.2%</div>
                <p className="text-sm text-gray-600">Average Growth</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <p className="text-sm text-gray-600">Major Cities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.5★</div>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default LocationServices;