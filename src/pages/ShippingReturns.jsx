import { Link } from 'react-router-dom';
import ScrollReveal from '../components/animations/ScrollReveal';
import { FaTruck, FaShieldAlt, FaClock, FaWhatsapp, FaExchangeAlt, FaMapMarkerAlt } from 'react-icons/fa';

const shippingHighlights = [
  { icon: FaTruck, title: 'Nationwide delivery', desc: 'We ship across Kenya with discreet packaging and clear delivery updates.' },
  { icon: FaClock, title: 'Delivery window', desc: 'Standard delivery takes 2–4 business days depending on your location.' },
  { icon: FaMapMarkerAlt, title: 'Local support', desc: 'We are based in Westlands, Nairobi and handle orders with boutique care.' },
  { icon: FaShieldAlt, title: 'Privacy first', desc: 'Billing and packaging are handled discreetly from checkout to delivery.' },
];

const policyRows = [
  {
    title: 'Intimate apparel',
    body: 'For hygiene and safety, bras, panties, bodysuits, sets, and similar items are final sale once delivered.',
  },
  {
    title: 'Sizing help before purchase',
    body: 'If you are unsure about fit, reach out before checkout and we’ll help you choose the right size the first time.',
  },
  {
    title: 'Damaged or incorrect items',
    body: 'If something arrives damaged or incorrect, contact us within 24 hours so we can review and help quickly.',
  },
];

const whatsappLink = 'https://wa.me/254742184483?text=Hi%20Aura%20Intimates%2C%20I%20need%20help%20with%20shipping%20or%20returns.';

export default function ShippingReturns() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <ScrollReveal className="max-w-3xl mb-14">
          <p className="section-subtitle">Shipping & Returns</p>
          <h1 className="section-title">Clear delivery terms, handled with care</h1>
          <p className="font-sans text-sm text-ink/60 mt-4 leading-relaxed">
            We want every order to feel premium and straightforward. Here’s how shipping, returns, and support work at Aura Intimates.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {shippingHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-[2rem] border border-blush/20 bg-cream p-6 md:p-7 shadow-sm">
                  <div className="w-12 h-12 rounded-full border border-blush/20 bg-champagne/20 flex items-center justify-center mb-5 text-ink">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-2xl text-ink mb-3">{item.title}</h2>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <ScrollReveal>
            <div className="rounded-[2rem] border border-ink/10 bg-champagne/20 p-7 md:p-10 shadow-sm">
              <p className="text-xs tracking-[0.25em] uppercase font-sans text-ink/40 mb-3">Policy overview</p>
              <h2 className="font-serif text-3xl text-ink mb-6">What to expect</h2>
              <div className="space-y-6">
                {policyRows.map(row => (
                  <div key={row.title} className="border-t border-blush/20 pt-5 first:border-0 first:pt-0">
                    <h3 className="font-serif text-2xl text-ink mb-2">{row.title}</h3>
                    <p className="font-sans text-sm text-ink/60 leading-relaxed">{row.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Link to="/track-order" className="btn-primary text-center">
                  Track Order
                </Link>
                <Link to="/contact" className="btn-outline text-center">
                  Contact Support
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-[2rem] bg-ink text-cream p-7 md:p-10 shadow-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-cream/45 mb-3">Need help now?</p>
              <h2 className="font-serif text-3xl mb-4">Chat with us on WhatsApp</h2>
              <p className="font-sans text-sm text-cream/70 leading-relaxed mb-8">
                Send your order number, delivery concern, or size question and we’ll respond as quickly as possible.
              </p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
                <FaWhatsapp className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}