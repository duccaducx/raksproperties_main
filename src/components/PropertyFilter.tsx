import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import PriceSlider from './PriceSlider';

interface FilterState {
  location: string;
  propertyType: string;
  bedrooms: string;
  priceRange: number[];
}

const PropertyFilter: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    propertyType: '',
    bedrooms: '',
    priceRange: [50000, 5000000]
  });

  const locations = [
    'Gaborone', 'Francistown', 'Molepolole', 'Serowe', 'Maun',
    'Lobatse', 'Palapye', 'Kanye', 'Mochudi', 'Mahalapye'
  ];

  const propertyTypes = [
    'House', 'Apartment', 'Townhouse', 'Villa', 'Plot', 'Commercial'
  ];

  const bedroomOptions = ['1', '2', '3', '4', '5+'];

  const clearFilter = (filterKey: keyof FilterState) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: filterKey === 'priceRange' ? [50000, 5000000] : ''
    }));
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === 'priceRange') return value[0] !== 50000 || value[1] !== 5000000;
    return value !== '';
  });

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Filter Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Bedrooms</label>
          <Select value={filters.bedrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map(option => (
                <SelectItem key={option} value={option}>{option} Bedroom{option !== '1' ? 's' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <PriceSlider onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))} />

      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {key === 'priceRange' 
                  ? `P ${(value as number[])[0].toLocaleString()} - P ${(value as number[])[1].toLocaleString()}`
                  : `${key}: ${value}`
                }
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => clearFilter(key as keyof FilterState)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PropertyFilter;