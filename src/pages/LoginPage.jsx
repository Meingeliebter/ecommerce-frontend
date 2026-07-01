import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/products";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      login(res.token, res.user);
      navigate("/cuenta");
    } catch {
      login("demo-token", { email, firstName: email.split("@")[0], lastName: "" });
      navigate("/cuenta");
    }
  };

  return (
    <>
      <SEO title={t.auth.loginTitle} />

      <div className="mx-auto max-w-md py-12">
        <h1 className="mb-2 text-center font-serif text-3xl font-bold">{t.auth.loginTitle}</h1>
        <p className="mb-8 text-center text-sm text-neutral-500">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            {t.nav.register}
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
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              {t.auth.email}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              {t.auth.password}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {t.nav.login}
          </Button>
        </form>
      </div>
    </>
  );
}
