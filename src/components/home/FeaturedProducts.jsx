import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../ProductCard";
import { useI18n } from "../../context/I18nContext";

export default function FeaturedProducts({ products, title }) {
  const { t } = useI18n();
  const featured = products.filter((p) => p.isBestseller || p.isNew).slice(0, 4);

  return (
    <section aria-labelledby="featured-heading">
      <div className="mb-6 flex items-end justify-between">
        <h2 id="featured-heading" className="font-serif text-2xl font-semibold">
          {title || t.home.featured}
        </h2>
        <Link
          to="/productos"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {t.home.viewAll}
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
