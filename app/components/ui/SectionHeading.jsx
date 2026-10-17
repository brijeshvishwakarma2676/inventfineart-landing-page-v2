export function Eyebrow({ className = '', children }) {
  return (
    <p className={`font-sans text-micro font-bold uppercase tracking-eyebrow text-olive ${className}`}>{children}</p>
  );
}

/** Eyebrow + H2 + optional italic tagline. `align="center"` centres it. */
export function SectionHeading({ eyebrow, title, tagline, align = 'left', as: Tag = 'h2', className = '', children }) {
  const center = align === 'center' ? 'mx-auto text-center items-center' : '';
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${center} ${className}`} data-reveal="up">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="text-h2">{title}</Tag>
      {tagline && <p className="font-display text-h3 italic text-ink-muted">{tagline}</p>}
      {children}
    </div>
  );
}
