import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useWishlist } from '../../context/WishlistContext';
import ProductModal from './ProductModal';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { toggle, isWishlisted } = useWishlist();

  const badgeColors = {
    Bestseller: 'bg-champagne text-ink',
    New: 'bg-ink text-cream',
    Sale: 'bg-burgundy text-cream',
    'Plus Size': 'bg-blush text-ink',
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative"
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-champagne/40 aspect-[3/4] mb-4">
          {/* Main image */}
          <img
            src={`${import.meta.env.BASE_URL}${product.images[0].replace(/^\//, '')}`}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          />
          {/* Hover image */}
          {product.images[1] && (
            <img
              src={`${import.meta.env.BASE_URL}${product.images[1].replace(/^\//, '')}`}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase font-sans px-2 py-1 ${badgeColors[product.badge] || 'bg-ink text-cream'}`}>
              {product.badge}
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggle(product); }}
            className="absolute top-3 right-3 w-8 h-8 bg-cream/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-cream hover:scale-110"
            aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted(product.id)
              ? <HiHeart className="w-4 h-4 text-burgundy" />
              : <HiOutlineHeart className="w-4 h-4 text-ink" />
            }
          </button>

          {/* Quick View */}
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(true)}
            className="absolute bottom-0 left-0 right-0 bg-ink/90 backdrop-blur-sm text-cream text-xs tracking-[0.2em] uppercase font-sans py-3 hover:bg-ink transition-colors"
          >
            Quick View
          </motion.button>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3
            className="font-sans text-sm font-medium text-ink cursor-pointer hover:text-ink/70 transition-colors line-clamp-1"
            onClick={() => setModalOpen(true)}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-sans text-sm text-ink">KES {product.price.toLocaleString()}</span>
            {product.compareAt && (
              <span className="font-sans text-xs text-ink/40 line-through">KES {product.compareAt.toLocaleString()}</span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1,2,3,4,5].map(star => (
                <span key={star} className={`text-[10px] ${star <= Math.round(product.rating) ? 'text-champagne-dark' : 'text-ink/20'}`}>★</span>
              ))}
            </div>
            <span className="text-[10px] font-sans text-ink/40">({product.reviews})</span>
          </div>
          {/* Color swatches */}
          <div className="flex gap-1.5 pt-1">
            {Object.entries(product.colorHex).slice(0, 4).map(([name, hex]) => (
              <div
                key={name}
                className="w-3.5 h-3.5 rounded-full border border-ink/10"
                style={{ backgroundColor: hex }}
                title={name}
              />
            ))}
          </div>
        </div>
      </motion.article>

      <ProductModal product={product} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
