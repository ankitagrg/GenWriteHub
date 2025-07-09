import React from 'react';
import { Sparkles, History } from 'lucide-react';

interface HeaderProps {
  onHistoryClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHistoryClick }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
           
            
          </div>
          
          <button
            onClick={onHistoryClick}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <History className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">History</span>
          </button>
        </div>
      </div>
    </header>
  );
};