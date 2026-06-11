import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ScrollReveal from '../components/animations/ScrollReveal';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const wishlisted = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <ScrollReveal className="mb-12">
          <p className="section-subtitle">Saved</p>
          <h1 className="section-title">Your Wishlist</h1>
          {wishlisted.length > 0 && (
            <p className="font-sans text-sm text-ink/40 mt-2">{wishlisted.length} piece{wishlisted.length !== 1 ? 's' : ''} saved</p>
          )}
        </ScrollReveal>

        {wishlisted.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 border border-blush/30 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">♡</div>
            <h3 className="font-serif text-3xl text-ink/50 mb-3">Your wishlist is empty</h3>
            <p className="font-sans text-sm text-ink/40 mb-8">Save your favourite pieces and find them here.</p>
            <Link to="/shop/women" className="btn-primary inline-block">Start Browsing</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {wishlisted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
