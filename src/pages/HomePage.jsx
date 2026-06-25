import { useState, useEffect } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    api.get("/products")
        .then(res => setProducts(res.data))
        .catch(() => setError("No se pudieron cargar los productos"))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-12">Cargando...</div>;
    if (error)   return <div className="text-red-500 text-center py-12">{error}</div>;
    
    return (
    <div>
        <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </div>
    );
}
