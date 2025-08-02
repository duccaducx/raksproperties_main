import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, Eye, Heart } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: 'rent' | 'sale';
  image: string;
  views: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  image,
  views,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant={type === 'rent' ? 'default' : 'secondary'}
            className={type === 'rent' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}
          >
            For {type === 'rent' ? 'Rent' : 'Sale'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-sm flex items-center">
          <Eye className="h-3 w-3 mr-1" />
          {views}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-orange-600">{price}</span>
          {type === 'rent' && <span className="text-gray-500 text-sm">/month</span>}
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {bedrooms} bed
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {bathrooms} bath
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {area}
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
            View Details
          </Button>
          <Button variant="outline" className="flex-1">
            Contact Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;