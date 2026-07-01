import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [orders, setOrders] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(250);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          email: payload.sub,
          firstName: payload.firstName || "Usuario",
          lastName: payload.lastName || "",
        });
      } catch {
        setUser({ email: "usuario@beauty.com", firstName: "Usuario", lastName: "" });
      }
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const saved = localStorage.getItem("beauty-orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const addOrder = (order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem("beauty-orders", JSON.stringify(updated));
      return updated;
    });
    setLoyaltyPoints((p) => p + Math.floor(order.total));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, orders, addOrder, loyaltyPoints }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
