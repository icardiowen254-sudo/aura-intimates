import { useState } from 'react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaHeart, FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setForm({ name: '', email: '', subject: '', message: '' });
    setSent(true);
    toast.success('Message sent! We’ll be in touch soon.');
  };

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'icardiowen254@gmail.com' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: '+254 742 184 483' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Westlands, Nairobi, Kenya' },
    { icon: FaClock, label: 'Hours', value: 'Mon–Fri, 9am–6pm EAT' },
  ];

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <ScrollReveal className="mb-14">
          <p className="section-subtitle">Get in Touch</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="font-sans text-sm text-ink/60 mt-3 max-w-md">
            Questions about sizing, orders, or just want to say hello? We'd love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <ScrollReveal>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-20"
              >
                <div className="w-16 h-16 border border-blush/40 rounded-full flex items-center justify-center mb-6 text-2xl text-blush">
                  <FaHeart />
                </div>
                <h3 className="font-serif text-3xl text-ink mb-3">Message Received</h3>
                <p className="font-sans text-sm text-ink/60">We'll be in touch within 24 hours. Thank you for reaching out.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-sans text-ink/50 block mb-2">Name</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="luxury-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-sans text-ink/50 block mb-2">Email</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="luxury-input"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase font-sans text-ink/50 block mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    className="luxury-input"
                  >
                    <option value="">Select a topic</option>
                    <option>Order Query</option>
                    <option>Sizing Help</option>
                    <option>Returns & Exchanges</option>
                    <option>Wholesale Inquiry</option>
                    <option>Press & Media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase font-sans text-ink/50 block mb-2">Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="luxury-input resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
                <p className="text-[10px] font-sans text-ink/30 text-center">We typically respond within 24 hours.</p>
              </form>
            )}
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl text-ink mb-6">Other ways to reach us</h3>
                <div className="space-y-5">
                  {contactInfo.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <span className="text-xl flex-shrink-0 mt-0.5 text-ink"><Icon /></span>
                        <div>
                          <p className="text-[10px] tracking-widest uppercase font-sans text-ink/40">{item.label}</p>
                          <p className="font-sans text-sm text-ink mt-0.5">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-blush/20 pt-8">
                <h3 className="font-serif text-xl text-ink mb-4">FAQ</h3>
                <div className="space-y-4">
                  {[
                    { q: 'How discreet is your packaging?', a: 'All orders are shipped in plain, unmarked boxes with no indication of contents. Billing statements show "Aura Ltd" only.' },
                    { q: 'Do you ship across Kenya?', a: 'Yes! We ship nationwide. Orders over KES 5,000 ship free. Standard delivery takes 2–4 business days.' },
                    { q: 'Can I track my order?', a: 'Yes. Use the Track Order page in the footer, or message us on WhatsApp with your order number for a manual update.' },
                  ].map((faq, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="mt-1 text-ink/50"><FaChevronRight /></span>
                      <div>
                        <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
                        <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
