"use client";

import { useState } from "react";

const MOCK_CONDUCTORES = [
  { id: "1", nombre: "Pedro L.", telefono: "999-123-456", sede: "Lima Norte", estado: "activo", carga_actual: 2, pedidos_hoy: 12, vehiculo: "Moto FRC-123" },
  { id: "2", nombre: "Jorge M.", telefono: "988-765-432", sede: "Lima Sur", estado: "ocupado", carga_actual: 1, pedidos_hoy: 8, vehiculo: "Furgoneta A1-B2" },
  { id: "3", nombre: "Carlos S.", telefono: "977-111-222", sede: "Lima Norte", estado: "fuera_de_servicio", carga_actual: 0, pedidos_hoy: 5, vehiculo: "Moto XYZ-999" },
];

const estadoColors: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  ocupado: "bg-orange-50 text-orange-700 border border-orange-200",
  fuera_de_servicio: "bg-zinc-100 text-zinc-500 border border-zinc-200",
};

const estadoLabels: Record<string, string> = {
  activo: "🟢 Disponible",
  ocupado: "🟠 Ocupado (En ruta)",
  fuera_de_servicio: "⚫ Fuera de servicio",
};

export default function ConductoresPage() {
  const [conductores] = useState(MOCK_CONDUCTORES);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Conductores</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Gestión de flota, disponibilidad y carga de trabajo.</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-800 transition-colors shadow-sm">
          + Agregar Conductor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conductores.map(conductor => (
          <div key={conductor.id} className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold">
                  {conductor.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-zinc-900">{conductor.nombre}</h3>
                  <p className="text-[12px] text-zinc-500">{conductor.sede}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${estadoColors[conductor.estado]}`}>
                {estadoLabels[conductor.estado]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100 mb-4">
              <div className="flex flex-col">
                <span className="text-[12px] text-zinc-500 mb-1">Carga Actual</span>
                <span className="text-lg font-semibold text-zinc-900">
                  {conductor.carga_actual} <span className="text-[12px] font-normal text-zinc-400">pedidos en ruta</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-zinc-500 mb-1">Completados Hoy</span>
                <span className="text-lg font-semibold text-zinc-900">
                  {conductor.pedidos_hoy}
                </span>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-[13px] text-zinc-600">
                <span className="font-medium text-zinc-400">Teléfono</span>
                <span>{conductor.telefono}</span>
              </div>
              <div className="flex justify-between text-[13px] text-zinc-600">
                <span className="font-medium text-zinc-400">Vehículo</span>
                <span>{conductor.vehiculo}</span>
              </div>
            </div>
            
            <button className="mt-5 w-full bg-[#FBFBFB] border border-zinc-200 text-zinc-700 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-100 transition-colors">
              Ver Historial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
