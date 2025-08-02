import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const HeroSection: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    checkin: '',
    checkout: '',
    guests: ''
  });

  const locations = [
    'Gaborone', 'Francistown', 'Molepolole', 'Serowe', 'Maun',
    'Lobatse', 'Palapye', 'Kanye', 'Mochudi', 'Mahalapye'
  ];

  const handleSearch = async () => {
    setSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setSearching(false);
      // Handle search logic here
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Hero Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/68550cfd9f4173497988aa91_1750407510601_f169734c.jpg)'
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="w-full">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-yellow-300">Property in Botswana</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover amazing properties with Raks Properties - Your trusted partner in real estate across Botswana
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">250+</div>
                <div className="text-sm opacity-80">Properties Sold</div>
              </div>
              <div className="w-px bg-white/30 mx-4" />
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm opacity-80">Happy Clients</div>
              </div>
              <div className="w-px bg-white/30 mx-4" />
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15</div>
                <div className="text-sm opacity-80">Locations</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Card */}
          <Card className="max-w-5xl mx-auto p-8 bg-white/95 backdrop-blur-lg shadow-2xl border-0 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                  Location
                </label>
                <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger className="h-12 border-2 focus:border-orange-500">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                  Check-in
                </label>
                <Input 
                  type="date" 
                  className="h-12 border-2 focus:border-orange-500"
                  value={formData.checkin}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkin: e.target.value }))}
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                  Check-out
                </label>
                <Input 
                  type="date" 
                  className="h-12 border-2 focus:border-orange-500"
                  value={formData.checkout}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkout: e.target.value }))}
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-orange-600" />
                  Guests
                </label>
                <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}>
                  <SelectTrigger className="h-12 border-2 focus:border-orange-500">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={handleSearch}
                disabled={searching}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {searching ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search Properties
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;