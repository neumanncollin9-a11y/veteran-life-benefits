# Veterans Coverage — Lead Funnel

A mobile-first, multi-step landing page for veteran life insurance leads.
Built with Next.js (App Router) + Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Where things live

- `app/page.jsx` — the entire form. **Edit `STEPS` at the top** to change
  questions, options, and copy. Everything else is data-driven from that array.
- `app/layout.jsx` — fonts (Oswald + Inter) and page metadata.
- `app/globals.css` — step transition + reduced-motion handling.
- `tailwind.config.js` — brand colors (`navy`, `honor`, `flagred`, `parchment`).

## Hooking up real submissions

On the final step, the full lead object is logged via `console.log`
inside `handleSubmit()` in `app/page.jsx`. Replace that with a `fetch`
POST to your CRM / lead endpoint, e.g.:

```js
await fetch('/api/lead', { method: 'POST', body: JSON.stringify(data) });
```
