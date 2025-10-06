import Container from '../components/Container'
import experience from '../data/experience'

export default function Experience() {
  return (
    <Container>
      <h2 className="h2">Experience</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {experience.map((e) => (
          <div key={e.company + e.role} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <strong>{e.role} · {e.company}</strong>
              <span className="muted">{e.period}</span>
            </div>
            <p style={{ marginTop: '.5rem' }}>{e.summary}</p>
            <p className="muted" style={{ marginTop: '.25rem', fontSize: '.9rem' }}>{e.highlights.join(' · ')}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
