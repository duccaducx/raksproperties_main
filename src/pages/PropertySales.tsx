import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, MapPin, Bed, Bath, Square, Eye, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  featured: boolean;
  description: string;
}

const PropertySales = () => {
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const properties: Property[] = [
    {
      id: 1,
      title: "Modern Family Home",
      price: 1250000,
      location: "Francistown",
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      type: "House",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
      featured: true,
      description: "Beautiful modern home with spacious rooms and garden"
    },
    {
      id: 2,
      title: "Luxury Villa",
      price: 3500000,
      location: "Gaborone",
      bedrooms: 5,
      bathrooms: 4,
      area: 400,
      type: "Villa",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
      featured: true,
      description: "Stunning luxury villa with premium finishes"
    },
    {
      id: 3,
      title: "City Apartment",
      price: 850000,
      location: "Gaborone",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      featured: false,
      description: "Modern apartment in city center"
    },
    {
      id: 4,
      title: "Safari Lodge Property",
      price: 2800000,
      location: "Maun",
      bedrooms: 6,
      bathrooms: 5,
      area: 350,
      type: "Lodge",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
      featured: true,
      description: "Perfect for tourism investment near Okavango Delta"
    },
    {
      id: 5,
      title: "Riverside Cottage",
      price: 950000,
      location: "Kasane",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      type: "Cottage",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500",
      featured: false,
      description: "Charming cottage with river views"
    },
    {
      id: 6,
      title: "Commercial Building",
      price: 4200000,
      location: "Francistown",
      bedrooms: 0,
      bathrooms: 8,
      area: 800,
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      featured: false,
      description: "Prime commercial space in business district"
    }
  ];

  const locations = ["All Locations", "Francistown", "Gaborone", "Maun", "Kasane", "Palapye"];
  const propertyTypes = ["All Types", "House", "Villa", "Apartment", "Lodge", "Cottage", "Commercial"];

  const filteredProperties = properties.filter(property => {
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesLocation = !selectedLocation || selectedLocation === "All Locations" || property.location === selectedLocation;
    const matchesType = !selectedType || selectedType === "All Types" || property.type === selectedType;
    return matchesPrice && matchesLocation && matchesType;
  });

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BW', {
      style: 'currency',
      currency: 'BWP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Sales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your dream property in Botswana with our extensive collection
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Property Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Property Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000000}
                  min={0}
                  step={50000}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                {filteredProperties.length} properties found
              </p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          {filteredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {property.featured && (
                    <Badge className="bg-orange-600 text-white">Featured</Badge>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    className={`p-2 ${favorites.includes(property.id) ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(property.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {property.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-xl font-bold text-orange-600">
                    {formatPrice(property.price)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{property.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area}m²</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertySales;