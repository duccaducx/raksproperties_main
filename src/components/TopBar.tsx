import React from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
  sidebarOpen: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarOpen }) => {
  return (
    <div className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-300 z-40 ${
      sidebarOpen ? 'left-64' : 'left-16'
    }`}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties, clients, agents..."
            className="pl-10 w-80"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-orange-500 text-white">JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:block">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;