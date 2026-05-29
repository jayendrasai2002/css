import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/exams");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please check your server connection.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setEmail("student@example.com");
    setPassword("demo123");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "student@example.com",
          password: "demo123"
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/exams");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please check your server connection.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-32 right-32 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute -bottom-20 left-20 w-96 h-96 rounded-full bg-cyan-500 blur-3xl"></div>
        <div className="absolute top-40 left-96 w-64 h-64 rounded-full bg-green-500 blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F87619b67a1e74c6b899b073b86d99a13%2F2382b516c5954eee818efa7eb15a5ef9?format=webp&width=200&height=200"
              alt="Xpay IT Exams"
              className="h-24 w-auto mx-auto mb-6"
            />
            <p className="text-primary text-sm font-semibold">Professional IT Certifications</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Welcome Back
          </h2>
          <p className="text-white/70 text-center mb-10">
            Sign in to start your professional journey
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5 mb-8">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : (
                <>
                  Sign In Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-white/60 font-medium">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Try Demo Account
          </button>

          {/* Security Badge */}
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-xs font-semibold text-green-300">
                100% Secure & Encrypted
              </p>
            </div>
            <p className="text-xs text-green-300/70">
              Enterprise-grade security with PCI DSS compliance
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-xs font-semibold text-white mb-3">Demo Credentials:</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Email:</span>
                <span className="text-xs font-mono text-primary">student@example.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Password:</span>
                <span className="text-xs font-mono text-primary">demo123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-xs">
            Professional IT Certifications
          </p>
          <p className="text-white/40 text-xs mt-2">
            Xpay © 2024 | <a href="#" className="hover:text-primary transition-colors">Privacy</a> | <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </p>
        </div>
      </div>
    </div>
  );
}
