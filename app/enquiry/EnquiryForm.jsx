import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Turnstile } from '@marsidev/react-turnstile';
import { Paperclip, X } from 'lucide-react';
import { categories, categoryBySlug } from '../data/categories';
import { whatsappLink } from '../data/site';

const ROLES = ['Homeowner', 'Architect', 'Interior designer', 'Builder or developer', 'Hotel or hospitality', 'Other'];
// Vercel functions accept request bodies up to 4.5 MB, so uploads are capped at 4 MB.
const MAX_FILE = 4 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const field =
  'w-full rounded-button border border-line bg-white/70 px-4 py-3 text-body text-ink transition-colors placeholder:text-ink-muted/60 focus:border-accent focus:outline-none';
const labelCls = 'mb-1.5 block text-small font-semibold text-ink';

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-small text-error" role="alert">
      {children}
    </p>
  );
}

/**
 * The enquiry form (spec §5). Posts to /api/enquiry (api/enquiry.js) and goes to /thank-you on success.
 * On failure the visitor keeps their input and gets a WhatsApp fallback with the details filled in.
 * `layout="stacked"` for the side panel, `"grid"` for wide sections.
 */
export function EnquiryForm({ prefill = {}, layout = 'grid', onSent }) {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      role: '',
      products: prefill.category ? [prefill.category] : [],
      code: prefill.code ?? '',
      quantity: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setFileError('');
    if (!f) return setFile(null);
    if (!FILE_TYPES.includes(f.type)) {
      setFileError('Please attach a JPG, PNG or PDF.');
      e.target.value = '';
      return setFile(null);
    }
    if (f.size > MAX_FILE) {
      setFileError('That file is over 4 MB. Attach a smaller one, or send it on WhatsApp after submitting.');
      e.target.value = '';
      return setFile(null);
    }
    setFile(f);
  };
  const removeFile = () => {
    setFile(null);
    if (fileInput.current) fileInput.current.value = '';
  };

  const onSubmit = async (values) => {
    setStatus('sending');
    const body = new FormData();
    for (const [k, v] of Object.entries(values)) {
      if (Array.isArray(v)) v.forEach((x) => body.append(k, x));
      else body.append(k, String(v));
    }
    if (file) body.append('file', file);
    if (token) body.append('cf-turnstile-response', token);
    body.append('page', window.location.pathname);
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      window.gtag?.('event', 'generate_lead', { form: 'enquiry', product: values.products.join(',') });
      onSent?.();
      navigate('/thank-you', { state: { name: values.name.split(' ')[0] } });
    } catch {
      setStatus('error');
    }
  };

  const fallbackMessage = () => {
    const v = getValues();
    const lines = [
      'Hello Invent Fine Art, I would like a quote.',
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email && `Email: ${v.email}`,
      v.city && `City: ${v.city}`,
      v.role && `I am a: ${v.role}`,
      v.products.length && `Products: ${v.products.map((s) => categoryBySlug[s]?.name ?? s).join(', ')}`,
      v.code && `Design: ${v.code}`,
      v.quantity && `Quantity / size: ${v.quantity}`,
      v.message && `Message: ${v.message}`,
    ];
    return lines.filter(Boolean).join('\n');
  };

  const grid = layout === 'grid';
  const pair = grid ? 'grid gap-5 sm:grid-cols-2' : 'grid gap-5';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className={pair}>
        <div>
          <label htmlFor={id('name')} className={labelCls}>
            Name <span className="text-accent">*</span>
          </label>
          <input
            id={id('name')}
            className={field}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id('name-err') : undefined}
            {...register('name', {
              required: 'Please tell us your name.',
              minLength: { value: 2, message: 'Please tell us your name.' },
            })}
          />
          <FieldError id={id('name-err')}>{errors.name?.message}</FieldError>
        </div>
        <div>
          <label htmlFor={id('phone')} className={labelCls}>
            Phone <span className="text-accent">*</span>
          </label>
          <input
            id={id('phone')}
            type="tel"
            inputMode="tel"
            className={field}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id('phone-err') : undefined}
            {...register('phone', {
              required: 'Please give a phone number so we can call you back.',
              validate: (v) => {
                const digits = v.replace(/\D/g, '');
                return (digits.length >= 10 && digits.length <= 13) || 'Please enter a valid phone number (10 digits, with or without +91).';
              },
            })}
          />
          <FieldError id={id('phone-err')}>{errors.phone?.message}</FieldError>
        </div>
      </div>

      <div className={pair}>
        <div>
          <label htmlFor={id('email')} className={labelCls}>Email</label>
          <input
            id={id('email')}
            type="email"
            className={field}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id('email-err') : undefined}
            {...register('email', {
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please check the email address.' },
            })}
          />
          <FieldError id={id('email-err')}>{errors.email?.message}</FieldError>
        </div>
        <div>
          <label htmlFor={id('city')} className={labelCls}>City</label>
          <input id={id('city')} className={field} autoComplete="address-level2" {...register('city')} />
        </div>
      </div>

      <div className={pair}>
        <div>
          <label htmlFor={id('role')} className={labelCls}>I am a</label>
          <select id={id('role')} className={`${field} appearance-none`} {...register('role')}>
            <option value="">Select…</option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id('quantity')} className={labelCls}>Approx. quantity or size</label>
          <input id={id('quantity')} className={field} placeholder="e.g. 4 planters, 24 in" {...register('quantity')} />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Interested in</legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <label
              key={c.slug}
              className="cursor-pointer rounded-button border border-line bg-white/70 px-3.5 py-2 text-small font-semibold transition-colors has-checked:border-accent has-checked:bg-accent has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-accent"
            >
              <input type="checkbox" value={c.slug} className="sr-only" {...register('products')} />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      {prefill.code && (
        <div>
          <label htmlFor={id('code')} className={labelCls}>Design code</label>
          <input id={id('code')} className={`${field} bg-surface`} readOnly {...register('code')} />
        </div>
      )}

      <div>
        <label htmlFor={id('message')} className={labelCls}>Tell us about your project</label>
        <textarea
          id={id('message')}
          rows={layout === 'grid' ? 4 : 3}
          className={`${field} resize-y`}
          placeholder="Where it will go, the look you want, your timeline…"
          {...register('message')}
        />
      </div>

      <div>
        <span className={labelCls}>Drawing or reference</span>
        {file ? (
          <p className="flex items-center justify-between gap-3 rounded-button border border-accent/40 bg-white/70 px-4 py-3 text-small">
            <span className="inline-flex min-w-0 items-center gap-2">
              <Paperclip className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-ink-muted">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
            </span>
            <button type="button" onClick={removeFile} className="-mr-1 p-1 text-ink-muted hover:text-ink" aria-label="Remove attachment">
              <X className="size-4" strokeWidth={1.75} />
            </button>
          </p>
        ) : (
          <label
            htmlFor={id('file')}
            className="flex cursor-pointer items-center gap-3 rounded-button border border-dashed border-line bg-white/40 px-4 py-3 text-small text-ink-muted transition-colors hover:border-accent has-focus-visible:border-accent"
          >
            <Paperclip className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
            <span>
              <span className="font-semibold text-accent">Attach a file</span> · JPG, PNG or PDF, up to 4 MB
            </span>
          </label>
        )}
        <input id={id('file')} ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.pdf" className="sr-only" onChange={onFile} />
        <FieldError id={id('file-err')}>{fileError}</FieldError>
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-small text-ink-muted">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-accent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? id('consent-err') : undefined}
            {...register('consent', { required: 'Please confirm we may contact you about this enquiry.' })}
          />
          <span>
            Invent Fine Art may contact me about this enquiry. See the{' '}
            <Link to="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </label>
        <FieldError id={id('consent-err')}>{errors.consent?.message}</FieldError>
      </div>

      {SITE_KEY && <Turnstile siteKey={SITE_KEY} onSuccess={setToken} options={{ size: 'flexible', theme: 'light' }} />}

      {status === 'error' && (
        <div role="alert" className="flex flex-col gap-3 rounded-button border border-error/30 bg-error/5 px-4 py-4 text-small">
          <p className="text-ink">
            We couldn&rsquo;t send your enquiry just now. Your details are still here: try again, or send them to us on
            WhatsApp.
          </p>
          <a
            href={whatsappLink(fallbackMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start font-semibold text-accent underline underline-offset-2"
          >
            Send on WhatsApp instead
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-button bg-accent px-6 py-4 text-small font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
