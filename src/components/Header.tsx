import React from 'react';
import { Sparkles, History } from 'lucide-react';
import iconImage from '../assets/writer.png'; 

interface HeaderProps {
  onHistoryClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHistoryClick }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img
              src={iconImage}
              alt="App Icon"
              className="w-10 h-10 rounded-xl object-cover"/>
             <span className="text-lg font-bold text-black-800">GenWriteHub</span> 
          </div>
          <button
            onClick={onHistoryClick}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md">
            <History className="w-5 h-5 text-black-600" />
            <span className="text-sm font-semibold text-gray-700">History</span>
          </button>
        </div>
      </div>
    </header>
  );
};
