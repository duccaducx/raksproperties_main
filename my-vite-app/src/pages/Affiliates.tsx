import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, DollarSign, TrendingUp, Award, UserPlus, Building } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Affiliates = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    location: "",
    motivation: "",
    referralType: ""
  });

  const [propertyData, setPropertyData] = useState({
    propertyTitle: "",
    propertyType: "",
    location: "",
    price: "",
    description: "",
    ownerName: "",
    ownerContact: ""
  });

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Competitive Commission",
      description: "Earn up to 3% commission on successful property sales",
      amount: "BWP 15,000 - BWP 150,000"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Performance Bonuses",
      description: "Additional bonuses for top performers each quarter",
      amount: "Up to BWP 50,000"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Recognition Program",
      description: "Monthly awards and annual recognition events",
      amount: "Certificates & Prizes"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Network Building",
      description: "Access to exclusive real estate networking events",
      amount: "Quarterly Events"
    }
  ];

  const handleAffiliateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Affiliate application:", formData);
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Property listing:", propertyData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Affiliate Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join Raks Properties affiliate network and earn commissions by connecting clients with their dream properties
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{benefit.description}</p>
                <Badge className="bg-orange-100 text-orange-800">
                  {benefit.amount}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="join" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="join" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Join as Affiliate
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              List Property
            </TabsTrigger>
          </TabsList>

          <TabsContent value="join">
            <Card>
              <CardHeader>
                <CardTitle>Become a Raks Properties Affiliate</CardTitle>
                <p className="text-gray-600">
                  Help us connect potential buyers with quality properties and earn attractive commissions
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAffiliateSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+267 XX XXX XXX"
                        required
                      />
                    </div>
                    <div>
                      <Label>Experience Level</Label>
                      <Select onValueChange={(value) => setFormData({...formData, experience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Preferred Working Location</Label>
                    <Select onValueChange={(value) => setFormData({...formData, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="francistown">Francistown</SelectItem>
                        <SelectItem value="gaborone">Gaborone</SelectItem>
                        <SelectItem value="maun">Maun</SelectItem>
                        <SelectItem value="kasane">Kasane</SelectItem>
                        <SelectItem value="palapye">Palapye</SelectItem>
                        <SelectItem value="nationwide">Nationwide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Referral Type Interest</Label>
                    <Select onValueChange={(value) => setFormData({...formData, referralType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="What would you like to focus on?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyers">Finding Buyers for Properties</SelectItem>
                        <SelectItem value="properties">Listing New Properties</SelectItem>
                        <SelectItem value="both">Both Buyers and Properties</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to join our affiliate program?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      placeholder="Tell us about your motivation and goals..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Submit Affiliate Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>List a Property</CardTitle>
                <p className="text-gray-600">
                  Help property owners connect with potential buyers through our network
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePropertySubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyTitle">Property Title *</Label>
                      <Input
                        id="propertyTitle"
                        value={propertyData.propertyTitle}
                        onChange={(e) => setPropertyData({...propertyData, propertyTitle: e.target.value})}
                        placeholder="e.g., Modern 3-Bedroom House"
                        required
                      />
                    </div>
                    <div>
                      <Label>Property Type *</Label>
                      <Select onValueChange={(value) => setPropertyData({...propertyData, propertyType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="land">Land/Plot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyLocation">Location *</Label>
                      <Input
                        id="propertyLocation"
                        value={propertyData.location}
                        onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
                        placeholder="e.g., Francistown, Block 7"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Asking Price (BWP) *</Label>
                      <Input
                        id="price"
                        value={propertyData.price}
                        onChange={(e) => setPropertyData({...propertyData, price: e.target.value})}
                        placeholder="e.g., 1250000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="propertyDescription">Property Description *</Label>
                    <Textarea
                      id="propertyDescription"
                      value={propertyData.description}
                      onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
                      placeholder="Describe the property features, condition, and unique selling points..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerName">Property Owner Name *</Label>
                      <Input
                        id="ownerName"
                        value={propertyData.ownerName}
                        onChange={(e) => setPropertyData({...propertyData, ownerName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerContact">Owner Contact *</Label>
                      <Input
                        id="ownerContact"
                        value={propertyData.ownerContact}
                        onChange={(e) => setPropertyData({...propertyData, ownerContact: e.target.value})}
                        placeholder="Phone or Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Commission Structure</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Properties under BWP 1M: 2% commission</li>
                      <li>• Properties BWP 1M - 3M: 2.5% commission</li>
                      <li>• Properties over BWP 3M: 3% commission</li>
                      <li>• Bonus: Additional 0.5% for exclusive listings</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Submit Property Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Affiliates;