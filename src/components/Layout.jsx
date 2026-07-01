import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchProducts, fetchBlogPosts } from "../api/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function Layout() {
  const [products, setProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchBlogPosts()]).then(([p, b]) => {
      setProducts(p);
      setBlogPosts(b);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar products={products} blogPosts={blogPosts} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
