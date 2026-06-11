import { useMemo, useState } from 'react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { FaSearch, FaTruck, FaBoxOpen, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

const mockTimeline = [
  { id: 'confirmed', label: 'Order confirmed', desc: 'We have received your order and payment details.' },
  { id: 'packed', label: 'Packed for dispatch', desc: 'Your pieces are being prepared and packaged discreetly.' },
  { id: 'transit', label: 'In transit', desc: 'The parcel is on the way to your delivery address.' },
  { id: 'delivered', label: 'Delivered', desc: 'Your order has reached its destination.' },
];

const sampleOrders = {
  AURA1001: { status: 2, customer: 'Amina K.', eta: 'Tomorrow', method: 'M-PESA' },
  AURA1002: { status: 1, customer: 'Joan M.', eta: '2-3 business days', method: 'VISA' },
  AURA1003: { status: 3, customer: 'Brian K.', eta: 'Delivered', method: 'M-PESA' },
};

const whatsappLink = 'https://wa.me/254742184483?text=Hi%20Aura%20Intimates%2C%20I%20need%20help%20tracking%20my%20order.';

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('AURA1001');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tracking = useMemo(() => sampleOrders[orderNumber.trim().toUpperCase()] || null, [orderNumber]);

  const activeIndex = tracking ? tracking.status : 0;

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <ScrollReveal className="max-w-3xl mb-14">
          <p className="section-subtitle">Order tracking</p>
          <h1 className="section-title">Follow your order with confidence</h1>
          <p className="font-sans text-sm text-ink/60 mt-4 leading-relaxed">
            Enter your order number to view a polished delivery status. This page is ready for backend integration, and currently demonstrates the tracking experience with sample orders.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <ScrollReveal>
            <div className="rounded-[2rem] border border-blush/20 bg-cream p-7 md:p-10 shadow-sm">
              <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink/40 mb-3">Track your parcel</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block space-y-2">
                  <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Order number</span>
                  <input
                    value={orderNumber}
                    onChange={e => setOrderNumber(e.target.value)}
                    className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                    placeholder="AURA1001"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Email or phone</span>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-ink/10 bg-cream px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/50"
                    placeholder="name@example.com or +254..."
                  />
                </label>
                <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                  <FaSearch className="w-4 h-4" /> Track Order
                </button>
              </form>

              <div className="mt-8 rounded-3xl bg-champagne/20 border border-blush/20 p-5">
                <p className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40 mb-2">Need human help?</p>
                <p className="font-sans text-sm text-ink/60 leading-relaxed mb-4">
                  If you already paid and want an update, message us on WhatsApp with your order number and name.
                </p>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-sans text-ink hover:text-burgundy transition-colors">
                  <FaWhatsapp className="w-4 h-4" /> Open WhatsApp support
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-[2rem] bg-ink text-cream p-7 md:p-10 shadow-2xl">
              {tracking ? (
                <>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-cream/45 mb-3">Tracking result</p>
                  <h2 className="font-serif text-3xl mb-3">Order {orderNumber.toUpperCase()}</h2>
                  <p className="font-sans text-sm text-cream/65 mb-6">
                    Customer: {tracking.customer} · Payment: {tracking.method} · ETA: {tracking.eta}
                  </p>

                  <div className="space-y-4">
                    {mockTimeline.map((step, index) => {
                      const complete = index <= activeIndex;
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className={`rounded-3xl border p-4 flex gap-4 ${complete ? 'border-cream/20 bg-cream/5' : 'border-cream/10 bg-transparent opacity-55'}`}
                        >
                          <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ${complete ? 'border-cream/20 bg-cream/10' : 'border-cream/10 bg-transparent'}`}>
                            {index === 0 ? <FaBoxOpen className="w-4 h-4" /> : index === 3 ? <FaCheckCircle className="w-4 h-4" /> : <FaTruck className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-serif text-xl text-cream">{step.label}</p>
                            <p className="font-sans text-sm text-cream/65 leading-relaxed">{step.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-cream/45 mb-3">No match found</p>
                  <h2 className="font-serif text-3xl mb-3">We could not find that order</h2>
                  <p className="font-sans text-sm text-cream/65 mb-6 leading-relaxed">
                    Double-check the order number or use WhatsApp support for a manual lookup.
                  </p>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
                    <FaWhatsapp className="w-4 h-4" /> Ask on WhatsApp
                  </a>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>

        {submitted && (
          <div className="mt-8 rounded-[2rem] border border-blush/20 bg-champagne/20 p-5 text-sm text-ink/70">
            We searched for your order using the current demo tracker. In a live backend version, this form would validate against your real order database and SMS/email records.
          </div>
        )}
      </div>
    </div>
  );
}