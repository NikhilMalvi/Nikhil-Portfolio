# Nikhil Malviya — Freelancer Portfolio

Modern multi-page React + Vite freelancer portfolio focused on WordPress, Elementor and WooCommerce.

## Pages
- `/` Home
- `/work` Work gallery
- `/work/:slug` Project detail
- `/services` Services
- `/pricing` Packages
- `/about` About
- `/contact` Project enquiry

## Tech
- React
- Vite
- React Router
- Framer Motion
- React Icons (Lucide has been removed completely)

## Run locally
```bash
npm install
npm run dev
```

## Production check
```bash
npm run build
npm run preview
```

Vite recommends building with `vite build` and checking the production output with `vite preview` before deployment.

## Notes
- The contact form uses `mailto:` so it works without a backend. Replace this later with Formspree, Resend, EmailJS, or your own API if you want database/email automation.
- Project previews are lightweight CSS mockups. Replace them with real project screenshots when the final portfolio assets are ready.
- Social icons use `react-icons`; there are no `lucide-react` imports or references.
