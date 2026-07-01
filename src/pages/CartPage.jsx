import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useI18n } from "../context/I18nContext";
import { formatPrice } from "../utils/helpers";
import Button from "../components/ui/Button";

export default function CartPage() {
  const { items, removeFromCart, updateQty, subtotal, setIsOpen } = useCart();
  const { t, locale } = useI18n();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-neutral-500">{t.cart.empty}</p>
        <Link to="/productos">
          <Button>{t.cart.continueShopping}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="mb-6 font-serif text-3xl font-bold">{t.cart.title}</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.cartKey}
              className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <p className="text-xs text-neutral-400">{item.brand}</p>
                <p className="font-medium">{item.name}</p>
                {item.variantLabel && (
                  <p className="text-sm text-neutral-500">{item.variantLabel}</p>
                )}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.cartKey, item.qty - 1)}
                      className="rounded-full border px-2 py-0.5 text-sm"
                      disabled={item.qty <= 1}
                    >
                      −
                    </button>
                    <span className="tabular-nums">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.cartKey, item.qty + 1)}
                      className="rounded-full border px-2 py-0.5 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-sm text-error hover:underline"
                  >
                    {t.cart.remove}
                  </button>
                </div>
              </div>
              <p className="font-semibold tabular-nums">
                {formatPrice(item.price * item.qty, locale)}
              </p>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex justify-between text-lg font-bold">
            <span>{t.cart.total}</span>
            <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
          </div>
          <Link to="/checkout" className="mt-4 block">
            <Button className="w-full" size="lg">{t.cart.checkout}</Button>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-2 w-full text-center text-sm text-primary hover:underline"
          >
            Abrir carrito lateral
          </button>
        </aside>
      </div>
    </div>
  );
}
