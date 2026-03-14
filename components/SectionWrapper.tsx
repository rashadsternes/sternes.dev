interface SectionWrapperProps {
  label: string
  children: React.ReactNode
  id?: string
  style?: React.CSSProperties
  labelDark?: boolean
}

export default function SectionWrapper({ label, children, id, style, labelDark }: SectionWrapperProps) {
  return (
    <section id={id} className="section-wrapper" style={style}>
      <div className="section-label-col" style={labelDark ? { borderRightColor: '#222' } : undefined}>
        <div className="section-label" style={labelDark ? { color: 'var(--color-label-dark)' } : undefined}>
          {label}
        </div>
      </div>
      <div className="section-body">
        {children}
      </div>
    </section>
  )
}
