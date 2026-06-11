import { products } from '../data/products';
import { FaStar } from 'react-icons/fa';
import ProductGrid from '../components/product/ProductGrid';
import ScrollReveal from '../components/animations/ScrollReveal';

const plusProducts = products.filter(p =>
  p.badge === 'Plus Size' ||
  p.sizes.some(s => ['1X','2X','3X','4X','5X','XXL','3XL','4XL'].includes(s))
);

export default function PlusSizes() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="relative h-64 md:h-80 overflow-hidden mb-12">
        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1400&q=80" alt="Plus Sizes" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-ink/20 flex items-center px-8 md:px-20">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase font-sans text-cream/60 mb-3">Inclusive Collection</p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4">Plus Sizes</h1>
            <p className="font-sans text-sm text-cream/70 max-w-md">Every body deserves to feel extraordinary. Our extended sizing collection is designed with the same luxury and care as every piece we make.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-12">
        <ScrollReveal>
          <div className="bg-blush/20 border border-blush/30 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <FaStar className="text-2xl text-ink" />
            <div>
              <h3 className="font-serif text-lg text-ink mb-1">Our Size Promise</h3>
              <p className="font-sans text-sm text-ink/60">All our plus-size pieces are designed specifically for curves — not just scaled up. We consult with real bodies at every stage of design.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <ProductGrid products={plusProducts} />
      </div>
    </div>
  );
}
