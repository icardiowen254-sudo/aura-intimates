import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineMenu, HiOutlineX, HiOutlineSearch } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { products } from '../../data/products';

const navLinks = [
  { label: 'Women', to: '/shop/women' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Plus Sizes', to: '/plus-sizes' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount, openCart } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setMobileOpen(false);
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return products.filter((product) => {
      const labels = [product.name, product.category, product.gender, ...(Object.keys(product.colorHex || {}))];
      return labels.some(label => label?.toLowerCase().includes(query));
    }).slice(0, 6);
  }, [searchQuery]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-blush/20'
            : isHome
            ? 'bg-transparent'
            : 'bg-cream/95 backdrop-blur-md border-b border-blush/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif text-xl md:text-2xl tracking-widest transition-colors ${
                !scrolled && isHome && !mobileOpen ? 'text-cream' : 'text-ink'
              }`}
            >
              AURA
              <span className="block text-[9px] tracking-[0.4em] font-sans font-light -mt-1 opacity-70">
                INTIMATES
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.15em] uppercase font-sans transition-all duration-200 relative group ${
                      !scrolled && isHome
                        ? isActive ? 'text-cream' : 'text-cream/80 hover:text-cream'
                        : isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(prev => !prev)}
                className={`p-2 transition-colors ${
                  !scrolled && isHome ? 'text-cream/80 hover:text-cream' : 'text-ink/60 hover:text-ink'
                }`}
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`relative p-2 transition-colors ${
                  !scrolled && isHome ? 'text-cream/80 hover:text-cream' : 'text-ink/60 hover:text-ink'
                }`}
                aria-label={`Wishlist (${wishlist.length})`}
              >
                <HiOutlineHeart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-blush text-ink text-[9px] font-sans w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`relative p-2 transition-colors ${
                  !scrolled && isHome ? 'text-cream/80 hover:text-cream' : 'text-ink/60 hover:text-ink'
                }`}
                aria-label={`Cart (${itemCount})`}
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 bg-blush text-ink text-[9px] font-sans w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2 transition-colors ${
                  !scrolled && isHome && !mobileOpen ? 'text-cream' : 'text-ink'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-cream backdrop-blur-md overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-4 border-b border-blush/30 font-serif text-2xl transition-colors ${
                        isActive ? 'text-ink' : 'text-ink/50 hover:text-ink'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1 }}
                className="pt-6"
              >
                <NavLink to="/contact" className="block py-2 text-xs tracking-widest uppercase font-sans text-ink/50 hover:text-ink transition-colors">Contact</NavLink>
                <NavLink to="/size-guide" className="block py-2 text-xs tracking-widest uppercase font-sans text-ink/50 hover:text-ink transition-colors">Size Guide</NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm px-4 pt-24 pb-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto max-w-4xl rounded-3xl bg-cream shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-blush/20">
                <div>
                  <p className="text-xs tracking-[0.4em] uppercase font-sans text-ink/40">Search Aura</p>
                  <h2 className="font-serif text-2xl text-ink mt-1">Find your perfect piece</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-ink/60 hover:text-ink"
                  aria-label="Close search"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-6">
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-ink/10 bg-cream px-12 py-4 text-sm font-sans text-ink outline-none focus:border-ink/50 focus:ring-2 focus:ring-ink/10"
                    placeholder="Search bras, sets, colors, or collections"
                    aria-label="Search products"
                  />
                </form>
                <div className="mt-6">
                  {searchQuery.trim() ? (
                    searchResults.length > 0 ? (
                      <div className="grid gap-3">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={product.gender === 'men' ? '/shop/men' : product.gender === 'women' ? '/shop/women' : '/plus-sizes'}
                            onClick={() => setSearchOpen(false)}
                            className="group flex items-center gap-4 rounded-3xl border border-blush/20 p-4 transition hover:border-blush/40 hover:bg-blush/10"
                          >
                            <img src={product.images?.[0]} alt={product.name} className="w-20 h-20 rounded-3xl object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-sm text-ink truncate">{product.name}</p>
                              <p className="text-[11px] uppercase tracking-[0.35em] text-ink/50">{product.category} • {product.gender}</p>
                            </div>
                            <span className="text-sm font-medium text-ink">KES {product.price.toLocaleString()}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-ink/50">No results found for “{searchQuery}”. Try another term.</p>
                    )
                  ) : (
                    <p className="text-sm text-ink/60">Search by product name, color, collection, or gender to discover matching items.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
