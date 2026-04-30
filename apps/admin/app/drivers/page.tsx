"use client";

import { useState, useEffect } from "react";
import { getDrivers, saveDrivers, type DriverRecord } from "../actions/drivers";
import { getAttendance, type AttendanceRecord } from "../actions/attendance";

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
  ],
  "2": [
    { id: "E006", fecha: "Hoy 13:50", cliente: "Ana Silva", direccion: "Jr. Independencia 234", producto: "Balón 15kg", total: 65, estado: "entregado", pago: "Yape" },
  ],
};

const emptyForm = {
  nombre: "",
  telefono: "",
  sede: "Lima Norte",
  vehiculo: "Moto",
  placa: "",
};

const inputClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white placeholder:text-zinc-300";
const selectClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white";
const labelClass = "block text-[12px] font-semibold text-zinc-600 mb-1";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [detailDriver, setDetailDriver] = useState<DriverRecord | null>(null);
  const [historialDriver, setHistorialDriver] = useState<DriverRecord | null>(null);

  useEffect(() => {
    Promise.all([getDrivers(), getAttendance()]).then(([dData, aData]) => {
      setDrivers(dData);
      setAttendance(aData);
      setLoading(false);
    });
  }, []);

  const persistir = async (nuevosDrivers: DriverRecord[]) => {
    setDrivers(nuevosDrivers);
    await saveDrivers(nuevosDrivers);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (d: DriverRecord) => {
    setEditingId(d.id);
    setForm({ nombre: d.nombre, telefono: d.telefono, sede: d.sede, vehiculo: d.vehiculo, placa: d.placa });
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let nuevos: DriverRecord[];
    if (editingId) {
      nuevos = drivers.map(d => d.id === editingId ? { ...d, ...form } : d);
    } else {
      nuevos = [...drivers, {
        id: String(Date.now()),
        ...form,
        estado: "activo",
        carga_actual: 0,
        pedidos_hoy: 0,
      }];
    }

    await persistir(nuevos);
    setSaving(false);
    setIsModalOpen(false);
  };

  const handleChangeEstado = async (id: string, nuevoEstado: DriverRecord["estado"]) => {
    const nuevos = drivers.map(d => d.id === id ? { ...d, estado: nuevoEstado } : d);
    await persistir(nuevos);
    setDetailDriver(prev => prev?.id === id ? { ...prev, estado: nuevoEstado } : prev);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este driver? No podrá iniciar sesión.")) return;
    const nuevos = drivers.filter(d => d.id !== id);
    await persistir(nuevos);
    setDetailDriver(null);
  };

  const disponibles = drivers.filter(d => d.estado === "activo").length;
  const enRuta = drivers.filter(d => d.estado === "ocupado").length;

  return (
    <>
      <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Drivers</h1>
            <p className="text-[13px] text-zinc-500 mt-1">Gestión de flota y marcación de asistencia en tiempo real.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAttendanceModal(true)}
              className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-200 transition-colors"
            >
              📋 Ver Asistencia
            </button>
            <button
              onClick={openNew}
              className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-700 transition-colors shadow-sm"
            >
              + Agregar Driver
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Total Drivers</p>
            <p className="text-2xl font-bold text-zinc-900">{drivers.length}</p>
          </div>
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">Activos</p>
            <p className="text-2xl font-bold text-emerald-600">{disponibles}</p>
          </div>
          <div className="bg-white border border-zinc-200/60 rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <p className="text-[12px] text-zinc-500 mb-1">En Ruta</p>
            <p className="text-2xl font-bold text-orange-500">{enRuta}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-400 text-[14px]">Cargando drivers...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map(driver => (
              <div key={driver.id} className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 p-5 flex flex-col">
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

                <div className="flex gap-2 mt-5">
                  <button onClick={() => setHistorialDriver(driver)} className="flex-1 bg-zinc-50 border border-zinc-200 text-zinc-700 py-2 rounded-lg text-[12px] font-bold hover:bg-zinc-100 transition-colors">
                    📊 Historial
                  </button>
                  <button onClick={() => setDetailDriver(driver)} className="flex-1 bg-zinc-50 border border-zinc-200 text-zinc-700 py-2 rounded-lg text-[12px] font-bold hover:bg-zinc-100 transition-colors">
                    Ver Detalle
                  </button>
                  <button onClick={() => openEdit(driver)} className="w-10 h-10 bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-lg text-[13px] font-bold hover:bg-zinc-100 transition-colors flex items-center justify-center">
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL AGREGAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200 text-zinc-900">
            <div className="flex items-center justify-between p-5 border-b border-zinc-100">
              <h2 className="text-[16px] font-bold">{editingId ? "Editar Driver" : "Nuevo Driver"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">×</button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={labelClass}>Nombre completo *</label>
                  <input name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Ej. Pedro López" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono (Celular) *</label>
                  <input name="telefono" required value={form.telefono} onChange={handleChange} placeholder="999123456" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sede</label>
                  <select name="sede" value={form.sede} onChange={handleChange} className={selectClass}>
                    <option>Lima Norte</option>
                    <option>Lima Sur</option>
                    <option>Lima Centro</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Tipo Vehículo</label>
                  <select name="vehiculo" value={form.vehiculo} onChange={handleChange} className={selectClass}>
                    <option>Moto</option>
                    <option>Furgoneta</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Placa *</label>
                  <input name="placa" required value={form.placa} onChange={handleChange} placeholder="ABC-123" className={inputClass} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-10 rounded-lg border border-zinc-200 text-zinc-600 font-medium">Cancelar</button>
                <button type="submit" disabled={saving} className="flex-1 h-10 rounded-lg bg-zinc-900 text-white font-bold hover:bg-zinc-700">{saving ? "Guardando..." : "Guardar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ASISTENCIA */}
      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={() => setShowAttendanceModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-in zoom-in-95 duration-200 text-zinc-900 max-h-[80vh] flex flex-col">
            <div className="p-5 border-b border-zinc-100 flex justify-between items-center shrink-0">
              <h2 className="text-[16px] font-bold">Registro de Asistencia (Marcaciones)</h2>
              <button onClick={() => setShowAttendanceModal(false)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">×</button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-100">
                    <th className="pb-3 font-semibold">Driver</th>
                    <th className="pb-3 font-semibold">Entrada</th>
                    <th className="pb-3 font-semibold">Salida</th>
                    <th className="pb-3 font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {attendance.length === 0 && (
                    <tr><td colSpan={4} className="py-10 text-center text-zinc-400">Sin marcaciones registradas</td></tr>
                  )}
                  {attendance.map(a => (
                    <tr key={a.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3">
                        <p className="font-bold text-zinc-900">{a.driverNombre}</p>
                        <p className="text-[11px] text-zinc-500">{a.driverSede}</p>
                      </td>
                      <td className="py-3 text-zinc-600">{new Date(a.entrada).toLocaleString()}</td>
                      <td className="py-3 text-zinc-600">{a.salida ? new Date(a.salida).toLocaleString() : <span className="text-emerald-600 font-bold">● En turno</span>}</td>
                      <td className="py-3 font-semibold text-zinc-900">{a.duracionMinutos ? `${a.duracionMinutos} min` : "--"}</td>
                    </tr>
                  )).reverse()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DRIVER */}
      {detailDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={() => setDetailDriver(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 animate-in zoom-in-95 duration-200 text-zinc-900">
            <div className="p-5 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="text-[16px] font-bold">{detailDriver.nombre}</h2>
              <button onClick={() => setDetailDriver(null)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">×</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Información de Flota</p>
                <div className="flex justify-between text-[13px]"><span className="text-zinc-500">Teléfono</span><span className="font-semibold">{detailDriver.telefono}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-zinc-500">Sede</span><span className="font-semibold">{detailDriver.sede}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-zinc-500">Vehículo</span><span className="font-semibold">{detailDriver.vehiculo} · {detailDriver.placa}</span></div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Cambiar Disponibilidad</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["activo", "ocupado", "fuera_de_servicio"] as const).map(estado => (
                    <button
                      key={estado}
                      onClick={() => handleChangeEstado(detailDriver.id, estado)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                        detailDriver.estado === estado ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {estado === "activo" ? "Disponible" : estado === "ocupado" ? "En Ruta" : "Inactivo"}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => handleDelete(detailDriver.id)} className="w-full py-2 text-red-600 text-[13px] font-bold border border-red-100 bg-red-50 rounded-lg hover:bg-red-100">
                Eliminar Driver
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL HISTORIAL */}
      {historialDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={() => setHistorialDriver(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 duration-200 text-zinc-900 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 font-black">{historialDriver.nombre.charAt(0)}</div>
                <div>
                  <h2 className="text-[16px] font-bold">Historial de Entregas</h2>
                  <p className="text-[12px] text-zinc-500">{historialDriver.nombre}</p>
                </div>
              </div>
              <button onClick={() => setHistorialDriver(null)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">×</button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {(MOCK_HISTORIAL[historialDriver.id] || []).length === 0 ? (
                <div className="text-center py-10 text-zinc-400 text-[13px]">Sin historial de entregas</div>
              ) : (
                (MOCK_HISTORIAL[historialDriver.id] || []).map(entrega => (
                  <div key={entrega.id} className="bg-zinc-50 rounded-xl p-4 flex items-start gap-3 border border-zinc-100">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${entrega.estado === "entregado" ? "bg-emerald-100" : "bg-red-100"}`}>
                      {entrega.estado === "entregado" ? "✓" : "✗"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-bold text-zinc-900 truncate">{entrega.cliente}</span>
                        <span className="text-[12px] font-black text-zinc-900">S/ {entrega.total}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate">{entrega.direccion}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-zinc-400">{entrega.fecha}</span>
                        <span className="text-[10px] text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-md">{entrega.producto}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t border-zinc-100 shrink-0">
              <button onClick={() => setHistorialDriver(null)} className="w-full h-9 rounded-lg bg-zinc-900 text-white text-[13px] font-bold hover:bg-zinc-700 transition-colors">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
