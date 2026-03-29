"use client";

import { motion } from "framer-motion";
import { Layers, ImageIcon, FileText, ArrowUpRight, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const stats = [
    { title: "Servicios Publicados", value: "12", icon: Layers, desc: "Servicios activos en la web" },
    { title: "Archivos Multimedia", value: "145", icon: ImageIcon, desc: "Imágenes y videos en Cloudflare R2" },
    { title: "Secciones Editables", value: "24", icon: FileText, desc: "Bloques de contenido personalizados" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-novaleap-navy">Bienvenido al Gestor de Contenido</h1>
        <p className="text-novaleap-navy/60 mt-2 text-lg">Administra los servicios, imágenes y textos de NovaLeap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-novaleap-navy/5 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-novaleap-aqua/10 rounded-full group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
              <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-novaleap-purple/10 rounded-full group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-sm font-semibold tracking-wide text-novaleap-navy/60 uppercase mb-1">{stat.title}</p>
                  <h3 className="text-4xl font-bold text-novaleap-navy">{stat.value}</h3>
                  <p className="text-sm text-novaleap-navy/40 mt-3">{stat.desc}</p>
                </div>
                <div className="w-12 h-12 bg-novaleap-aqua/10 text-novaleap-aqua rounded-2xl flex items-center justify-center shadow-inner">
                  <Icon size={24} strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-novaleap-navy/5 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-novaleap-navy">Accesos Rápidos</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/media" className="group flex items-center p-4 rounded-2xl border border-novaleap-navy/10 hover:border-novaleap-aqua/50 hover:bg-novaleap-aqua/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-novaleap-aqua/10 text-novaleap-aqua flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <ImageIcon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-novaleap-navy">Galería Media</h4>
                <p className="text-xs text-novaleap-navy/50">Imágenes y videos</p>
              </div>
            </Link>
            
            <Link href="/admin/services" className="group flex items-center p-4 rounded-2xl border border-novaleap-navy/10 hover:border-novaleap-purple/50 hover:bg-novaleap-purple/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-novaleap-purple/10 text-novaleap-purple flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="font-bold text-novaleap-navy">Servicios</h4>
                <p className="text-xs text-novaleap-navy/50">Gestionar catálogo</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Global Action Banner */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[linear-gradient(135deg,#00b7b5_0%,#11224e_100%)] rounded-3xl p-8 shadow-xl text-white overflow-hidden relative flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-novaleap-purple/30 rounded-full blur-3xl -mx-24 -my-24 pointer-events-none mix-blend-screen" />
          <h2 className="text-3xl font-bold mb-3 relative z-10">Crear Contenido</h2>
          <p className="text-novaleap-aqua-50 text-white/80 mb-8 max-w-sm relative z-10">Sube nuevos archivos multimedia para enriquecer las páginas de NovaLeap.</p>
          
          <div className="relative z-10">
            <Link href="/admin/media" className="inline-flex w-max items-center justify-center bg-white text-novaleap-navy hover:bg-white/90 shadow-lg px-6 py-3.5 rounded-2xl font-bold transition-transform hover:scale-105">
              <Plus className="mr-2" size={20} />
              Subir Imagen o Video
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
