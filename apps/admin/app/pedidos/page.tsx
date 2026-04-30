"use client";

import { useState, useEffect } from "react";
// import { createSupabaseClient } from "@repo/lib";

const MOCK_PEDIDOS = [
  { id: "1", cliente: "Juan Pérez", direccion: "Av. Principal 123", estado: "pendiente", total: 45, fecha: "Hace 2 min" },
  { id: "2", cliente: "María Gómez", direccion: "Calle Los Cedros 45", estado: "validado", total: 90, fecha: "Hace 15 min" },
  { id: "3", cliente: "Carlos Ruiz", direccion: "Jr. Pinos 890", estado: "en_camino", total: 45, fecha: "Hace 45 min" },
  { id: "4", cliente: "Ana Silva", direccion: "Urb. Las Flores Mz. A Lt. 2", estado: "entregado", total: 135, fecha: "Hace 2 horas" },
];

const estadoColors: Record<string, string> = {
  pendiente: "bg-gray-100 text-gray-700",
  validado: "bg-blue-100 text-blue-700",
  en_camino: "bg-orange-100 text-orange-700",
  entregado: "bg-green-100 text-green-700",
  cancelado: "bg-red-100 text-red-700",
};

const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  validado: "Validado",
  en_camino: "En Camino",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState(MOCK_PEDIDOS);

  // Example of Supabase Realtime logic:
  // useEffect(() => {
  //   const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  //   const channel = supabase.channel('realtime:pedidos')
  //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pedidos' }, (payload) => {
  //       setPedidos((prev) => [payload.new, ...prev]);
  //     })
  //     .subscribe();
  //   return () => { supabase.removeChannel(channel); };
  // }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de pedidos en tiempo real.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
          Nuevo Pedido
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Dirección</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400">#{pedido.id.padStart(4, '0')}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{pedido.cliente}</td>
                  <td className="px-6 py-4 text-gray-600">{pedido.direccion}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${estadoColors[pedido.estado]}`}>
                      {estadoLabels[pedido.estado]}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">S/ {pedido.total}</td>
                  <td className="px-6 py-4 text-gray-500">{pedido.fecha}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
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
