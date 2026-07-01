import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useI18n } from "../context/I18nContext";
import { formatPrice } from "../utils/helpers";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function ProductCard({ product, showQuickAdd = true }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, locale } = useI18n();
  const inWishlist = isInWishlist(product.id);
  const hasVariants = product.variants?.length > 1;

  const handleAdd = (e) => {
    e.preventDefault();
    if (hasVariants) return;
    addToCart(product);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <Link to={`/productos/${product.category}/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={product.imageUrl || product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && <Badge variant="new">{t.common.new}</Badge>}
            {product.originalPrice && (
              <Badge variant="sale">{t.common.sale}</Badge>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition hover:scale-110 dark:bg-neutral-900/90"
            aria-label={inWishlist ? t.product.removeFromWishlist : t.product.addToWishlist}
          >
            <Heart
              size={18}
              className={inWishlist ? "fill-secondary text-secondary" : "text-neutral-600"}
            />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
            {product.brand}
          </p>
          <h3 className="mb-2 line-clamp-2 font-medium text-neutral-900 dark:text-neutral-100">
            {product.name}
          </h3>
          <div className="mb-3 flex items-center gap-1">
            <Star size={14} className="fill-primary text-primary" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tabular-nums text-neutral-900 dark:text-white">
                {formatPrice(product.price, locale)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through tabular-nums">
                  {formatPrice(product.originalPrice, locale)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {showQuickAdd && !hasVariants && (
        <div className="px-4 pb-4">
          <Button
            size="sm"
            className="w-full"
            onClick={handleAdd}
            aria-label={`${t.product.addToCart}: ${product.name}`}
          >
            <ShoppingBag size={16} />
            {t.product.addToCart}
          </Button>
        </div>
      )}
    </article>
  );
}
