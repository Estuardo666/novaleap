"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon,
  Video,
  Upload,
  Loader2,
  Check,
  RefreshCw,
  Home,
  Users,
  Compass,
  HeartHandshake,
  Stethoscope,
  Globe,
} from "lucide-react";

interface SiteMediaEntry {
  id: string;
  key: string;
  url: string;
  type: string;
  label: string;
  page: string;
}

const PAGE_TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "who-we-are", label: "Who We Are", icon: Users },
  { id: "our-approach", label: "Our Approach", icon: Compass },
  { id: "parents", label: "Parents", icon: HeartHandshake },
  { id: "services", label: "Services", icon: Stethoscope },
  { id: "global", label: "Global", icon: Globe },
];

export default function SiteMediaPage() {
  const [entries, setEntries] = useState<SiteMediaEntry[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [successKey, setSuccessKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingKeyRef = useRef<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/site-media");
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Error fetching site media:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplace = (key: string) => {
    pendingKeyRef.current = key;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const key = pendingKeyRef.current;
    if (!file || !key) return;

    setUploadingKey(key);

    try {
      // 1. Upload file to R2
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");
      const uploadData = await uploadRes.json();

      // 2. Update the site media entry to point to the new URL
      const updateRes = await fetch(
        `/api/site-media/${encodeURIComponent(key)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: uploadData.media.url }),
        }
      );

      if (!updateRes.ok) throw new Error("Update failed");

      // 3. Update local state
      setEntries((prev) =>
        prev.map((entry) =>
          entry.key === key ? { ...entry, url: uploadData.media.url } : entry
        )
      );

      setSuccessKey(key);
      setTimeout(() => setSuccessKey(null), 2500);
    } catch (err) {
      console.error("Error replacing media:", err);
      alert("Error al reemplazar el archivo. Intente de nuevo.");
    } finally {
      setUploadingKey(null);
      pendingKeyRef.current = null;
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filteredEntries = entries.filter((e) => e.page === activeTab);

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-novaleap-navy flex items-center gap-3">
            <ImageIcon className="text-novaleap-aqua" /> Contenido del Sitio
          </h1>
          <p className="text-novaleap-navy/60 mt-2 text-sm leading-relaxed">
            Cambia las imágenes y videos de cada página. Los cambios se aplican
            inmediatamente en el sitio público.
          </p>
        </div>
        <button
          onClick={fetchMedia}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-novaleap-navy/5 text-novaleap-navy/70 rounded-xl hover:bg-novaleap-navy/10 transition-colors text-sm font-medium"
        >
          <RefreshCw size={16} />
          Refrescar
        </button>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-2 shadow-[0_2px_12px_rgb(0,0,0,0.04)] border border-novaleap-navy/5">
        {PAGE_TABS.map((tab) => {
          const Icon = tab.icon;
          const count = entries.filter((e) => e.page === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-novaleap-navy text-white shadow-md shadow-novaleap-navy/20"
                  : "text-novaleap-navy/60 hover:text-novaleap-navy hover:bg-novaleap-navy/5"
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-novaleap-navy/10 text-novaleap-navy/50"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-novaleap-aqua">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-20 bg-white border border-novaleap-navy/10 border-dashed rounded-3xl">
          <p className="text-novaleap-navy/50 text-sm">
            No hay archivos multimedia asignados a esta página.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-novaleap-navy/10 overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group"
              >
                {/* Preview */}
                <div className="aspect-video bg-slate-50 relative overflow-hidden flex items-center justify-center">
                  {entry.type === "video" ? (
                    <div className="w-full h-full flex items-center justify-center bg-novaleap-navy/5">
                      <Video
                        size={48}
                        className="text-novaleap-navy/20"
                      />
                      <span className="absolute bottom-2 left-2 text-xs bg-novaleap-navy/80 text-white px-2 py-1 rounded-lg">
                        VIDEO
                      </span>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.url}
                      alt={entry.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}

                  {/* Overlay with replace button */}
                  <div className="absolute inset-0 bg-novaleap-navy/0 group-hover:bg-novaleap-navy/40 transition-colors duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleReplace(entry.key)}
                      disabled={uploadingKey === entry.key}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 bg-white text-novaleap-navy px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploadingKey === entry.key ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Subiendo...
                        </>
                      ) : successKey === entry.key ? (
                        <>
                          <Check size={16} className="text-emerald-500" />
                          ¡Actualizado!
                        </>
                      ) : (
                        <>
                          <Upload size={16} />
                          Cambiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 border-t border-novaleap-navy/5">
                  <p className="text-sm font-bold text-novaleap-navy">
                    {entry.label}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-novaleap-navy/50 font-mono truncate max-w-[70%]" title={entry.key}>
                      {entry.key}
                    </p>
                    <span
                      className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-full ${
                        entry.type === "video"
                          ? "bg-novaleap-purple/10 text-novaleap-purple"
                          : "bg-novaleap-aqua/10 text-novaleap-aqua"
                      }`}
                    >
                      {entry.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
