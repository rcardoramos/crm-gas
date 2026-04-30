"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@repo/lib";
import { logoutDriver } from "../actions/attendance";

type DriverSession = {
  id: string;
  nombre: string;
  sede: string;
  telefono: string;
  vehiculo: string;
  placa: string;
  entrada: string;
};

// Pedidos ya asignados a este driver
const MOCK_MIS_PEDIDOS = [
  { id: "1", cliente: "Juan Pérez", direccion: "Av. Principal 123, Comas", producto: "Balón 10kg", pago: "Efectivo", estado: "en_camino" },
  { id: "3", cliente: "Carlos Ruiz", direccion: "Jr. Pinos 890, Los Olivos", producto: "Balón 45kg", pago: "Yape", estado: "asignado" },
];

// Pedidos pendientes sin driver
const MOCK_DISPONIBLES = [
  { id: "6", cliente: "Ana Silva", distrito: "Comas", direccion: "Urb. Las Flores Mz. A Lt 3", producto: "Balón 15kg", pago: "Efectivo" },
  { id: "7", cliente: "Luis Torres", distrito: "Los Olivos", direccion: "Av. Universitaria 450", producto: "Balón 10kg", pago: "Yape" },
  { id: "8", cliente: "Rosa Mendoza", distrito: "San Martín de Porres", direccion: "Jr. Independencia 234", producto: "Balón 15kg", pago: "Tarjeta" },
];

function formatDuration(entradaISO: string): string {
  const entrada = new Date(entradaISO);
  const diffMs = Date.now() - entrada.getTime();
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function DriverAppPage() {
  const router = useRouter();
  const [session, setSession] = useState<DriverSession | null>(null);
  const [elapsed, setElapsed] = useState("");
  const [showEndShift, setShowEndShift] = useState(false);
  const [misPedidos, setMisPedidos] = useState(MOCK_MIS_PEDIDOS);
  const [disponibles, setDisponibles] = useState(MOCK_DISPONIBLES);

  // Verificar sesión y redirigir si no hay una
  useEffect(() => {
    const raw = localStorage.getItem("driver_session");
    if (!raw) { router.replace("/driver/login"); return; }
    setSession(JSON.parse(raw));
  }, [router]);

  // Reloj del turno — actualiza cada 30s
  useEffect(() => {
    if (!session) return;
    setElapsed(formatDuration(session.entrada));
    const interval = setInterval(() => setElapsed(formatDuration(session.entrada)), 30000);
    return () => clearInterval(interval);
  }, [session]);

  const handleEndShift = async () => {
    if (!session) return;
    await logoutDriver(session.id);
    localStorage.removeItem("driver_session");
    router.replace("/driver/login");
  };
  useEffect(() => {
    if (!isSupabaseConfigured) return; 

    // ─────────────────────────────────────────────────────────────
    // REALTIME: Escuchar pedidos nuevos (estado: "pendiente")
    // Cuando el cliente hace un pedido en la web, aparece aquí automáticamente.
    // ─────────────────────────────────────────────────────────────
    const channel = supabase
      .channel('driver-pedidos-disponibles')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'pedidos' },
        (payload) => {
          const nuevo = payload.new as any;
          // Solo mostrar si el pedido no tiene driver asignado
          if (!nuevo.conductor_id && nuevo.estado === 'pendiente') {
            setDisponibles(prev => [
              {
                id: nuevo.id,
                cliente: "Cliente Web",
                distrito: "Ver detalle",
                direccion: nuevo.notas || "Dirección del pedido",
                producto: "Balón",
                pago: "Efectivo",
              },
              ...prev,
            ]);
          }
        }
      )
      .on(
        'postgres_changes',
        // Cuando el admin o este mismo driver cambia el estado del pedido
        { event: 'UPDATE', schema: 'public', table: 'pedidos' },
        (payload) => {
          const actualizado = payload.new as any;

          // Si se asigna a otro driver, quitarlo de disponibles
          if (actualizado.conductor_id && actualizado.estado === 'asignado') {
            setDisponibles(prev => prev.filter(p => p.id !== actualizado.id));
          }

          // TODO: Si el conductor_id === session?.id, moverlo a "Mis Pedidos"
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const handleMarcarEntregado = async (id: string) => {
    // TODO: Descomentar cuando Supabase esté configurado:
    // await supabase.from('pedidos').update({ estado: 'entregado' }).eq('id', id);
    setMisPedidos(prev => prev.filter(p => p.id !== id));
  };

  const handleReportarFallo = async (id: string) => {
    // TODO: Descomentar cuando Supabase esté configurado:
    // await supabase.from('pedidos').update({ estado: 'no_entregado' }).eq('id', id);
    setMisPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: "fallo" } : p));
  };

  const handleIniciarRuta = async (id: string) => {
    // TODO: Descomentar cuando Supabase esté configurado:
    // await supabase.from('pedidos').update({ estado: 'en_camino' }).eq('id', id);
    setMisPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: "en_camino" } : p));
  };

  const handleAutoAsignar = async (pedido: typeof MOCK_DISPONIBLES[0]) => {
    // TODO: Descomentar cuando Supabase esté configurado:
    // await supabase.from('pedidos')
    //   .update({ estado: 'asignado', conductor_id: DRIVER_ID })
    //   .eq('id', pedido.id);

    // Por ahora, actualización local (optimistic update)
    setDisponibles(prev => prev.filter(p => p.id !== pedido.id));
    setMisPedidos(prev => [
      ...prev,
      { id: pedido.id, cliente: pedido.cliente, direccion: pedido.direccion, producto: pedido.producto, pago: pedido.pago, estado: "asignado" }
    ]);
  };

  const completadosHoy = 12;
  const enRuta = misPedidos.filter(p => p.estado === "en_camino").length;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#003223] flex items-center justify-center">
        <div className="text-[#F5EBE1]/60 text-[14px]">Cargando...</div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#F5EBE1] flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl shadow-black/5 relative flex flex-col text-zinc-900">
        
        {/* Header App Driver */}
        <header className="bg-[#003223] text-[#F5EBE1] p-5 pb-8 rounded-b-[2rem] shadow-md z-10">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-[#F5EBE1]/60 text-[11px] uppercase font-bold tracking-widest">Turno Activo · {elapsed}</p>
              <h1 className="text-xl font-black mt-0.5">Hola, {session.nombre.split(" ")[0]} 👋</h1>
              <p className="text-[#F5EBE1]/50 text-[11px] mt-0.5">{session.vehiculo} · {session.placa}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-[#8CC850] flex items-center justify-center border-[3px] border-[#001f16] shadow-lg">
                <span className="text-white text-[9px] font-black">Activo</span>
              </div>
              <button
                onClick={() => setShowEndShift(true)}
                className="text-[9px] font-bold text-[#F5EBE1]/50 hover:text-red-400 transition-colors uppercase tracking-wide"
              >
                Cerrar turno
              </button>
            </div>
          </div>

          {/* Stats del día */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#001f16] rounded-2xl p-3 text-center">
              <span className="text-[#F5EBE1]/60 text-[10px] font-bold uppercase block">Mis pedidos</span>
              <span className="font-black text-2xl text-white">{misPedidos.length}</span>
            </div>
            <div className="bg-[#001f16] rounded-2xl p-3 text-center">
              <span className="text-[#F5EBE1]/60 text-[10px] font-bold uppercase block">En ruta</span>
              <span className="font-black text-2xl text-[#FF6400]">{enRuta}</span>
            </div>
            <div className="bg-[#001f16] rounded-2xl p-3 text-center">
              <span className="text-[#F5EBE1]/60 text-[10px] font-bold uppercase block">Completados</span>
              <span className="font-black text-2xl text-[#8CC850]">{completadosHoy}</span>
            </div>
          </div>
        </header>

        {/* Contenido scrollable */}
        <main className="flex-1 p-5 -mt-4 pt-6 overflow-y-auto space-y-6 pb-8">

          {/* --- Sección 1: Mis Pedidos --- */}
          <section>
            <h2 className="text-[13px] font-black text-[#003223] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6400] inline-block"></span>
              Mis Pedidos ({misPedidos.length})
            </h2>
            
            {misPedidos.length === 0 ? (
              <div className="bg-[#F5EBE1]/50 border border-[#003223]/10 rounded-2xl p-6 text-center">
                <span className="text-3xl block mb-2">✅</span>
                <p className="text-[13px] font-bold text-[#003223]/70">¡Sin pedidos activos!</p>
                <p className="text-[11px] text-[#003223]/50 mt-1">Revisa los disponibles abajo.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {misPedidos.map((pedido, index) => (
                  <div key={pedido.id} className={`border-2 rounded-2xl p-4 transition-all shadow-sm ${
                    pedido.estado === "en_camino" 
                      ? "border-[#FF6400]/40 bg-[#FF6400]/5" 
                      : pedido.estado === "fallo"
                      ? "border-red-200 bg-red-50"
                      : "border-[#003223]/10 bg-white"
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#003223] text-[#F5EBE1] text-[11px] font-black">
                        {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide ${
                        pedido.estado === "en_camino" 
                          ? "bg-[#FF6400]/15 text-[#FF6400]"
                          : pedido.estado === "fallo"
                          ? "bg-red-100 text-red-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {pedido.estado === "en_camino" ? "🚚 En Camino" : pedido.estado === "fallo" ? "⚠️ Fallo" : "⏳ Asignado"}
                      </span>
                    </div>
                    
                    <h3 className="text-[15px] font-black text-[#003223] mb-0.5 leading-tight">{pedido.direccion}</h3>
                    <p className="text-[12px] text-[#003223]/60 mb-4">{pedido.cliente} · {pedido.producto}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-[#003223]/10">
                      <span className="text-[11px] font-bold text-[#003223]/50 bg-[#F5EBE1] px-2 py-1 rounded-lg">
                        💳 {pedido.pago}
                      </span>
                      
                      {pedido.estado === "en_camino" ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleReportarFallo(pedido.id)}
                            className="bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-[12px] font-bold hover:bg-red-100 transition-colors border border-red-200"
                          >
                            Fallo
                          </button>
                          <button 
                            onClick={() => handleMarcarEntregado(pedido.id)}
                            className="bg-[#8CC850] text-white px-4 py-1.5 rounded-xl text-[12px] font-black hover:bg-[#7ab840] transition-colors shadow-sm"
                          >
                            ✓ Entregado
                          </button>
                        </div>
                      ) : pedido.estado === "fallo" ? (
                        <span className="text-[11px] text-red-500 font-bold">Reportado al admin</span>
                      ) : (
                        <button 
                          onClick={() => handleIniciarRuta(pedido.id)}
                          className="bg-[#003223] text-[#F5EBE1] px-4 py-1.5 rounded-xl text-[12px] font-black hover:bg-[#001f16] transition-colors"
                        >
                          Iniciar Ruta 🚚
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* --- Sección 2: Pedidos Disponibles --- */}
          <section>
            <h2 className="text-[13px] font-black text-[#003223] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8CC850] inline-block animate-pulse"></span>
              Disponibles ({disponibles.length})
            </h2>

            {disponibles.length === 0 ? (
              <div className="bg-[#F5EBE1]/50 border border-[#003223]/10 rounded-2xl p-6 text-center">
                <span className="text-3xl block mb-2">🎉</span>
                <p className="text-[13px] font-bold text-[#003223]/70">No hay pedidos pendientes</p>
              </div>
            ) : (
              <div className="space-y-3">
                {disponibles.map((pedido) => (
                  <div key={pedido.id} className="border border-[#003223]/10 bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-[#8CC850] bg-[#8CC850]/10 px-2 py-1 rounded-lg uppercase tracking-wide">
                        📍 {pedido.distrito}
                      </span>
                      <span className="text-[10px] font-bold text-[#003223]/40">#{pedido.id.padStart(4, '0')}</span>
                    </div>
                    
                    <h3 className="text-[14px] font-bold text-[#003223] mb-0.5 leading-tight">{pedido.direccion}</h3>
                    <p className="text-[12px] text-[#003223]/60 mb-4">{pedido.cliente} · {pedido.producto}</p>
                    
                    <button
                      onClick={() => handleAutoAsignar(pedido)}
                      className="w-full bg-[#FF6400] hover:bg-[#E65A00] text-white py-2.5 rounded-xl text-[13px] font-black transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-[#FF6400]/20"
                    >
                      Asignarme este pedido →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

        </main>
      </div>
    </div>

    {/* Modal Cerrar Turno */}
    {showEndShift && (
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEndShift(false)} />
        <div className="relative bg-white rounded-t-3xl sm:rounded-3xl p-7 w-full max-w-sm text-zinc-900 animate-in slide-in-from-bottom-4 duration-300">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
              🌙
            </div>
            <h2 className="text-[18px] font-black text-zinc-900">Cerrar Turno</h2>
            <p className="text-[13px] text-zinc-500 mt-1">
              Llevas <span className="font-bold text-zinc-900">{elapsed}</span> trabajando hoy.
            </p>
            <p className="text-[12px] text-zinc-400 mt-2">Se registrará tu hora de salida automáticamente.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEndShift(false)}
              className="flex-1 h-12 rounded-2xl border-2 border-zinc-200 text-zinc-700 font-bold text-[14px] hover:bg-zinc-50"
            >
              Seguir trabajando
            </button>
            <button
              onClick={handleEndShift}
              className="flex-1 h-12 rounded-2xl bg-red-500 text-white font-black text-[14px] hover:bg-red-600 shadow-lg shadow-red-500/25"
            >
              Sí, cerrar turno
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
