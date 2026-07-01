import { useState, useEffect } from "react";
import { fetchProducts, fetchBlogPosts } from "../api/products";
import SEO from "../components/SEO";
import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromotionsBanner from "../components/home/PromotionsBanner";
import TrustBar from "../components/home/TrustBar";
import BlogPreview from "../components/home/BlogPreview";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchBlogPosts()])
      .then(([prods, posts]) => {
        setProducts(prods);
        setBlogPosts(posts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO
        title="Cosméticos y Cuidado Personal"
        description="Descubre skincare, maquillaje y fragancias en Beauty. Belleza accesible con envío gratis +50€."
      />

      <div className="space-y-10 py-6 lg:space-y-14 lg:py-8">
        <HeroBanner />
        <TrustBar />
        <CategoryGrid />

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <FeaturedProducts products={products} />
            <PromotionsBanner products={products} />
          </>
        )}

        {!loading && <BlogPreview posts={blogPosts} />}
      </div>
    </>
  );
}
