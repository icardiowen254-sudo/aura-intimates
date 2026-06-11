import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state.includes(action.id)
        ? state.filter(id => id !== action.id)
        : [...state, action.id];
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(reducer, [], () => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (product) => {
    const inWishlist = wishlist.includes(product.id);
    dispatch({ type: 'TOGGLE', id: product.id });
    toast(inWishlist ? 'Removed from wishlist' : 'Saved to wishlist ♡', {
      style: { background: '#FAF6F0', color: '#1A1614', border: '1px solid #E8B4B8', fontFamily: 'Manrope', fontSize: '13px' },
    });
  };

  const isWishlisted = (id) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
