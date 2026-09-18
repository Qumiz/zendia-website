import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronUp,
  Circle,
  Compass,
  Globe2,
  Handshake,
  Leaf,
  Link2,
  Package,
  ShieldCheck,
  ShipWheel,
  Truck,
  Boxes,
  CircleDollarSign,
  Menu,
  X,
} from 'lucide-react';
import heroPort from './assets/hero-port.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Contact', href: '#contact' },
];

const serviceCards = [
  {
    title: 'International Trading',
    description: 'Connecting manufacturers, suppliers and buyers across international markets while building reliable and transparent business partnerships.',
    icon: Globe2,
  },
  {
    title: 'Import & Export',
    description: 'Managing import and export operations with practical market knowledge, regulatory awareness and efficient coordination.',
    icon: ShipWheel,
  },
  {
    title: 'Logistics & Forwarding',
    description: 'Delivering reliable freight forwarding and door-to-door logistics through trusted transport partners and efficient coordination.',
    icon: Truck,
  },
  {
    title: 'Supplier & Product Sourcing',
    description: 'Identifying reliable suppliers and suitable products that match our clients’ commercial and operational requirements.',
    icon: Package,
  },
  {
    title: 'Private Label Support',
    description: 'Supporting private label projects from product selection and supplier sourcing to commercial coordination and market launch.',
    icon: Boxes,
  },
  {
    title: 'End-to-End Deal Management',
    description: 'Managing every stage of the transaction—from supplier selection and negotiations to logistics, documentation and final delivery.',
    icon: Handshake,
  },
];

const innovationSteps = [
  {
    title: 'Process Optimisation',
    text: 'We continuously refine workflows, documentation and communication to shorten lead times, reduce errors and improve efficiency.',
  },
  {
    title: 'Smart Use of Data',
    text: 'We use market and logistics data to compare routes, costs and risks and provide clients with clear, fact-based options.',
  },
  {
    title: 'New Markets & Products',
    text: 'We monitor market trends and identify new sourcing opportunities, product categories and potential markets for our clients.',
  },
  {
    title: 'Partnership-Driven Solutions',
    text: 'Working closely with clients and suppliers, we develop flexible solutions that adapt to changing requirements and business growth.',
  },
];

const performanceCards = [
  { title: 'Diversified markets', icon: Compass },
  { title: 'Risk management', icon: ShieldCheck },
  { title: 'Sustainable growth', icon: Leaf },
  { title: 'Long-term project support', icon: CircleDollarSign },
];

const visionPoints = [
  'To be a reliable international link between producers and buyers',
  'To be the first choice for partners in end-to-end trading, logistics and forwarding',
  'To expand the supplier network in Europe, the CIS, China, India and Southeast Asia',
  'To build long-term, transparent and mutually beneficial relationships',
];

const missionPoints = [
  'To make international trade easier for clients, from product selection to door-to-door delivery',
  'To reduce risks and costs through professional logistics and clear terms',
  'To provide flexible solutions in assortment, volumes and supply routes',
  'To make every transaction a step towards a long-term partnership',
];

function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required.';
    if (!formData.company.trim()) nextErrors.company = 'Company is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email.';
    if (!formData.subject.trim()) nextErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) nextErrors.message = 'Message is required.';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:zendia2025@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-slate-800">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur border-b border-slate-200' : 'bg-transparent'}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
          <a href="#home" className="text-xl font-extrabold tracking-[0.25em] text-brand-red">ZENDIA</a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-brand-red">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="rounded-full bg-brand-red px-5 py-2.5 text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#9b1827]">
              Contact Us
            </a>
          </nav>
          <button
            className="rounded-full border border-slate-300 p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <div id="mobile-nav" className="border-t border-slate-200 bg-white/95 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="transition hover:text-brand-red">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="home">
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="max-w-3xl">
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">ZENDIA</p>
              <h1 className="text-4xl font-extrabold leading-tight text-brand-red sm:text-5xl lg:text-7xl">
                Bridging Markets,<br />
                Driving Growth
              </h1>
              <p className="mt-6 max-w-xl text-sm font-semibold text-slate-700">
                International Trading, Logistics and Forwarding Solutions
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#services" className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9b1827]">
                  Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-brand-red hover:text-brand-red">
                  Contact Us
                </a>
              </div>
            </Reveal>
            <Reveal delay={150} className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-brand-red/10 blur-3xl" />
              <img
                src={heroPort}
                alt="Global trade and logistics network"
                className="h-[480px] w-full rounded-[2.5rem] object-cover shadow-soft"
              />
            </Reveal>
          </div>
        </section>

        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">About us</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">A diversified international trading, distribution and forwarding company</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                ZENDIA connects producers and buyers from Europe, CIS countries, China, India, Southeast Asia and other regions. We supply food and non-food products on a wholesale basis and provide freight forwarding and door-to-door logistics.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We manage the full cycle from supplier and product sourcing to delivery and deal coordination, while remaining flexible in shipment sizes from full-container loads to smaller orders according to client needs.
              </p>
            </Reveal>
            <Reveal delay={150} className="relative">
              <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-brand-red/15" />
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Modern logistics and trade architecture"
                className="h-[440px] w-full rounded-[2rem] object-cover shadow-soft"
              />
              <div className="absolute bottom-6 right-6 rounded-full border border-white/60 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 backdrop-blur">
                Full cycle trade support
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft lg:grid-cols-2 lg:p-12">
            <Reveal className="border-b border-brand-red/40 pb-8 lg:border-b-0 lg:border-r lg:pr-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <Compass size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">Vision</h3>
              <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-600">
                {visionPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-brand-red" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="pt-8 lg:pt-0 lg:pl-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <Link2 size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">Mission</h3>
              <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-600">
                {missionPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-brand-red" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">What we do</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Services built around efficient and safe cross-border trade</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We help companies develop international trade by connecting reliable suppliers, coordinating cross-border transactions and managing logistics from sourcing to final delivery. Our clients stay focused on growing their business while we take care of the operational complexity.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {serviceCards.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Reveal
                    key={service.title}
                    as="article"
                    delay={(index % 3) * 100}
                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red transition group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="innovation" className="bg-brand-red px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">Innovation</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Practical innovation for faster, safer and smarter trade</h2>
              <p className="mt-6 text-lg leading-8 text-white/90">
                We use practical solutions to make international trade more efficient, transparent and adaptable. By improving processes, using market and logistics data and responding quickly to changing conditions, we help our clients reduce risks, save time and identify new opportunities.
              </p>
            </Reveal>
            <div className="mt-12 relative">
              <div className="absolute left-0 top-6 hidden h-[2px] bg-white/70 lg:block lg:w-full" />
              <div className="absolute left-5 top-2 bottom-2 w-px bg-white/30 lg:hidden" aria-hidden="true" />
              <div className="grid gap-8 lg:grid-cols-4">
                {innovationSteps.map((step, index) => (
                  <Reveal
                    key={step.title}
                    delay={index * 100}
                    className="relative flex gap-5 rounded-[1.5rem] border border-white/30 bg-white/10 p-6 backdrop-blur lg:block"
                  >
                    <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/60 bg-white text-brand-red">
                      <Circle size={14} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold lg:mt-6">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/85">{step.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-brand-red p-8 text-white shadow-soft lg:p-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">Solutions</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Tailored solutions for international trade</h2>
              <p className="mt-6 text-lg leading-8 text-white/90">
                We develop practical solutions around each partner’s market, product requirements and business objectives, combining sourcing, commercial coordination and logistics into one efficient process.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <Reveal className="rounded-[1.5rem] border border-white/20 bg-white/10 p-8">
                <h3 className="text-2xl font-semibold">For buyers & distributors</h3>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/90">
                  <li>• Diversify supply sources across Europe, CIS countries, China, India and Southeast Asia</li>
                  <li>• Expand product assortments without building an internal sourcing and logistics team</li>
                  <li>• Consolidate shipments and optimise routes to improve landed costs</li>
                  <li>• Maintain clear and transparent coordination at every stage of the transaction</li>
                </ul>
              </Reveal>
              <Reveal delay={150} className="rounded-[1.5rem] border border-white/20 bg-white/10 p-8">
                <h3 className="text-2xl font-semibold">For producers & brands</h3>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-white/90">
                  <li>• Access new buyers and international markets through an experienced trade partner</li>
                  <li>• Test new products, formats and price points while reducing market-entry risks</li>
                  <li>• Receive market feedback to refine assortment and positioning</li>
                  <li>• Rely on Zendia for commercial coordination and logistics throughout the entire process</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="sustainability" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                alt="Sustainable logistics and environmental responsibility"
                className="h-[420px] w-full rounded-[2rem] object-cover shadow-soft"
              />
            </Reveal>
            <Reveal delay={150} className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">Health, safety and environmental commitment</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Responsible trade, handled with care</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                “We treat health, safety and environmental impact as an integral part of every decision, not a checkbox. By working with compliant partners, maintaining safe handling and storage practices, and optimising our logistics, we aim to move goods responsibly while protecting people, products and the planet.”
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-soft lg:p-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">Financial performance</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Steady, sustainable growth with careful risk management</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                “We focus on steady, sustainable growth. By working in different markets and product categories and carefully managing risks, we keep our business financially stable and able to support long-term projects with our partners.”
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {performanceCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal key={card.title} delay={index * 100} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900">{card.title}</h3>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">Contact</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Build reliable supply solutions with ZENDIA</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Connect with us to explore new markets, supply routes and cooperation formats for your business.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition hover:bg-[#9b1827]">
                  Contact ZENDIA
                </a>
                <a href="#services" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-brand-red hover:text-brand-red">
                  Explore Our Services
                </a>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
                alt="Cargo ship and freight logistics"
                className="h-[360px] w-full rounded-[2rem] object-cover"
              />
            </Reveal>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">Get in touch</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">ZENDIA Sp. z o.o.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">Marszałkowska 55/73-39<br />00-676 Warsaw, Poland</p>
              <div className="mt-8 space-y-3 text-lg text-slate-700">
                <p><span className="font-semibold">Phone:</span> <a href="tel:+48666946544" className="text-brand-red hover:underline">+48 666 946 544</a></p>
                <p><span className="font-semibold">Email:</span> <a href="mailto:zendia2025@gmail.com" className="text-brand-red hover:underline">zendia2025@gmail.com</a></p>
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-red">Location</p>
                <p className="mt-3 text-base leading-7 text-slate-600">Warsaw-based operations with international trade and logistics support across multiple markets.</p>
              </div>
            </Reveal>
            <Reveal delay={150} as="form" onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">Name</label>
                  <input id="name" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30" />
                  {errors.name && <p className="mt-2 text-sm text-brand-red">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="company">Company</label>
                  <input id="company" name="company" value={formData.company} onChange={handleChange} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30" />
                  {errors.company && <p className="mt-2 text-sm text-brand-red">{errors.company}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30" />
                  {errors.email && <p className="mt-2 text-sm text-brand-red">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30" />
                  {errors.subject && <p className="mt-2 text-sm text-brand-red">{errors.subject}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full rounded-[1.25rem] border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/30" />
                  {errors.message && <p className="mt-2 text-sm text-brand-red">{errors.message}</p>}
                </div>
              </div>
              <button type="submit" className="mt-6 inline-flex items-center rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition hover:bg-[#9b1827]">
                Send Message <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-[#f6f4f0] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="#home" className="text-xl font-extrabold tracking-[0.25em] text-brand-red">ZENDIA</a>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">Bridging Markets, Driving Growth</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <a href="#about" className="hover:text-brand-red">About</a>
            <a href="#services" className="hover:text-brand-red">Services</a>
            <a href="#contact" className="hover:text-brand-red">Contact</a>
          </div>
          <div className="text-sm text-slate-600">
            <p>Phone: <a href="tel:+48666946544" className="text-brand-red hover:underline">+48 666 946 544</a></p>
            <p>Email: <a href="mailto:zendia2025@gmail.com" className="text-brand-red hover:underline">zendia2025@gmail.com</a></p>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col-reverse gap-4 border-t border-slate-300 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© <span>{new Date().getFullYear()}</span> ZENDIA Sp. z o.o. All rights reserved.</p>
          <a href="#home" className="inline-flex items-center gap-2 font-semibold text-brand-red hover:underline">
            <ChevronUp size={16} /> Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
