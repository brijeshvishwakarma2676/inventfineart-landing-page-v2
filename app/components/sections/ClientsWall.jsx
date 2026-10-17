import { Img } from '../ui/Img';
import { clients } from '../../data/clients';

/** Client logos (spec §4.1-9): greyscale, colour on hover. Logos are small (142px), so tiles stay compact. */
export function ClientsWall({ limit }) {
  const list = limit ? clients.slice(0, limit) : clients;
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6" data-reveal="stagger">
      {list.map((c) => (
        <li key={c.image} className="group grid aspect-[3/2] place-items-center rounded-image border border-line bg-white px-4">
          <Img
            id={c.image}
            alt={c.alt}
            sizes="142px"
            className="max-h-[70%] w-auto max-w-full object-contain opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
