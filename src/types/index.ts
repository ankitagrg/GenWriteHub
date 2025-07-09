
export interface GenerationInput {
  contentType: string;
  topic: string;
  audience: string;
  tone: string;
  keywords: string;
}

export interface GenerationState {
  isGenerating: boolean;
  content: string;
  error: string | null;
}

export interface GeneratedContent {
  id: string;
  timestamp: number;
  input: GenerationInput;
  output: string;
  contentType: string;
}

export interface ContentType {
  id: string;
  label: string;
  description: string;
  icon: string;
  placeholders: {
    topic: string;
    audience: string;
    tone: string;
    keywords: string;
  };
}
