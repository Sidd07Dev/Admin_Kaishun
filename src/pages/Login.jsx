import React, { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Dummy credentials for testing
    const dummyAdmin = {
      email: "admin@coaching.com",
      password: "admin123",
      name: "Admin User",
      token: "dummy-admin-token",
    };

    setTimeout(() => {
      if (email === dummyAdmin.email && password === dummyAdmin.password) {
        login({ email: dummyAdmin.email, name: dummyAdmin.name }, dummyAdmin.token);
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <> 
      <Helmet>
      <title>Admin Login | Kaishun Institute Of Study</title>
      <meta name="description" content="Secure login for administrators to access and manage the coaching portal." />
      <meta name="keywords" content="admin login, coaching admin, Kaishun login,Kaishun admin login, portal access, dashboard login" />
    </Helmet>
    <div className="min-h-screen flex flex-col md:flex-row">
  
      {/* Left Illustration */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--account-password-security-lock-design-development-illustrations-2757111.png?f=webp" className="max-w-full h-auto"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-6 py-10 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Admin Login
          </h2>
          <p className="text-center text-sm text-gray-500">
            Welcome back, please login to your admin dashboard
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 text-sm p-2 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@coaching.com"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute top-9 right-3 cursor-pointer text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 px-4 rounded transition`}
            >
              {loading ? "Logging in..." : <><LogIn size={18} /> Login</>}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
