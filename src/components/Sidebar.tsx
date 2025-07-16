import React from 'react';
import { LayoutDashboard, Users, BarChart3, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo and Title */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold text-gray-800">alevelmentor.ai</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button 
            onClick={() => onPageChange('dashboard')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              currentPage === 'dashboard' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => onPageChange('mentor')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg relative ${
              currentPage === 'mentor' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Mentor</span>
            <div className="absolute right-2 top-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
          
          <button 
            onClick={() => onPageChange('analytics')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              currentPage === 'analytics' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          
          <button 
            onClick={() => onPageChange('pastpapers')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              currentPage === 'pastpapers' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Past Papers</span>
          </button>
          
          <button 
            onClick={() => onPageChange('settings')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
              currentPage === 'settings' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">NG</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Neil George</p>
            <p className="text-xs text-gray-500">bobu@bobu.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;