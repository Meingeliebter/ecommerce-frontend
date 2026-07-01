import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useI18n } from "../context/I18nContext";
import SearchBar from "./SearchBar";

export default function Navbar({ products = [], blogPosts = [] }) {
  const { user, logout } = useAuth();
  const { itemCount, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { dark, toggleTheme } = useTheme();
  const { t, locale, changeLocale } = useI18n();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { path: "/", label: t.nav.home },
    { path: "/productos", label: t.nav.products },
    { path: "/blog", label: t.nav.blog },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-8">
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          {t.brand}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(link.path)
                  ? "bg-primary/15 text-primary-dark"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 md:block">
          <SearchBar products={products} blogPosts={blogPosts} />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => changeLocale(locale === "es" ? "en" : "es")}
            className="hidden rounded-full p-2 text-neutral-600 hover:bg-neutral-100 sm:block dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label="Cambiar idioma"
          >
            <Globe size={20} />
            <span className="sr-only">{locale.toUpperCase()}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label={dark ? "Modo claro" : "Modo oscuro"}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/wishlist"
            className="relative rounded-full p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label={t.nav.wishlist}
          >
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="relative rounded-full p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label={t.nav.cart}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <Link
              to="/cuenta"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-neutral-100 sm:flex dark:hover:bg-neutral-800"
            >
              <User size={18} />
              <span className="max-w-[100px] truncate">{user.firstName || user.email}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark sm:block"
            >
              {t.nav.login}
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-neutral-100 px-4 py-2 md:hidden dark:border-neutral-800">
        <SearchBar products={products} blogPosts={blogPosts} />
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-neutral-200 bg-white px-4 py-4 lg:hidden dark:border-neutral-800 dark:bg-neutral-950"
          aria-label="Menú móvil"
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
            <button
              onClick={() => changeLocale(locale === "es" ? "en" : "es")}
              className="flex-1 rounded-lg border py-2 text-sm"
            >
              {locale === "es" ? "English" : "Español"}
            </button>
            {user ? (
              <>
                <Link
                  to="/cuenta"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg border py-2 text-center text-sm"
                >
                  {t.nav.account}
                </Link>
                <button onClick={logout} className="flex-1 rounded-lg border py-2 text-sm text-error">
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg bg-primary py-2 text-center text-sm text-white"
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
