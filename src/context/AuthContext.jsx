import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Dummy auth check simulating a logged-in user if token exists
  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Simulate delay and set dummy user data
    setTimeout(() => {
      setUser({
        email: "admin@coaching.com",
        name: "Admin User",
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
