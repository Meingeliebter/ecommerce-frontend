import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { useWishlist } from "../context/WishlistContext";
import { useI18n } from "../context/I18nContext";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

export default function WishlistPage() {
  const { t } = useI18n();
  const { items: wishlistIds } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((all) => setProducts(all.filter((p) => wishlistIds.includes(p.id))))
      .finally(() => setLoading(false));
  }, [wishlistIds]);

  return (
    <>
      <SEO title={t.wishlist.title} />

      <div className="py-6">
        <h1 className="mb-8 font-serif text-3xl font-bold">{t.wishlist.title}</h1>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-4 text-neutral-500">{t.wishlist.empty}</p>
            <Link to="/productos">
              <Button>{t.wishlist.browse}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
