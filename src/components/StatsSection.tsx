import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AnimatedCounter from './AnimatedCounter';
import { Building, Users, MapPin, Award } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Building,
      title: 'Properties Sold',
      value: 250,
      suffix: '+',
      progress: 85,
      color: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'Happy Clients',
      value: 500,
      suffix: '+',
      progress: 92,
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Locations',
      value: 15,
      suffix: '',
      progress: 75,
      color: 'text-green-600'
    },
    {
      icon: Award,
      title: 'Years Experience',
      value: 8,
      suffix: '+',
      progress: 80,
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building quality with trust across Botswana
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                
                <h3 className="text-lg font-semibold mb-3">{stat.title}</h3>
                
                <div className="space-y-2">
                  <Progress value={stat.progress} className="h-2" />
                  <p className="text-sm text-gray-500">{stat.progress}% Complete</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;