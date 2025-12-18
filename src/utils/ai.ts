import { GenerationInput } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class AIService {

  private removeMarkdown(text: string): string {
    return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/_/g, '');
  }

  async generateContent(input: GenerationInput, apiKey?: string): Promise<string> {
    try {
      const response = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, apiKey }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to generate content: ${errorMessage || response.statusText}`);
      }
      const data = await response.json();
      if (!data.content) {
        throw new Error('Invalid response structure: Missing content.');
      }
      const cleanContent = this.removeMarkdown(data.content);

      return cleanContent;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error(`Error generating content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}


export const aiService = new AIService();
