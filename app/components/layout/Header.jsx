import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useMatches } from 'react-router';
import { ChevronDown, Menu, Phone, Mail, ShieldCheck, MessageCircle } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { nav, site, whatsappLink } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * Fixed header (spec §4 "Header"): desktop top bar + main row.
 * Over a hero (route handle { heroHeader: true }) it starts transparent; it turns solid after 80px,
 * hides while scrolling down and comes back on scroll up.
 */
export function Header() {
  const matches = useMatches();
  const overHero = matches.some((m) => m.handle?.heroHeader);
  const { open: openEnquiry } = useEnquiry();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const hoverTimer = useRef(null);
  const lastPointer = useRef('');
  const megaRoot = useRef(null);
  const megaTrigger = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > 480 && y > lastY.current + 2;
      setScrolled(y > 80);
      setHidden(hide);
      if (hide) setMegaOpen(false);
      if (y < lastY.current - 2 || y <= 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const megaVisible = megaOpen && !hidden;
  const solid = !overHero || scrolled || megaVisible;
  const tone = solid ? 'text-ink' : 'text-cream';

  // Products menu. Trigger and panel share one wrapper (the panel is its DOM child), so moving the
  // pointer from the button down into the panel never counts as leaving. Hover only for a real mouse;
  // touch and keyboard use the click toggle.
  const onMegaEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(true), 80);
  };
  const onMegaLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };
  const onMegaClick = () => {
    clearTimeout(hoverTimer.current);
    // A mouse click while hovering keeps it open (hover already opened it); touch/keyboard toggle.
    // Read the ref now: the state updater runs later, after it has been reset.
    const byMouse = lastPointer.current === 'mouse';
    lastPointer.current = '';
    setMegaOpen((o) => (byMouse ? true : !o));
  };
  const onMegaBlur = (e) => {
    if (!megaRoot.current?.contains(e.relatedTarget)) setMegaOpen(false);
  };
  const closeMega = () => {
    clearTimeout(hoverTimer.current);
    if (megaRoot.current?.contains(document.activeElement)) megaTrigger.current?.focus();
    setMegaOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-soft ${
          hidden && !mobileOpen ? '-translate-y-full' : scrolled ? 'lg:-translate-y-9' : 'translate-y-0'
        }`}
      >
        {/* Top info bar (desktop only) */}
        <div
          className={`hidden h-9 border-b text-micro transition-colors duration-500 lg:block ${
            solid ? 'border-transparent bg-dark text-cream/85' : 'border-cream/15 bg-transparent text-cream/85'
          }`}
        >
          <div className="container-site flex h-full items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center gap-2 hover:text-cream">
                <Phone className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                {site.phones[0].label}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-cream">
                <Mail className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                {site.certification}
              </span>
              <a
                href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream"
              >
                <MessageCircle className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main row */}
        <div
          className={`relative transition-colors duration-500 ${tone} ${
            solid ? 'border-b border-line bg-bg/95 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="container-site flex h-[4.75rem] items-center justify-between gap-6">
            <Link to="/" className="shrink-0" aria-label="Invent Fine Art, home">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-1 self-stretch lg:flex">
              {nav.map((item) =>
                item.mega ? (
                  // Full row height, and not positioned: the panel anchors to the whole header row.
                  <div
                    key={item.to}
                    ref={megaRoot}
                    data-mega-root
                    className="flex items-center self-stretch"
                    onPointerEnter={onMegaEnter}
                    onPointerLeave={onMegaLeave}
                    onBlur={onMegaBlur}
                  >
                    <button
                      ref={megaTrigger}
                      type="button"
                      aria-expanded={megaVisible}
                      aria-controls="mega-menu"
                      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                      onClick={onMegaClick}
                      className="group inline-flex items-center gap-1.5 px-4 py-2 text-small font-semibold tracking-wide"
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${megaVisible ? 'rotate-180' : ''}`}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </button>
                    <MegaMenu open={megaVisible} onClose={closeMega} />
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-small font-semibold tracking-wide after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                        isActive ? 'after:scale-x-100' : 'after:scale-x-0'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="hidden rounded-button bg-accent px-5 py-3 text-small font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-accent-hover sm:inline-flex"
              >
                Get a Quote
              </button>
              <a
                href={`tel:${site.phones[0].tel}`}
                className="inline-flex p-2.5 sm:hidden"
                aria-label={`Call ${site.phones[0].label}`}
              >
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
