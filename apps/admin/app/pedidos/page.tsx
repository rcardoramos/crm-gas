"use client";

import { useState, useEffect } from "react";
import { supabase } from "@repo/lib";

const MOCK_PEDIDOS = [
  { id: "1", cliente: "Juan Pérez", sede: "Lima Norte", origen: "web", direccion: "Av. Principal 123", estado: "pendiente", conductor: null, total: 45, producto: "Balón Normal 10kg", fecha: "Hace 2 min" },
  { id: "2", cliente: "María Gómez", sede: "Lima Sur", origen: "whatsapp", direccion: "Calle Los Cedros 45", estado: "validado", conductor: null, total: 90, producto: "Balón Premium 15kg", fecha: "Hace 15 min" },
  { id: "3", cliente: "Carlos Ruiz", sede: "Lima Norte", origen: "telefono", direccion: "Jr. Pinos 890", estado: "asignado", conductor: "Pedro L.", total: 45, producto: "Balón Normal 10kg", fecha: "Hace 25 min" },
];

const MOCK_DRIVERS = [
  { id: "d1", nombre: "Jorge M.", estado: "libre" },
  { id: "d2", nombre: "Pedro L.", estado: "ocupado" },
];

const estadoColors: Record<string, string> = {
  pendiente: "bg-zinc-100 text-zinc-700 border border-zinc-200",
  validado: "bg-blue-50 text-blue-700 border border-blue-200",
  asignado: "bg-purple-50 text-purple-700 border border-purple-200",
  en_camino: "bg-orange-50 text-orange-700 border border-orange-200",
  entregado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  no_entregado: "bg-red-50 text-red-700 border border-red-200",
  cancelado: "bg-zinc-100 text-zinc-400 border border-zinc-200 line-through",
};

const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  validado: "Validado",
  asignado: "Asignado",
  en_camino: "En Camino",
  entregado: "Entregado",
  no_entregado: "No Entregado",
  cancelado: "Cancelado",
};

const origenLabels: Record<string, string> = {
  web: "🌐 Web",
  whatsapp: "💬 WApp",
  telefono: "📞 Tel",
  manual_crm: "💻 CRM",
};

const PRODUCTOS = [
  { label: "Balón Normal 10kg — S/ 45.00", value: "10kg", precio: 45 },
  { label: "Balón Premium 15kg — S/ 65.00", value: "15kg", precio: 65 },
  { label: "Balón Industrial 45kg — S/ 135.00", value: "45kg", precio: 135 },
];

const inputClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white placeholder:text-zinc-400";
const selectClass = "w-full h-9 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white";
const textareaClass = "w-full px-3 py-2 text-[13px] text-zinc-900 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-white placeholder:text-zinc-400 resize-none";
const labelClass = "block text-[12px] font-semibold text-zinc-600 mb-1";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<any[]>(MOCK_PEDIDOS);
  const [drivers] = useState(MOCK_DRIVERS);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailPedido, setDetailPedido] = useState<any | null>(null);

  // Form state
  const [form, setForm] = useState({
    cliente: "",
    telefono: "",
    direccion: "",
    distrito: "",
    referencia: "",
    producto: "10kg",
    origen: "telefono",
    metodo_pago: "efectivo",
    notas: "",
  });
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pedidos' }, (payload) => {
        setPedidos((prev) => [
          {
            id: payload.new.id.substring(0, 4),
            cliente: "Cliente Web",
            sede: "Por definir",
            origen: payload.new.origen,
            direccion: "Ver detalle...",
            estado: payload.new.estado,
            conductor: null,
            total: payload.new.total,
            fecha: "Justo ahora"
          },
          ...prev
        ]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleAssign = (pedidoId: string, driverName: string) => {
    setPedidos(pedidos.map(p =>
      p.id === pedidoId ? { ...p, conductor: driverName, estado: "asignado" } : p
    ));
    setAssigningId(null);
    // Actualizar también el modal de detalle si está abierto
    if (detailPedido?.id === pedidoId) {
      setDetailPedido((prev: any) => ({ ...prev, conductor: driverName, estado: "asignado" }));
    }
  };

  const handleChangeEstado = (pedidoId: string, nuevoEstado: string) => {
    setPedidos(prev => prev.map(p => p.id === pedidoId ? { ...p, estado: nuevoEstado } : p));
    setDetailPedido((prev: any) => prev ? { ...prev, estado: nuevoEstado } : null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingOrder(true);

    // TODO: Supabase insert cuando esté configurado:
    // await supabase.from('pedidos').insert({ ... });

    const productoSeleccionado = PRODUCTOS.find(p => p.value === form.producto)!;
    const newId = String(pedidos.length + 10);

    setTimeout(() => {
      setPedidos(prev => [{
        id: newId,
        cliente: form.cliente,
        sede: form.distrito || "Manual",
        origen: "manual_crm",
        direccion: `${form.direccion}${form.referencia ? ` (${form.referencia})` : ""}`,
        estado: "pendiente",
        conductor: null,
        total: productoSeleccionado.precio,
        producto: productoSeleccionado.label.split(" — ")[0], // ej: "Balón Normal 10kg"
        fecha: "Justo ahora",
        metodo_pago: form.metodo_pago,
      }, ...prev]);

      setSavingOrder(false);
      setIsModalOpen(false);
      setForm({ cliente: "", telefono: "", direccion: "", distrito: "", referencia: "", producto: "10kg", origen: "telefono", metodo_pago: "efectivo", notas: "" });
    }, 600);
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Pedidos en vivo</h1>
            <p className="text-[13px] text-zinc-500 mt-1">Gestión logística omnicanal.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-700 transition-colors shadow-sm"
          >
            + Nuevo Pedido
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 overflow-hidden pb-32">
          <div className="flex items-center p-4 border-b border-zinc-100 gap-4">
            <select className="h-8 px-2 text-[13px] text-zinc-900 border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400">
              <option value="all">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="en_camino">En Camino</option>
            </select>
            <input type="text" placeholder="Buscar por cliente o dirección..." className="w-64 h-8 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400" />
          </div>

          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[13px] text-left">
              <thead className="bg-[#FBFBFB] text-zinc-500 font-medium border-b border-zinc-100">
                <tr>
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Cliente</th>
                  <th className="px-5 py-3 font-medium">Origen</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                  <th className="px-5 py-3 font-medium">Driver</th>
                  <th className="px-5 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className={`hover:bg-zinc-50/50 transition-colors group ${pedido.fecha === 'Justo ahora' ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-5 py-3 font-mono text-zinc-400">
                      #{pedido.id.padStart(4, '0')}
                      {pedido.fecha === 'Justo ahora' && <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 inline-block animate-pulse"></span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-zinc-900">{pedido.cliente}</div>
                      <div className="text-zinc-500 text-[12px] truncate max-w-[150px]">{pedido.direccion}</div>
                    </td>
                    <td className="px-5 py-3 text-zinc-500">{origenLabels[pedido.origen] || "💻 CRM"}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${estadoColors[pedido.estado] || estadoColors.pendiente}`}>
                        {estadoLabels[pedido.estado] || "Pendiente"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-600 relative">
                      {pedido.conductor ? (
                        <span className="flex items-center gap-1.5 font-bold text-zinc-900">
                          <div className="w-4 h-4 rounded-full bg-zinc-200 flex-shrink-0 flex items-center justify-center text-[8px]">🚚</div>
                          {pedido.conductor}
                        </span>
                      ) : (
                        <div>
                          {assigningId === pedido.id ? (
                            <div className="absolute top-2 left-5 z-10 bg-white border border-zinc-200 shadow-xl rounded-lg p-2 w-48">
                              <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2 px-1">Asignar a Driver</p>
                              <div className="space-y-1">
                                {drivers.map(d => (
                                  <button key={d.id} onClick={() => handleAssign(pedido.id, d.nombre)} className="w-full text-left px-2 py-1.5 text-[12px] hover:bg-zinc-50 rounded-md flex justify-between items-center">
                                    <span>{d.nombre}</span>
                                    <span className={`w-2 h-2 rounded-full ${d.estado === 'libre' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                  </button>
                                ))}
                              </div>
                              <button onClick={() => setAssigningId(null)} className="w-full mt-2 text-center text-[11px] text-zinc-400 hover:text-zinc-600">Cancelar</button>
                            </div>
                          ) : (
                            <button onClick={() => setAssigningId(pedido.id)} className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1 rounded-md text-[11px] font-bold transition-colors">
                              Asignar Driver
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setDetailPedido(pedido)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-[12px]"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── MODAL NUEVO PEDIDO ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <div>
                <h2 className="text-[16px] font-bold text-zinc-900">Nuevo Pedido</h2>
                <p className="text-[12px] text-zinc-500 mt-0.5">Ingresado manualmente desde el CRM</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors text-lg font-light"
              >
                ×
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleCreateOrder} className="p-6 space-y-4">

              {/* Canal de origen */}
              <div>
                <label className={labelClass}>Canal de Ingreso</label>
                <select name="origen" value={form.origen} onChange={handleFormChange} className={selectClass}>
                  <option value="telefono">📞 Llamada telefónica</option>
                  <option value="whatsapp">💬 WhatsApp</option>
                  <option value="manual_crm">💻 Ingreso directo CRM</option>
                </select>
              </div>

              {/* Datos del cliente */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Nombre del Cliente *</label>
                  <input name="cliente" required value={form.cliente} onChange={handleFormChange} placeholder="Ej. Juan Pérez" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono</label>
                  <input name="telefono" type="tel" value={form.telefono} onChange={handleFormChange} placeholder="999 999 999" className={inputClass} />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className={labelClass}>Dirección Exacta *</label>
                <input name="direccion" required value={form.direccion} onChange={handleFormChange} placeholder="Ej. Av. Principal 123, Mz A Lt 5" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Distrito</label>
                  <input name="distrito" value={form.distrito} onChange={handleFormChange} placeholder="Comas, Los Olivos..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Referencia</label>
                  <input name="referencia" value={form.referencia} onChange={handleFormChange} placeholder="Frente a la bodega..." className={inputClass} />
                </div>
              </div>

              {/* Método de Pago */}
              <div>
                <label className={labelClass}>Método de Pago *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "efectivo", label: "💵 Efectivo" },
                    { value: "yape", label: "🟣 Yape" },
                    { value: "plin", label: "🟢 Plin" },
                  ].map(op => (
                    <button
                      key={op.value}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, metodo_pago: op.value }))}
                      className={`h-9 rounded-lg text-[12px] font-bold border transition-all ${
                        form.metodo_pago === op.value
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Producto */}
              <div>
                <label className={labelClass}>Producto *</label>
                <select name="producto" value={form.producto} onChange={handleFormChange} className={selectClass}>
                  {PRODUCTOS.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Notas */}
              <div>
                <label className={labelClass}>Notas adicionales</label>
                <textarea name="notas" value={form.notas} onChange={handleFormChange} placeholder="Instrucciones especiales del cliente..." rows={2}
                  className={textareaClass}
                />
              </div>

              {/* Total preview */}
              <div className="bg-zinc-50 rounded-xl p-4 flex justify-between items-center border border-zinc-100">
                <span className="text-[13px] text-zinc-500 font-medium">Total del pedido</span>
                <span className="text-[18px] font-bold text-zinc-900">
                  S/ {PRODUCTOS.find(p => p.value === form.producto)?.precio.toFixed(2)}
                </span>
              </div>

              {/* Acciones */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-10 rounded-lg border border-zinc-200 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={savingOrder} className="flex-1 h-10 rounded-lg bg-zinc-900 text-white text-[13px] font-bold hover:bg-zinc-700 transition-colors disabled:opacity-60">
                  {savingOrder ? "Guardando..." : "Crear Pedido"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── MODAL VER DETALLE ── */}
      {detailPedido && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setDetailPedido(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 fade-in duration-200 text-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="font-mono text-zinc-400 text-[13px]">#{detailPedido.id.padStart(4, '0')}</span>
                <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${estadoColors[detailPedido.estado] || estadoColors.pendiente}`}>
                  {estadoLabels[detailPedido.estado] || "Pendiente"}
                </span>
              </div>
              <button
                onClick={() => setDetailPedido(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 text-lg"
              >
                ×
              </button>
            </div>

            {/* Cuerpo del detalle */}
            <div className="p-5 space-y-4">
              {/* Info del cliente */}
              <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Detalle del Pedido</p>
                <div className="flex justify-between text-[13px]">
                  <span className="text-zinc-500">Cliente</span>
                  <span className="font-semibold text-zinc-900">{detailPedido.cliente}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-zinc-500">Dirección</span>
                  <span className="font-semibold text-zinc-900 text-right max-w-[200px]">{detailPedido.direccion}</span>
                </div>
                {detailPedido.producto && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-zinc-500">Producto</span>
                    <span className="font-semibold text-zinc-900">🛢️ {detailPedido.producto}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px]">
                  <span className="text-zinc-500">Origen</span>
                  <span className="font-semibold text-zinc-900">{origenLabels[detailPedido.origen] || "💻 CRM"}</span>
                </div>
                {detailPedido.metodo_pago && (
                  <div className="flex justify-between text-[13px]">
                    <span className="text-zinc-500">Pago</span>
                    <span className="font-semibold text-zinc-900 capitalize">{detailPedido.metodo_pago}</span>
                  </div>
                )}
                <div className="flex justify-between text-[13px] pt-2 border-t border-zinc-200">
                  <span className="text-zinc-500">Total</span>
                  <span className="font-bold text-zinc-900 text-[15px]">S/ {detailPedido.total}</span>
                </div>
              </div>

              {/* Driver asignado */}
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Driver</p>
                {detailPedido.conductor ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-sm">🚚</div>
                    <span className="font-semibold text-zinc-900 text-[14px]">{detailPedido.conductor}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[12px] text-zinc-500 italic">Sin asignar — selecciona un driver:</p>
                    <div className="flex gap-2 flex-wrap">
                      {drivers.map(d => (
                        <button
                          key={d.id}
                          onClick={() => handleAssign(detailPedido.id, d.nombre)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-[12px] font-bold text-zinc-800 bg-white hover:border-zinc-400 hover:bg-zinc-50 transition-all"
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${d.estado === 'libre' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                          {d.nombre}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cambiar estado */}
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Cambiar Estado</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(estadoLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => handleChangeEstado(detailPedido.id, key)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                        detailPedido.estado === key
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-100">
              <button
                onClick={() => setDetailPedido(null)}
                className="w-full h-9 rounded-lg bg-zinc-900 text-white text-[13px] font-bold hover:bg-zinc-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
