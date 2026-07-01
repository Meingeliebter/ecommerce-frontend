import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { fetchBlogPost, fetchProducts } from "../api/products";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { useI18n } from "../context/I18nContext";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const [post, setPost] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchBlogPost(slug), fetchProducts()])
      .then(([p, all]) => {
        setPost(p);
        if (p?.productIds) {
          setProducts(all.filter((prod) => p.productIds.includes(prod.id)));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="skeleton mx-auto mt-8 h-96 max-w-3xl rounded-2xl" />;
  }

  if (!post) {
    return <p className="py-16 text-center text-neutral-500">Artículo no encontrado</p>;
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} image={post.imageUrl} type="article" />

      <nav aria-label="Breadcrumb" className="py-4 text-sm text-neutral-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
          <ChevronRight size={14} />
          <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          <ChevronRight size={14} />
          <li className="line-clamp-1 text-neutral-900 dark:text-neutral-200">{post.title}</li>
        </ol>
      </nav>

      <article className="mx-auto max-w-3xl pb-12">
        <span className="text-xs font-medium uppercase tracking-wide text-primary">
          {post.category}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold lg:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-neutral-400">
          <Clock size={14} />
          {post.readTime} · {new Date(post.date).toLocaleDateString("es-ES")}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl">
          <img src={post.imageUrl} alt="" className="w-full object-cover" />
        </div>

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
              {para}
            </p>
          ))}
        </div>
      </article>

      {products.length > 0 && (
        <section className="border-t border-neutral-200 py-10 dark:border-neutral-800">
          <h2 className="mb-6 font-serif text-2xl font-semibold">{t.blog.shoppable}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
