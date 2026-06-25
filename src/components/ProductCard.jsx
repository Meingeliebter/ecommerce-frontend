import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
const { addToCart } = useCart();

return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
    <div className="aspect-square bg-gray-100 rounded-md mb-3 overflow-hidden">
        {product.imageUrl ? (
        <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
        />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
        Sin imagen
            </div>
        )}
        </div>
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
        {product.description}
        </p>
        <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-indigo-600">
            ${product.price}
        </span>
        <button
            onClick={() => addToCart(product)}
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
        >
            Agregar
        </button>
        </div>
    </div>
    );
}