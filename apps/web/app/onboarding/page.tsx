"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate saving profile to DB
    setTimeout(() => {
      setLoading(false);
      router.push("/portal");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-6 animate-in slide-in-from-right-8 fade-in duration-500">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-black/5">
        
        <div className="mb-6">
          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
            Paso Único
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Completa tu perfil</h1>
          <p className="text-[13px] text-zinc-500 mt-1">
            Solo te pediremos esta información una vez para que tus futuros pedidos sean instantáneos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-bold text-zinc-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                required
                placeholder="Ej. Juan Pérez"
                className="w-full h-11 px-3 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-zinc-50/50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-bold text-zinc-700 mb-1">DNI</label>
                <input 
                  type="text" 
                  required
                  pattern="[0-9]{8}"
                  placeholder="8 dígitos"
                  className="w-full h-11 px-3 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-zinc-50/50 font-mono"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-zinc-700 mb-1">Celular</label>
                <input 
                  type="tel" 
                  required
                  placeholder="999 999 999"
                  className="w-full h-11 px-3 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-zinc-50/50 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <label className="block text-[12px] font-bold text-zinc-700 mb-1">Distrito</label>
              <select 
                required
                defaultValue=""
                className="w-full h-11 px-3 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-zinc-50/50"
              >
                <option value="" disabled>Selecciona tu distrito...</option>
                <optgroup label="Lima Norte">
                  <option value="comas">Comas</option>
                  <option value="los-olivos">Los Olivos</option>
                  <option value="smp">San Martín de Porres</option>
                </optgroup>
                <optgroup label="Lima Sur">
                  <option value="chorrillos">Chorrillos</option>
                  <option value="sjm">San Juan de Miraflores</option>
                  <option value="vmt">Villa María del Triunfo</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-zinc-700 mb-1">Dirección Exacta</label>
              <input 
                type="text" 
                required
                placeholder="Ej. Av. Principal 123, Mz A Lt 5"
                className="w-full h-11 px-3 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-zinc-50/50"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-zinc-700 mb-1">Referencia (Opcional)</label>
              <input 
                type="text" 
                placeholder="Frente a la bodega de la esquina"
                className="w-full h-11 px-3 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 bg-zinc-50/50"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 text-[14px] font-bold shadow-md mt-6"
          >
            {loading ? "Guardando perfil..." : "Guardar e Ir al Portal"}
          </Button>
        </form>
        
      </div>
    </div>
  );
}
