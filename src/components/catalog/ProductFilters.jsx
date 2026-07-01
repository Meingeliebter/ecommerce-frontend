import { useI18n } from "../../context/I18nContext";
import { BRANDS, SKIN_TONES, SKIN_TYPES, CATEGORIES } from "../../data/mockData";

export default function ProductFilters({ filters, onChange, onClear }) {
  const { t } = useI18n();

  const toggleArrayFilter = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const activeCount = [
    filters.brand?.length,
    filters.skinType?.length,
    filters.skinTone?.length,
    filters.minPrice != null || filters.maxPrice != null ? 1 : 0,
  ].filter(Boolean).reduce((a, b) => a + (typeof b === "number" ? b : 1), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {t.catalog.filters}
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary-dark">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-xs text-primary hover:underline">
            {t.catalog.clearAll}
          </button>
        )}
      </div>

      <FilterGroup title={t.catalog.category}>
        {CATEGORIES.filter((c) => c.id !== "offers").map((cat) => (
          <label key={cat.id} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="category"
              checked={filters.category === cat.id}
              onChange={() => onChange({ ...filters, category: cat.id })}
              className="accent-primary"
            />
            {cat.name}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title={t.catalog.brand}>
        {BRANDS.map((brand) => (
          <label key={brand} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.brand?.includes(brand)}
              onChange={() => toggleArrayFilter("brand", brand)}
              className="accent-primary"
            />
            {brand}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title={t.catalog.skinType}>
        {SKIN_TYPES.map((st) => (
          <label key={st} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.skinType?.includes(st)}
              onChange={() => toggleArrayFilter("skinType", st)}
              className="accent-primary"
            />
            {st}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title={t.catalog.skinTone}>
        {SKIN_TONES.map((st) => (
          <label key={st} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.skinTone?.includes(st)}
              onChange={() => toggleArrayFilter("skinTone", st)}
              className="accent-primary"
            />
            {st}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title={t.catalog.price}>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            min={0}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            min={0}
          />
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}
