import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, MapPin, Calendar, Users, Briefcase, Home } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Building,
      title: 'Property Sales',
      description: 'Buy and sell residential and commercial properties across Botswana',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: MapPin,
      title: 'Location Services',
      description: 'Find properties in prime locations throughout Botswana',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Schedule property viewings and consultations',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Affiliates',
      description: 'Partner with us for exclusive property deals',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Briefcase,
      title: 'Property Management',
      description: 'Complete property management and maintenance services',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Home,
      title: 'Construction',
      description: 'Quality construction and development services',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate services across Botswana - "Build Quality with us"
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${service.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;