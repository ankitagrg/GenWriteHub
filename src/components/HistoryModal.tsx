import React, { useState } from 'react';
import { X, Clock, Copy, Trash2, FileText, Calendar } from 'lucide-react';
import { GeneratedContent } from '../types';
import { contentTypes } from '../utils/contentTypes';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedContent[];
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onDeleteHistoryItem,
}) => {
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 py-10">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
           
<div className="bg-blue-900 px-8 py-6">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-white/20 rounded-xl">
        <Clock className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">Generation History</h3>
        <p className="text-white/80 text-sm">{history.length} items saved</p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      {history.length > 0 && (
        <button
          onClick={onClearHistory}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium">Clear All</span>
        </button>
      )}
      <button
        onClick={onClose}
        className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
</div>


            {/* History List */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">No generation history yet</h4>
                  <p className="text-gray-500">Your generated content will appear here for easy access</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4 text-gray-600">
                    Click any item to view full content
                  </div>
                  {history.map((item) => {
                    const contentType = contentTypes.find(type => type.id === item.contentType);
                    return (
                      <div
                        key={item.id}
                        className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition cursor-pointer"
                        onClick={() => setSelectedContent(item)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">

                            <div>

                              <div className="flex items-center space-x-2 mt-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500 font-medium">
                                  {formatDate(item.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); 
                                onDeleteHistoryItem(item.id); 
                              }}
                              className="p-2 hover:bg-red-100 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(item.output);
                              }}
                              className="p-2 hover:bg-blue-100 rounded-xl transition-colors group"
                            >
                              <Copy className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-base font-bold text-gray-800 mb-2">{item.input.topic}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{item.output}</p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      
      {selectedContent && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedContent(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-bold mb-2">{selectedContent.input.topic}</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedContent.output}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {selectedContent.input.audience}
              </span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {selectedContent.input.tone}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
