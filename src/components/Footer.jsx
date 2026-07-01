import { Link } from "react-router-dom";
import { Share2, Users, Mail } from "lucide-react";
import { useI18n } from "../context/I18nContext";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">{t.brand}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Cosméticos y cuidado personal con ingredientes de calidad. Belleza accesible para todos.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-full bg-neutral-800 p-2 hover:bg-primary" aria-label="Instagram">
                <Share2 size={18} />
              </a>
              <a href="#" className="rounded-full bg-neutral-800 p-2 hover:bg-primary" aria-label="Facebook">
                <Users size={18} />
              </a>
              <a href="#" className="rounded-full bg-neutral-800 p-2 hover:bg-primary" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Tienda
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/productos/skincare" className="hover:text-primary">Skincare</Link></li>
              <li><Link to="/productos/makeup" className="hover:text-primary">Maquillaje</Link></li>
              <li><Link to="/productos/hair" className="hover:text-primary">Cabello</Link></li>
              <li><Link to="/productos/fragrance" className="hover:text-primary">Fragancias</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Ayuda
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Envíos y devoluciones</a></li>
              <li><a href="#" className="hover:text-primary">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-primary">Contacto</a></li>
              <li><a href="#" className="hover:text-primary">Términos y condiciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="mb-3 text-sm text-neutral-400">
              Recibe ofertas exclusivas y consejos de belleza.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none"
                aria-label="Email para newsletter"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {t.brand}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
