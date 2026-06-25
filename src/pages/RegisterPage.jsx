import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const res = await api.post("/auth/register", form);
        login(res.data.token);
        navigate("/");
    } catch {
        setError("No se pudo registrar. Verifica los datos.");
    }
    };

    return (
    <div className="max-w-md mx-auto mt-12">
        <h1 className="text-2xl font-bold mb-6">Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            required
            minLength={6}
            />
        </div>
        <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
            Registrarme
        </button>
        </form>
    </div>
    );
}