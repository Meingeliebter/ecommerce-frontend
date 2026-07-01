import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { fetchBlogPosts } from "../api/products";
import SEO from "../components/SEO";
import { useI18n } from "../context/I18nContext";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

export default function BlogPage() {
  const { t } = useI18n();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title={t.blog.title} description={t.blog.subtitle} />

      <div className="py-6">
        <h1 className="font-serif text-3xl font-bold">{t.blog.title}</h1>
        <p className="mt-2 text-neutral-500">{t.blog.subtitle}</p>

        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">
                      {post.category}
                    </span>
                    <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-neutral-500 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-neutral-400">
                      <Clock size={12} />
                      {post.readTime}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
