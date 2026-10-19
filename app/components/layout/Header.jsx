import { useEffect, useRef, useState } from 'react';
import { Link, useMatches } from 'react-router';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { NavPanel } from './NavPanel';
import { MobileMenu } from './MobileMenu';
import { menus, site } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * Fixed header: logo, three menus (Collections · Business · About) and Get a Quote. No top bar.
 * Over a photo hero (route handle { heroHeader: true }) it starts transparent; it turns cream after 80px,
 * hides while scrolling down and comes back on scroll up.
 *
 * Each menu's trigger and panel share one wrapper (the panel is its DOM child), so moving the pointer from the
 * button down into the panel never counts as leaving. Hover opens only for a real mouse; a mouse click keeps it
 * open; touch and keyboard toggle it.
 */
export function Header() {
  const matches = useMatches();
  const overHero = matches.some((m) => m.handle?.heroHeader);
  const { open: openEnquiry } = useEnquiry();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const hoverTimer = useRef(null);
  const lastPointer = useRef('');
  const roots = useRef({});
  const triggers = useRef({});

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > 480 && y > lastY.current + 2;
      setScrolled(y > 80);
      setHidden(hide);
      if (hide) setOpenId(null);
      if (y < lastY.current - 2 || y <= 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shown = hidden ? null : openId;
  const solid = !overHero || scrolled || shown !== null;

  const onEnter = (id) => (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenId(id), 80);
  };
  const onLeave = (id) => (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenId((o) => (o === id ? null : o)), 180);
  };
  const onClick = (id) => () => {
    clearTimeout(hoverTimer.current);
    // Read the ref now: the state updater runs later, after it has been reset.
    const byMouse = lastPointer.current === 'mouse';
    lastPointer.current = '';
    setOpenId((o) => (byMouse ? id : o === id ? null : id));
  };
  const onBlur = (id) => (e) => {
    if (!roots.current[id]?.contains(e.relatedTarget)) setOpenId((o) => (o === id ? null : o));
  };
  const close = (id) => () => {
    clearTimeout(hoverTimer.current);
    if (roots.current[id]?.contains(document.activeElement)) triggers.current[id]?.focus();
    setOpenId((o) => (o === id ? null : o));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-soft ${
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`relative transition-colors duration-500 ${
            solid ? 'border-b border-line bg-bg/95 text-ink backdrop-blur-md' : 'border-b border-transparent bg-transparent text-cream'
          }`}
        >
          <div className="container-site flex h-[4.75rem] items-center justify-between gap-6">
            <Link to="/" className="shrink-0" aria-label="Invent Fine Art, home">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-2 self-stretch lg:flex">
              {menus.map((m) => {
                const isOpen = shown === m.id;
                return (
                  // Full row height, and not positioned: the panel anchors to the whole header row.
                  <div
                    key={m.id}
                    ref={(el) => (roots.current[m.id] = el)}
                    data-menu-root={m.id}
                    className="flex items-center self-stretch"
                    onPointerEnter={onEnter(m.id)}
                    onPointerLeave={onLeave(m.id)}
                    onBlur={onBlur(m.id)}
                  >
                    <button
                      ref={(el) => (triggers.current[m.id] = el)}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`menu-${m.id}`}
                      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                      onClick={onClick(m.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-small font-bold tracking-wide"
                    >
                      {m.label}
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                    <NavPanel menu={m} open={isOpen} onClose={close(m.id)} />
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="hidden rounded-button bg-accent px-5 py-3 text-small font-bold tracking-wide text-white transition-colors duration-300 hover:bg-accent-hover sm:inline-flex"
              >
                Get a Quote
              </button>
              <a href={`tel:${site.phones[0].tel}`} className="inline-flex p-2.5 sm:hidden" aria-label={`Call ${site.phones[0].label}`}>
                <Phone className="size-5" strokeWidth={1.5} />
              </a>
              <button
                type="button"
                className="-mr-2 inline-flex p-2.5 lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
