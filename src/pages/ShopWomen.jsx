import { useMemo, useState } from 'react';
import { getProductsByGender } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import ScrollReveal from '../components/animations/ScrollReveal';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Bras', value: 'bras', image: 'https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=800&q=80' },
  { label: 'Panties', value: 'panties', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80' },
  { label: 'Sets', value: 'sets', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80' },
  { label: 'Bodysuits', value: 'bodysuits', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4237?w=800&q=80' },
  { label: 'Babydolls', value: 'babydolls', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80' },
  { label: 'Robes', value: 'robes', image: 'https://images.unsplash.com/photo-1512386233331-f023884a92e8?w=800&q=80' },
];

export default function ShopWomen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const products = getProductsByGender('women');
  const filteredProducts = useMemo(
    () => selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory]
  );

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-72 overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80"
          alt="Shop Women"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs tracking-[0.4em] uppercase font-sans text-cream/60 mb-2">Collection</p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream">Women</h1>
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
