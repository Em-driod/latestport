type Experience = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
}

const experience: Experience[] = [
  {
    company: 'Coded Reality',
    role: 'Frontend Engineer',
    period: '2023 — Present',
    summary: 'Shipped high-fidelity interfaces with performance and a11y focus.',
    highlights: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    company: 'Freelance',
    role: 'Engineer / Designer',
    period: '2020 — 2023',
    summary: 'Delivered end-to-end web projects for startups and creators.',
    highlights: ['Design systems', 'Animation', 'DX'],
  },
]

export default experience
