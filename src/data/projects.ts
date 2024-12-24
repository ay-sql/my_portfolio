export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: 'UI/UX' | 'Web Development' | 'Product Design' | 'Mobile App';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Dashboard',
    description: 'A modern dashboard for e-commerce analytics with real-time data visualization and inventory management.',
    imageUrl: '/img/test.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    category: 'Web Development',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project'
  },
  {
    id: '2',
    title: 'Health & Fitness App',
    description: 'Mobile application for tracking workouts, nutrition, and personal health goals with customizable plans.',
    imageUrl: '/img/test.jpg',
    tags: ['React Native', 'Firebase', 'Redux'],
    category: 'Mobile App',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project'
  },
  {
    id: '3',
    title: 'Travel Planning Platform',
    description: 'User-centered travel planning platform with itinerary builder and social sharing features.',
    imageUrl: '/img/test.jpg',
    tags: ['Figma', 'Prototyping', 'User Research'],
    category: 'UI/UX',
    demoUrl: 'https://demo.example.com'
  },
  {
    id: '4',
    title: 'Smart Home Interface',
    description: 'Intuitive interface design for controlling smart home devices with voice and gesture controls.',
    imageUrl: '/img/test.jpg',
    tags: ['Product Strategy', 'UI Design', 'IoT'],
    category: 'Product Design',
    demoUrl: 'https://demo.example.com'
  },
  {
    id: '5',
    title: 'Social Media Analytics',
    description: 'Comprehensive analytics dashboard for social media management and content planning.',
    imageUrl: '/img/test.jpg',
    tags: ['Vue.js', 'D3.js', 'Node.js'],
    category: 'Web Development',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project'
  }
];
