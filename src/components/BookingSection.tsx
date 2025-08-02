import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Phone, Mail, MapPin } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const BookingSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    date: '',
    message: ''
  });

  const services = [
    'Property Viewing',
    'Property Sales Consultation',
    'Construction Consultation',
    'Property Management',
    'Investment Advisory',
    'Other'
  ];

  const locations = [
    'Gaborone', 'Francistown', 'Molepolole', 'Serowe', 'Maun',
    'Lobatse', 'Palapye', 'Kanye', 'Mochudi', 'Mahalapye'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert('Appointment request submitted successfully!');
      setFormData({
        name: '', email: '', phone: '', service: '', location: '', date: '', message: ''
      });
    }, 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Book an Appointment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a consultation with our property experts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">Guy Street, Francistown Outlying 1, Botswana</p>
                    <p className="text-gray-600">P.O Box 2806, Francistown, Botswana</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+267 76 246 907</p>
                    <p className="text-gray-600">71 323 746</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">raksproperties21@gmail.com</p>
                    <p className="text-gray-600">mbrakanye@gmail.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Schedule Appointment</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Textarea
                  placeholder="Additional Message (Optional)"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
                
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
                >
                  {submitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;