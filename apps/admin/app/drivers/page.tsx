"use client";

import { useState } from "react";

type Driver = {
  id: string;
  nombre: string;
  telefono: string;
  sede: string;
  estado: "activo" | "ocupado" | "fuera_de_servicio";
  carga_actual: number;
  pedidos_hoy: number;
  vehiculo: string;
  placa: string;
};

const MOCK_DRIVERS: Driver[] = [
  { id: "1", nombre: "Pedro L.", telefono: "999-123-456", sede: "Lima Norte", estado: "activo", carga_actual: 2, pedidos_hoy: 12, vehiculo: "Moto", placa: "FRC-123" },
  { id: "2", nombre: "Jorge M.", telefono: "988-765-432", sede: "Lima Sur", estado: "ocupado", carga_actual: 1, pedidos_hoy: 8, vehiculo: "Furgoneta", placa: "A1-B2" },
  { id: "3", nombre: "Carlos S.", telefono: "977-111-222", sede: "Lima Norte", estado: "fuera_de_servicio", carga_actual: 0, pedidos_hoy: 5, vehiculo: "Moto", placa: "XYZ-999" },
];

type Entrega = {
  id: string;
  fecha: string;
  cliente: string;
  direccion: string;
  producto: string;
  total: number;
  estado: "entregado" | "no_entregado";
  pago: string;
};

const MOCK_HISTORIAL: Record<string, Entrega[]> = {
  "1": [
    { id: "E001", fecha: "Hoy 14:32", cliente: "Juan Pérez", direccion: "Av. Principal 123", producto: "Balón 10kg", total: 45, estado: "entregado", pago: "Efectivo" },
    { id: "E002", fecha: "Hoy 12:10", cliente: "María Gómez", direccion: "Calle Los Cedros 45", producto: "Balón 15kg", total: 65, estado: "entregado", pago: "Yape" },
    { id: "E003", fecha: "Hoy 10:45", cliente: "Luis Torres", direccion: "Jr. Pinos 890", producto: "Balón 10kg", total: 45, estado: "no_entregado", pago: "Efectivo" },
    { id: "E004", fecha: "Ayer 17:20", cliente: "Rosa Mendoza", direccion: "Urb. Las Flores Mz A", producto: "Balón 45kg", total: 135, estado: "entregado", pago: "Plin" },
    { id: "E005", fecha: "Ayer 15:05", cliente: "Carlos Ruiz", direccion: "Av. Universitaria 450", producto: "Balón 10kg", total: 45, estado: "entregado", pago: "Efectivo" },
  ],
  "2": [
    { id: "E006", fecha: "Hoy 13:50", cliente: "Ana Silva", direccion: "Jr. Independencia 234", producto: "Balón 15kg", total: 65, estado: "entregado", pago: "Yape" },
    { id: "E007", fecha: "Hoy 11:30", cliente: "Pedro Castro", direccion: "Calle Real 56", producto: "Balón 10kg", total: 45, estado: "entregado", pago: "Efectivo" },
    { id: "E008", fecha: "Ayer 16:40", cliente: "Sofía Rios", direccion: "Mz C Lt 8", producto: "Balón 45kg", total: 135, estado: "no_entregado", pago: "Efectivo" },
  ],
  "3": [
    { id: "E009", fecha: "Ayer 14:00", cliente: "Miguel Ángel", direccion: "Jr. Lima 100", producto: "Balón 10kg", total: 45, estado: "entregado", pago: "Efectivo" },
    { id: "E010", fecha: "Ayer 11:00", cliente: "Carmen López", direccion: "Av. Perú 789", producto: "Balón 15kg", total: 65, estado: "entregado", pago: "Plin" },
  ],
};

const estadoColors: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  ocupado: "bg-orange-50 text-orange-700 border border-orange-200",
  fuera_de_servicio: "bg-zinc-100 text-zinc-500 border border-zinc-200",
};

const estadoLabels: Record<string, string> = {
  activo: "🟢 Disponible",
  ocupado: "🟠 En ruta",
  fuera_de_servicio: "⚫ Fuera de servicio",
};

const emptyForm = {
  nombre: "",
  telefono: "",
  sede: "Lima Norte",
  vehiculo: "Moto",
  placa: "",
};

const inputClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white placeholder:text-zinc-400";
const selectClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white";
const labelClass = "block text-[12px] font-semibold text-zinc-600 mb-1";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [detailDriver, setDetailDriver] = useState<Driver | null>(null);
  const [historialDriver, setHistorialDriver] = useState<Driver | null>(null);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (d: Driver) => {
    setEditingId(d.id);
    setForm({ nombre: d.nombre, telefono: d.telefono, sede: d.sede, vehiculo: d.vehiculo, placa: d.placa });
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // TODO: Supabase insert/update cuando esté configurado:
    // if (editingId) { await supabase.from('drivers').update(form).eq('id', editingId); }
    // else { await supabase.from('drivers').insert({ ...form, estado: 'activo', carga_actual: 0, pedidos_hoy: 0 }); }

    setTimeout(() => {
      if (editingId) {
        setDrivers(prev => prev.map(d => d.id === editingId ? { ...d, ...form } : d));
        if (detailDriver?.id === editingId) setDetailDriver(prev => prev ? { ...prev, ...form } : null);
      } else {
        setDrivers(prev => [...prev, {
          id: String(Date.now()),
          ...form,
          estado: "activo",
          carga_actual: 0,
          pedidos_hoy: 0,
        }]);
      }
      setSaving(false);
      setIsModalOpen(false);
    }, 500);
  };

  const handleChangeEstado = (id: string, nuevoEstado: Driver["estado"]) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, estado: nuevoEstado } : d));
    setDetailDriver(prev => prev?.id === id ? { ...prev, estado: nuevoEstado } : prev);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este driver del sistema?")) return;
    setDrivers(prev => prev.filter(d => d.id !== id));
    setDetailDriver(null);
  };

  const disponibles = drivers.filter(d => d.estado === "activo").length;
  const enRuta = drivers.filter(d => d.estado === "ocupado").length;

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Drivers</h1>
            <p className="text-[13px] text-zinc-500 mt-1">Gestión de flota, disponibilidad y carga de trabajo.</p>
          </div>
          <button
            onClick={openNew}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-700 transition-colors shadow-sm"
          >
            + Agregar Driver
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Total Drivers</p>
            <p className="text-2xl font-bold text-zinc-900">{drivers.length}</p>
          </div>
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Disponibles</p>
            <p className="text-2xl font-bold text-emerald-600">{disponibles}</p>
          </div>
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">En Ruta</p>
            <p className="text-2xl font-bold text-orange-500">{enRuta}</p>
          </div>
        </div>

        {/* Cards de drivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map(driver => (
            <div key={driver.id} className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 p-5 flex flex-col">
              {/* Header card */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 font-black text-[16px]">
                    {driver.nombre.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-zinc-900">{driver.nombre}</h3>
                    <p className="text-[12px] text-zinc-500">{driver.sede}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${estadoColors[driver.estado]}`}>
                  {estadoLabels[driver.estado]}
                </span>
              </div>

              {/* Stats del driver */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100 mb-4">
                <div>
                  <span className="text-[12px] text-zinc-500 block mb-0.5">En ruta</span>
                  <span className="text-lg font-bold text-zinc-900">{driver.carga_actual} <span className="text-[11px] font-normal text-zinc-400">pedidos</span></span>
                </div>
                <div>
                  <span className="text-[12px] text-zinc-500 block mb-0.5">Completados hoy</span>
                  <span className="text-lg font-bold text-zinc-900">{driver.pedidos_hoy}</span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-auto space-y-1.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-zinc-400">Teléfono</span>
                  <span className="text-zinc-700 font-medium">{driver.telefono}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-zinc-400">Vehículo</span>
                  <span className="text-zinc-700 font-medium">{driver.vehiculo} · {driver.placa}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setHistorialDriver(driver)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 text-zinc-700 py-2 rounded-lg text-[12px] font-bold hover:bg-zinc-100 transition-colors"
                >
                  📊 Historial
                </button>
                <button
                  onClick={() => setDetailDriver(driver)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 text-zinc-700 py-2 rounded-lg text-[12px] font-bold hover:bg-zinc-100 transition-colors"
                >
                  Ver Detalle
                </button>
                <button
                  onClick={() => openEdit(driver)}
                  className="w-9 h-9 bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-lg text-[13px] font-bold hover:bg-zinc-100 transition-colors flex items-center justify-center"
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL AGREGAR / EDITAR DRIVER ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 fade-in duration-200 text-zinc-900">
            <div className="flex items-center justify-between p-5 border-b border-zinc-100">
              <div>
                <h2 className="text-[16px] font-bold">{editingId ? "Editar Driver" : "Nuevo Driver"}</h2>
                <p className="text-[12px] text-zinc-500 mt-0.5">Datos del conductor de la flota</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 text-lg">×</button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={labelClass}>Nombre completo *</label>
                  <input name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Ej. Pedro López" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono *</label>
                  <input name="telefono" required type="tel" value={form.telefono} onChange={handleChange} placeholder="999 999 999" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sede</label>
                  <select name="sede" value={form.sede} onChange={handleChange} className={selectClass}>
                    <option>Lima Norte</option>
                    <option>Lima Sur</option>
                    <option>Lima Centro</option>
                    <option>Lima Este</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tipo de Vehículo</label>
                  <select name="vehiculo" value={form.vehiculo} onChange={handleChange} className={selectClass}>
                    <option>Moto</option>
                    <option>Furgoneta</option>
                    <option>Camioneta</option>
                    <option>Bicicleta</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Placa *</label>
                  <input name="placa" required value={form.placa} onChange={handleChange} placeholder="ABC-123" className={inputClass} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-10 rounded-lg border border-zinc-200 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 h-10 rounded-lg bg-zinc-900 text-white text-[13px] font-bold hover:bg-zinc-700 transition-colors disabled:opacity-60">
                  {saving ? "Guardando..." : editingId ? "Guardar Cambios" : "Agregar Driver"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL DETALLE DRIVER ── */}
      {detailDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setDetailDriver(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 animate-in zoom-in-95 fade-in duration-200 text-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 font-black text-xl">
                  {detailDriver.nombre.charAt(0)}
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-zinc-900">{detailDriver.nombre}</h2>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${estadoColors[detailDriver.estado]}`}>
                    {estadoLabels[detailDriver.estado]}
                  </span>
                </div>
              </div>
              <button onClick={() => setDetailDriver(null)} className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 text-lg">×</button>
            </div>

            <div className="p-5 space-y-4">
              {/* Info */}
              <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Información</p>
                {[
                  { label: "Teléfono", value: detailDriver.telefono },
                  { label: "Sede", value: detailDriver.sede },
                  { label: "Vehículo", value: `${detailDriver.vehiculo} · ${detailDriver.placa}` },
                  { label: "Pedidos hoy", value: String(detailDriver.pedidos_hoy) },
                  { label: "En ruta", value: `${detailDriver.carga_actual} pedidos` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-[13px]">
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-semibold text-zinc-900">{value}</span>
                  </div>
                ))}
              </div>

              {/* Cambiar estado */}
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Cambiar Estado</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["activo", "ocupado", "fuera_de_servicio"] as const).map(estado => (
                    <button
                      key={estado}
                      onClick={() => handleChangeEstado(detailDriver.id, estado)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                        detailDriver.estado === estado
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
                      }`}
                    >
                      {estado === "activo" ? "Disponible" : estado === "ocupado" ? "En Ruta" : "Inactivo"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-100 flex gap-2">
              <button
                onClick={() => { setDetailDriver(null); openEdit(detailDriver); }}
                className="flex-1 h-9 rounded-lg border border-zinc-200 text-[13px] font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(detailDriver.id)}
                className="flex-1 h-9 rounded-lg bg-red-50 border border-red-200 text-[13px] font-bold text-red-600 hover:bg-red-100 transition-colors"
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── MODAL HISTORIAL DE ENTREGAS ── */}
      {historialDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setHistorialDriver(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200 text-zinc-900 max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 font-black">
                  {historialDriver.nombre.charAt(0)}
                </div>
                <div>
                  <h2 className="text-[16px] font-bold">Historial de Entregas</h2>
                  <p className="text-[12px] text-zinc-500">{historialDriver.nombre} · {historialDriver.sede}</p>
                </div>
              </div>
              <button onClick={() => setHistorialDriver(null)} className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 text-lg">×</button>
            </div>

            {/* Resumen rápido */}
            {(() => {
              const entregas = MOCK_HISTORIAL[historialDriver.id] || [];
              const entregadas = entregas.filter(e => e.estado === "entregado").length;
              const fallidas = entregas.filter(e => e.estado === "no_entregado").length;
              const total = entregas.reduce((acc, e) => e.estado === "entregado" ? acc + e.total : acc, 0);
              return (
                <div className="grid grid-cols-3 gap-3 p-4 border-b border-zinc-100 shrink-0">
                  <div className="bg-zinc-50 rounded-xl p-3 text-center">
                    <span className="text-[11px] text-zinc-500 block">Entregas</span>
                    <span className="text-[20px] font-black text-emerald-600">{entregadas}</span>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-3 text-center">
                    <span className="text-[11px] text-zinc-500 block">Fallidas</span>
                    <span className="text-[20px] font-black text-red-500">{fallidas}</span>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-3 text-center">
                    <span className="text-[11px] text-zinc-500 block">Recaudado</span>
                    <span className="text-[16px] font-black text-zinc-900">S/ {total}</span>
                  </div>
                </div>
              );
            })()}

            {/* Lista de entregas */}
            <div className="overflow-y-auto flex-1 p-4 space-y-3">
              {(MOCK_HISTORIAL[historialDriver.id] || []).length === 0 ? (
                <div className="text-center py-10 text-zinc-400">
                  <span className="text-4xl block mb-3">📦</span>
                  <p className="text-[13px]">Sin historial de entregas</p>
                </div>
              ) : (
                (MOCK_HISTORIAL[historialDriver.id] || []).map(entrega => (
                  <div key={entrega.id} className="bg-zinc-50 rounded-xl p-4 flex items-start gap-3 border border-zinc-100">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5 ${
                      entrega.estado === "entregado" ? "bg-emerald-100" : "bg-red-100"
                    }`}>
                      {entrega.estado === "entregado" ? "✓" : "✗"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-bold text-zinc-900 truncate">{entrega.cliente}</span>
                        <span className="text-[12px] font-black text-zinc-900 shrink-0">S/ {entrega.total}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">{entrega.direccion}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-md">🛢️ {entrega.producto}</span>
                          <span className="text-[10px] text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-md">💳 {entrega.pago}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400">{entrega.fecha}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-zinc-100 shrink-0">
              <button onClick={() => setHistorialDriver(null)} className="w-full h-9 rounded-lg bg-zinc-900 text-white text-[13px] font-bold hover:bg-zinc-700 transition-colors">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
