import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/cart/CartSidebar';

import Home from './pages/Home';
import ShopWomen from './pages/ShopWomen';
import ShopMen from './pages/ShopMen';
import PlusSizes from './pages/PlusSizes';
import NewArrivals from './pages/NewArrivals';
import Sustainability from './pages/Sustainability';
import SizeGuide from './pages/SizeGuide';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingReturns from './pages/ShippingReturns';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop/women" element={<ShopWomen />} />
          <Route path="/shop/men" element={<ShopMen />} />
          <Route path="/plus-sizes" element={<PlusSizes />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/returns" element={<ShippingReturns />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen">
              <p className="font-serif text-6xl text-ink/20 mb-4">404</p>
              <p className="font-sans text-sm text-ink/40">Page not found</p>
            </div>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const whatsappLink = 'https://wa.me/254742184483?text=Hi%20Aura%20Intimates%2C%20I%20need%20help%20with%20my%20order.';

  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
            <CartSidebar />
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="md:hidden fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-sans font-medium text-white shadow-2xl shadow-green-600/30"
              aria-label="Chat on WhatsApp"
            >
              <span className="text-base leading-none">◉</span>
              Chat
            </a>
            <Toaster position="bottom-right" />
          </div>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
