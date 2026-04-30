"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<"admin" | "conductor" | null>(null);

  const handleSimulatedLogin = (role: "admin" | "conductor") => {
    setLoadingRole(role);
    
    // Simulate Supabase login & role routing
    setTimeout(() => {
      setLoadingRole(null);
      if (role === "admin") {
        router.push("/");
      } else {
        router.push("/driver");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center items-center p-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold border border-zinc-200">
            A
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Gas en Minutos</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Acceso para personal autorizado</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">Correo Corporativo</label>
            <input 
              type="email" 
              defaultValue="staff@gas.com"
              className="w-full h-11 px-4 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all bg-zinc-50/50"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">Contraseña</label>
            <input 
              type="password" 
              defaultValue="********"
              className="w-full h-11 px-4 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all bg-zinc-50/50"
            />
          </div>
        </div>
        
        <div className="mt-8 border-t border-zinc-100 pt-6">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center mb-4">Simular enrutamiento por roles</p>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => handleSimulatedLogin("admin")}
              disabled={loadingRole !== null}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 text-[13px] font-bold shadow-sm"
            >
              {loadingRole === "admin" ? "Cargando..." : "Entrar Admin"}
            </Button>
            <Button 
              onClick={() => handleSimulatedLogin("conductor")}
              disabled={loadingRole !== null}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 text-[13px] font-bold shadow-sm"
            >
              {loadingRole === "conductor" ? "Cargando..." : "Entrar Conductor"}
            </Button>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-zinc-500 text-[12px]">
        <p>© 2026 Gas en Minutos CRM.</p>
        <p>Uso exclusivo interno.</p>
      </div>

    </div>
  );
}
