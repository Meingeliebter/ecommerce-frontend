import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { filterProducts } from "../utils/helpers";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import { useI18n } from "../context/I18nContext";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { t } = useI18n();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const results = useMemo(
    () => filterProducts(products, { q: query }),
    [products, query]
  );

  return (
    <>
      <SEO title={`${t.search.title}: ${query}`} />

      <div className="py-6">
        <h1 className="font-serif text-3xl font-bold">{t.search.title}</h1>
        {query && (
          <p className="mt-2 text-neutral-500">
            {results.length} {t.catalog.results} &ldquo;{query}&rdquo;
          </p>
        )}

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-neutral-500">
              {t.search.noResults} &ldquo;{query}&rdquo;
            </p>
            <p className="mt-2 text-sm text-neutral-400">{t.search.suggestions}</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
