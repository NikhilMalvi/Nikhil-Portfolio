import React, { useMemo, useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, Link, NavLink,
  useLocation, useParams, useNavigate, useSearchParams
} from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  FiArrowUpRight, FiArrowRight, FiCheck, FiChevronDown, FiMenu, FiX,
  FiCode, FiShoppingBag, FiServer, FiShield, FiStar,
  FiExternalLink, FiMail, FiGlobe, FiRefreshCw, FiSend,
  FiZap, FiCopy, FiCheckCircle, FiArrowLeft, FiClock,
  FiAward, FiLayers, FiCpu, FiMessageSquare, FiActivity
} from 'react-icons/fi';
import {
  FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp, FaWordpress, FaStar
} from 'react-icons/fa';
import './styles.css';

const projects = [
  {
    name: 'Logosster',
    slug: 'logosster',
    type: 'Business / Creative',
    category: 'WordPress',
    image: '/projects/logosster.png',
    url: 'https://logosster.com/',
    desc: 'Complete website created from the original sketch with custom ACF fields and PHP enhancements.',
    headline: 'DIGITAL IDENTITY & SCALE',
    sub: 'Clean typography, custom post types, and conversion architecture.',
    tags: ['WordPress', 'Elementor', 'ACF', 'PHP', 'Speed Optimization'],
    tone: 'cream',
    featured: true,
    role: 'WordPress Development & ACF Integration',
    highlights: [
      'Built from scratch based on custom design sketches',
      'Advanced Custom Fields (ACF) for dynamic client editing',
      'Custom PHP shortcodes and template enhancements',
      'Sub-second page load times with asset caching'
    ]
  },
  {
    name: 'Pixsster',
    slug: 'pixsster',
    type: 'E-commerce',
    category: 'E-Commerce',
    image: '/projects/pixsster.png',
    url: 'https://pixsster.store/',
    desc: 'WooCommerce store built from sketch with product flows, offers and a conversion-focused shopping experience.',
    headline: 'HIGH-CONVERTING STORE',
    sub: 'Modern shopping experience with lightning-fast cart & checkout.',
    tags: ['WooCommerce', 'Elementor', 'WordPress', 'SMTP', 'Payment Gateway'],
    tone: 'blue',
    featured: true,
    role: 'Full E-Commerce Build & Store Configuration',
    highlights: [
      'Comprehensive product catalog with variation swatches',
      'Streamlined cart and one-page checkout optimization',
      'Automated transactional emails with SMTP setup',
      'Payment gateway and shipping rates integration'
    ]
  },
  {
    name: 'Ember & Mist',
    slug: 'ember-and-mist',
    type: 'Restaurant / Booking',
    category: 'WordPress',
    image: '/projects/ember-and-mist.png',
    url: 'https://em.emberandmist.com/',
    desc: 'Polished hospitality website with a booking-focused customer journey.',
    headline: 'HOSPITALITY & DINING',
    sub: 'Atmospheric dining presentation with seamless reservation flow.',
    tags: ['WordPress', 'Elementor', 'Booking System', 'Mobile First'],
    tone: 'green',
    featured: true,
    role: 'Visual Design Translation & Reservation System',
    highlights: [
      'Interactive online table reservation workflow',
      'Mobile-optimized interactive digital food & beverage menu',
      'Location and event inquiry integration',
      'High-resolution imagery optimization without speed loss'
    ]
  },
  {
    name: 'Orange Electrodes',
    slug: 'orange-electrodes',
    type: 'Industrial / B2B',
    category: 'WordPress',
    image: '/projects/orange-electrodes.png',
    url: 'https://mediumslateblue-wasp-381121.hostingersite.com/',
    desc: 'Clean industrial business website translated from an initial design direction.',
    headline: 'INDUSTRIAL PRECISION',
    sub: 'Structured product specifications and instant quotation inquiry.',
    tags: ['WordPress', 'Elementor', 'Responsive', 'B2B Lead Generation'],
    tone: 'orange',
    featured: true,
    role: 'B2B Website Architecture & Spec Catalog',
    highlights: [
      'Comprehensive technical specification tables and PDF downloads',
      'Direct RFQ (Request for Quote) inquiry forms on every product',
      'Clean corporate branding aligned with manufacturing standards',
      'Full cross-browser and tablet responsive testing'
    ]
  },
  {
    name: 'Emberbelle',
    slug: 'emberbelle',
    type: 'Luxury Jewellery',
    category: 'E-Commerce',
    image: '/projects/emberbelle.png',
    url: '#',
    desc: 'Visual-first jewellery website focused on premium product storytelling and collection showcases.',
    headline: 'LUXURY JEWELLERY',
    sub: 'Editorial product presentation designed for high-ticket pieces.',
    tags: ['WooCommerce', 'Elementor', 'Product Storytelling', 'Filterable Grid'],
    tone: 'rose',
    role: 'E-Commerce Store & Visual Storytelling',
    highlights: [
      'Editorial style collections gallery with smooth hover zoom',
      'Precious metal and gemstone filter criteria',
      'WhatsApp concierge integration for custom orders',
      'Secure checkout and SSL hardened environment'
    ]
  },
  {
    name: 'Jain Sweets',
    slug: 'jain-sweets',
    type: 'Food & Sweets',
    category: 'E-Commerce',
    image: '/projects/jain-sweets.png',
    url: '#',
    desc: 'Heritage food brand website built around appetizing product visuals, festive gifting, and clear navigation.',
    headline: 'AUTHENTIC SWEETS',
    sub: 'Rich culinary showcase with seasonal gift hampers ordering.',
    tags: ['WooCommerce', 'Elementor', 'Local Ordering', 'Festive Catalog'],
    tone: 'gold',
    role: 'Online Store & Gifting Workflow',
    highlights: [
      'Weight-based product variations (250g, 500g, 1kg)',
      'Festive seasonal gift pack order forms',
      'WhatsApp click-to-order for local instant delivery',
      'Fast image CDN delivery for high-resolution food photos'
    ]
  },
  {
    name: 'Laddha Renewables',
    slug: 'laddha-renewables',
    type: 'Renewable Energy',
    category: 'WordPress',
    image: '/projects/laddha-renewables.png',
    url: '#',
    desc: 'Corporate renewable-energy website with a clear service-led structure and project impact calculator.',
    headline: 'CLEAN ENERGY FUTURE',
    sub: 'Solar & wind solutions for industrial and residential facilities.',
    tags: ['WordPress', 'Elementor', 'Corporate', 'Lead Capture'],
    tone: 'sky',
    role: 'Corporate Web Presence & Calculator Form',
    highlights: [
      'Interactive solar savings estimation form for commercial clients',
      'Portfolio section showcasing installed capacity & projects',
      'Clear compliance, certifications, and technical audit info',
      'Lightweight SVG vector illustrations and modern animations'
    ]
  },
  {
    name: 'JV Healthcare Solutions',
    slug: 'jv-healthcare',
    type: 'Healthcare & Pharma',
    category: 'WordPress',
    image: '/projects/jv-healthcare.png',
    url: '#',
    desc: 'Professional healthcare business website with a conversion-focused information structure and clinic locator.',
    headline: 'TRUSTED HEALTHCARE',
    sub: 'Clinical credibility with patient inquiry and doctor referrals.',
    tags: ['WordPress', 'Elementor', 'Healthcare', 'Accessibility'],
    tone: 'cyan',
    role: 'Healthcare Portal & Compliance Optimization',
    highlights: [
      'HIPAA / Medical compliance consideration in patient inquiry',
      'Specialist directory with qualifications and consultation booking',
      'Accessible typography and high-contrast clinical design',
      'Integrated Google Maps clinic location finder'
    ]
  },
  {
    name: 'Jazz Deep',
    slug: 'jazz-deep',
    type: 'Corporate Advisory',
    category: 'WordPress',
    image: '/projects/jazz-deep.png',
    url: '#',
    desc: 'Bold corporate visual direction translated into a responsive, high-impact business advisory website.',
    headline: 'STRATEGIC ADVISORY',
    sub: 'Bold executive visual identity for international consulting.',
    tags: ['WordPress', 'Elementor', 'Corporate', 'Brand Identity'],
    tone: 'teal',
    role: 'Front-End Development & Corporate Layout',
    highlights: [
      'Dark executive palette with precision micro-interactions',
      'Case study archives for client mergers and acquisitions',
      'Downloadable whitepaper gates for inbound lead qualification',
      'Optimized performance score of 95+ on Google PageSpeed'
    ]
  },
  {
    name: 'Jignesh Sheth Music',
    slug: 'jignesh-sheth',
    type: 'Personal Brand / Artist',
    category: 'WordPress',
    image: '/projects/jignesh-sheth.png',
    url: '#',
    desc: 'Personal brand website designed to showcase artistic journey, discography, tour dates and booking inquiries.',
    headline: 'MUSIC & STORIES',
    sub: 'Immersive sound discography and direct event booking.',
    tags: ['WordPress', 'Elementor', 'Audio Player', 'Event Booking'],
    tone: 'brown',
    role: 'Portfolio Development & Audio Embeds',
    highlights: [
      'Custom styled audio player for stream previews',
      'Live performance tour dates calendar with ticket links',
      'Press kit and high-res media download pack for event organizers',
      'Integrated Instagram feed showing recent backstage updates'
    ]
  }
];

const services = [
  {
    icon: FiCode,
    title: 'Static Websites',
    price: 'From ₹10,000',
    typeParam: 'Static Website',
    budgetParam: '₹5K – ₹10K',
    desc: 'Fast, responsive websites for portfolios, local businesses, campaigns and simple service brands.'
  },
  {
    icon: FaWordpress,
    title: 'WordPress Websites',
    price: 'From ₹20,000',
    typeParam: 'WordPress Website',
    budgetParam: '₹10K – ₹20K',
    desc: 'Editable business websites built with WordPress and Elementor, tailored to your brand.'
  },
  {
    icon: FiShoppingBag,
    title: 'E-Commerce',
    price: 'From ₹35,000+',
    typeParam: 'E-Commerce Website',
    budgetParam: '₹35K+',
    desc: 'WooCommerce stores with products, variations, cart, checkout and essential store setup.'
  },
  {
    icon: FiRefreshCw,
    title: 'Website Redesign',
    price: 'Custom quote',
    typeParam: 'Website Redesign',
    budgetParam: '₹10K – ₹20K',
    desc: 'Transform an outdated website into a cleaner, more modern and mobile-friendly experience.'
  },
  {
    icon: FiServer,
    title: 'Domain & Hosting',
    price: 'Setup service',
    typeParam: 'WordPress Website',
    budgetParam: '₹5K – ₹10K',
    desc: 'Domain connection, hosting setup, DNS, WordPress installation and launch assistance.'
  },
  {
    icon: FiShield,
    title: 'Website Maintenance',
    price: 'From ₹2,000/mo',
    typeParam: 'Maintenance',
    budgetParam: '₹5K – ₹10K',
    desc: 'Updates, small fixes, content changes, backups and ongoing technical support.'
  }
];

const packages = [
  {
    name: 'Starter',
    price: '₹10,000',
    advance: '₹2,000',
    label: 'Simple & effective',
    typeParam: 'Static Website',
    budgetParam: '₹5K – ₹10K',
    features: [
      'Up to 5 pages',
      'Responsive design (Mobile / Tablet)',
      'Contact form & WhatsApp button',
      'Basic SEO setup & metadata',
      'Social media links integration',
      'Domain connection & launch support'
    ],
    featured: false
  },
  {
    name: 'Business',
    price: '₹20,000',
    advance: '₹5,000',
    label: 'Most popular',
    typeParam: 'WordPress Website',
    budgetParam: '₹10K – ₹20K',
    features: [
      'Up to 8–10 pages',
      'WordPress + Elementor CMS',
      'Custom header, footer & brand stylings',
      'Blog / News / Articles archive',
      'Contact + lead generation forms',
      'Speed optimization & caching setup',
      'Domain, hosting & SSL setup guidance',
      '14 days post-launch technical support'
    ],
    featured: true
  },
  {
    name: 'E-Commerce',
    price: '₹35,000+',
    advance: '₹8,000',
    label: 'Sell online',
    typeParam: 'E-Commerce Website',
    budgetParam: '₹35K+',
    features: [
      'Full WooCommerce online store',
      'Product categories, swatches & variations',
      'Cart, checkout & invoice generation',
      'Online payment gateway integration (Razorpay / Stripe)',
      'Shipping rates & pin-code setup',
      'Up to 20 initial products added',
      'Mobile-first responsive optimization',
      'Deployment, SSL & launch testing'
    ],
    featured: false
  }
];

const faqs = [
  ['Do you provide domain and hosting?', 'Yes. I guide you to choose, purchase, and connect your domain and hosting with reputable providers. Provider subscription and renewal costs are paid directly by you, separate from the website development fee.'],
  ['How does the advance payment work?', 'The project officially begins after the package advance is received: ₹2,000 for Starter, ₹5,000 for Business, and ₹8,000+ for E-Commerce. The remaining amount is paid upon project completion before final live launch.'],
  ['Can you redesign my existing website?', 'Yes. Website redesign is available as a dedicated service. I review your existing pages, keep your SEO juice and content intact, and craft a substantially faster, more modern visual interface.'],
  ['Do you work with WordPress and WooCommerce?', 'Yes. WordPress, Elementor Pro, Advanced Custom Fields (ACF), and WooCommerce are my primary development specializations, backed by clean PHP, HTML5, CSS3, and JavaScript.'],
  ['What do I need to provide before starting?', 'Typically your logo, high-resolution imagery, text content for key pages, business contact details, and any reference sites you like. If you need help with text or layouts, I provide templates to guide you.'],
  ['Do you provide maintenance after launch?', 'Yes. I offer monthly maintenance starting from ₹2,000/month covering security patches, plugin updates, periodic backups, text/image edits, and prompt technical support.']
];

const testimonials = [
  {
    name: 'Aarav Patel',
    role: 'Founder, Pixsster Apparel',
    type: 'WooCommerce Store',
    rating: 5,
    quote: 'Nikhil transformed our rough sketch into a high-converting WooCommerce store. Our checkout bounce rate dropped significantly, and the mobile speed is incredible.',
    metric: '+42% Mobile Orders'
  },
  {
    name: 'Meera Shah',
    role: 'Managing Partner, Ember & Mist',
    type: 'Hospitality & Dining',
    rating: 5,
    quote: 'Our restaurant bookings doubled within the first month of launching. The online reservation flow is so seamless that customers frequently compliment our website.',
    metric: '2x Online Bookings'
  },
  {
    name: 'Rajesh Sharma',
    role: 'Director, Orange Electrodes',
    type: 'B2B Manufacturing',
    rating: 5,
    quote: 'He built a clean industrial catalogue that clearly presents our technical specs. We receive direct quotation inquiries weekly straight through the website.',
    metric: 'Steady Weekly RFQs'
  },
  {
    name: 'Dr. Vivek Joshi',
    role: 'Lead Specialist, JV Healthcare',
    type: 'Healthcare Practice',
    rating: 5,
    quote: 'Working with Nikhil was a breeze. Direct communication, zero delays, and he structured the pages so our staff could easily manage patient inquiries.',
    metric: '100% On-Time Delivery'
  }
];

const processSteps = [
  {
    num: '01',
    title: 'Discover & Scope',
    time: 'Day 1',
    deliverable: 'Requirement brief & project roadmap',
    desc: 'Understand your business goals, target audience, branding assets and required functionality.'
  },
  {
    num: '02',
    title: 'Plan & Structure',
    time: 'Day 2–3',
    deliverable: 'Sitemap & UX layout architecture',
    desc: 'Turn your requirements into an organized page hierarchy, UX layout, and visual direction.'
  },
  {
    num: '03',
    title: 'Develop & Build',
    time: 'Day 4–7',
    deliverable: 'Responsive Elementor & custom code build',
    desc: 'Build clean, responsive pages with WordPress, Elementor, and custom code enhancements.'
  },
  {
    num: '04',
    title: 'Test & Refine',
    time: 'Day 8–9',
    deliverable: 'Cross-device & Google PageSpeed audit',
    desc: 'Audit across smartphones, tablets, forms, performance speed, cross-browser compatibility and links.'
  },
  {
    num: '05',
    title: 'Deploy & Launch',
    time: 'Day 10',
    deliverable: 'Live domain, SSL & video handover guide',
    desc: 'Configure domain, DNS records, hosting setup, SSL certificate, and officially take the website live.'
  }
];

const techStack = [
  {
    category: 'CMS & Page Builders',
    badge: 'Core Specialization',
    icon: FaWordpress,
    items: [
      { name: 'WordPress Core', desc: 'Custom template architecture, security hardening & clean schema.' },
      { name: 'Elementor Pro', desc: 'Pixel-perfect, responsive layouts with custom widget integrations.' },
      { name: 'WooCommerce', desc: 'Product catalogs, checkout flows, Razorpay/Stripe & shipping rules.' }
    ]
  },
  {
    category: 'Custom Code & Logic',
    badge: 'Front-End & Backend',
    icon: FiCode,
    items: [
      { name: 'Custom PHP', desc: 'Hooks, filters, child theme functions & custom shortcodes.' },
      { name: 'JavaScript & React', desc: 'Dynamic interactive micro-animations, filtering & asynchronous UI.' },
      { name: 'HTML5 & Modern CSS3', desc: 'Semantic layouts, Flexbox/Grid, smooth responsive clamping.' }
    ]
  },
  {
    category: 'Dynamic Data & Fields',
    badge: 'Architecture',
    icon: FiLayers,
    items: [
      { name: 'Advanced Custom Fields (ACF)', desc: 'Client-friendly backends for easy self-management of content.' },
      { name: 'Custom Post Types (CPT)', desc: 'Custom content structures for portfolios, services & team directories.' },
      { name: 'WP REST API', desc: 'Data endpoints for headless workflows and third-party webhooks.' }
    ]
  },
  {
    category: 'Performance & Hosting',
    badge: 'Infrastructure',
    icon: FiZap,
    items: [
      { name: 'Speed Optimization', desc: 'Asset minification, lazy loading, WebP images & WP Rocket caching.' },
      { name: 'DNS & Server Setup', desc: 'Cloudflare CDN, Hostinger / cPanel configurations & SSL setup.' },
      { name: 'Technical SEO', desc: 'Meta tags, sitemaps, robots.txt & Core Web Vitals optimization.' }
    ]
  }
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } }
};

function getProjectDomain(p) {
  if (p.url && p.url !== '#') {
    try {
      const urlObj = new URL(p.url);
      return urlObj.hostname.replace(/^www\./, '');
    } catch {
      // ignore
    }
  }
  return `${p.slug.replace(/[^a-z0-9-]/g, '')}.com`;
}

function Logo({ onClick }) {
  return (
    <Link className="logo" to="/" onClick={onClick}>
      <span className="logo-mark">N</span>
      <span>Nikhil<span className="logo-dot">.</span></span>
    </Link>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo onClick={() => setOpen(false)} />
        <nav className={open ? 'nav-links mobile-open' : 'nav-links'}>
          <NavLink onClick={() => setOpen(false)} to="/work">Work</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/services">Services</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/pricing">Packages</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about">About</NavLink>
          <Link onClick={() => setOpen(false)} className="nav-cta" to="/contact">
            Start a project <FiArrowUpRight />
          </Link>
        </nav>
        <button
          className="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>Freelance WordPress developer building modern websites for small businesses, startups and local brands.</p>
          <div className="socials">
            <a href="https://www.instagram.com/nik.malvi.2002/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/nikhil-malviya-488210332/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/NikhilMalvi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
        <div>
          <small>Explore</small>
          <Link to="/work">Work</Link>
          <Link to="/services">Services</Link>
          <Link to="/pricing">Packages</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <small>Connect</small>
          <a href="mailto:nikhilmalvi845@gmail.com"><FiMail /> Email</a>
          <a href="https://wa.me/916352887015" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> WhatsApp</a>
          <a href="https://www.linkedin.com/in/nikhil-malviya-488210332/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Nikhil Malviya. All rights reserved.</span>
        <span>Ahmedabad, Gujarat, India</span>
      </div>
    </footer>
  );
}

function MockFeatureBar({ p }) {
  if (p.category === 'E-Commerce' || p.slug === 'pixsster' || p.slug === 'emberbelle' || p.slug === 'jain-sweets') {
    const price = p.slug === 'emberbelle' ? '₹4,999' : p.slug === 'jain-sweets' ? '₹450' : '₹1,299';
    const tag = p.slug === 'emberbelle' ? 'Fine Jewellery' : p.slug === 'jain-sweets' ? 'Pure Ghee' : 'Best Seller';
    return (
      <div className="mock-feature-bar ecommerce-bar">
        <div className="mock-prod-pill">
          <span className="prod-badge">{tag}</span>
          <div className="mock-prod-info">
            <b>Featured Item</b>
            <span className="mock-stars">★★★★★</span>
          </div>
          <div className="mock-prod-price">{price}</div>
        </div>
      </div>
    );
  }

  if (p.slug === 'ember-and-mist') {
    return (
      <div className="mock-feature-bar dining-bar">
        <div className="mock-dining-info">
          <span className="mock-dining-tag">★ 4.9 (420+ Reviews)</span>
          <b>Table Booking · Instant Confirmation</b>
        </div>
        <div className="mock-dining-action">
          <span>Reserve Online <FiArrowRight /></span>
        </div>
      </div>
    );
  }

  if (p.slug === 'orange-electrodes' || p.slug === 'laddha-renewables') {
    const label = p.slug === 'laddha-renewables' ? 'Solar ROI Calculator' : 'ISO 9001:2015 Spec';
    const sub = p.slug === 'laddha-renewables' ? '⚡ 50+ MW Capacity' : 'High-Purity Graphite';
    return (
      <div className="mock-feature-bar b2b-bar">
        <div className="mock-b2b-info">
          <span className="mock-spec-tag">{label}</span>
          <b>{sub}</b>
        </div>
        <div className="mock-b2b-action">
          <span>Request RFQ Quote <FiArrowRight /></span>
        </div>
      </div>
    );
  }

  if (p.slug === 'jv-healthcare') {
    return (
      <div className="mock-feature-bar health-bar">
        <div className="mock-health-info">
          <span className="mock-health-tag">Verified Specialists</span>
          <b>Clinic Locator · Ahmedabad</b>
        </div>
        <div className="mock-health-action">
          <span>Book Consultation <FiArrowRight /></span>
        </div>
      </div>
    );
  }

  if (p.slug === 'jignesh-sheth') {
    return (
      <div className="mock-feature-bar audio-bar">
        <div className="mock-audio-info">
          <div className="waveform-bars">
            <span /><span /><span /><span /><span />
          </div>
          <b>Now Streaming · Studio Master</b>
        </div>
        <div className="mock-audio-action">
          <span>Tour Dates <FiArrowRight /></span>
        </div>
      </div>
    );
  }

  // Default / Agency (Logosster, Jazz Deep)
  return (
    <div className="mock-feature-bar agency-bar">
      <div className="mock-agency-info">
        <span className="mock-agency-tag">Sub-1s Load · 99 PageSpeed</span>
        <b>ACF Dynamic Architecture</b>
      </div>
      <div className="mock-agency-action">
        <span>Explore Work <FiArrowRight /></span>
      </div>
    </div>
  );
}

function ProjectVisual({ p, large = false }) {
  const domain = getProjectDomain(p);
  return (
    <div className={`project-visual ${p.tone} ${large ? 'large' : ''} ${p.image ? 'has-screenshot' : ''}`}>
      <div className="browser-top">
        <div className="browser-dots">
          <i /><i /><i />
        </div>
        <div className="browser-address">
          <span className="lock-icon">🔒</span>
          <small>{domain}</small>
        </div>
        <span className="live-status-pill">LIVE</span>
      </div>
      <div className="mock-page">
        {p.image ? (
          <div className="project-screenshot-wrap">
            <img
              src={p.image}
              alt={`${p.name} live website screenshot`}
              className="project-screenshot-img"
              loading="lazy"
            />
            {!large && (
              <div className="project-screenshot-overlay">
                <div className="project-screenshot-meta">
                  <span className="screenshot-type-badge">{p.type}</span>
                  <h4>{p.headline || p.name}</h4>
                </div>
                <span className="screenshot-cta-pill">
                  View Case Study <FiArrowUpRight />
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mock-nav">
              <span className="mock-brand-name">{p.name}</span>
              <span className="mock-nav-items">HOME · ABOUT · SERVICES · CONTACT</span>
            </div>
            <div className="mock-hero">
              <small>{p.type}</small>
              <strong>{p.headline || p.name}</strong>
              <em>{p.sub || 'Build a stronger digital presence.'}</em>
              <b className="mock-cta-badge">EXPLORE <FiArrowUpRight /></b>
            </div>
            <MockFeatureBar p={p} />
          </>
        )}
      </div>
    </div>
  );
}

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.section
      ref={ref}
      className={`section ${className}`}
      variants={reveal}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.section>
  );
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="section-head">
      <span className="kicker">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Core skills and technologies">
      <div className="marquee-track">
        <span>WORDPRESS <b>✦</b> ELEMENTOR <b>✦</b> WOOCOMMERCE <b>✦</b> RESPONSIVE DESIGN <b>✦</b> ACF <b>✦</b> SPEED OPTIMIZATION <b>✦</b> CUSTOM PHP <b>✦</b> CLEAN CODE <b>✦</b></span>
        <span>WORDPRESS <b>✦</b> ELEMENTOR <b>✦</b> WOOCOMMERCE <b>✦</b> RESPONSIVE DESIGN <b>✦</b> ACF <b>✦</b> SPEED OPTIMIZATION <b>✦</b> CUSTOM PHP <b>✦</b> CLEAN CODE <b>✦</b></span>
      </div>
      <div className="marquee-track" aria-hidden="true">
        <span>WORDPRESS <b>✦</b> ELEMENTOR <b>✦</b> WOOCOMMERCE <b>✦</b> RESPONSIVE DESIGN <b>✦</b> ACF <b>✦</b> SPEED OPTIMIZATION <b>✦</b> CUSTOM PHP <b>✦</b> CLEAN CODE <b>✦</b></span>
        <span>WORDPRESS <b>✦</b> ELEMENTOR <b>✦</b> WOOCOMMERCE <b>✦</b> RESPONSIVE DESIGN <b>✦</b> ACF <b>✦</b> SPEED OPTIMIZATION <b>✦</b> CUSTOM PHP <b>✦</b> CLEAN CODE <b>✦</b></span>
      </div>
    </div>
  );
}

function HeroShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const slides = [
    {
      tab: 'WordPress + ACF',
      client: 'Logosster',
      image: '/projects/logosster.png',
      category: 'Business & Agency',
      headline: 'DIGITAL IDENTITY & SCALE',
      sub: 'Custom ACF post types, sub-second speed, clean typography.',
      metric: '99/100 PageSpeed',
      tag: 'Custom Template',
      bgTone: 'hero-tone-green'
    },
    {
      tab: 'WooCommerce',
      client: 'Pixsster',
      image: '/projects/pixsster.png',
      category: 'High-Converting Store',
      headline: 'LIGHTNING FAST CHECKOUT',
      sub: 'Variations, Razorpay integration, automated order emails.',
      metric: 'Sub-1s Load Time',
      tag: 'E-Commerce',
      bgTone: 'hero-tone-blue'
    },
    {
      tab: 'Online Booking',
      client: 'Ember & Mist',
      image: '/projects/ember-and-mist.png',
      category: 'Hospitality & Dining',
      headline: 'SEAMLESS RESERVATIONS',
      sub: 'Mobile-first menu presentation and table reservation flow.',
      metric: '2x Direct Bookings',
      tag: 'Booking Flow',
      bgTone: 'hero-tone-warm'
    }
  ];

  const current = slides[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.18, duration: 0.8 }}
      className="hero-visual"
    >
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />

      {/* Floating Status Badges */}
      <div className="float-tag tag-one">
        <span className="status-live-beacon" /> Available for Projects
      </div>
      <div className="float-tag tag-two">
        <FiZap /> 99/100 Google PageSpeed
      </div>

      <div className="hero-browser-card">
        <div className="hero-browser-top">
          <div className="browser-dots">
            <i /><i /><i />
          </div>
          <a
            href="https://nikhilportfolio-hazel.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-url-bar"
            title="Open live site: https://nikhilportfolio-hazel.vercel.app/"
          >
            <span>🔒</span>
            <small>nikhilportfolio-hazel.vercel.app</small>
            <FiExternalLink className="hero-url-ext-icon" />
          </a>
          <span className="hero-pill-badge">{current.metric}</span>
        </div>

        {/* Tab Switcher */}
        <div className="hero-tab-switcher">
          {slides.map((s, idx) => (
            <button
              key={s.tab}
              className={`hero-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
              type="button"
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Slide Content */}
        <div className={`hero-browser-body ${current.bgTone}`}>
          {current.image && (
            <div className="hero-slide-preview-wrap">
              <img src={current.image} alt={`${current.client} live preview`} className="hero-slide-preview-img" />
              <div className="hero-slide-gradient-scrim" />
            </div>
          )}
          <div className="hero-preview-top">
            <span className="hero-client-name">{current.client}</span>
            <div className="hero-preview-top-actions">
              <span className="hero-cat-pill">{current.category}</span>
              <a
                href="https://nikhilportfolio-hazel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-live-badge"
                title="Open live site: https://nikhilportfolio-hazel.vercel.app/"
              >
                <span>Live Site</span>
                <FiArrowUpRight />
              </a>
            </div>
          </div>

          <div className="hero-preview-center">
            <h4>{current.headline}</h4>
            <p>{current.sub}</p>
          </div>

          <div className="hero-preview-bottom">
            <div className="hero-metric-box">
              <span className="metric-label">PERFORMANCE BENCHMARK</span>
              <strong className="metric-val">{current.metric}</strong>
            </div>
            <Link to={`/work/${slides[activeTab].client.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`} className="hero-preview-btn">
              Explore Case Study <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BentoStats() {
  return (
    <Section className="bento-stats section-pad">
      <div className="container">
        <SectionHead
          eyebrow="Proven Impact"
          title={<>Built for performance,<br /><em>designed to convert.</em></>}
          text="Every website is developed with clean code, sub-second loading speed, and direct communication throughout."
        />
        <div className="bento-grid">
          <div className="bento-card bento-main">
            <span className="bento-kicker">DELIVERED WORK</span>
            <div className="bento-big-number">25+</div>
            <h3>Websites Launched Personally</h3>
            <p>From custom WordPress business sites and WooCommerce stores to industrial catalogues and restaurant bookings.</p>
            <div className="bento-tech-pills">
              <span>WordPress</span>
              <span>WooCommerce</span>
              <span>Elementor Pro</span>
              <span>ACF Pro</span>
              <span>Custom PHP</span>
            </div>
          </div>

          <div className="bento-card">
            <div className="bento-icon-wrap"><FiZap /></div>
            <span className="bento-kicker">SPEED BENCHMARK</span>
            <div className="bento-stat-number">&lt; 1.2s</div>
            <h4>Sub-Second Page Loads</h4>
            <p>Asset optimization, lazy loading, WebP imagery, and clean code for high Google PageSpeed scores.</p>
          </div>

          <div className="bento-card">
            <div className="bento-icon-wrap"><FiCheckCircle /></div>
            <span className="bento-kicker">COLLABORATION</span>
            <div className="bento-stat-number">100%</div>
            <h4>Direct Communication</h4>
            <p>Direct contact with Nikhil via WhatsApp and email. No agency layers or miscommunicated instructions.</p>
          </div>

          <div className="bento-card bento-status-card">
            <div className="bento-status-left">
              <div className="bento-availability-badge">
                <span className="bento-pulse" />
                <span>Available for New Projects</span>
              </div>
              <h4>Ready to Build Your Website?</h4>
              <p>Currently booking client builds, redesigns, and WooCommerce stores with direct turnaround.</p>
            </div>
            <div className="bento-status-right">
              <Link to="/contact" className="bento-action-link">
                Start your project <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section className="testimonials-section section-pad">
      <div className="container">
        <SectionHead
          eyebrow="Client Testimonials"
          title={<>Trusted by founders,<br /><em>startups & local brands.</em></>}
          text="Authentic feedback from clients whose websites were built, optimized, and launched personally."
        />
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="testimonial-top">
                <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="testimonial-tag">{t.type}</span>
              </div>
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-footer">
                <div className="author-info">
                  <div className="author-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
                <span className="testimonial-metric-badge">{t.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Home() {
  const featured = projects.filter(p => p.featured);
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="hero">
        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow">
              <span className="pulse" /> Freelance WordPress Developer · Ahmedabad, India
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              Websites that make<br /><em>businesses</em> look better.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.65 }}>
              I’m Nikhil Malviya, a freelance WordPress developer creating responsive, polished websites for small businesses, startups and local brands.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="hero-actions">
              <Link className="btn dark" to="/pricing">View packages <FiArrowUpRight /></Link>
              <Link className="btn light" to="/work">Explore my work <FiArrowUpRight /></Link>
            </motion.div>
            <div className="hero-note">
              <span><FiCheck /> 25+ websites created</span>
              <span><FiCheck /> 2+ years WordPress</span>
              <span><FiCheck /> Direct communication</span>
            </div>
          </div>
          <HeroShowcase />
        </div>
      </section>

      <Marquee />

      <Section className="featured section-pad">
        <div className="container">
          <SectionHead
            eyebrow="Selected work"
            title={<>25+ websites.<br /><em>Built personally.</em></>}
            text="Business websites, e-commerce stores, local brands and personal projects. A selected set of work is shown below."
          />
          <div className="featured-grid">
            {featured.map((p, i) => (
              <motion.div
                key={p.slug}
                className={`featured-card card-${i + 1}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <Link to={`/work/${p.slug}`}>
                  <ProjectVisual p={p} />
                  <div className="project-meta">
                    <span>{String(i + 1).padStart(2, '0')} / {p.category.toUpperCase()}</span>
                    <h3>{p.name}</h3>
                    <FiArrowUpRight />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="center-link">
            <Link className="text-link" to="/work">View all selected work <FiArrowRight /></Link>
          </div>
        </div>
      </Section>

      <Section className="services-preview section-pad">
        <div className="container">
          <SectionHead
            eyebrow="Services"
            title={<>Everything you need to<br /><em>launch confidently.</em></>}
            text="From a simple business website to a complete WooCommerce store, I handle the website build and launch workflow."
          />
          <div className="service-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div className="service-card" key={s.title} whileHover={{ y: -5 }}>
                  <div className="service-icon"><Icon /></div>
                  <span className="service-num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <strong>{s.price}</strong>
                  <Link to={`/contact?service=${encodeURIComponent(s.title)}`}>Explore <FiArrowUpRight /></Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="process section-pad">
        <div className="container split">
          <div>
            <span className="kicker">Process</span>
            <h2>Simple, clear, and<br /><em>built around your business.</em></h2>
            <p>You talk directly with the person designing and developing your website — no agency layers or miscommunication.</p>
          </div>
          <div className="steps">
            {processSteps.map((s) => (
              <div className="step" key={s.num}>
                <div className="step-header">
                  <span>{s.num}</span>
                  <span className="step-time-badge"><FiClock /> {s.time}</span>
                </div>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
                <div className="step-deliverable">
                  <FiCheck /> {s.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <BentoStats />

      <TestimonialsSection />

      <Section className="faq-section section-pad">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Before we start." />
          <FAQList />
        </div>
      </Section>

      <CTA />
    </motion.main>
  );
}

function FAQList() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        <div className={`faq ${open === i ? 'open' : ''}`} key={q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{q}</span>
            <FiChevronDown />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p>{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <span className="kicker">Start a project</span>
          <h2>Have a website<br /><em>in mind?</em></h2>
        </div>
        <Link className="btn lime" to="/contact">Tell me about it <FiArrowUpRight /></Link>
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState('All');

  const counts = useMemo(() => {
    return {
      All: projects.length,
      WordPress: projects.filter(p => p.category === 'WordPress').length,
      'E-Commerce': projects.filter(p => p.category === 'E-Commerce').length
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.category === filter);
  }, [filter]);

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Selected work</span>
          <h1>25+ websites.<br /><em>Built personally.</em></h1>
          <p>Business websites, e-commerce stores, local brands and personal projects. Filter through selected case studies below.</p>
        </div>
      </section>
      <Section className="work-section">
        <div className="container">
          <div className="filters">
            {['All', 'WordPress', 'E-Commerce'].map(x => (
              <button
                className={filter === x ? 'active' : ''}
                onClick={() => setFilter(x)}
                key={x}
              >
                <span>{x}</span>
                <span className="filter-count">({counts[x] || 0})</span>
              </button>
            ))}
          </div>
          <motion.div layout className="work-grid">
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.slug}
                className="work-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
              >
                <Link to={`/work/${p.slug}`}>
                  <ProjectVisual p={p} />
                  <div className="work-meta">
                    <span>{p.type}</span>
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <strong>Explore <FiArrowUpRight /></strong>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
          <div className="portfolio-note">
            <FiStar />
            <div>
              <strong>25+ projects delivered</strong>
              <p>These are selected client and personal projects. Each represents a tailored solution designed for real business growth.</p>
            </div>
          </div>
        </div>
      </Section>
      <CTA />
    </motion.main>
  );
}

function Services() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="page-hero compact">
        <div className="container">
          <span className="kicker">Services</span>
          <h1>Build it right.<br /><em>Launch it clean.</em></h1>
          <p>Practical website development focused on responsive design, WordPress, WooCommerce and a smooth launch.</p>
        </div>
      </section>
      <Section className="service-page">
        <div className="container">
          <div className="service-list">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  to={`/contact?service=${encodeURIComponent(s.title)}`}
                  className="service-row"
                  key={s.title}
                >
                  <div className="service-icon"><Icon /></div>
                  <span className="service-num">0{i + 1}</span>
                  <div>
                    <h2>{s.title}</h2>
                    <p>{s.desc}</p>
                  </div>
                  <strong>{s.price}</strong>
                  <FiArrowUpRight />
                </Link>
              );
            })}
          </div>
        </div>
      </Section>
      <CTA />
    </motion.main>
  );
}

function Pricing() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="page-hero pricing-head">
        <div className="container">
          <span className="kicker">Packages</span>
          <h1>Clear pricing.<br /><em>No mystery scope.</em></h1>
          <p>Choose a starting package and add only what your project actually needs. Domain and hosting provider costs are separate.</p>
        </div>
      </section>
      <Section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {packages.map(p => (
              <PriceCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </Section>
      <Section className="addons-section">
        <div className="container">
          <SectionHead eyebrow="Add-ons" title={<>Need more? Add only what<br /><em>you need.</em></>} />
          <div className="addons">
            {[
              ['Extra page', '₹1,000–₹2,000'],
              ['Payment gateway', '₹2,000–₹4,000'],
              ['Advanced filters', '₹3,000+'],
              ['Migration', '₹2,000–₹5,000'],
              ['Speed optimization', '₹2,000–₹5,000'],
              ['Maintenance', '₹2,000–₹5,000/mo']
            ].map(x => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CTA />
    </motion.main>
  );
}

function PriceCard({ p }) {
  return (
    <article className={`price-card ${p.featured ? 'featured' : ''}`}>
      <span className="kicker">{p.label}</span>
      <h2>{p.name}</h2>
      <div className="price">{p.price}</div>
      <div className="advance">Advance to start <b>{p.advance}</b></div>
      <div className="divider" />
      <ul>
        {p.features.map(f => (
          <li key={f}><FiCheck />{f}</li>
        ))}
      </ul>
      {p.featured && <span className="popular">MOST POPULAR</span>}
      <Link
        className={`btn ${p.featured ? 'light' : 'outline'}`}
        to={`/contact?package=${encodeURIComponent(p.name)}`}
      >
        Choose {p.name} <FiArrowRight />
      </Link>
    </article>
  );
}

function TechEcosystem() {
  return (
    <Section className="skills-section section-pad">
      <div className="container">
        <SectionHead
          eyebrow="Tech Stack & Tools"
          title={<>Tools I use to build<br /><em>dependable websites.</em></>}
          text="A carefully chosen stack focused on visual flexibility, clean code, lightning speed, and seamless handover."
        />
        <div className="tech-ecosystem-grid">
          {techStack.map(cat => {
            const Icon = cat.icon;
            return (
              <div className="tech-card" key={cat.category}>
                <div className="tech-card-top">
                  <div className="tech-card-icon"><Icon /></div>
                  <div>
                    <h3>{cat.category}</h3>
                    <span className="tech-category-badge">{cat.badge}</span>
                  </div>
                </div>
                <div className="tech-item-list">
                  {cat.items.map(item => (
                    <div className="tech-item" key={item.name}>
                      <div className="tech-item-name">{item.name}</div>
                      <p className="tech-item-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function About() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="page-hero compact">
        <div className="container">
          <span className="kicker">About</span>
          <h1>25+ websites.<br /><em>One person behind them.</em></h1>
          <p>Front-end developer and WordPress specialist based in Ahmedabad, focused on creating useful, responsive and business-ready websites.</p>
        </div>
      </section>
      <Section className="about-section">
        <div className="container about-grid">
          <div>
            <span className="big-num">01</span>
            <h2>Built across business, e-commerce, local and personal-brand projects.</h2>
          </div>
          <div className="about-copy">
            <p>My main focus is WordPress. I work with Elementor, WooCommerce, ACF, HTML, CSS and JavaScript, with custom PHP when a project needs more than a page builder.</p>
            <p>I care about responsive layouts, clear visual hierarchy, practical functionality and making the handover easy for the business owner.</p>
            <Link className="btn dark" to="/contact">Work with me <FiArrowRight /></Link>
          </div>
        </div>
      </Section>
      <TechEcosystem />
      <TestimonialsSection />
      <CTA />
    </motion.main>
  );
}

function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const packageParam = searchParams.get('package');
  const serviceParam = searchParams.get('service');
  const projectParam = searchParams.get('project');

  // Derive initial values based on query params
  const initialType = useMemo(() => {
    if (packageParam) {
      const match = packages.find(p => p.name.toLowerCase() === packageParam.toLowerCase());
      if (match) return match.typeParam;
    }
    if (serviceParam) {
      const match = services.find(s => s.title.toLowerCase() === serviceParam.toLowerCase());
      if (match) return match.typeParam;
    }
    return '';
  }, [packageParam, serviceParam]);

  const initialBudget = useMemo(() => {
    if (packageParam) {
      const match = packages.find(p => p.name.toLowerCase() === packageParam.toLowerCase());
      if (match) return match.budgetParam;
    }
    if (serviceParam) {
      const match = services.find(s => s.title.toLowerCase() === serviceParam.toLowerCase());
      if (match) return match.budgetParam;
    }
    return '';
  }, [packageParam, serviceParam]);

  const initialDetails = useMemo(() => {
    if (projectParam) return `Inquiring about project demo / staging access for: ${projectParam}.`;
    if (packageParam) return `I am interested in the ${packageParam} package. Here are my project details and timeline:`;
    if (serviceParam) return `I am looking for assistance with ${serviceParam}. Here are my requirements:`;
    return '';
  }, [projectParam, packageParam, serviceParam]);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: initialType,
    budget: initialBudget,
    details: initialDetails
  });

  // Update if URL params change
  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      type: initialType || prev.type,
      budget: initialBudget || prev.budget,
      details: initialDetails || prev.details
    }));
  }, [initialType, initialBudget, initialDetails]);

  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const clearSelection = () => {
    setSearchParams({});
    setFormState(prev => ({
      ...prev,
      type: '',
      budget: '',
      details: ''
    }));
  };

  const getInquiryBody = () => {
    return [
      `Name: ${formState.name || 'Not provided'}`,
      `Email: ${formState.email || 'Not provided'}`,
      `WhatsApp / Phone: ${formState.phone || 'Not provided'}`,
      `Business / Company: ${formState.company || 'Not provided'}`,
      `Website Type: ${formState.type || 'Not selected'}`,
      `Budget: ${formState.budget || 'Not selected'}`,
      `Project Details: ${formState.details || 'Not provided'}`
    ].join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Website enquiry — ${formState.name || 'New client'}${packageParam ? ` [${packageParam} Package]` : ''}`;
    const body = getInquiryBody();
    window.location.href = `mailto:nikhilmalvi845@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const handleWhatsApp = () => {
    const text = `Hi Nikhil, I would like to discuss a website project:\n\n${getInquiryBody()}`;
    window.open(`https://wa.me/916352887015?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getInquiryBody()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const hasPrefill = packageParam || serviceParam || projectParam;

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="contact-page container">
        <div className="contact-intro">
          <span className="kicker">Start a project</span>
          <h1>Tell me<br />what you’re<br /><em>building.</em></h1>
          <p>Send a few details about your business and the website you need. I’ll review the enquiry and get back to you promptly.</p>
          <div className="contact-links">
            <a href="mailto:nikhilmalvi845@gmail.com"><FiMail /> nikhilmalvi845@gmail.com</a>
            <a href="https://wa.me/916352887015" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> +91 63528 87015</a>
            <a href="https://www.instagram.com/nik.malvi.2002/" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {hasPrefill && (
            <div className="prefill-badge">
              <span>
                🎯 Selected intent: {packageParam ? `${packageParam} Package` : serviceParam ? serviceParam : `Project: ${projectParam}`}
              </span>
              <button type="button" onClick={clearSelection}>Reset</button>
            </div>
          )}

          <div className="form-row">
            <label>
              Name
              <input
                required
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              WhatsApp / Phone
              <input
                required
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="+91..."
              />
            </label>
            <label>
              Business / Company
              <input
                name="company"
                value={formState.company}
                onChange={handleChange}
                placeholder="Company name"
              />
            </label>
          </div>

          <label>
            Website type
            <select
              required
              name="type"
              value={formState.type}
              onChange={handleChange}
            >
              <option value="" disabled>Select one</option>
              <option value="Static Website">Static Website</option>
              <option value="WordPress Website">WordPress Website</option>
              <option value="E-Commerce Website">E-Commerce Website</option>
              <option value="Website Redesign">Website Redesign</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>

          <label>
            Budget
            <select
              required
              name="budget"
              value={formState.budget}
              onChange={handleChange}
            >
              <option value="" disabled>Select your budget</option>
              <option value="₹5K – ₹10K">₹5K – ₹10K</option>
              <option value="₹10K – ₹20K">₹10K – ₹20K</option>
              <option value="₹20K – ₹35K">₹20K – ₹35K</option>
              <option value="₹35K+">₹35K+</option>
              <option value="Not sure">Not sure</option>
            </select>
          </label>

          <label>
            Project details
            <textarea
              required
              name="details"
              rows="6"
              value={formState.details}
              onChange={handleChange}
              placeholder="Tell me about your business, pages, features and timeline..."
            />
          </label>

          <div className="form-actions-grid">
            <button className="btn dark" type="submit">
              <FiSend /> Send via Email
            </button>
            <button className="btn-whatsapp" type="button" onClick={handleWhatsApp}>
              <FaWhatsapp /> Send via WhatsApp
            </button>
          </div>

          {sent && (
            <div className="form-feedback">
              <div className="form-feedback-msg">
                <FiCheckCircle />
                <span>Your email application should open with your enquiry.</span>
              </div>
              <div className="form-feedback-actions">
                <button type="button" className="btn-copy-action" onClick={handleCopy}>
                  {copied ? <><FiCheck /> Copied to clipboard!</> : <><FiCopy /> Copy enquiry details</>}
                </button>
                <button type="button" className="btn-copy-action" onClick={handleWhatsApp}>
                  <FaWhatsapp /> Send via WhatsApp instead
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </motion.main>
  );
}

function CaseStudy() {
  const { slug } = useParams();
  const currentIndex = projects.findIndex(x => x.slug === slug);

  if (currentIndex === -1) {
    return <NotFound />;
  }

  const p = projects[currentIndex];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const hasLiveUrl = p.url && p.url !== '#';

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap">
      <section className="case-hero">
        <div className="container">
          <Link className="back" to="/work"><FiArrowLeft /> Back to work</Link>
          <span className="kicker">{p.type}</span>
          <h1>{p.name}</h1>
          <p>{p.desc}</p>
          <div className="case-hero-cta">
            {hasLiveUrl ? (
              <a className="btn dark" href={p.url} target="_blank" rel="noopener noreferrer">
                Visit live website <FiExternalLink />
              </a>
            ) : (
              <>
                <span className="badge-staging">
                  <span className="badge-staging-dot" /> Client Staging / Demo on Request
                </span>
                <Link className="btn dark" to={`/contact?project=${encodeURIComponent(p.name)}`}>
                  Request Live Demo <FiArrowRight />
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="case-visual">
        <div className="container">
          <ProjectVisual p={p} large />
        </div>
      </section>

      <Section className="case-details">
        <div className="container case-grid">
          <div>
            <span className="kicker">Scope & Role</span>
            <h2>{p.role || 'From idea to launch.'}</h2>
          </div>
          <div>
            <p>
              Translated the initial business requirements and visual direction into a high-performance, responsive WordPress website.
              Structured the content architecture, optimized assets for swift mobile load times, and prepared the installation for long-term client maintainability.
            </p>
            {p.highlights && (
              <ul style={{ paddingLeft: '20px', marginTop: '16px', color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8 }}>
                {p.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
            )}
            <div className="tag-list">
              {p.tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </Section>

      <section className="case-nav-section">
        <div className="container case-nav-grid">
          <Link to={`/work/${prevProject.slug}`} className="case-nav-card prev">
            <small><FiArrowLeft /> Previous project</small>
            <strong>{prevProject.name}</strong>
          </Link>
          <Link to={`/work/${nextProject.slug}`} className="case-nav-card next">
            <small>Next project <FiArrowRight /></small>
            <strong>{nextProject.name}</strong>
          </Link>
        </div>
      </section>

      <CTA />
    </motion.main>
  );
}

function NotFound() {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="page-transition-wrap not-found-page">
      <div className="container not-found-content">
        <div className="not-found-code">404</div>
        <h1>Page not found.</h1>
        <p>The link you clicked may be broken, or the page may have been moved or removed.</p>
        <div className="not-found-actions">
          <Link className="btn dark" to="/">Return Home <FiArrowRight /></Link>
          <Link className="btn light" to="/work">Explore Work <FiArrowUpRight /></Link>
        </div>
      </div>
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function FloatingQuickConnect() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappUrl = 'https://wa.me/916352887015?text=' + encodeURIComponent('Hi Nikhil, I saw your portfolio and would like to discuss a website project.');

  return (
    <aside className="floating-quick-connect" aria-label="Direct WhatsApp Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat directly on WhatsApp"
      >
        <span className="floating-pulse" />
        <FaWhatsapp />
      </a>
      {showTooltip && (
        <div className="floating-tooltip">
          <span>Chat on WhatsApp</span>
          <small>+91 63528 87015</small>
        </div>
      )}
    </aside>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <FloatingQuickConnect />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);

