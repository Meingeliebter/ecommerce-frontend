import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const location = useLocation();

    const tabs = [
    { path: "/", label: "Inicio" },
    { path: "/cart", label: `Carrito (${items.length})` },
    ];

    const isActive = (path) => location.pathname === path;

    return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-indigo-600">
            🛒 Mi Tienda
        </Link>

        <div className="flex gap-2">
            {tabs.map((tab) => (
            <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive(tab.path)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                {tab.label}
            </Link>
            ))}
        </div>

        <div className="flex items-center gap-3">
            {user ? (
            <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                onClick={logout}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100"
                >
                Salir
                </button>
            </>
            ) : (
            <>
                <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive("/login")
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                >
                Iniciar sesión
                </Link>
                <Link
                to="/register"
                className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                Registrarse
                </Link>
            </>
            )}
        </div>
        </div>
    </nav>
    );
}