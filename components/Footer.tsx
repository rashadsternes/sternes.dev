export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-black)',
      padding: 'var(--padding-footer)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        color: '#fff',
        fontSize: '10px',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
      }}>
        STERNES.DEV
      </div>
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        <a href="/privacy" style={{ color: '#888', textDecoration: 'none' }}>Privacy</a>
        <a href="/terms" style={{ color: '#888', textDecoration: 'none' }}>Terms</a>
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        color: '#333',
      }}>
        © 2026 Rashad Sternes
      </div>
    </footer>
  )
}
