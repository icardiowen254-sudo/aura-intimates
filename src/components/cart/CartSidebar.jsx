import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  const freeShippingThreshold = 5000;
  const remaining = freeShippingThreshold - subtotal;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-[cubic-bezier(0.22,1,0.36,1)] duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full max-w-sm bg-cream flex flex-col h-full shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-blush/20">
                    <Dialog.Title className="font-serif text-xl text-ink">
                      Your Bag
                      {items.length > 0 && (
                        <span className="font-sans text-sm text-ink/40 ml-2">({items.reduce((s, i) => s + i.quantity, 0)})</span>
                      )}
                    </Dialog.Title>
                    <button
                      onClick={closeCart}
                      className="p-2 text-ink/40 hover:text-ink transition-colors"
                      aria-label="Close cart"
                    >
                      <HiOutlineX className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Free shipping bar */}
                  {items.length > 0 && (
                    <div className="px-6 py-4 bg-blush/10 border-b border-blush/20">
                      {remaining > 0 ? (
                        <>
                          <p className="text-xs font-sans text-ink/60 mb-2">
                            Add <strong>KES {remaining.toLocaleString()}</strong> more for free shipping
                          </p>
                          <div className="h-1 bg-blush/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blush rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </>
                      ) : (
                        <p className="text-xs font-sans text-ink/60 flex items-center gap-2">
                          <span className="text-green-600">✓</span> You qualify for free shipping!
                        </p>
                      )}
                    </div>
                  )}

                  {/* Items */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 border border-blush/40 rounded-full flex items-center justify-center mb-4">
                          <span className="text-2xl">♡</span>
                        </div>
                        <p className="font-serif text-xl text-ink/60 mb-2">Your bag is empty</p>
                        <p className="text-sm font-sans text-ink/40 mb-6">Discover pieces made for you</p>
                        <button onClick={closeCart} className="btn-outline text-sm">
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <AnimatePresence initial={false}>
                        {items.map((item, index) => (
                          <motion.div
                            key={`${item.id}-${item.size}-${item.color}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, height: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-4 py-5 border-b border-blush/15 last:border-0"
                          >
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-20 h-24 object-cover bg-champagne flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-sans text-sm font-medium text-ink line-clamp-1">{item.name}</h4>
                                  <p className="text-xs font-sans text-ink/50 mt-0.5 capitalize">
                                    {item.size} · {item.color}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id, item.size, item.color)}
                                  className="text-ink/30 hover:text-ink transition-colors ml-2 flex-shrink-0"
                                  aria-label="Remove item"
                                >
                                  <HiOutlineTrash className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3 border border-blush/30">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                    className="p-1.5 text-ink/50 hover:text-ink transition-colors"
                                    aria-label="Decrease quantity"
                                  >
                                    <HiOutlineMinus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm font-sans w-4 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                    className="p-1.5 text-ink/50 hover:text-ink transition-colors"
                                    aria-label="Increase quantity"
                                  >
                                    <HiOutlinePlus className="w-3 h-3" />
                                  </button>
                                </div>
                                <span className="font-sans text-sm font-medium text-ink">
                                  KES {(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Footer */}
                  {items.length > 0 && (
                    <div className="border-t border-blush/20 px-6 py-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm text-ink/60">Subtotal</span>
                        <span className="font-serif text-xl text-ink">KES {subtotal.toLocaleString()}</span>
                      </div>
                      <p className="text-xs font-sans text-ink/40">Shipping & taxes calculated at checkout</p>
                      <Link to="/checkout" onClick={closeCart} className="btn-primary w-full text-center block">
                        Proceed to Checkout
                      </Link>
                      <div className="flex items-center justify-center gap-4 pt-1">
                        {['M-PESA', 'VISA'].map(p => (
                          <span key={p} className="text-[9px] text-ink/30 font-sans tracking-wider">{p}</span>
                        ))}
                      </div>
                      <p className="text-[10px] font-sans text-ink/30 text-center flex items-center justify-center gap-1">
                        <span>🔒</span> Discreet packaging · Secure checkout
                      </p>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
