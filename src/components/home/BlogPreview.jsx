import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useI18n } from "../../context/I18nContext";

export default function BlogPreview({ posts }) {
  const { t } = useI18n();

  return (
    <section aria-labelledby="blog-heading">
      <div className="mb-6 flex items-end justify-between">
        <h2 id="blog-heading" className="font-serif text-2xl font-semibold">
          {t.home.blogPreview}
        </h2>
        <Link
          to="/blog"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {t.home.viewAll}
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
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
                <h3 className="mt-2 font-serif text-lg font-semibold line-clamp-2 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-neutral-400">
                  <Clock size={12} />
                  {post.readTime}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
