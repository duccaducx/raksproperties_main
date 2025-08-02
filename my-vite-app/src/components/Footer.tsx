import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Raks Properties</h3>
                <p className="text-sm text-gray-400">Your Dream, Our Mission</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Leading real estate company in Botswana, specializing in residential and commercial properties across major cities.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/raksproperties20" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/property-sales" className="text-gray-400 hover:text-white transition-colors">Property Sales</Link></li>
              <li><Link to="/location-services" className="text-gray-400 hover:text-white transition-colors">Location Services</Link></li>
              <li><Link to="/property-development" className="text-gray-400 hover:text-white transition-colors">Property Development</Link></li>
              <li><Link to="/affiliates" className="text-gray-400 hover:text-white transition-colors">Affiliates</Link></li>
              <li><Link to="/x-chart" className="text-gray-400 hover:text-white transition-colors">X-Chart AI</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Property Sales & Purchases</li>
              <li>Real Estate Investment</li>
              <li>Property Development</li>
              <li>Market Analysis</li>
              <li>Property Management</li>
              <li>Legal Consultation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">+267 71 323 746</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">info@raksproperties.co.bw</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">Francistown, Botswana</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-sm mb-2">Business Hours</h5>
              <p className="text-xs text-gray-400">Mon - Fri: 8:00 AM - 5:00 PM</p>
              <p className="text-xs text-gray-400">Sat: 9:00 AM - 2:00 PM</p>
              <p className="text-xs text-gray-400">Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              Copyright {currentYear} Raks Properties. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;