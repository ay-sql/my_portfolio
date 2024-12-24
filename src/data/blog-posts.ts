export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedAt: Date;
  tags: string[];
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Importance of User-Centered Design',
    excerpt: 'Learn why putting users first in your design process leads to better products.',
    content: 'Full article content here...',
    imageUrl: '/img/test.jpg',
    publishedAt: new Date('2024-01-15'),
    tags: ['UX Design', 'Design Thinking', 'Product Design'],
    readTime: 5,
  },
  {
    id: '2',
    title: 'Creating Effective Design Systems',
    excerpt: 'A comprehensive guide to building and maintaining design systems.',
    content: 'Full article content here...',
    imageUrl: '/img/test.jpg',
    publishedAt: new Date('2024-01-10'),
    tags: ['UI Design', 'Design Systems', 'Product Design'],
    readTime: 8,
  },
  {
    id: '3',
    title: 'The Role of Psychology in UX Design',
    excerpt: 'Understanding how psychology influences user behavior and decision-making.',
    content: 'Full article content here...',
    imageUrl: '/img/test.jpg',
    publishedAt: new Date('2024-01-05'),
    tags: ['UX Design', 'Psychology', 'User Research'],
    readTime: 6,
  },
  {
    id: '4',
    title: 'Designing for Accessibility',
    excerpt: 'Best practices for creating inclusive digital experiences.',
    content: 'Full article content here...',
    imageUrl: '/img/test.jpg',
    publishedAt: new Date('2024-01-01'),
    tags: ['Accessibility', 'UI Design', 'UX Design'],
    readTime: 7,
  },
  {
    id: '5',
    title: 'The Future of Product Design',
    excerpt: 'Emerging trends and technologies shaping the future of product design.',
    content: 'Full article content here...',
    imageUrl: '/img/test.jpg',
    publishedAt: new Date('2023-12-28'),
    tags: ['Product Design', 'Innovation', 'Trends'],
    readTime: 5,
  },
];
