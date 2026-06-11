import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { FaLeaf, FaBoxOpen, FaTruck, FaUndo, FaShieldAlt, FaWhatsapp, FaClock, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ScrollReveal from '../components/animations/ScrollReveal';
import ProductCard from '../components/product/ProductCard';
import { getBestsellers, getNewArrivals } from '../data/products';
import AIMImage from '../assets/AIM.jpeg';

const heroImages = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85',
  'https://images.unsplash.com/photo-1594938298603-c8148c4b4237?w=1400&q=85',
  'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=1400&q=85',
  AIMImage, // Local image for better performance
];

const testimonials = [
  { name: 'Amira K.', location: 'Nairobi', text: 'The quality is extraordinary. I\'ve never felt so elegant and comfortable at the same time. Aura has completely changed how I view luxury intimates.', rating: 5 },
  { name: 'Zoe M.', location: 'Mombasa', text: 'As a plus-size woman, finding beautiful lingerie was always a challenge. Aura changed everything — inclusive, gorgeous, and delivered discreetly.', rating: 5 },
  { name: 'Sarah L.', location: 'Kisumu', text: 'The packaging alone made me feel like I was unwrapping a gift to myself. The bralette is divine. Worth every shilling.', rating: 5 },
];

const collections = [
  { title: 'Women', subtitle: 'Bras, Sets & More', to: '/shop/women', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', count: '60+ pieces' },
  { title: 'Men', subtitle: 'Essentials Redefined', to: '/shop/men', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80', count: '24+ pieces' },
  { title: 'Plus Sizes', subtitle: 'Every Body, Every Style', to: '/plus-sizes', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', count: '40+ pieces' },
];

const features = [
  { icon: FaLeaf, title: 'Sustainably Made', desc: 'Organic & eco-certified materials' },
  { icon: FaBoxOpen, title: 'Discreet Packaging', desc: 'Your privacy, always protected' },
  { icon: FaTruck, title: 'Free Shipping', desc: 'On all orders over KES 5,000' },
  { icon: FaUndo, title: 'Free Returns', desc: '14-day hassle-free returns' },
];

const trustPoints = [
  { icon: FaCheckCircle, title: 'Premium quality', desc: 'Design-led pieces made with detail and durability in mind.' },
  { icon: FaShieldAlt, title: 'Secure checkout', desc: 'Clear payment flow, order confirmation, and privacy-first handling.' },
  { icon: FaTruck, title: 'Fast fulfillment', desc: 'Kenya-wide delivery with discreet packaging and tracking updates.' },
  { icon: FaClock, title: 'Quick response', desc: 'Support that replies within 24 hours on orders, sizing, and returns.' },
];

const orderSteps = [
  { title: 'Choose your piece', desc: 'Browse collections, filter by size or style, and add to bag.' },
  { title: 'Check out securely', desc: 'Complete payment and confirm your delivery details in one flow.' },
  { title: 'Receive updates', desc: 'Get confirmation, support follow-up, and delivery tracking.' },
];

const businessStats = [
  { value: '24h', label: 'Response time' },
  { value: 'Kenya', label: 'Delivery coverage' },
  { value: '100%', label: 'Discreet packaging' },
  { value: '4.9/5', label: 'Customer feel' },
];

const whatsappNumber = '254742184483';
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Aura Intimates, I need help with an order.')}`;

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const newsletterEndpoint = 'https://formspree.io/f/xjgdgqjz';

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || !email.includes('@')) {
      toast.error('Enter a valid email address.');
      return;
    }

    setNewsletterLoading(true);

    try {
      const response = await fetch(newsletterEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          message: newsletterMessage,
          _subject: 'Aura Intimates newsletter signup',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Unable to submit. Please try again.');
      }

      setNewsletterSent(true);
      setNewsletterEmail('');
      setNewsletterMessage('');
      toast.success('Thanks! You’re on the list.');
    } catch (error) {
      toast.error(error.message || 'Submission failed. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <div>
      {/* ─── HERO ──────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        {/* Background images */}
        {heroImages.map((src, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === heroIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.img
              src={src}
              alt=""
              style={{ y: heroY }}
              className="w-full h-[115%] object-cover -top-[15%] absolute"
            />
          </motion.div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col justify-end h-full pb-20 px-6 md:px-16 max-w-7xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase font-sans text-cream/70 mb-4"
          >
            New Collection — SS 2025
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6 max-w-3xl"
          >
            Wear what<br />
            <em>feels like you</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-sans text-cream/70 text-sm md:text-base max-w-md mb-10 leading-relaxed"
          >
            Luxury intimates crafted for every body. Because beauty and comfort are never a compromise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop/women" className="bg-cream text-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-blush transition-all duration-300 hover:scale-[1.02]">
              Shop Women
            </Link>
            <Link to="/shop/men" className="border border-cream/50 text-cream px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:bg-cream/10 transition-all duration-300">
              Shop Men
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero dots */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 ${i === heroIndex ? 'w-6 h-1.5 bg-cream' : 'w-1.5 h-1.5 bg-cream/40 rounded-full'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── TRUST STRIP ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {businessStats.map(stat => (
            <div key={stat.label} className="rounded-3xl border border-blush/20 bg-cream/95 backdrop-blur-sm p-4 md:p-5 shadow-sm">
              <p className="font-serif text-2xl md:text-3xl text-ink mb-1">{stat.value}</p>
              <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES BAR ─────────────────────── */}
      <section className="bg-champagne/40 border-y border-blush/20 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <f.icon className="text-xl text-ink" />
              <div>
                <p className="font-sans text-xs font-medium text-ink">{f.title}</p>
                <p className="font-sans text-[10px] text-ink/50">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY AURA ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <ScrollReveal className="text-center mb-14">
          <p className="section-subtitle">Why choose us</p>
          <h2 className="section-title">Built to feel like a real premium business</h2>
          <p className="font-sans text-sm text-ink/60 max-w-2xl mx-auto mt-4">
            We combine luxury presentation with practical customer care so shoppers can trust the brand, the checkout, and the delivery experience.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {trustPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={point.title} delay={i * 0.08}>
                <div className="h-full rounded-[2rem] border border-blush/20 bg-champagne/20 p-6 md:p-7 hover:border-blush/40 transition-colors">
                  <div className="w-12 h-12 rounded-full border border-blush/20 bg-cream flex items-center justify-center mb-5 text-ink">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-3">{point.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-ink/60">{point.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-10">
          <div className="rounded-[2rem] bg-ink text-cream p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-cream/45 mb-2">Need help now?</p>
              <h3 className="font-serif text-3xl md:text-4xl mb-3">Talk to us on WhatsApp</h3>
              <p className="font-sans text-sm text-cream/70 leading-relaxed">
                Ask about sizing, order status, product recommendations, or delivery before you buy.
              </p>
            </div>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
              <FaWhatsapp className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── HOW IT WORKS ────────────────────── */}
      <section className="bg-champagne/20 py-20 md:py-28 border-y border-blush/20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <p className="section-subtitle">Simple process</p>
            <h2 className="section-title">How orders move from bag to delivery</h2>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {orderSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.1}>
                <div className="rounded-[2rem] bg-cream border border-blush/20 p-7 md:p-8 h-full">
                  <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-ink/35 mb-4">Step {index + 1}</p>
                  <h3 className="font-serif text-3xl text-ink mb-3">{step.title}</h3>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <ScrollReveal className="text-center mb-14">
          <p className="section-subtitle">Explore</p>
          <h2 className="section-title">Shop by Collection</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 0.1}>
              <Link to={col.to} className="group block relative overflow-hidden aspect-[3/4]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-cream/60 mb-1">{col.count}</p>
                  <h3 className="font-serif text-3xl text-cream mb-1">{col.title}</h3>
                  <p className="text-xs font-sans text-cream/60 mb-4">{col.subtitle}</p>
                  <span className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-cream/70 group-hover:text-cream transition-colors">
                    Shop now <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── BESTSELLERS ──────────────────────── */}
      <section className="bg-champagne/20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="flex items-end justify-between mb-12">
            <div>
              <p className="section-subtitle">Most Loved</p>
              <h2 className="section-title">Bestsellers</h2>
            </div>
            <Link to="/shop/women" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-ink/50 hover:text-ink transition-colors">
              View All <HiArrowRight className="w-3 h-3" />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519235624215-85175d5eb36e?w=700&q=80"
                alt="Brand story"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blush/30 -z-10" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <p className="section-subtitle">Our Story</p>
              <h2 className="section-title mb-6">Born from a belief that intimacy is an art</h2>
              <p className="font-sans text-sm text-ink/60 leading-relaxed mb-4">
                Aura Intimates was founded in Nairobi with a simple conviction: every person deserves to feel extraordinary in their most private moments.
              </p>
              <p className="font-sans text-sm text-ink/60 leading-relaxed mb-8">
                We craft each piece with sustainable materials, inclusive sizing, and obsessive attention to detail because luxury should never exclude.
              </p>
              <Link to="/about" className="btn-outline inline-flex items-center gap-2">
                Our Story <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─────────────────────── */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-sans text-cream/40 mb-2">Just In</p>
              <h2 className="font-serif text-4xl md:text-5xl text-cream">New Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-cream/40 hover:text-cream transition-colors">
              View All <HiArrowRight className="w-3 h-3" />
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {newArrivals.map((p, i) => (
              <div key={p.id} className="[&_h3]:text-cream [&_.text-ink]:text-cream [&_.text-ink\/60]:text-cream/60 [&_.text-ink\/40]:text-cream/40 [&_.text-ink\/50]:text-cream/50">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────── */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-14">
            <p className="section-subtitle">Reviews</p>
            <h2 className="section-title">What our community says</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-champagne/30 border border-blush/20 p-8">
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="text-champagne-dark text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-serif text-lg text-ink/80 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div>
                    <p className="font-sans text-sm font-medium text-ink">{t.name}</p>
                    <p className="font-sans text-xs text-ink/40">{t.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────── */}
      <section className="bg-blush/20 border-y border-blush/30 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="section-subtitle">Inner Circle</p>
            <h2 className="font-serif text-4xl text-ink mb-4">Join the inner circle</h2>
            <p className="font-sans text-sm text-ink/60 mb-8">
              First access to new collections, exclusive offers, and intimate styling notes delivered to you.
            </p>
            {newsletterSent ? (
              <div className="rounded-3xl border border-blush/20 bg-cream px-6 py-6 text-center">
                <p className="font-serif text-lg text-ink mb-3">Welcome to the inner circle</p>
                <p className="font-sans text-sm text-ink/60">You’ll receive the latest drops, offers, and styling notes straight to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full border border-ink/20 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50 transition-colors"
                />
                <input
                  type="text"
                  value={newsletterMessage}
                  onChange={(e) => setNewsletterMessage(e.target.value)}
                  placeholder="Tell us what brings you here (optional)"
                  className="w-full border border-ink/20 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="w-full bg-ink text-cream px-6 py-3 text-xs tracking-widest uppercase font-sans hover:bg-burgundy transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {newsletterLoading ? 'Sending…' : 'Join'}
                </button>
              </form>
            )}
            <p className="text-[10px] font-sans text-ink/30 mt-3">No spam. Unsubscribe at any time.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SUSTAINABILITY SNIPPET ───────────── */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right" delay={0.1}>
            <div>
              <p className="section-subtitle">Our Commitment</p>
              <h2 className="section-title mb-6">Luxury that loves the planet</h2>
              <p className="font-sans text-sm text-ink/60 leading-relaxed mb-8">
                Every Aura piece is crafted from certified sustainable materials organic cotton, TENCEL™ lyocell, and recycled fibres. Our packaging is 100% plastic-free and biodegradable.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Organic Materials', 'Recycled Packaging', 'Water-Conscious', 'Fair Trade'].map(tag => (
                  <span key={tag} className="text-xs font-sans text-ink/60 border border-ink/20 px-3 py-1.5">{tag}</span>
                ))}
              </div>
              <Link to="/sustainability" className="btn-outline inline-flex items-center gap-2">
                Learn More <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <img
              src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=700&q=80"
              alt="Sustainability"
              className="w-full aspect-[4/3] object-cover"
            />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
