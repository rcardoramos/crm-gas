import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function PortalDashboard() {
  // Mocking an active order
  const activeOrder = {
    id: "921",
    status: "En Camino",
    time: "15 min aprox.",
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-zinc-900 text-white p-6 rounded-b-[2rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Hola, Ricardo 👋</h1>
            <p className="text-zinc-400 text-[13px] mt-0.5">Socio Premium</p>
          </div>
          <div className="text-right">
            <span className="bg-zinc-800 text-yellow-400 text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-zinc-700">
              ⭐ 450 pts
            </span>
          </div>
        </div>
      </header>

      <main className="p-5 space-y-6 -mt-4 relative z-10">
        
        {/* Active Order Widget */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-zinc-100 p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Tu Pedido #{activeOrder.id}</span>
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide animate-pulse">
              {activeOrder.status}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-xl shrink-0">
              🚚
            </div>
            <div>
              <p className="text-[14px] font-medium text-zinc-900 leading-tight">El conductor está cerca.</p>
              <p className="text-[12px] text-zinc-500 mt-1">Llegada estimada en <span className="font-bold text-zinc-800">{activeOrder.time}</span></p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-[15px] font-bold text-zinc-900 px-1 pt-2">¿Qué necesitas hoy?</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Link href="/pedido" className="bg-white border border-zinc-200/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-zinc-200 transition-colors">
              🔥
            </div>
            <span className="text-[13px] font-medium text-zinc-900 text-center">Pedir de<br/>nuevo</span>
          </Link>
          
          <Link href="/portal/productos" className="bg-white border border-zinc-200/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-zinc-200 transition-colors">
              🛍️
            </div>
            <span className="text-[13px] font-medium text-zinc-900 text-center">Ver<br/>Catálogo</span>
          </Link>
        </div>

        {/* Banner Promo */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 w-2/3">
            <h3 className="font-bold text-lg leading-tight mb-1">¡Sábado de Descuento!</h3>
            <p className="text-[12px] text-white/80 mb-3">Obtén S/ 5.00 de dscto en balones de 15kg.</p>
            <Button size="sm" className="bg-white text-indigo-600 hover:bg-zinc-100 rounded-lg text-[12px] h-8">
              Usar Cupón
            </Button>
          </div>
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform -rotate-12">
            🎟️
          </div>
        </div>

      </main>
    </div>
  );
}
