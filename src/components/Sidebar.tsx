import React from 'react';
import { Home, Building, Users, UserCheck, BarChart3, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Building, label: 'Listings', href: '#' },
    { icon: Users, label: 'Clients', href: '#' },
    { icon: UserCheck, label: 'Agents', href: '#' },
    { icon: BarChart3, label: 'Reports', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-black text-white transition-all duration-300 z-50 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-xl font-bold text-orange-500 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}>
            Raks Properties
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-white hover:text-orange-500 hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 hover:text-orange-500 transition-colors"
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={`transition-opacity ${
                  sidebarOpen ? 'opacity-100' : 'opacity-0'
                }`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;