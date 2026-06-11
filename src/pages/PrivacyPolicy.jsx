import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="bg-cream border border-ink/10 rounded-3xl p-10 shadow-sm">
        <p className="section-subtitle">Privacy Policy</p>
        <h1 className="section-title mb-6">Your privacy is respected</h1>
        <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
          Aura Intimates collects only the information needed to fulfill orders, respond to inquiries, and keep you updated with the things you care about.
        </p>
        <div className="space-y-5 text-sm text-ink/70 leading-relaxed">
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">What we collect</h2>
            <p>We may collect your name, email address, shipping address, and order details when you place an order or sign up for our newsletter.</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">How we use it</h2>
            <p>We use your information to process orders, provide customer support, and send marketing only if you opt in.</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">Sharing and security</h2>
            <p>We do not sell your personal data. Your information is shared only with trusted partners needed to fulfill your order and protect your account.</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">Your choices</h2>
            <p>You can unsubscribe from marketing emails anytime using the link in the email, or by contacting us through our contact page.</p>
          </div>
        </div>
        <div className="mt-10">
          <Link to="/contact" className="text-sm uppercase tracking-[0.25em] text-ink/70 hover:text-ink transition-colors">
            Contact us with privacy questions
          </Link>
        </div>
      </div>
    </div>
  );
}
