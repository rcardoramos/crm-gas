"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_COLA = [
  { id: "1", cliente: "Juan Pérez", direccion: "Av. Principal 123", producto: "Balón 10kg", pago: "Efectivo", estado: "en_camino" },
  { id: "3", cliente: "Carlos Ruiz", direccion: "Jr. Pinos 890", producto: "Balón 45kg", pago: "Yape", estado: "asignado" },
  { id: "5", cliente: "María Torres", direccion: "Calle Las Dunas 44", producto: "Balón 15kg", pago: "Tarjeta", estado: "asignado" },
];

export default function DriverAppPage() {
  const [pedidos] = useState(MOCK_COLA);

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl shadow-black/5 relative flex flex-col">
        
        {/* Header App Conductor */}
        <header className="bg-zinc-900 text-white p-5 pb-6 rounded-b-[2rem] shadow-md z-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-zinc-400 text-[12px] uppercase font-bold tracking-wider">Modo Conductor</p>
              <h1 className="text-xl font-bold mt-0.5">Hola, Pedro</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center border-[3px] border-zinc-800">
              <span className="text-white text-[10px] font-bold">Activo</span>
            </div>
          </div>
          <div className="flex gap-4 text-[13px]">
            <div className="flex flex-col">
              <span className="text-zinc-400">En cola</span>
              <span className="font-bold text-lg">{pedidos.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-400">Completados</span>
              <span className="font-bold text-lg">12</span>
            </div>
          </div>
        </header>

        {/* Lista de Pedidos */}
        <main className="flex-1 p-5 -mt-4 pt-8 overflow-y-auto space-y-4">
          <h2 className="text-[14px] font-bold text-zinc-900 mb-2">Tu ruta actual</h2>
          
          {pedidos.map((pedido, index) => (
            <div key={pedido.id} className={`border rounded-2xl p-4 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
              pedido.estado === "en_camino" ? "border-orange-200 bg-orange-50/30" : "border-zinc-200 bg-white"
            }`}>
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-bold">
                  {index + 1}
                </span>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                  pedido.estado === "en_camino" ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"
                }`}>
                  {pedido.estado === "en_camino" ? "En Camino" : "Esperando"}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-zinc-900 mb-1">{pedido.direccion}</h3>
              <p className="text-[13px] text-zinc-500 mb-4">{pedido.cliente} • {pedido.producto}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-[12px] font-medium text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md">
                  Pago: {pedido.pago}
                </span>
                
                {pedido.estado === "en_camino" ? (
                  <div className="flex gap-2">
                    <button className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-red-100 transition-colors">
                      Fallo
                    </button>
                    <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-[12px] font-bold hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20">
                      Entregado
                    </button>
                  </div>
                ) : (
                  <button className="bg-zinc-900 text-white px-4 py-1.5 rounded-lg text-[12px] font-bold hover:bg-zinc-800 transition-colors w-full">
                    Iniciar Ruta
                  </button>
                )}
              </div>
            </div>
          ))}
        </main>

        <footer className="p-4 border-t border-zinc-100 bg-white text-center">
          <Link href="/" className="text-[12px] text-zinc-400 hover:text-zinc-900 underline">
            Volver al CRM
          </Link>
        </footer>
      </div>
    </div>
  );
}
