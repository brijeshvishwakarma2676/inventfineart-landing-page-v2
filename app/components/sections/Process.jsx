import { process } from '../../data/content';

/** "How we work" (spec §4.1-7): five steps on a line on desktop, a vertical list on mobile. */
export function Process({ tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6" data-reveal="stagger">
      {process.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 md:flex-col md:gap-4">
          <span className="flex flex-col items-center md:flex-row md:items-center">
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-full border font-display text-xl italic ${
                dark ? 'border-cream/30 text-cream' : 'border-accent/40 bg-bg text-accent'
              }`}
            >
              {i + 1}
            </span>
            {i < process.length - 1 && (
              <span className={`mt-2 w-px flex-1 md:ml-3 md:mt-0 md:h-px md:w-auto ${dark ? 'bg-cream/20' : 'bg-line'}`} aria-hidden="true" />
            )}
          </span>
          <span className="flex flex-col gap-2 pb-2">
            <span className={`font-sans text-body font-bold ${dark ? 'text-cream' : 'text-ink'}`}>{s.title}</span>
            <span className={`text-small ${dark ? 'text-cream/70' : 'text-ink-muted'}`}>{s.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
