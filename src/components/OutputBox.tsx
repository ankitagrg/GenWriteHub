import React, { useState } from 'react';
import { Copy, Download, Check, AlertCircle, FileText, Sparkles } from 'lucide-react';

interface OutputBoxProps {
  content: string;
  isGenerating: boolean;
  error: string | null;
  onSave?: () => void;
}

export const OutputBox: React.FC<OutputBoxProps> = ({ 
  content, 
  isGenerating, 
  error,
  onSave 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    onSave?.();
  };
  const renderContentWithBoldTopic = (content: string) => {
    const lines = content.split('\n');

    if (lines.length > 0) {
      lines[0] = `<strong class="font-bold">${lines[0]}</strong>`; 
    }

    return lines.join('\n');
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-black-900">Generated Content</h2>
        </div>
        
        {content && !isGenerating && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-lg font-medium">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              <span className="text-lg font-medium">Download</span>
            </button>
          </div>
        )}
      </div>

      <div className="relative min-h-[300px]">
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 animate-pulse" />
              </div>
              <p className="text-black-700 font-medium text-lg">Generating your content...</p>
              <p className="text-black-500 text-sm mt-2">This usually takes just a few seconds</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <p className="text-red-800 font-bold text-lg">Generation Error</p>
              <p className="text-red-600 mt-2">{error}</p>
            </div>
          </div>
        )}

        {content && !isGenerating && !error && (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border-2 border-gray-200 shadow-inner">
            <pre 
              className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed font-sans font-medium"
              dangerouslySetInnerHTML={{ __html: renderContentWithBoldTopic(content) }}
            />
          </div>
        )}

        {!content && !isGenerating && !error && (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-black-400" />
            </div>
            <p className="text-black-600 font-medium text-lg">Your generated content will appear here...</p>
            <p className="text-black-500 text-sm mt-2">Fill out the form and click "Generate Content" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
