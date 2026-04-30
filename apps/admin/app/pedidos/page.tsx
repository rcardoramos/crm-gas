"use client";

import { useState, useEffect } from "react";
import { supabase } from "@repo/lib";

const MOCK_PEDIDOS = [
  { id: "1", cliente: "Juan Pérez", sede: "Lima Norte", origen: "web", direccion: "Av. Principal 123", estado: "pendiente", conductor: null, total: 45, fecha: "Hace 2 min" },
  { id: "2", cliente: "María Gómez", sede: "Lima Sur", origen: "whatsapp", direccion: "Calle Los Cedros 45", estado: "validado", conductor: null, total: 90, fecha: "Hace 15 min" },
  { id: "3", cliente: "Carlos Ruiz", sede: "Lima Norte", origen: "telefono", direccion: "Jr. Pinos 890", estado: "asignado", conductor: "Pedro L.", total: 45, fecha: "Hace 25 min" },
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

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<any[]>(MOCK_PEDIDOS);
  const [drivers] = useState(MOCK_DRIVERS);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch inicial de pedidos (comentado para mock)
    // const fetchPedidos = async () => { ... }
    
    // 2. Suscripción a Realtime
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pedidos',
        },
        (payload) => {
          console.log('Nuevo pedido recibido:', payload.new);
          // Lógica de asignación automática (pseudo-código):
          // const driverLibre = drivers.find(d => d.estado === 'libre');
          // if (driverLibre) { assignDriver(payload.new.id, driverLibre.id); }
          // else { show in UI for manual assignment }
          
          setPedidos((prev) => [
            {
              id: payload.new.id.substring(0, 4), // short id
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAssign = (pedidoId: string, driverName: string) => {
    setPedidos(pedidos.map(p => 
      p.id === pedidoId ? { ...p, conductor: driverName, estado: "asignado" } : p
    ));
    setAssigningId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Pedidos en vivo</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Gestión logística omnicanal.</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-800 transition-colors shadow-sm">
          + Nuevo Pedido Manual
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 overflow-hidden pb-32">
        <div className="flex items-center p-4 border-b border-zinc-100 gap-4">
          <select className="h-8 px-2 text-[13px] border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400">
            <option value="all">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="en_camino">En Camino</option>
          </select>
          <input type="text" placeholder="Buscar por cliente o dirección..." className="w-64 h-8 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400" />
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
                  <td className="px-5 py-3 text-zinc-500">{origenLabels[pedido.origen] || "🌐 Web"}</td>
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
                                <button 
                                  key={d.id} 
                                  onClick={() => handleAssign(pedido.id, d.nombre)}
                                  className="w-full text-left px-2 py-1.5 text-[12px] hover:bg-zinc-50 rounded-md flex justify-between items-center"
                                >
                                  <span>{d.nombre}</span>
                                  <span className={`w-2 h-2 rounded-full ${d.estado === 'libre' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                </button>
                              ))}
                            </div>
                            <button onClick={() => setAssigningId(null)} className="w-full mt-2 text-center text-[11px] text-zinc-400 hover:text-zinc-600">Cancelar</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setAssigningId(pedido.id)}
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1 rounded-md text-[11px] font-bold transition-colors"
                          >
                            Asignar Driver
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-[12px]">
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
  );
}
