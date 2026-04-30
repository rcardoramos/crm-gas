import Link from "next/link";
import { Button } from "@repo/ui/button";
import { MOCK_PRODUCTOS } from "@repo/lib";

export default function PortalDashboard() {
  const activeOrder = {
    id: "921",
    status: "En Camino",
    time: "15 min aprox.",
  };

  // Solo productos activos en el dashboard
  const productosActivos = MOCK_PRODUCTOS.filter(p => p.activo);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <header className="bg-[#003223] text-[#F5EBE1] p-6 rounded-b-[2rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Hola, Ricardo 👋</h1>
            <p className="text-[#F5EBE1]/70 text-[13px] mt-0.5">Socio Premium</p>
          </div>
          <div className="text-right">
            <span className="bg-[#001f16] text-[#FF6400] text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-[#FF6400]/30 shadow-inner">
              ⭐ 450 pts
            </span>
          </div>
        </div>
      </header>

      <main className="p-5 space-y-6 -mt-4 relative z-10">

        {/* Active Order Widget */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#003223]/10 p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-bold text-[#003223]/50 uppercase tracking-wider">Tu Pedido #{activeOrder.id}</span>
            <span className="bg-[#FF6400]/10 text-[#FF6400] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide animate-pulse">
              {activeOrder.status}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF6400]/10 rounded-full flex items-center justify-center text-xl shrink-0">
              🚚
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#003223] leading-tight">El driver está cerca.</p>
              <p className="text-[12px] text-[#003223]/60 mt-1">Llegada estimada en <span className="font-bold text-[#003223]">{activeOrder.time}</span></p>
            </div>
          </div>
        </div>

        {/* Product Catalog — desde catálogo compartido */}
        <div className="flex justify-between items-end px-1 pt-2">
          <h2 className="text-[15px] font-bold text-[#003223]">Nuestros Productos</h2>
        </div>

        <div className="space-y-3">
          {productosActivos.map((prod) => (
            <div key={prod.id} className="bg-white border border-[#003223]/10 rounded-2xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F5EBE1] rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                  {prod.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[14px] font-bold text-[#003223]">{prod.nombre}</h3>
                    {prod.destacado && <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-1 py-0.5 rounded-md">⭐</span>}
                  </div>
                  <span className="font-bold text-[#003223]/60 text-[12px]">S/ {prod.precio.toFixed(2)}</span>
                </div>
              </div>
              <Button size="sm" asChild className="rounded-lg h-8 px-4 text-[12px] font-bold bg-[#003223] hover:bg-[#001f16] text-[#F5EBE1]">
                <Link href={`/portal/checkout?prod=${prod.id}`}>Pedir</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Banner Promo */}
        <div className="bg-[#FF6400] rounded-[2rem] p-5 text-white shadow-xl shadow-[#FF6400]/20 relative overflow-hidden">
          <div className="relative z-10 w-2/3">
            <h3 className="font-black text-lg leading-tight mb-1 text-white">¡Sábado de Descuento!</h3>
            <p className="text-[12px] text-white/90 mb-3 font-medium">Obtén S/ 5.00 de dscto en balones de 15kg.</p>
            <Button size="sm" className="bg-[#003223] text-[#F5EBE1] hover:bg-[#001f16] rounded-xl text-[12px] h-8 font-bold">
              Usar Cupón
            </Button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#8CC850] opacity-40 rounded-full blur-2xl"></div>
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-90 transform -rotate-12">
            🎟️
          </div>
        </div>

      </main>
    </div>
  );
}
