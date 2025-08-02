import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Property Sales", href: "/property-sales" },
    { name: "Location Services", href: "/location-services" },
    { name: "Property Development", href: "/property-development" },
    { name: "Affiliates", href: "/affiliates" },
    { name: "X-Chart AI", href: "/x-chart" }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-orange-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+267 71 323 746</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@raksproperties.co.bw</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Francistown, Botswana</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://www.facebook.com/raksproperties20" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-orange-200">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-orange-200">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Raks Properties</h1>
              <p className="text-sm text-gray-600">Your Dream, Our Mission</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;