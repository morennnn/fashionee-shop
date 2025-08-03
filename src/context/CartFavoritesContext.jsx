import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartFavoritesContext = createContext();

export const CartFavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const toggleFavorite = useCallback((product) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const updateCartItem = useCallback((product, quantity) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === product.id);
      if (quantity === 0) {
        if (index >= 0) {
          return prev.filter(item => item.id !== product.id);
        }
        return prev;
      }
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity };
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === product.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const favoriteCount = favorites.length;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartFavoritesContext.Provider value={{
      favorites,
      cartItems,
      favoriteCount,
      cartCount,
      toggleFavorite,
      updateCartItem,
      addToCart,
    }}>
      {children}
    </CartFavoritesContext.Provider>
  );
};

export const useCartFavorites = () => useContext(CartFavoritesContext);
