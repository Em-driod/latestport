import Container from '../components/Container'

export default function Contact() {
  return (
    <Container>
      <div className="card" style={{ display: 'grid', gap: '1rem' }}>
        <h2 className="h2">Contact</h2>
        <p className="muted">Open to roles, freelance, and collabs. Email me and I’ll reply promptly.</p>
        <a className="btn" href="mailto:you@example.com?subject=Hello%20from%20your%20portfolio">Email Me</a>
      </div>
    </Container>
  )
}
