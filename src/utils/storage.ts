import { GeneratedContent } from '../types';

const STORAGE_KEY = 'ai-content-history';  // Use the same key consistently

export const saveToHistory = (content: GeneratedContent): void => {
  try {
    const history = getHistory();
    const updatedHistory = [content, ...history].slice(0, 50); // Keep last 50 items
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

export const getHistory = (): GeneratedContent[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

export const deleteHistoryItem = (id: string) => {
  const history = getHistory();  // Get all history items
  const updatedHistory = history.filter(item => item.id !== id);  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));  // Save updated history back to local storage
};
