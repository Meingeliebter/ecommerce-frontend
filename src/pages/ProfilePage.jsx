import { Link } from "react-router-dom";
import { Package, Star, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import { formatPrice } from "../utils/helpers";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";

export default function ProfilePage() {
  const { t, locale } = useI18n();
  const { user, orders, loyaltyPoints, logout } = useAuth();

  if (!user) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-neutral-500">Inicia sesión para ver tu cuenta</p>
        <Link to="/login">
          <Button>{t.nav.login}</Button>
        </Link>
      </div>
    );
  }

  const statusLabels = {
    processing: "Procesando",
    shipped: "Enviado",
    delivered: "Entregado",
  };

  return (
    <>
      <SEO title={t.profile.title} />

      <div className="py-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
              <User size={28} className="text-primary-dark" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-neutral-500">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={logout}>
            {t.nav.logout}
          </Button>
        </div>

        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 p-6">
          <div className="flex items-center gap-3">
            <Star size={24} className="text-primary-dark" />
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{t.profile.loyalty}</p>
              <p className="text-2xl font-bold">
                {loyaltyPoints} {t.profile.points}
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold">
            <Package size={20} />
            {t.profile.orders}
          </h2>

          {orders.length === 0 ? (
            <p className="rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500 dark:border-neutral-800">
              {t.profile.noOrders}
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-neutral-400">
                        {new Date(order.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US")}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark">
                      {statusLabels[order.status] || order.status}
                    </span>
                    <span className="font-bold tabular-nums">{formatPrice(order.total, locale)}</span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-neutral-500">
                    {order.items.map((item) => (
                      <li key={item.cartKey}>
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
