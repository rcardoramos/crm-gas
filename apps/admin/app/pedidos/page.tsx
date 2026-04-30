"use client";

import { useState } from "react";

const MOCK_PEDIDOS = [
  { id: "1", cliente: "Juan Pérez", sede: "Lima Norte", origen: "web", direccion: "Av. Principal 123", estado: "pendiente", conductor: null, total: 45, fecha: "Hace 2 min" },
  { id: "2", cliente: "María Gómez", sede: "Lima Sur", origen: "whatsapp", direccion: "Calle Los Cedros 45", estado: "validado", conductor: null, total: 90, fecha: "Hace 15 min" },
  { id: "3", cliente: "Carlos Ruiz", sede: "Lima Norte", origen: "telefono", direccion: "Jr. Pinos 890", estado: "asignado", conductor: "Pedro L.", total: 45, fecha: "Hace 25 min" },
  { id: "4", cliente: "Luis Torres", sede: "Lima Sur", origen: "manual_crm", direccion: "Urb. Las Rosas", estado: "en_camino", conductor: "Jorge M.", total: 45, fecha: "Hace 45 min" },
  { id: "5", cliente: "Ana Silva", sede: "Lima Norte", origen: "web", direccion: "Urb. Las Flores Mz. A", estado: "no_entregado", conductor: "Pedro L.", total: 135, fecha: "Hace 2 horas" },
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
  const [pedidos] = useState(MOCK_PEDIDOS);

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

      <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 overflow-hidden">
        <div className="flex items-center p-4 border-b border-zinc-100 gap-4">
          <select className="h-8 px-2 text-[13px] border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400">
            <option value="all">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="en_camino">En Camino</option>
          </select>
          <input type="text" placeholder="Buscar por cliente o dirección..." className="w-64 h-8 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] text-left">
            <thead className="bg-[#FBFBFB] text-zinc-500 font-medium border-b border-zinc-100">
              <tr>
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Origen</th>
                <th className="px-5 py-3 font-medium">Sede</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium">Conductor</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-5 py-3 font-mono text-zinc-400">#{pedido.id.padStart(4, '0')}</td>
                  <td className="px-5 py-3">
                    <div className="font-medium text-zinc-900">{pedido.cliente}</div>
                    <div className="text-zinc-500 text-[12px] truncate max-w-[150px]">{pedido.direccion}</div>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">{origenLabels[pedido.origen]}</td>
                  <td className="px-5 py-3 text-zinc-600 font-medium">{pedido.sede}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${estadoColors[pedido.estado]}`}>
                      {estadoLabels[pedido.estado]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-600">
                    {pedido.conductor ? (
                      <span className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-zinc-200 flex-shrink-0"></div>
                        {pedido.conductor}
                      </span>
                    ) : (
                      <span className="text-zinc-400 italic">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-medium text-zinc-900">S/ {pedido.total}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-zinc-400 hover:text-zinc-900 font-medium text-[13px] opacity-0 group-hover:opacity-100 transition-opacity">
                      Gestionar
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
