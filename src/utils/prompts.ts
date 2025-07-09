import { GenerationInput } from '../types';

export const promptTemplates = {
  blog: `Write a {tone} blog post on the topic "{topic}" for a {audience} audience. 
Incorporate the following keywords naturally: {keywords}. 
Structure it with an engaging introduction, informative body paragraphs, and a compelling conclusion. 
Make it around 400-500 words, SEO-friendly, and include actionable insights.`,

  email: `Compose a {tone} email about "{topic}" for {audience}. 
Include the keywords: {keywords} naturally throughout.
Structure: Subject line, engaging opening, main message with value proposition, and clear call-to-action.
Keep it concise but persuasive, around 200-300 words.`,

  adcopy: `Create persuasive ad copy for "{topic}" targeting {audience}. 
The tone should be {tone}. Incorporate these keywords: {keywords}.
Include a compelling headline, key benefits, social proof element, and strong call-to-action.
Make it conversion-focused and under 150 words.`,

  social: `Create an engaging social media post about "{topic}" for {audience} in a {tone} voice. 
Include relevant keywords: {keywords}.
Keep it under 280 characters, include relevant emojis, and add 3-5 hashtags.
Make it shareable and encourage engagement.`,

  meta: `Generate SEO-optimized meta tags for "{topic}" targeting {audience}.
Include these keywords: {keywords} naturally.
Tone should be {tone} but professional.
Provide:
1. Meta title (50-60 characters)
2. Meta description (150-160 characters)
3. Focus keyword
4. 3-5 relevant tags`
};

export const formatPrompt = (input: GenerationInput): string => {
  const template = promptTemplates[input.contentType as keyof typeof promptTemplates];
  
  return template
    .replace(/{topic}/g, input.topic)
    .replace(/{audience}/g, input.audience)
    .replace(/{tone}/g, input.tone)
    .replace(/{keywords}/g, input.keywords); 
};
