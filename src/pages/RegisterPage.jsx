import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/products";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser(form);
      login(res.token, { ...form, email: form.email });
      navigate("/cuenta");
    } catch {
      login("demo-token", form);
      navigate("/cuenta");
    }
  };

  return (
    <>
      <SEO title={t.auth.registerTitle} />

      <div className="mx-auto max-w-md py-12">
        <h1 className="mb-2 text-center font-serif text-3xl font-bold">{t.auth.registerTitle}</h1>
        <p className="mb-8 text-center text-sm text-neutral-500">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            {t.nav.login}
          </Link>
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
        >
          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                {t.auth.firstName}
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                {t.auth.lastName}
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              {t.auth.email}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              {t.auth.password}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {t.nav.register}
          </Button>
        </form>
      </div>
    </>
  );
}
