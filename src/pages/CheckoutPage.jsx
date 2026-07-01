import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import { formatPrice } from "../utils/helpers";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";

export default function CheckoutPage() {
  const { t, locale } = useI18n();
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "España",
    phone: "",
    shipping: "standard",
    payment: "card",
  });

  const stepLabels = [
    t.checkout.step1,
    t.checkout.step2,
    t.checkout.step3,
    t.checkout.step4,
  ];

  const shippingCost = form.shipping === "express" ? 9.99 : subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shippingCost;

  const updateForm = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handlePlaceOrder = () => {
    const id = `BTY-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(id);
    addOrder({
      id,
      date: new Date().toISOString(),
      items: [...items],
      total,
      status: "processing",
      shipping: form.shipping,
      address: `${form.address}, ${form.city} ${form.zip}`,
    });
    clearCart();
    setStep(3);
  };

  if (items.length === 0 && step < 3) {
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
    <>
      <SEO title={t.checkout.title} />

      <div className="py-6">
        <h1 className="mb-8 font-serif text-3xl font-bold">{t.checkout.title}</h1>

        <div className="mb-8 flex items-center justify-between">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    i < step
                      ? "bg-success text-white"
                      : i === step
                      ? "bg-primary text-white"
                      : "bg-neutral-200 text-neutral-500 dark:bg-neutral-700"
                  }`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <span className="mt-1 hidden text-xs sm:block">{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    i < step ? "bg-success" : "bg-neutral-200 dark:bg-neutral-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 0 && (
              <form
                className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(1);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.checkout.firstName} value={form.firstName} onChange={(v) => updateForm("firstName", v)} required />
                  <Field label={t.checkout.lastName} value={form.lastName} onChange={(v) => updateForm("lastName", v)} required />
                </div>
                <Field label={t.checkout.address} value={form.address} onChange={(v) => updateForm("address", v)} required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label={t.checkout.city} value={form.city} onChange={(v) => updateForm("city", v)} required />
                  <Field label={t.checkout.zip} value={form.zip} onChange={(v) => updateForm("zip", v)} required />
                  <Field label={t.checkout.country} value={form.country} onChange={(v) => updateForm("country", v)} required />
                </div>
                <Field label={t.checkout.phone} value={form.phone} onChange={(v) => updateForm("phone", v)} type="tel" required />
                <Button type="submit" className="w-full sm:w-auto">{t.checkout.continue}</Button>
              </form>
            )}

            {step === 1 && (
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                {[
                  { id: "standard", label: t.checkout.standard, price: subtotal >= 50 ? 0 : 4.99 },
                  { id: "express", label: t.checkout.express, price: 9.99 },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      form.shipping === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={form.shipping === opt.id}
                        onChange={() => updateForm("shipping", opt.id)}
                        className="accent-primary"
                      />
                      <span>{opt.label}</span>
                    </div>
                    <span className="font-medium tabular-nums">
                      {opt.price === 0 ? "Gratis" : formatPrice(opt.price, locale)}
                    </span>
                  </label>
                ))}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}>{t.checkout.back}</Button>
                  <Button onClick={() => setStep(2)}>{t.checkout.continue}</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                {[
                  { id: "card", label: t.checkout.card, icon: CreditCard },
                  { id: "paypal", label: t.checkout.paypal, icon: null },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      form.payment === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-neutral-200 dark:border-neutral-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.payment === opt.id}
                      onChange={() => updateForm("payment", opt.id)}
                      className="accent-primary"
                    />
                    {opt.icon && <opt.icon size={20} />}
                    <span>{opt.label}</span>
                  </label>
                ))}

                {form.payment === "card" && (
                  <div className="space-y-3 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800">
                    <Field label="Número de tarjeta" value="" onChange={() => {}} placeholder="4242 4242 4242 4242" />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="MM/AA" value="" onChange={() => {}} placeholder="12/28" />
                      <Field label="CVC" value="" onChange={() => {}} placeholder="123" />
                    </div>
                    <p className="text-xs text-neutral-400">
                      Pagos procesados de forma segura via Stripe. No almacenamos datos de tarjeta.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>{t.checkout.back}</Button>
                  <Button onClick={handlePlaceOrder}>{t.checkout.placeOrder}</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                  <Check size={32} className="text-success" />
                </div>
                <h2 className="font-serif text-2xl font-bold">{t.checkout.orderConfirmed}</h2>
                <p className="mt-2 text-neutral-500">{t.checkout.thankYou}</p>
                <p className="mt-4 text-sm">
                  {t.checkout.orderNumber}: <strong>{orderId}</strong>
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button onClick={() => navigate("/cuenta")}>{t.profile.orders}</Button>
                  <Button variant="outline" onClick={() => navigate("/productos")}>
                    {t.cart.continueShopping}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {step < 3 && (
            <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 lg:sticky lg:top-24">
              <h3 className="mb-4 font-medium">{t.cart.title}</h3>
              <ul className="mb-4 space-y-3">
                {items.map((item) => (
                  <li key={item.cartKey} className="flex gap-3 text-sm">
                    <img src={item.imageUrl} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="line-clamp-1">{item.name}</p>
                      <p className="text-neutral-400">×{item.qty}</p>
                    </div>
                    <span className="tabular-nums">{formatPrice(item.price * item.qty, locale)}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-neutral-100 pt-4 text-sm dark:border-neutral-800">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{t.cart.subtotal}</span>
                  <span className="tabular-nums">{formatPrice(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{t.cart.shipping}</span>
                  <span className="tabular-nums">
                    {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost, locale)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span>{t.cart.total}</span>
                  <span className="tabular-nums">{formatPrice(total, locale)}</span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
      />
    </div>
  );
}
