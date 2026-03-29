"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Trash2, Image as ImageIcon, Film, Loader2, Search, Plus } from "lucide-react";

export default function MediaManagerPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.assets) setAssets(data.assets);
    } catch (error) {
      console.error("Failed to fetch media", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        await fetchMedia();
      } else {
        alert("Error al subir el archivo.");
      }
    } catch (error) {
      console.error("Error uploading", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar permanentemente este archivo?")) return;
    
    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setAssets(assets.filter(a => a.id !== id));
      } else {
        alert("No se pudo eliminar el archivo.");
      }
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  const filteredAssets = assets.filter(a => filter === "all" ? true : a.type === filter);

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-novaleap-navy flex items-center gap-3">
            <ImageIcon className="text-novaleap-aqua" /> Archivos Multimedia
          </h1>
          <p className="text-novaleap-navy/60 mt-2 text-sm leading-relaxed">
            Sube y administra las imágenes y videos alojados en Cloudflare R2 para NovaLeap.
          </p>
        </div>
        
        <div className="flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept="image/*,video/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-novaleap-navy border border-transparent rounded-xl shadow-sm text-sm font-bold tracking-wide text-white hover:bg-novaleap-navy/90 hover:shadow-md transition-all disabled:opacity-70 group"
          >
            {isUploading ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : (
              <UploadCloud className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
            )}
            {isUploading ? "Subiendo..." : "Subir Archivo"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 inline-flex shadow-sm">
        {["all", "image", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === type ? "bg-novaleap-navy text-white shadow-sm" : "text-novaleap-navy/60 hover:text-novaleap-navy hover:bg-novaleap-navy/5"
            }`}
          >
            {type === "all" ? "Todos" : type}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-novaleap-aqua">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="text-center py-20 bg-white border border-novaleap-navy/10 border-dashed rounded-3xl">
          <div className="mx-auto w-16 h-16 bg-novaleap-navy/5 rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8 text-novaleap-navy/30" />
          </div>
          <h3 className="text-lg font-bold text-novaleap-navy">No hay archivos</h3>
          <p className="text-novaleap-navy/50 mt-1 max-w-sm mx-auto text-sm">
            Comienza subiendo tu primera imagen o video para usar en el sitio.
          </p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 inline-flex border border-slate-200 bg-white shadow-sm hover:bg-slate-50 items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-slate-700 transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            Subir ahora
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredAssets.map((asset) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white border border-novaleap-navy/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center">
                  {asset.type === "image" ? (
                    <img 
                      src={asset.url} 
                      alt={asset.name} 
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Film className="w-12 h-12 mb-2" />
                      <span className="text-xs uppercase font-bold text-slate-500">Video</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <button
                       onClick={() => handleDelete(asset.id)}
                       className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                       title="Eliminar"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                </div>
                
                <div className="p-4 border-t border-novaleap-navy/5">
                  <p className="text-sm font-bold text-novaleap-navy truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-novaleap-navy/50 uppercase font-semibold">{asset.type}</p>
                    <p className="text-xs text-novaleap-navy/40 font-mono">
                      {asset.size ? (asset.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
