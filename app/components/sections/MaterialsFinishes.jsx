import { materials } from '../../data/content';
import { finishes } from '../../data/categories';

const swatch = {
  'surface-2': 'bg-surface-2',
  surface: 'bg-surface',
  olive: 'bg-olive',
  accent: 'bg-accent',
  line: 'bg-line',
};

/** Materials & finishes (spec §4.1-6). Swatches are flat colour until finish photos arrive (CONTENT-GAPS.md). */
export function MaterialsFinishes() {
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <dl className="flex flex-col divide-y divide-line border-y border-line lg:col-span-7" data-reveal="stagger">
        {materials.map((m) => (
          <div key={m.name} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
            <dt className="flex flex-col">
              <span className="font-display text-h3">{m.name}</span>
              <span className="text-micro font-semibold uppercase tracking-label text-ink-muted">{m.full}</span>
            </dt>
            <dd className="text-ink-muted sm:pt-1.5">{m.text}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-6 lg:col-span-5" data-reveal="up">
        <p className="text-micro font-bold uppercase tracking-eyebrow text-olive">Finishes</p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {finishes.map((f) => (
            <li key={f.name} className="flex flex-col gap-2.5">
              <span className={`aspect-[4/3] rounded-image border border-line ${swatch[f.tone]}`} aria-hidden="true" />
              <span className="text-small font-semibold">{f.name}</span>
            </li>
          ))}
        </ul>
        <p className="text-small text-ink-muted">Colours and textures can be matched to your brief.</p>
      </div>
    </div>
  );
}
