import { Link } from 'react-router-dom';

export default function Returns() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="bg-cream border border-ink/10 rounded-3xl p-10 shadow-sm">
        <p className="section-subtitle">Returns Policy</p>
        <h1 className="section-title mb-6">A gentle policy for intimate pieces</h1>
        <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
          For hygiene and safety, intimate apparel cannot be returned once sold. This helps us maintain the highest standards of cleanliness, comfort, and care for every customer.
        </p>
        <div className="space-y-5 text-sm text-ink/70 leading-relaxed">
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">Why we do this</h2>
            <p>Because these pieces are worn close to the body, we do not accept returns on bras, panties, bodysuits, robes, and similar items.</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">What it means for you</h2>
            <p>If you have questions before ordering, our team is here to help you choose the right size and style.</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink mb-2">Need help?</h2>
            <p>Reach out through our contact page and we’ll make sure your order is a good fit.</p>
          </div>
        </div>
        <div className="mt-10">
          <Link to="/contact" className="text-sm uppercase tracking-[0.25em] text-ink/70 hover:text-ink transition-colors">
            Contact us for guidance
          </Link>
        </div>
      </div>
    </div>
  );
}
