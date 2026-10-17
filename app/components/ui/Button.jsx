import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-button text-small font-semibold tracking-wide transition-colors duration-300 ease-out-soft disabled:opacity-60';

const variants = {
  primary: 'px-6 py-3.5 bg-accent text-white hover:bg-accent-hover',
  secondary: 'px-6 py-3.5 border border-ink text-ink hover:bg-ink hover:text-cream',
  onDark: 'px-6 py-3.5 border border-cream/70 text-cream hover:bg-cream hover:text-ink',
  text: 'py-1 text-accent hover:text-accent-hover',
};

/** Button or link styled as a button. Pass `to` for internal links, `href` for external, neither for <button>. */
export function Button({ to, href, variant = 'primary', arrow = false, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
