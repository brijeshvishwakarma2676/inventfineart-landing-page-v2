import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';

// Loaded on demand by useLightbox (keeps it out of the first page load).
export default function LightboxImpl(props) {
  return (
    <Lightbox
      plugins={[Zoom, Captions, Counter]}
      carousel={{ finite: false, padding: '6%' }}
      controller={{ closeOnBackdropClick: true }}
      captions={{ descriptionTextAlign: 'center' }}
      styles={{ container: { backgroundColor: 'rgb(31 29 26 / 0.96)' } }}
      {...props}
    />
  );
}
