import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineHeart, HiHeart, HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductModal({ product, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    if (isOpen && product) {
      setSelectedImage(0);
      setSelectedSize(null);
      setSelectedColor(Object.keys(product.colorHex || {})[0] ?? '');
      setQuantity(1);
      setSizeError(false);
    }
  }, [isOpen, product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addItem(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" />
        </Transition.Child>

       <div className="fixed inset-0 z-10 overflow-y-auto flex items-start md:items-center justify-center p-2 md:p-4">
          <Transition.Child as={Fragment}
            enter="ease-[cubic-bezier(0.22,1,0.36,1)] duration-500" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
        <Dialog.Panel className="relative w-full max-w-3xl bg-cream shadow-2xl my-2 md:my-0">
  {/* Close bar — always visible at top on all screen sizes */}
  <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10 bg-cream sticky top-0 z-30">
    <span className="text-xs tracking-[0.2em] uppercase font-sans text-ink/40">Quick View</span>
    <button
      onClick={onClose}
      className="w-9 h-9 bg-ink text-cream flex items-center justify-center hover:bg-burgundy transition-colors"
      aria-label="Close"
    >
      <HiOutlineX className="w-5 h-5" />
    </button>
  </div>

  <div className="grid md:grid-cols-2">
                {/* Images */}
                <div className="bg-champagne/30">
                  <div className="relative aspect-square">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        src={product.images[selectedImage]}
                        alt={product.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 p-3">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`w-14 h-14 overflow-hidden flex-shrink-0 transition-all ${selectedImage === i ? 'ring-1 ring-ink' : 'opacity-50 hover:opacity-75'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-none">
                  <div className="space-y-5">
                    {product.badge && (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-ink/50">{product.badge}</span>
                    )}
                    <Dialog.Title className="font-serif text-2xl md:text-3xl text-ink leading-tight">
                      {product.name}
                    </Dialog.Title>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xl font-medium text-ink">KES {product.price.toLocaleString()}</span>
                      {product.compareAt && (
                        <>
                          <span className="font-sans text-sm text-ink/40 line-through">KES {product.compareAt.toLocaleString()}</span>
                          <span className="text-xs font-sans text-burgundy bg-burgundy/10 px-2 py-0.5">-{discount}%</span>
                        </>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className={`text-sm ${s <= Math.round(product.rating) ? 'text-champagne-dark' : 'text-ink/20'}`}>★</span>)}</div>
                      <span className="text-xs font-sans text-ink/50">{product.rating} ({product.reviews} reviews)</span>
                    </div>

                    <p className="text-sm font-sans text-ink/60 leading-relaxed">{product.description}</p>

                    {/* Colors */}
                    <div>
                      <p className="text-xs tracking-[0.15em] uppercase font-sans text-ink/50 mb-2">
                        Colour: <span className="capitalize">{selectedColor}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(product.colorHex).map(([name, hex]) => (
                          <button
                            key={name}
                            onClick={() => setSelectedColor(name)}
                            className={`w-8 h-8 rounded-full transition-all ${selectedColor === name ? 'ring-2 ring-offset-2 ring-ink' : 'ring-1 ring-ink/10 hover:ring-ink/30'}`}
                            style={{ backgroundColor: hex }}
                            title={name}
                            aria-label={name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <p className={`text-xs tracking-[0.15em] uppercase font-sans mb-2 ${sizeError ? 'text-burgundy' : 'text-ink/50'}`}>
                        {sizeError ? 'Please select a size' : 'Size'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => { setSelectedSize(size); setSizeError(false); }}
                            className={`px-3 py-1.5 text-xs font-sans border transition-all duration-150 ${
                              selectedSize === size
                                ? 'border-ink bg-ink text-cream'
                                : 'border-ink/20 text-ink/60 hover:border-ink/50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-ink/20">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-ink/50 hover:text-ink transition-colors" aria-label="Decrease">
                          <HiOutlineMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 py-2 text-sm font-sans text-ink w-10 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-ink/50 hover:text-ink transition-colors" aria-label="Increase">
                          <HiOutlinePlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-sans text-ink/40">In stock</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 mt-6">
                    <button onClick={handleAddToCart} className="btn-primary w-full">
                      Add to Bag — KES {(product.price * quantity).toLocaleString()}
                    </button>
                    <button onClick={() => toggle(product)} className="btn-outline w-full flex items-center justify-center gap-2">
                      {isWishlisted(product.id) ? <HiHeart className="w-4 h-4 text-burgundy" /> : <HiOutlineHeart className="w-4 h-4" />}
                      {isWishlisted(product.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
                    </button>
                    <p className="text-[10px] font-sans text-ink/30 text-center">
                      🔒 Discreet packaging · Free returns within 14 days
                    </p>
                    <details className="text-xs font-sans text-ink/50">
                      <summary className="cursor-pointer tracking-wider uppercase text-[10px] hover:text-ink transition-colors">Care Instructions</summary>
                      <p className="mt-2 leading-relaxed">{product.care}</p>
                    </details>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
