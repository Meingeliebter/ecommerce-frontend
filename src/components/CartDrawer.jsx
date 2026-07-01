import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/I18nContext";
import { formatPrice } from "../utils/helpers";
import Drawer from "./ui/Drawer";
import Button from "./ui/Button";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromCart,
    undoRemove,
    updateQty,
    subtotal,
    amountToFreeShipping,
    lastRemoved,
  } = useCart();
  const { t, locale } = useI18n();

  const shippingProgress = Math.min(100, (subtotal / 50) * 100);

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} title={t.cart.title}>
      {lastRemoved && (
        <div className="mx-4 mt-3 flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-2 text-sm dark:bg-neutral-800">
          <span>Producto eliminado</span>
          <button onClick={undoRemove} className="font-medium text-primary underline">
            {t.cart.undo}
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <ShoppingBag size={48} className="mb-4 text-neutral-300" />
          <p className="mb-4 text-neutral-500">{t.cart.empty}</p>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            {t.cart.continueShopping}
          </Button>
        </div>
      ) : (
        <>
          <div className="px-4 py-3">
            <div className="mb-1 flex justify-between text-xs text-neutral-500">
              {amountToFreeShipping > 0 ? (
                <span>
                  {t.cart.freeShipping.replace("{amount}", formatPrice(amountToFreeShipping, locale))}
                </span>
              ) : (
                <span className="text-success">{t.cart.freeShippingReached}</span>
              )}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          <ul className="flex-1 space-y-3 px-4 py-2">
            {items.map((item) => (
              <li
                key={item.cartKey}
                className="flex gap-3 rounded-xl border border-neutral-100 p-3 dark:border-neutral-800"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-xs text-neutral-400">{item.brand}</p>
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.variantLabel && (
                    <p className="text-xs text-neutral-500">{item.variantLabel}</p>
                  )}
                  <p className="mt-auto font-semibold tabular-nums">
                    {formatPrice(item.price * item.qty, locale)}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-neutral-400 hover:text-error"
                    aria-label={t.cart.remove}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700">
                    <button
                      onClick={() => updateQty(item.cartKey, item.qty - 1)}
                      className="p-1 hover:text-primary"
                      aria-label="Reducir cantidad"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.cartKey, item.qty + 1)}
                      className="p-1 hover:text-primary"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-neutral-500">{t.cart.subtotal}</span>
              <span className="font-medium tabular-nums">{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="font-serif text-lg font-semibold">{t.cart.total}</span>
              <span className="text-lg font-bold tabular-nums">{formatPrice(subtotal, locale)}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full" size="lg">
                {t.cart.checkout}
              </Button>
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}
