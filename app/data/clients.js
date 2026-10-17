// Client logos from ../old data/media/clients (30 files). Names are unknown, so alt text is generic.
import { images } from './images.generated';

export const clients = Object.keys(images)
  .filter((id) => id.startsWith('clients/'))
  .sort((a, b) => parseInt(a.split('/').pop(), 10) - parseInt(b.split('/').pop(), 10))
  .map((image, i) => ({ image, alt: `Client logo ${i + 1}` }));

export const architects = []; // PROVISIONAL – confirm with client (no architect logos supplied; section hidden)
