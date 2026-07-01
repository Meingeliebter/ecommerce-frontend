import api from "./axios";
import { PRODUCTS, BLOG_POSTS } from "../data/mockData";

function normalizeProduct(p) {
  return {
    ...p,
    images: p.images || (p.imageUrl ? [p.imageUrl] : []),
    variants: p.variants || [{ id: `${p.id}-default`, label: "Estándar", price: p.price, stock: p.stock ?? 10 }],
    rating: p.rating ?? 4.5,
    reviewCount: p.reviewCount ?? 0,
    reviews: p.reviews ?? [],
    skinType: p.skinType ?? [],
    skinTone: p.skinTone ?? [],
    brand: p.brand ?? "Beauty",
    category: p.category ?? "skincare",
    slug: p.slug ?? p.name?.toLowerCase().replace(/\s+/g, "-"),
  };
}

export async function fetchProducts() {
  try {
    const res = await api.get("/products");
    const data = Array.isArray(res.data) ? res.data : res.data?.content ?? [];
    if (data.length > 0) return data.map(normalizeProduct);
  } catch {
    /* fallback to mock */
  }
  return PRODUCTS.map(normalizeProduct);
}

export async function fetchProductBySlug(slug) {
  try {
    const res = await api.get(`/products/${slug}`);
    if (res.data) return normalizeProduct(res.data);
  } catch {
    /* fallback */
  }
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product ? normalizeProduct(product) : null;
}

export async function fetchBlogPosts() {
  return BLOG_POSTS;
}

export async function fetchBlogPost(slug) {
  return BLOG_POSTS.find((b) => b.slug === slug) ?? null;
}

export async function loginUser(credentials) {
  const res = await api.post("/auth/login", credentials);
  return res.data;
}

export async function registerUser(data) {
  const res = await api.post("/auth/register", data);
  return res.data;
}
