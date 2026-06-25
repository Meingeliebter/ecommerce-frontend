import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const res = await api.post("/auth/login", { email, password });
        login(res.data.token);
        navigate("/");
    } catch {
        setError("Email o contraseña incorrectos.");
    }
    };

    return (
    <div className="max-w-md mx-auto mt-12">
        <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
            Entrar
        </button>
        </form>
    </div>
    );
}