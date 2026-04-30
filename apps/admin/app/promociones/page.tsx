"use client";

import { useState } from "react";

const MOCK_PROMOS = [
  { id: "1", titulo: "Fin de mes", descripcion: "S/ 5.00 de dscto en balones de 15kg.", codigo: "FINMES5", usos: 45, estado: "activa", color: "from-blue-500 to-indigo-600", icon: "🎟️", expires: "Vence en 2 días" },
  { id: "2", titulo: "Día de la Madre", descripcion: "10% de descuento en tu próximo pedido.", codigo: "MAMA10", usos: 120, estado: "pausada", color: "from-pink-500 to-rose-500", icon: "💝", expires: "Vence en 15 días" },
];

export default function PromocionesPage() {
  const [promos] = useState(MOCK_PROMOS);
  const [isCreating, setIsCreating] = useState(false);

  // Form state for preview
  const [formData, setFormData] = useState({
    titulo: "Nueva Campaña",
    descripcion: "Descripción atractiva aquí...",
    codigo: "CODIGO123",
    color: "from-blue-500 to-indigo-600",
    icon: "🎁",
    expires: "Vence en 3 días"
  });

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl flex gap-8">
      
      {/* Main Content (Table) */}
      <div className={`flex-1 transition-all ${isCreating ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Campañas y Promociones</h1>
            <p className="text-[13px] text-zinc-500 mt-1">Atrae y fideliza clientes con cupones.</p>
          </div>
          {!isCreating && (
            <button 
              onClick={() => setIsCreating(true)}
              className="bg-zinc-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-zinc-800 transition-colors shadow-sm"
            >
              + Crear Campaña
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 overflow-hidden">
          <table className="w-full text-[13px] text-left">
            <thead className="bg-[#FBFBFB] text-zinc-500 font-medium border-b border-zinc-100">
              <tr>
                <th className="px-5 py-3 font-medium">Campaña</th>
                <th className="px-5 py-3 font-medium">Código</th>
                <th className="px-5 py-3 font-medium">Usos</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-bold text-zinc-900 flex items-center gap-2">
                      <span className="text-lg">{promo.icon}</span> {promo.titulo}
                    </div>
                    <div className="text-zinc-500 text-[12px] mt-0.5">{promo.descripcion}</div>
                  </td>
                  <td className="px-5 py-3 font-mono font-bold text-zinc-700">{promo.codigo}</td>
                  <td className="px-5 py-3 text-zinc-600 font-medium">{promo.usos}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide ${
                      promo.estado === 'activa' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {promo.estado}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-[13px]">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar: Creador y Vista Previa */}
      {isCreating && (
        <div className="w-full lg:w-[450px] bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 p-6 flex flex-col h-[calc(100vh-140px)] overflow-y-auto animate-in slide-in-from-right-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[15px] font-bold text-zinc-900">Crear Campaña</h2>
            <button onClick={() => setIsCreating(false)} className="text-zinc-400 hover:text-zinc-600">
              ✕
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-[12px] font-bold text-zinc-700 mb-1">Título de la Campaña</label>
              <input 
                type="text" 
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                className="w-full h-9 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400" 
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-zinc-700 mb-1">Descripción corta</label>
              <input 
                type="text" 
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="w-full h-9 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-zinc-700 mb-1">Código del Cupón</label>
                <input 
                  type="text" 
                  value={formData.codigo}
                  onChange={(e) => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
                  className="w-full h-9 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono uppercase" 
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-zinc-700 mb-1">Color / Tema</label>
                <select 
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-full h-9 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400"
                >
                  <option value="from-blue-500 to-indigo-600">Azul Indigo</option>
                  <option value="from-pink-500 to-rose-500">Rosa Fuerte</option>
                  <option value="from-emerald-400 to-teal-500">Verde Esmeralda</option>
                  <option value="from-orange-400 to-red-500">Naranja Fuego</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-zinc-700 mb-1">Emoji / Ícono</label>
                <input 
                  type="text" 
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full h-9 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400" 
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-zinc-700 mb-1">Expira en</label>
                <input 
                  type="text" 
                  value={formData.expires}
                  onChange={(e) => setFormData({...formData, expires: e.target.value})}
                  className="w-full h-9 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400" 
                />
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Vista Previa del Cliente</h3>
            
            {/* Tarjeta Mock - Vista Previa */}
            <div className={`bg-gradient-to-br ${formData.color} rounded-2xl p-5 text-white shadow-md relative overflow-hidden group`}>
              <div className="relative z-10 w-3/4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-md mb-3 inline-block">
                  {formData.expires}
                </span>
                <h3 className="font-bold text-lg leading-tight mb-1">{formData.titulo}</h3>
                <p className="text-[12px] text-white/90 mb-4">{formData.descripcion}</p>
                
                <div className="flex items-center gap-2">
                  <div className="bg-black/20 px-3 py-1.5 rounded-lg text-[13px] font-mono font-bold tracking-wider border border-white/10 backdrop-blur-sm">
                    {formData.codigo}
                  </div>
                  <button className="bg-white text-zinc-900 rounded-lg h-8 px-3 text-[11px] font-bold hover:bg-zinc-100 transition-colors">
                    Copiar
                  </button>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-500">
                {formData.icon}
              </div>
            </div>

            <button className="w-full mt-6 bg-zinc-900 text-white px-4 py-3 rounded-md text-[13px] font-bold hover:bg-zinc-800 transition-colors">
              Guardar y Activar Campaña
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
