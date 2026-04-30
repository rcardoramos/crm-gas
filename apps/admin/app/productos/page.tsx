"use client";

import { useState, useEffect } from "react";
import { type Producto } from "@repo/lib";
import { getProductos, saveProductos } from "../actions/products";

const emptyForm: Omit<Producto, "id"> = {
  nombre: "",
  descripcion: "",
  precio: 0,
  icon: "🟡",
  activo: true,
  destacado: false,
};

const ICONOS = ["🟢", "🔵", "🏭", "🟡", "🔴", "⚡", "🌟", "🎯"];

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Producto, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProductos().then((data) => {
      setProductos(data);
      setLoading(false);
    });
  }, []);

  const persistir = async (nuevosProductos: Producto[]) => {
    setProductos(nuevosProductos);
    await saveProductos(nuevosProductos);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (prod: Producto) => {
    setEditingId(prod.id);
    setForm({ nombre: prod.nombre, descripcion: prod.descripcion, precio: prod.precio, icon: prod.icon, activo: prod.activo, destacado: prod.destacado });
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let nuevos: Producto[];
    if (editingId) {
      nuevos = productos.map(p => p.id === editingId ? { ...p, ...form } : p);
    } else {
      const newId = `prod-${Date.now()}`;
      nuevos = [...productos, { id: newId, ...form }];
    }

    await persistir(nuevos);
    setSaving(false);
    setIsModalOpen(false);
  };

  const handleToggleActivo = async (id: string) => {
    const nuevos = productos.map(p => p.id === id ? { ...p, activo: !p.activo } : p);
    await persistir(nuevos);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este producto? También desaparecerá de la web.")) return;
    const nuevos = productos.filter(p => p.id !== id);
    await persistir(nuevos);
  };

  const inputClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white";
  const labelClass = "block text-[12px] font-semibold text-zinc-600 mb-1";

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Productos</h1>
            <p className="text-[13px] text-zinc-500 mt-1">
              Catálogo visible en la web y app del cliente.{" "}
              <span className="text-emerald-600 font-semibold">
                Los cambios se reflejan en la web automáticamente.
              </span>
            </p>
          </div>
          <button onClick={openNew} className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-700 transition-colors shadow-sm">
            + Agregar Producto
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-zinc-900">{productos.length}</p>
          </div>
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Activos (visibles en web)</p>
            <p className="text-2xl font-bold text-emerald-600">{productos.filter(p => p.activo).length}</p>
          </div>
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Destacados</p>
            <p className="text-2xl font-bold text-amber-500">{productos.filter(p => p.destacado).length}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-zinc-400 py-16 text-[14px]">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {productos.map(prod => (
              <div key={prod.id} className={`bg-white border rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col gap-3 transition-all ${prod.activo ? "border-zinc-200/60" : "border-zinc-100 opacity-50"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-2xl border border-zinc-100 shrink-0">
                    {prod.icon}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-zinc-900 leading-tight">{prod.nombre}</h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{prod.descripcion}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <span className="text-[18px] font-black text-zinc-900">S/ {prod.precio.toFixed(2)}</span>
                  <div className="flex gap-1.5">
                    {prod.destacado && <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">⭐ Destacado</span>}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${prod.activo ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}>
                      {prod.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button onClick={() => openEdit(prod)} className="flex-1 h-8 rounded-lg border border-zinc-200 text-[12px] font-bold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleToggleActivo(prod.id)} className={`flex-1 h-8 rounded-lg border text-[12px] font-bold transition-colors ${prod.activo ? "border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100" : "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"}`}>
                    {prod.activo ? "Desactivar" : "Activar"}
                  </button>
                  <button onClick={() => handleDelete(prod.id)} className="w-8 h-8 rounded-lg border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center text-[13px]">
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 fade-in duration-200 text-zinc-900">
            <div className="flex items-center justify-between p-5 border-b border-zinc-100">
              <div>
                <h2 className="text-[16px] font-bold text-zinc-900">{editingId ? "Editar Producto" : "Nuevo Producto"}</h2>
                <p className="text-[12px] text-zinc-500 mt-0.5">Se mostrará en la web y app del cliente</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 text-lg">×</button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Ícono</label>
                <div className="flex gap-2 flex-wrap">
                  {ICONOS.map(ic => (
                    <button key={ic} type="button" onClick={() => setForm(prev => ({ ...prev, icon: ic }))}
                      className={`w-10 h-10 rounded-xl text-xl border-2 transition-all ${form.icon === ic ? "border-zinc-900 bg-zinc-100" : "border-zinc-200 hover:border-zinc-400"}`}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Nombre *</label>
                <input name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Ej. Balón Normal 10kg" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Breve descripción..." rows={2}
                  className="w-full px-3 py-2 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white placeholder:text-zinc-400 resize-none" />
              </div>

              <div>
                <label className={labelClass}>Precio (S/) *</label>
                <input name="precio" type="number" required min={0} step={0.50} value={form.precio} onChange={handleChange} className={inputClass} />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} className="w-4 h-4 accent-zinc-900" />
                  <span className="text-[13px] text-zinc-700 font-medium">Activo (visible en web)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} className="w-4 h-4 accent-amber-500" />
                  <span className="text-[13px] text-zinc-700 font-medium">⭐ Destacado</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-10 rounded-lg border border-zinc-200 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 h-10 rounded-lg bg-zinc-900 text-white text-[13px] font-bold hover:bg-zinc-700 transition-colors disabled:opacity-60">
                  {saving ? "Guardando..." : editingId ? "Guardar Cambios" : "Crear Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
