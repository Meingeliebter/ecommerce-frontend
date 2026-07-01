import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Star, ShoppingBag, ChevronRight } from "lucide-react";
import { fetchProductBySlug, fetchProducts } from "../api/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useI18n } from "../context/I18nContext";
import { formatPrice } from "../utils/helpers";
import SEO, { ProductSchema } from "../components/SEO";
import ProductCard from "../components/ProductCard";
import Button from "../components/ui/Button";

export default function ProductDetailPage() {
  const { category, slug } = useParams();
  const { t, locale } = useI18n();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProductBySlug(slug), fetchProducts()])
      .then(([p, all]) => {
        setProduct(p);
        if (p?.variants?.length) setSelectedVariant(p.variants[0]);
        setRelated(all.filter((item) => item.category === category && item.slug !== slug).slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, [slug, category]);

  if (loading) {
    return (
      <div className="grid gap-8 py-6 lg:grid-cols-2">
        <div className="skeleton aspect-square rounded-2xl" />
        <div className="space-y-4">
          <div className="skeleton h-8 w-3/4 rounded" />
          <div className="skeleton h-6 w-1/2 rounded" />
          <div className="skeleton h-32 w-full rounded" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="py-16 text-center text-neutral-500">Producto no encontrado</p>;
  }

  const price = selectedVariant?.price ?? product.price;
  const stock = selectedVariant?.stock ?? product.stock;
  const inWishlist = isInWishlist(product.id);
  const images = product.images?.length ? product.images : [product.imageUrl];

  const tabs = [
    { id: "description", label: t.product.description, content: product.description },
    { id: "ingredients", label: t.product.ingredients, content: product.ingredients },
    { id: "howToUse", label: t.product.howToUse, content: product.howToUse },
    { id: "reviews", label: t.product.reviews, content: null },
  ];

  return (
    <>
      <SEO title={product.name} description={product.description} image={images[0]} type="product" />
      <ProductSchema product={product} />

      <nav aria-label="Breadcrumb" className="py-4 text-sm text-neutral-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
          <ChevronRight size={14} />
          <li><Link to={`/productos/${category}`} className="hover:text-primary capitalize">{category}</Link></li>
          <ChevronRight size={14} />
          <li className="text-neutral-900 dark:text-neutral-200">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 pb-12 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-3 aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${
                    i === activeImage ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">
            {product.brand}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-neutral-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-neutral-500">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold tabular-nums">{formatPrice(price, locale)}</span>
            {product.originalPrice && (
              <span className="text-lg text-neutral-400 line-through tabular-nums">
                {formatPrice(product.originalPrice, locale)}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm">
            {stock > 10 ? (
              <span className="text-success">{t.product.inStock}</span>
            ) : stock > 0 ? (
              <span className="text-error">{t.product.lowStock.replace("{count}", stock)}</span>
            ) : (
              <span className="text-error">{t.product.outOfStock}</span>
            )}
          </p>

          {product.variants?.length > 1 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">
                {selectedVariant?.color ? "Tono" : "Tamaño"}: {selectedVariant?.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) =>
                  v.color ? (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`h-10 w-10 rounded-full border-2 transition ${
                        selectedVariant?.id === v.id
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-neutral-200"
                      }`}
                      style={{ backgroundColor: v.color }}
                      title={v.label}
                      aria-label={v.label}
                    />
                  ) : (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selectedVariant?.id === v.id
                          ? "border-primary bg-primary/10 text-primary-dark"
                          : "border-neutral-200 hover:border-primary"
                      }`}
                    >
                      {v.label}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={stock === 0}
              onClick={() => addToCart(product, selectedVariant)}
            >
              <ShoppingBag size={20} />
              {t.product.addToCart}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(product.id)}
              aria-label={inWishlist ? t.product.removeFromWishlist : t.product.addToWishlist}
            >
              <Heart
                size={20}
                className={inWishlist ? "fill-secondary text-secondary" : ""}
              />
            </Button>
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-800" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary-dark"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300" role="tabpanel">
              {activeTab === "reviews" ? (
                product.reviews?.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((r) => (
                      <div key={r.id} className="rounded-xl border border-neutral-100 p-4 dark:border-neutral-800">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{r.author}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < r.rating ? "fill-primary text-primary" : "text-neutral-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2">{r.text}</p>
                        <p className="mt-1 text-xs text-neutral-400">{r.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-400">Aún no hay reseñas para este producto.</p>
                )
              ) : (
                tabs.find((tab) => tab.id === activeTab)?.content
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-neutral-200 py-10 dark:border-neutral-800">
          <h2 className="mb-6 font-serif text-2xl font-semibold">{t.product.related}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
