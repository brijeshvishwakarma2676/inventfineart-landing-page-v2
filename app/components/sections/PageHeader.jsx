import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Img } from '../ui/Img';

function Crumbs({ trail, dark = false }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-micro font-semibold uppercase tracking-label ${dark ? 'text-cream/75' : 'text-ink-muted'}`}>
        {trail.map((c, i) => (
          <li key={c.name} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" strokeWidth={2} aria-hidden="true" />}
            {c.to ? (
              <Link to={c.to} className={dark ? 'hover:text-cream' : 'hover:text-ink'}>{c.name}</Link>
            ) : (
              <span aria-current="page" className={dark ? 'text-cream' : 'text-ink'}>{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Page banner. With `image`, a photo banner the transparent header sits over (route handle heroHeader);
 * without, a plain stone band below the solid header.
 */
export function PageHeader({ title, tagline, eyebrow, image, position, crumbs = [] }) {
  const trail = [{ name: 'Home', to: '/' }, ...crumbs];

  if (!image) {
    return (
      <section className="border-b border-line bg-surface pb-14 pt-36 md:pb-20 lg:pt-48">
        <div className="container-site flex flex-col gap-6">
          <Crumbs trail={trail} />
          <div className="flex max-w-4xl flex-col gap-4" data-reveal="up">
            {eyebrow && <p className="font-sans text-micro font-bold uppercase tracking-eyebrow text-olive">{eyebrow}</p>}
            <h1 className="text-h1">{title}</h1>
            {tagline && <p className="font-display text-h3 italic text-ink-muted">{tagline}</p>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate flex h-[72svh] min-h-[520px] items-end overflow-hidden bg-dark text-cream">
      <div className="absolute inset-0 -z-10" data-reveal="clip">
        <Img id={image} alt="" priority sizes="100vw" className="size-full object-cover" style={{ objectPosition: position }} />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-dark/85 via-dark/35 to-dark/25" aria-hidden="true" />
      <div className="container-site flex flex-col gap-6 pb-14 md:pb-20">
        <Crumbs trail={trail} dark />
        <div className="flex max-w-4xl flex-col gap-4">
          {eyebrow && <p className="font-sans text-micro font-bold uppercase tracking-eyebrow text-cream/80">{eyebrow}</p>}
          <h1 className="text-h1 text-cream">{title}</h1>
          {tagline && <p className="font-display text-h3 italic text-cream/85">{tagline}</p>}
        </div>
      </div>
    </section>
  );
}
