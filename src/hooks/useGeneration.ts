import { useState, useCallback } from 'react';
import { GenerationInput, GenerationState } from '../types';
import { aiService } from '../utils/ai';

export const useGeneration = () => {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    content: '',
    error: null,
  });

  const generateContent = useCallback(async (input: GenerationInput) => {
    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const content = await aiService.generateContent(input);
      setState(prev => ({ ...prev, content, isGenerating: false }));
      return content;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
      setState(prev => ({ ...prev, error: errorMessage, isGenerating: false }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isGenerating: false, content: '', error: null });
  }, []);

  return {
    ...state,
    generateContent,
    reset,
  };
};
