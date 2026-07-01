import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext();

function loadWishlist() {
  try {
    const saved = localStorage.getItem("beauty-wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem("beauty-wishlist", JSON.stringify(items));
  }, [items]);

  const toggleWishlist = useCallback((productId) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId) => items.includes(productId),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
