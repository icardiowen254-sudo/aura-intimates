import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp, FaClock, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const [footerNewsletterEmail, setFooterNewsletterEmail] = useState('');
  const [footerNewsletterMessage, setFooterNewsletterMessage] = useState('');
  const [footerNewsletterSent, setFooterNewsletterSent] = useState(false);
  const [footerNewsletterLoading, setFooterNewsletterLoading] = useState(false);
  const [footerNewsletterError, setFooterNewsletterError] = useState('');
  const footerNewsletterEndpoint = 'https://formspree.io/f/xjgdgqjz';
  const whatsappLink = 'https://wa.me/254742184483?text=Hi%20Aura%20Intimates%2C%20I%20need%20help%20with%20an%20order.';

  const handleFooterNewsletterSubmit = async (event) => {
    event.preventDefault();
    const email = footerNewsletterEmail.trim();
    if (!email) return;

    setFooterNewsletterLoading(true);
    setFooterNewsletterError('');

    try {
      const response = await fetch(footerNewsletterEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          message: footerNewsletterMessage,
          _subject: 'Aura Intimates newsletter signup',
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setFooterNewsletterSent(true);
      setFooterNewsletterEmail('');
      setFooterNewsletterMessage('');
    } catch (error) {
      setFooterNewsletterError('Unable to submit. Please try again or email hello@aura.com.');
    } finally {
      setFooterNewsletterLoading(false);
    }
  };

  return (
    <footer className="bg-ink text-cream/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          <div className="rounded-3xl border border-cream/10 bg-cream/5 p-5">
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-cream/45 mb-2">Support</p>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-cream hover:text-blush transition-colors">
              <span className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center"><FaWhatsapp /></span>
              <div>
                <p className="font-serif text-xl">WhatsApp us</p>
                <p className="text-sm text-cream/55">Quick help with sizing, orders, and delivery</p>
              </div>
            </a>
          </div>
          <div className="rounded-3xl border border-cream/10 bg-cream/5 p-5">
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-cream/45 mb-2">Business details</p>
            <div className="space-y-3 text-sm text-cream/70">
              <div className="flex items-start gap-3"><FaMapMarkerAlt className="mt-1 text-cream/50" /><span>Westlands, Nairobi, Kenya</span></div>
              <div className="flex items-start gap-3"><FaClock className="mt-1 text-cream/50" /><span>Mon–Fri, 9am–6pm EAT</span></div>
              <div className="flex items-start gap-3"><FaEnvelope className="mt-1 text-cream/50" /><span>icardiowen254@gmail.com</span></div>
            </div>
          </div>
          <div className="rounded-3xl border border-cream/10 bg-cream/5 p-5">
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-cream/45 mb-2">Business promise</p>
            <p className="font-serif text-xl text-cream mb-2">Fast replies. Discreet packaging. Secure checkout.</p>
            <p className="text-sm text-cream/60 leading-relaxed">Built like a real boutique brand, with customer support and delivery clarity at every step.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-cream tracking-widest mb-4">AURA</h3>
            <p className="text-xs tracking-[0.3em] uppercase font-sans mb-6 opacity-50">Intimates</p>
            <p className="text-sm font-sans leading-relaxed opacity-60">
              Luxury innerwear crafted for every body. Because comfort and beauty are not a compromise.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/OWenicardi17" target="_blank" rel="noreferrer" className="w-8 h-8 border border-cream/20 flex items-center justify-center hover:border-blush hover:text-blush transition-colors duration-200">
                <FiInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com/OWenicardi17" target="_blank" rel="noreferrer" className="w-8 h-8 border border-cream/20 flex items-center justify-center hover:border-blush hover:text-blush transition-colors duration-200">
                <FiTwitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.facebook.com/OWenicardi17" target="_blank" rel="noreferrer" className="w-8 h-8 border border-cream/20 flex items-center justify-center hover:border-blush hover:text-blush transition-colors duration-200">
                <FiFacebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-sans text-cream mb-6">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'Women', to: '/shop/women' },
                { label: 'Men', to: '/shop/men' },
                { label: 'Plus Sizes', to: '/plus-sizes' },
                { label: 'New Arrivals', to: '/new-arrivals' },
                { label: 'Sale', to: '/shop/women' },
                { label: 'Gift Cards', to: '#' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-cream transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-sans text-cream mb-6">Information</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Sustainability', to: '/sustainability' },
                { label: 'Size Guide', to: '/size-guide' },
                { label: 'Contact', to: '/contact' },
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Shipping & Returns', to: '/shipping-returns' },
                { label: 'Track Order', to: '/track-order' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-cream transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-sans text-cream mb-6">Stay Close</h4>
            <p className="text-sm leading-relaxed mb-6">
              Join the inner circle. First access to new collections and exclusive offers.
            </p>
            {footerNewsletterSent ? (
              <p className="text-sm text-blush">Thanks! You're in. We'll keep you updated.</p>
            ) : (
              <form onSubmit={handleFooterNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={footerNewsletterEmail}
                  onChange={(e) => setFooterNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-cream/20 pb-2 text-sm font-sans placeholder:text-cream/30 text-cream focus:outline-none focus:border-blush transition-colors"
                />
                <input
                  type="text"
                  value={footerNewsletterMessage}
                  onChange={(e) => setFooterNewsletterMessage(e.target.value)}
                  placeholder="What are you hoping to discover? (optional)"
                  className="w-full bg-transparent border-b border-cream/20 pb-2 text-sm font-sans placeholder:text-cream/30 text-cream focus:outline-none focus:border-blush transition-colors"
                />
                <button
                  type="submit"
                  disabled={footerNewsletterLoading}
                  className="text-left pb-2 border-b border-cream/20 text-xs tracking-widest uppercase font-sans text-cream/60 hover:text-blush transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {footerNewsletterLoading ? 'Sending…' : 'Join'}
                </button>
              </form>
            )}
            {footerNewsletterError && (
              <p className="text-[11px] text-red-200 mt-3">{footerNewsletterError}</p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-sans opacity-40">
            © {new Date().getFullYear()} Aura Intimates. All rights reserved.
          </p>
          <div className="flex items-center gap-4 opacity-40">
            <span className="text-xs font-sans">Free shipping over KES 5,000</span>
            <span className="text-cream/20">|</span>
            <span className="text-xs font-sans">Discreet packaging guaranteed</span>
          </div>
          <div className="flex items-center gap-3 opacity-40 text-xs font-sans">
            <span>Goods once sold cannot be returned, for hygiene and safety reasons.</span>
          </div>
          <div className="flex items-center gap-3">
            {['M-PESA', 'VISA'].map(p => (
              <span key={p} className="text-[10px] border border-cream/15 px-2 py-1 font-sans tracking-wider opacity-50">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
