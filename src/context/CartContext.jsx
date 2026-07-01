import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCartKey } from "../utils/helpers";

const CartContext = createContext();
const FREE_SHIPPING_THRESHOLD = 50;

function loadCart() {
  try {
    const saved = localStorage.getItem("beauty-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [lastRemoved, setLastRemoved] = useState(null);

  useEffect(() => {
    localStorage.setItem("beauty-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, variant, qty = 1) => {
    const variantData = variant || product.variants?.[0];
    const cartKey = getCartKey(product.id, variantData?.id);
    const price = variantData?.price ?? product.price;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          cartKey,
          id: product.id,
          variantId: variantData?.id,
          name: product.name,
          brand: product.brand,
          variantLabel: variantData?.label,
          price,
          imageUrl: product.imageUrl || product.images?.[0],
          qty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((cartKey) => {
    setItems((prev) => {
      const item = prev.find((i) => i.cartKey === cartKey);
      if (item) {
        setLastRemoved(item);
        setTimeout(() => setLastRemoved(null), 5000);
      }
      return prev.filter((i) => i.cartKey !== cartKey);
    });
  }, []);

  const undoRemove = useCallback(() => {
    if (lastRemoved) {
      setItems((prev) => [...prev, lastRemoved]);
      setLastRemoved(null);
    }
  }, [lastRemoved]);

  const updateQty = useCallback((cartKey, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.cartKey === cartKey ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        undoRemove,
        updateQty,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        setIsOpen,
        lastRemoved,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountToFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
