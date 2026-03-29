export default function NavRedesign() {
  return (
    <nav style={{
      background: 'var(--color-black)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--padding-nav)',
      position: 'sticky',
      top: 0,
      zIndex: 200,
    }}>
      <div style={{
        color: '#fff',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: 'var(--tracking-nav)',
        textTransform: 'uppercase',
        fontWeight: 400,
      }}>
        STERNES.DEV
      </div>
    </nav>
  )
}
