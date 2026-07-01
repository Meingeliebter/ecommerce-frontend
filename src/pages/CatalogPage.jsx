import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { fetchProducts } from "../api/products";
import { filterProducts } from "../utils/helpers";
import { CATEGORIES } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/catalog/ProductFilters";
import SEO from "../components/SEO";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import { useI18n } from "../context/I18nContext";

export default function CatalogPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useI18n();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filters = useMemo(
    () => ({
      category: category || searchParams.get("category") || null,
      brand: searchParams.getAll("brand"),
      skinType: searchParams.getAll("skinType"),
      skinTone: searchParams.getAll("skinTone"),
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null,
      sort: searchParams.get("sort") || "relevance",
      q: searchParams.get("q") || null,
    }),
    [category, searchParams]
  );

  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);

  const categoryName =
    CATEGORIES.find((c) => c.slug === category || c.id === filters.category)?.name ||
    t.catalog.title;

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set("category", newFilters.category);
    newFilters.brand?.forEach((b) => params.append("brand", b));
    newFilters.skinType?.forEach((s) => params.append("skinType", s));
    newFilters.skinTone?.forEach((s) => params.append("skinTone", s));
    if (newFilters.minPrice != null) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice != null) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.sort && newFilters.sort !== "relevance") params.set("sort", newFilters.sort);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const activeChips = [
    ...(filters.brand || []).map((b) => ({ key: "brand", value: b, label: b })),
    ...(filters.skinType || []).map((s) => ({ key: "skinType", value: s, label: s })),
    ...(filters.skinTone || []).map((s) => ({ key: "skinTone", value: s, label: s })),
  ];

  return (
    <>
      <SEO title={categoryName} description={`Explora ${categoryName} en Beauty.`} />

      <div className="py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">{categoryName}</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {filtered.length} {t.catalog.results}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ ...filters, sort: e.target.value })}
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              aria-label={t.catalog.sortBy}
            >
              <option value="relevance">{t.catalog.relevance}</option>
              <option value="price-asc">{t.catalog.priceAsc}</option>
              <option value="price-desc">{t.catalog.priceDesc}</option>
              <option value="newest">{t.catalog.newest}</option>
              <option value="bestseller">{t.catalog.bestseller}</option>
              <option value="rating">{t.catalog.rating}</option>
            </select>

            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm lg:hidden dark:border-neutral-700"
            >
              <SlidersHorizontal size={16} />
              {t.catalog.filters}
            </button>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                onClick={() => {
                  const updated = {
                    ...filters,
                    [chip.key]: filters[chip.key].filter((v) => v !== chip.value),
                  };
                  updateFilters(updated);
                }}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-dark"
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
            <button onClick={clearFilters} className="text-xs text-neutral-500 underline">
              {t.catalog.clearAll}
            </button>
          </div>
        )}

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <ProductFilters
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
              />
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="py-16 text-center text-neutral-500">{t.catalog.noResults}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-6 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold">{t.catalog.filters}</h3>
              <button onClick={() => setFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <ProductFilters
              filters={filters}
              onChange={(f) => {
                updateFilters(f);
              }}
              onClear={clearFilters}
            />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-primary py-3 font-medium text-white"
            >
              {filtered.length} {t.catalog.results}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
