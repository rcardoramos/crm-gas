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
    <div className="min-h-screen bg-[#F5EBE1] flex flex-col justify-center items-center p-6 animate-in slide-in-from-right-8 fade-in duration-500">
      
      {/* Header top brand */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-[#003223] text-[#F5EBE1] rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-[#003223]/30">
          G
        </div>
        <span className="font-bold text-[#003223] text-lg">Gas en Minutos</span>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-[#003223]/5">
        
        <div className="mb-6">
          <span className="text-[10px] font-bold bg-[#8CC850]/20 text-[#003223] px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block border border-[#8CC850]/40">
            ✅ Paso Único
          </span>
          <h1 className="text-2xl font-black text-[#003223] leading-tight mt-2">Completa tu perfil</h1>
          <p className="text-[13px] text-[#003223]/60 mt-1 font-medium">
            Solo te pediremos esta información una vez para que tus futuros pedidos sean instantáneos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-bold text-[#003223] mb-1">Nombre Completo</label>
              <input 
                type="text" 
                required
                placeholder="Ej. Juan Pérez"
                className="w-full h-11 px-3 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] bg-[#F5EBE1]/30 placeholder:text-[#003223]/30 text-[#003223] transition-all"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-bold text-[#003223] mb-1">DNI</label>
                <input 
                  type="text" 
                  required
                  pattern="[0-9]{8}"
                  placeholder="8 dígitos"
                  className="w-full h-11 px-3 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] bg-[#F5EBE1]/30 font-mono placeholder:text-[#003223]/30 text-[#003223] transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#003223] mb-1">Celular</label>
                <input 
                  type="tel" 
                  required
                  placeholder="999 999 999"
                  className="w-full h-11 px-3 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] bg-[#F5EBE1]/30 font-mono placeholder:text-[#003223]/30 text-[#003223] transition-all"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#003223]/10">
              <label className="block text-[12px] font-bold text-[#003223] mb-1">Distrito</label>
              <select 
                required
                defaultValue=""
                className="w-full h-11 px-3 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] bg-[#F5EBE1]/30 text-[#003223] transition-all"
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
              <label className="block text-[12px] font-bold text-[#003223] mb-1">Dirección Exacta</label>
              <input 
                type="text" 
                required
                placeholder="Ej. Av. Principal 123, Mz A Lt 5"
                className="w-full h-11 px-3 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] bg-[#F5EBE1]/30 placeholder:text-[#003223]/30 text-[#003223] transition-all"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#003223] mb-1">Referencia <span className="font-normal text-[#003223]/40">(Opcional)</span></label>
              <input 
                type="text" 
                placeholder="Frente a la bodega de la esquina"
                className="w-full h-11 px-3 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] bg-[#F5EBE1]/30 placeholder:text-[#003223]/30 text-[#003223] transition-all"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#FF6400] hover:bg-[#E65A00] text-white rounded-xl h-12 text-[14px] font-bold shadow-md shadow-[#FF6400]/20 mt-6 transition-all hover:scale-[1.02] active:scale-95"
          >
            {loading ? "Guardando perfil..." : "Guardar e Ir al Portal →"}
          </Button>
        </form>
        
      </div>
    </div>
  );
}
