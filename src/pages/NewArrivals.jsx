import { getNewArrivals, products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import ScrollReveal from '../components/animations/ScrollReveal';

export default function NewArrivals() {
  const newItems = getNewArrivals();
  const recent = products.slice(-8);
  const allNew = [...new Map([...newItems, ...recent].map(p => [p.id, p])).values()];

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
        <ScrollReveal className="mb-12">
          <p className="section-subtitle">Just Dropped</p>
          <h1 className="section-title">New Arrivals</h1>
          <p className="font-sans text-sm text-ink/50 mt-3 max-w-xl">
            Fresh from our studio — the latest pieces crafted for the season. Be the first to wear them.
          </p>
        </ScrollReveal>
        <ProductGrid products={allNew} />
      </div>
    </div>
  );
}
