import { useMemo, useState } from 'react';
import { getProductsByGender } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import ScrollReveal from '../components/animations/ScrollReveal';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Boxers', value: 'boxers', image: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=800&q=80' },
  { label: 'Shackets', value: 'briefs', image: 'https://images.unsplash.com/photo-1503389166068-93f0ff87c60c?w=800&q=80' },
  { label: 'Trunks', value: 'trunks', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
  { label: 'Undershirts', value: 'undershirts', image: 'https://images.unsplash.com/photo-1614283317713-f1b04a11d3ba?w=800&q=80' },
  { label: 'Socks', value: 'socks', image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80' },
];

export default function ShopMen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const products = getProductsByGender('men');
  const filteredProducts = useMemo(
    () => selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory]
  );

  return (
    <div className="pt-24 md:pt-28">
      <div className="relative h-48 md:h-72 overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&q=80"
          alt="Shop Men"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs tracking-[0.4em] uppercase font-sans text-cream/60 mb-2">Collection</p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream">Men</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <ScrollReveal className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-blush/20">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
              className={`text-xs tracking-[0.15em] uppercase font-sans px-4 py-2 border transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/15 text-ink/50 hover:border-ink/50 hover:text-ink'
              }`}
            >
              {category.label}
            </button>
          ))}
        </ScrollReveal>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
