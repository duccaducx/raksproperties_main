import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import PropertyFilter from './PropertyFilter';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  featured?: boolean;
}

const FeaturedProperties: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const properties: Property[] = [
    {
      id: 1,
      title: 'Modern Family Home in Gaborone',
      location: 'Gaborone, Botswana',
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      type: 'House',
      image: 'https://d64gsuwffb70l.cloudfront.net/68550cfd9f4173497988aa91_1750407510601_f169734c.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Luxury Apartment Complex',
      location: 'Francistown, Botswana',
      price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      type: 'Apartment',
      image: 'https://d64gsuwffb70l.cloudfront.net/68550cfd9f4173497988aa91_1750407513287_3820622e.jpg',
      featured: true
    },
    {
      id: 3,
      title: 'Executive Townhouse',
      location: 'Molepolole, Botswana',
      price: 950000,
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      type: 'Townhouse',
      image: 'https://d64gsuwffb70l.cloudfront.net/68550cfd9f4173497988aa91_1750407582834_2c886aaa.jpg',
      featured: true
    }
  ];

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price: number) => {
    return `P ${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties across Botswana
          </p>
        </div>

        <div className="mb-8">
          <PropertyFilter />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                {property.featured && (
                  <Badge className="absolute top-4 left-4 bg-orange-600">
                    Featured
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    favorites.includes(property.id) 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-white/80 text-gray-600'
                  }`}
                  onClick={() => toggleFavorite(property.id)}
                >
                  <Heart className={`h-4 w-4 ${
                    favorites.includes(property.id) ? 'fill-current' : ''
                  }`} />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatPrice(property.price)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area}m²</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
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
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setLoading(true)}
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            Load More Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;