import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi';
import ProductCard from './ProductCard';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'new' },
  { label: 'Best Rated', value: 'rating' },
];

export default function ProductGrid({ products, title, subtitle }) {
  const [sort, setSort] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ colors: [], sizes: [], priceMax: 10000 });

  const allColors = [...new Set(products.flatMap(p => Object.keys(p.colorHex)))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes))].slice(0, 12);

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value],
    }));
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (filters.colors.length) result = result.filter(p => filters.colors.some(c => Object.keys(p.colorHex).includes(c)));
    if (filters.sizes.length) result = result.filter(p => filters.sizes.some(s => p.sizes.includes(s)));
    result = result.filter(p => p.price <= filters.priceMax);
    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'new': return result.sort((a, b) => b.isNew - a.isNew);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      default: return result;
    }
  }, [products, filters, sort]);

  const activeFilterCount = filters.colors.length + filters.sizes.length + (filters.priceMax < 10000 ? 1 : 0);

  return (
    <div>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-10">
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
          {title && <h1 className="section-title">{title}</h1>}
          <p className="text-sm font-sans text-ink/40 mt-2">{filtered.length} pieces</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-blush/20">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans text-ink/60 hover:text-ink transition-colors"
        >
          <HiOutlineAdjustments className="w-4 h-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 bg-blush text-ink text-[9px] rounded-full flex items-center justify-center">{activeFilterCount}</span>
          )}
        </button>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="text-xs tracking-wider uppercase font-sans text-ink/60 bg-transparent border-none cursor-pointer focus:outline-none hover:text-ink transition-colors"
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-champagne/20 border border-blush/20 p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Colors */}
              <div>
                <p className="text-xs tracking-widest uppercase font-sans text-ink/50 mb-3">Colour</p>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(color => {
                    const hex = products.find(p => p.colorHex[color])?.colorHex[color];
                    return (
                      <button
                        key={color}
                        onClick={() => toggleFilter('colors', color)}
                        className={`flex items-center gap-1.5 text-xs font-sans px-2 py-1 border transition-all ${
                          filters.colors.includes(color) ? 'border-ink bg-ink text-cream' : 'border-ink/20 text-ink/60 hover:border-ink/40'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: hex }} />
                        <span className="capitalize">{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Sizes */}
              <div>
                <p className="text-xs tracking-widest uppercase font-sans text-ink/50 mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('sizes', size)}
                      className={`text-xs font-sans px-2.5 py-1 border transition-all ${
                        filters.sizes.includes(size) ? 'border-ink bg-ink text-cream' : 'border-ink/20 text-ink/60 hover:border-ink/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price */}
              <div>
                <p className="text-xs tracking-widest uppercase font-sans text-ink/50 mb-3">
                  Max Price: KES {filters.priceMax.toLocaleString()}
                </p>
                <input
                  type="range" min={1500} max={10000} step={500}
                  value={filters.priceMax}
                  onChange={e => setFilters(f => ({ ...f, priceMax: +e.target.value }))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-sans text-ink/40 mt-1">
                  <span>KES 1,500</span><span>KES 10,000</span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => setFilters({ colors: [], sizes: [], priceMax: 10000 })}
                    className="mt-4 flex items-center gap-1 text-xs font-sans text-ink/40 hover:text-ink transition-colors"
                  >
                    <HiOutlineX className="w-3 h-3" /> Clear all filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif text-2xl text-ink/40 mb-2">No pieces found</p>
          <p className="text-sm font-sans text-ink/30">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
