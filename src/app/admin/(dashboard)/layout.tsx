"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Image as ImageIcon,
  FileImage,
  Settings, 
  Users, 
  Menu, 
  X,
  LogOut,
  Bell,
  Search
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Contenido", href: "/admin/site-media", icon: FileImage },
  { name: "Multimedia", href: "/admin/media", icon: ImageIcon },
  { name: "Servicios", href: "/admin/services", icon: Users },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform lg:translate-x-0 lg:static lg:w-72 transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-novaleap-navy/5 bg-novaleap-navy/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-novaleap-aqua rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              NL
            </div>
            <span className="text-xl font-bold text-novaleap-navy">NovaAdmin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-novaleap-navy/70 p-2 rounded-lg hover:bg-novaleap-navy/10">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-novaleap-navy text-white shadow-md shadow-novaleap-navy/20"
                    : "text-novaleap-navy/60 hover:bg-novaleap-navy/5 hover:text-novaleap-navy"
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-novaleap-navy/40"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link 
            href="/admin/login" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div className="relative hidden md:block w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-novaleap-navy/30" />
              </div>
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="block w-full pl-10 pr-3 py-2 border border-novaleap-navy/10 rounded-xl bg-slate-50 focus:bg-white focus:border-novaleap-aqua focus:ring-1 focus:ring-novaleap-aqua sm:text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-novaleap-navy/50 hover:text-novaleap-navy hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-novaleap-aqua/10 border-2 border-white shadow-sm flex items-center justify-center text-novaleap-aqua font-bold overflow-hidden">
               {/* User Avatar */}
               <span>AD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-10 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
