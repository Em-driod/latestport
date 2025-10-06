import Container from '../components/Container'

export default function About() {
  return (
    <Container>
      <article className="fade-up elite-bio" style={{ display: 'grid', gap: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="h2 text-4xl font-extrabold text-lime-400 mb-2">About Me</h2>
        <p className="muted text-lg text-neutral-300 mb-4">
          I am a results-driven software engineer with a passion for building world-class digital experiences. My expertise spans full stack development, UI engineering, and performance optimization. I thrive on solving complex problems and delivering elegant, scalable solutions that empower users and businesses alike.
        </p>
        <div className="card bg-neutral-900 border border-lime-400/30 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-lime-300 mb-3">Elite Skillset</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-200">
            <li>TypeScript, React, Next.js, Vite, Node.js</li>
            <li>UI/UX Engineering, Accessibility, Performance</li>
            <li>Full Stack & API Design, Database Architecture</li>
            <li>Modern DevOps, Git, CI/CD, Cloud Platforms</li>
            <li>AI Integration, Dashboard & Data Visualization</li>
          </ul>
        </div>
        <div className="elite-values bg-neutral-800 rounded-xl p-5 mt-4">
          <h4 className="text-lg font-bold text-lime-400 mb-2">Values</h4>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li>Relentless pursuit of excellence</li>
            <li>Empathy for users and teammates</li>
            <li>Continuous learning and innovation</li>
            <li>Integrity, transparency, and impact</li>
          </ul>
        </div>
        <p className="mt-6 text-neutral-400 text-base text-center">
          <span className="font-semibold text-lime-400">Ready to elevate your next project?</span> Let's connect and build something extraordinary.
        </p>
      </article>
    </Container>
  )
}
