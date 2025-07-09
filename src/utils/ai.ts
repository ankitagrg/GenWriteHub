import { GenerationInput } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class AIService {
  
  private removeMarkdown(text: string): string {
    // Remove bold markdown (**bold**) and other common markdown formats
    return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/_/g, '');  // Remove _italic_ too if needed
  }

  async generateContent(input: GenerationInput): Promise<string> {
    try {
      // Send the request to the backend API
      const response = await fetch(`${BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(`Failed to generate content: ${errorMessage || response.statusText}`);
      }

      const data = await response.json();

     
      if (!data.content) {
        throw new Error('Invalid response structure: Missing content.');
      }

      // Clean the content before returning (remove any markdown formatting)
      const cleanContent = this.removeMarkdown(data.content);

      return cleanContent;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error(`Error generating content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}


export const aiService = new AIService();
