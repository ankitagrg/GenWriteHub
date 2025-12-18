import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

import { GenerationInput, GeneratedContent } from './types';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { OutputBox } from './components/OutputBox';
import { HistoryModal } from './components/HistoryModal';
import { ApiKeyPrompt } from './components/ApiKeyPrompt';
import { useGeneration } from './hooks/useGeneration';
import { saveToHistory, getHistory, clearHistory, deleteHistoryItem } from './utils/storage';

function App() {
  const [input, setInput] = useState<GenerationInput>({
    contentType: 'blog',
    topic: '',
    audience: '',
    tone: '',
    keywords: '',
  });

  const [history, setHistory] = useState<GeneratedContent[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);

  const { isGenerating, content, error, generateContent, reset } = useGeneration();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerate = async () => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('groq_api_key');
    if (!apiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    try {
      const generatedContent = await generateContent(input, apiKey);
      const historyItem: GeneratedContent = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        input: { ...input },
        output: generatedContent,
        contentType: input.contentType,
      };

      saveToHistory(historyItem);
      setHistory(getHistory());
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  return (
    <div className="min-h-screen bg-[#f0f8ff] text-black px-4 sm:px-6 lg:px-8 pb-12">
      <Header onHistoryClick={() => setShowHistory(true)} />

      <main className="max-w-7xl mx-auto py-12 space-y-10">
        <div className="text-center">

          <p className="text-xl md:text-2xl text-black-700 max-w-3xl mx-auto leading-relaxed mt-2">
            Turning your thoughts into words, instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          <GeneratorForm
            input={input}
            onInputChange={setInput}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <OutputBox
            content={content}
            isGenerating={isGenerating}
            error={error}
          />
        </div>
      </main>

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
      />

      {showApiKeyPrompt && (
        <ApiKeyPrompt onClose={() => setShowApiKeyPrompt(false)} />
      )}
    </div>
  );
}

export default App;
