import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/mockData";
import { useI18n } from "../../context/I18nContext";

export default function CategoryGrid() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="mb-6 font-serif text-2xl font-semibold">
        {t.home.categories}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/productos/${cat.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-primary hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-primary"
          >
            <span className="mb-2 text-3xl transition group-hover:scale-110" aria-hidden="true">
              {cat.icon}
            </span>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
