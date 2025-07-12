import React from 'react';
import { Wand2, Loader2, User, MessageSquare, Hash, Target } from 'lucide-react';
import { GenerationInput } from '../types';

interface GeneratorFormProps {
  input: GenerationInput;
  onInputChange: (input: GenerationInput) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  input,
  onInputChange,
  onGenerate,
  isGenerating,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  const isFormValid = input.topic && input.audience && input.tone && input.keywords;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Content Details</h2> {/* Increased font size */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center space-x-2 text-lg font-bold text-gray-700 mb-3"> {/* Increased font size */}
            <Target className="w-5 h-5 text-blue-500" /> {/* Updated emoji size */}
            <span>Topic / Title</span>
          </label>
          <input
            type="text"
            value={input.topic}
            onChange={(e) => onInputChange({ ...input, topic: e.target.value })}
            placeholder="Enter your topic..."
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-lg" /* Increased font size */
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-lg font-bold text-gray-700 mb-3"> {/* Increased font size */}
            <User className="w-5 h-5 text-green-500" /> {/* Updated emoji size */}
            <span>Target Audience</span>
          </label>
          <input
            type="text"
            value={input.audience}
            onChange={(e) => onInputChange({ ...input, audience: e.target.value })}
            placeholder="Who is your target audience?"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-lg" /* Increased font size */
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-lg font-bold text-gray-700 mb-3"> {/* Increased font size */}
            <MessageSquare className="w-5 h-5 text-purple-500" /> {/* Updated emoji size */}
            <span>Tone of Voice</span>
          </label>
          <input
            type="text"
            value={input.tone}
            onChange={(e) => onInputChange({ ...input, tone: e.target.value })}
            placeholder="What tone should the content have?"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-lg" /* Increased font size */
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-lg font-bold text-gray-700 mb-3"> {/* Increased font size */}
            <Hash className="w-5 h-5 text-orange-500" /> {/* Updated emoji size */}
            <span>Keywords</span>
          </label>
          <input
            type="text"
            value={input.keywords}
            onChange={(e) => onInputChange({ ...input, keywords: e.target.value })}
            placeholder="Enter keywords separated by commas..."
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400 text-lg" /* Increased font size */
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isGenerating}
          className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl
            ${isFormValid && !isGenerating
              ? 'bg-[#d0e7ff] hover:bg-[#a7c8e8] text-blue-900'  
              : 'bg-gray-300 text-gray-500 cursor-not-allowed transform-none'
            }
          `}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Generating Content...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-6 h-6" />
              <span>Generate Content</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
