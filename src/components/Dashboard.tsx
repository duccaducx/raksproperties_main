import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, UserCheck, TrendingUp, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from './PropertyCard';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Properties', value: '124', icon: Building, color: 'text-blue-600' },
    { title: 'Active Clients', value: '89', icon: Users, color: 'text-green-600' },
    { title: 'Agents', value: '12', icon: UserCheck, color: 'text-purple-600' },
    { title: 'Monthly Revenue', value: '$45,230', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const sampleProperties = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: '$2,500',
      location: 'Downtown District',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sq ft',
      type: 'rent' as const,
      image: '/placeholder.svg',
      views: 45
    },
    {
      id: '2',
      title: 'Luxury Villa with Pool',
      price: '$850,000',
      location: 'Suburban Heights',
      bedrooms: 4,
      bathrooms: 3,
      area: '2,800 sq ft',
      type: 'sale' as const,
      image: '/placeholder.svg',
      views: 78
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;