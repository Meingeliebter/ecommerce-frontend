import { Link } from "react-router-dom";
import { useI18n } from "../../context/I18nContext";
import { formatPrice } from "../../utils/helpers";
import Button from "../ui/Button";

export default function PromotionsBanner({ products }) {
  const { t, locale } = useI18n();
  const onSale = products.filter((p) => p.originalPrice).slice(0, 3);

  if (onSale.length === 0) return null;

  return (
    <section
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/30 via-neutral-50 to-primary/20 p-6 dark:from-secondary/10 dark:via-neutral-900 dark:to-primary/10 sm:p-8"
      aria-labelledby="promo-heading"
    >
      <h2 id="promo-heading" className="mb-6 font-serif text-2xl font-semibold">
        {t.home.promotions}
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {onSale.map((p) => {
          const discount = Math.round((1 - p.price / p.originalPrice) * 100);
          return (
            <Link
              key={p.id}
              to={`/productos/${p.category}/${p.slug}`}
              className="flex items-center gap-4 rounded-2xl bg-white/80 p-4 backdrop-blur transition hover:shadow-md dark:bg-neutral-900/80"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-xs text-neutral-400">{p.brand}</p>
                <p className="font-medium line-clamp-1">{p.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-bold text-error">-{discount}%</span>
                  <span className="font-semibold tabular-nums">
                    {formatPrice(p.price, locale)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <Link to="/productos?sort=price-asc">
          <Button variant="outline">{t.home.viewOffers}</Button>
        </Link>
      </div>
    </section>
  );
}
