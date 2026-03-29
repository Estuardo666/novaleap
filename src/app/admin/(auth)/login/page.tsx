"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login for now
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-novaleap-aqua/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-novaleap-purple/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 overflow-hidden relative z-10 p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-novaleap-aqua/10 text-novaleap-aqua mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-novaleap-navy">NovaAdmin</h2>
          <p className="text-sm text-novaleap-navy/60 mt-2">Introduce tus credenciales para acceder al panel de control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-novaleap-navy/80 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-novaleap-navy/40" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-novaleap-navy/10 rounded-xl focus:ring-novaleap-aqua focus:border-novaleap-aqua sm:text-sm bg-white/50 backdrop-blur-sm transition-all outline-none"
                placeholder="admin@novaleap.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-novaleap-navy/80 mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-novaleap-navy/40" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-novaleap-navy/10 rounded-xl focus:ring-novaleap-aqua focus:border-novaleap-aqua sm:text-sm bg-white/50 backdrop-blur-sm transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold tracking-wide text-white bg-novaleap-navy hover:bg-novaleap-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-novaleap-navy transition-colors disabled:opacity-70 group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
