import { useCart } from "../context/CartContext";

export default function CartPage() {
    const { items, removeFromCart, total } = useCart();

    if (items.length === 0) {
    return <p className="text-gray-500 text-center py-12">Tu carrito está vacío.</p>;
    }

    return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
        <div className="space-y-3">
        {items.map((item) => (
            <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 bg-white"
            > 
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                Cantidad: {item.qty} × ${item.price}
                </p>
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
            >
                Quitar
            </button>
            </div>
        ))}
        </div>
        <div className="mt-6 text-right text-xl font-bold">
        Total: ${total.toFixed(2)}
        </div>
    </div>
    );
}