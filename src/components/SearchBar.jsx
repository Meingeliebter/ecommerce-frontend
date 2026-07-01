import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { searchSuggestions } from "../utils/helpers";
import { POPULAR_SEARCHES } from "../data/mockData";

export default function SearchBar({ products, blogPosts }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("beauty-recent-searches") || "[]");
    } catch {
      return [];
    }
  });
  const ref = useRef(null);

  const suggestions = searchSuggestions(products, query, blogPosts);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const goSearch = (q) => {
    if (!q.trim()) return;
    const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("beauty-recent-searches", JSON.stringify(updated));
    setOpen(false);
    setQuery("");
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <div ref={ref} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && goSearch(query)}
          placeholder={t.nav.search}
          className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm transition focus:border-primary focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:focus:bg-neutral-900"
          aria-label={t.nav.search}
          aria-expanded={open}
          aria-haspopup="listbox"
        />
      </div>

      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl animate-scale-in dark:border-neutral-700 dark:bg-neutral-900"
          role="listbox"
        >
          {query.length >= 2 && suggestions.products.length > 0 && (
            <div className="border-b border-neutral-100 p-2 dark:border-neutral-800">
              {suggestions.products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => goSearch(p.name)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <img src={p.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-neutral-400">{p.brand}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && recent.length > 0 && (
            <div className="p-3">
              <p className="mb-2 text-xs font-medium uppercase text-neutral-400">
                {t.search.recent}
              </p>
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => goSearch(r)}
                  className="block w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-3">
              <p className="mb-2 text-xs font-medium uppercase text-neutral-400">
                {t.search.popular}
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => goSearch(s)}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs hover:bg-secondary/30 dark:bg-neutral-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
