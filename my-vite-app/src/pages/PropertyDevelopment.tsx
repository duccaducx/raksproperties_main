import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, Mail, Building, Clock } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PropertyDevelopment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    location: "",
    description: ""
  });

  const developmentTypes = [
    "Residential Complex",
    "Commercial Building",
    "Mixed-Use Development",
    "Luxury Villas",
    "Apartment Complex",
    "Shopping Center"
  ];

  const budgetRanges = [
    "BWP 500,000 - BWP 1,000,000",
    "BWP 1,000,000 - BWP 2,500,000",
    "BWP 2,500,000 - BWP 5,000,000",
    "BWP 5,000,000 - BWP 10,000,000",
    "BWP 10,000,000+"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Development request:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Development Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your vision into reality with Raks Properties' comprehensive development services in Botswana
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6 text-orange-600" />
                Development Request Form
              </CardTitle>
              <CardDescription>
                Share your project details and we'll create a custom development plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+267 XX XXX XXX"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Project Type</Label>
                    <Select onValueChange={(value) => setFormData({...formData, projectType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select development type" />
                      </SelectTrigger>
                      <SelectContent>
                        {developmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Budget Range</Label>
                    <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., Francistown, Gaborone, Maun"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your development vision, requirements, and any specific features"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Submit Development Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Development Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Site Analysis & Planning",
                    "Architectural Design",
                    "Project Management",
                    "Construction Oversight",
                    "Quality Assurance",
                    "Post-Development Support"
                  ].map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        ✓
                      </Badge>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Development Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Planning & Design</span>
                    <span className="text-gray-600">2-4 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Permits & Approvals</span>
                    <span className="text-gray-600">1-3 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Construction</span>
                    <span className="text-gray-600">6-18 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Inspections</span>
                    <span className="text-gray-600">1 month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Our Development Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-orange-600" />
                    <span>+267 71 323 746</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-orange-600" />
                    <span>development@raksproperties.co.bw</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span>Francistown, Botswana</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDevelopment;