export function formatPrice(amount, locale = "es") {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function getCartKey(productId, variantId) {
  return `${productId}-${variantId || "default"}`;
}

export function filterProducts(products, filters) {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.brand?.length) {
    result = result.filter((p) => filters.brand.includes(p.brand));
  }
  if (filters.skinType?.length) {
    result = result.filter((p) =>
      filters.skinType.some((st) => p.skinType?.includes(st))
    );
  }
  if (filters.skinTone?.length) {
    result = result.filter((p) =>
      filters.skinTone.some((st) => p.skinTone?.includes(st))
    );
  }
  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "bestseller":
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}

export function searchSuggestions(products, query, blogPosts) {
  if (!query || query.length < 2) return { products: [], categories: [], blog: [] };

  const q = query.toLowerCase();
  const matchedProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
    .slice(0, 4);

  const matchedBlog = blogPosts
    .filter((b) => b.title.toLowerCase().includes(q))
    .slice(0, 2);

  return { products: matchedProducts, blog: matchedBlog };
}
