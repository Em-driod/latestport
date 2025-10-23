type Project = {
  slug: string
  title: string
  summary: string
  stack: string[]
  href: string
  image?: string
  imageBack?: string
}

const projects: Project[] = [
  {
    slug: 'interface-kit',
    title: 'Interface Kit',
    summary: 'Composable UI primitives with accessibility baked in.',
    stack: ['TypeScript', 'React', 'Vite'],
    href: 'https://example.com/interface-kit',
    image: '/arther.png',
    imageBack: '/rac.jpg',
  },
  {
    slug: 'perf-labs',
    title: 'Perf Labs',
    summary: 'Performance experiments and case studies for the web.',
    stack: ['Vite', 'React', 'Web Vitals'],
    href: 'https://example.com/perf-labs',
     image: '/heritage.png',
    imageBack: '/ferum.png',
  },
  {
    slug: 'dashboard-pro',
    title: 'Dashboard Pro',
    summary: 'Advanced analytics dashboard for business intelligence.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://example.com/dashboard-pro',
     image: '/utar.png',
    imageBack: '/foko.png',
  },
  {
    slug: 'ecommerce-hub',
    title: 'E-Commerce Hub',
    summary: 'Full-featured e-commerce platform with payment integration.',
    stack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    href: 'https://example.com/ecommerce-hub',
      image: '/sage.png',
    imageBack: '/agba.png',
  },
  {
    slug: 'portfolio-creative',
    title: 'Portfolio Creative',
    summary: 'Personal portfolio site showcasing creative work and skills.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    href: 'https://example.com/portfolio-creative',
     image: '/zvaphone.png',
    imageBack: '/zva.png',
  },
  {
    slug: 'blogify',
    title: 'Blogify',
    summary: 'Modern blogging platform with markdown and rich media support.',
    stack: ['Next.js', 'TypeScript', 'MongoDB'],
    href: 'https://example.com/blogify',
     image: '/motor.png',
    imageBack: '/motorphone.png',
  },
  
  {
    slug: 'taskflow',
    title: 'TaskFlow',
    summary: 'Productivity app for task management and team collaboration.',
    stack: ['React', 'Firebase', 'Material UI'],
    href: 'https://example.com/taskflow',
  },
  {
    slug: 'ai-vision',
    title: 'AI Vision',
    summary: 'AI-powered image recognition and dashboard analytics.',
    stack: ['Python', 'FastAPI', 'React', 'TensorFlow'],
    href: 'https://example.com/ai-vision',
  },
  {
    slug: 'evently',
    title: 'Evently',
    summary: 'Event management platform for ticketing and scheduling.',
    stack: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://example.com/evently',
  },
]

export default projects
