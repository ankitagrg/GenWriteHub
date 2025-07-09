import { ContentType } from '../types';

export const contentTypes: ContentType[] = [
  {
    id: 'blog',
    label: 'Blog Post',
    description: 'Create engaging blog posts and articles',
    icon: 'FileText',
    placeholders: {
      topic: 'The Future of Artificial Intelligence',
      audience: 'Tech enthusiasts and professionals',
      tone: 'informative yet engaging',
      keywords: 'AI, machine learning, technology, future'
    }
  },
  {
    id: 'email',
    label: 'Email',
    description: 'Craft professional email campaigns',
    icon: 'Mail',
    placeholders: {
      topic: 'Product Launch Announcement',
      audience: 'Existing customers and subscribers',
      tone: 'professional but friendly',
      keywords: 'launch, new product, benefits, exclusive'
    }
  },
  {
    id: 'adcopy',
    label: 'Ad Copy',
    description: 'Generate persuasive advertising copy',
    icon: 'Target',
    placeholders: {
      topic: 'Premium Coffee Subscription Service',
      audience: 'Coffee lovers and busy professionals',
      tone: 'persuasive and compelling',
      keywords: 'premium, fresh, convenient, subscription'
    }
  },
  {
    id: 'social',
    label: 'Social Media',
    description: 'Create catchy social media posts',
    icon: 'Share2',
    placeholders: {
      topic: 'Weekend Productivity Tips',
      audience: 'Young professionals and entrepreneurs',
      tone: 'casual and motivational',
      keywords: 'productivity, weekend, tips, motivation'
    }
  },
  {
    id: 'meta',
    label: 'SEO Meta Tags',
    description: 'Generate SEO-optimized meta descriptions',
    icon: 'Search',
    placeholders: {
      topic: 'Complete Guide to Digital Marketing',
      audience: 'Marketing professionals and business owners',
      tone: 'professional and informative',
      keywords: 'digital marketing, SEO, strategy, guide'
    }
  }
];