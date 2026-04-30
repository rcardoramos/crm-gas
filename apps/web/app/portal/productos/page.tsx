import Link from "next/link";
import { Button } from "@repo/ui/button";
import { MOCK_PRODUCTOS } from "@repo/lib";

export default function PortalProductos() {
  // Mostrar solo productos activos
  const productosActivos = MOCK_PRODUCTOS.filter(p => p.activo);

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header Fijo Estilo App */}
      <header className="bg-white border-b border-[#003223]/10 p-4 sticky top-0 z-20 flex items-center justify-center">
        <h1 className="text-[16px] font-bold text-[#003223]">Nuestros Productos</h1>
      </header>

      <main className="p-5 space-y-4">
        {productosActivos.map((prod) => (
          <div key={prod.id} className="bg-white border border-[#003223]/10 rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 group hover:-translate-y-0.5 transition-transform">
            <div className="w-16 h-16 bg-[#F5EBE1] rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              {prod.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-bold text-[#003223] leading-tight">{prod.nombre}</h2>
                {prod.destacado && (
                  <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-200">
                    ⭐ TOP
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#003223]/60 mt-0.5 leading-snug">{prod.descripcion}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-[#003223]">S/ {prod.precio.toFixed(2)}</span>
                <Button size="sm" asChild className="rounded-lg h-7 px-3 text-[11px] font-bold bg-[#FF6400] hover:bg-[#E65A00] text-white shadow-sm shadow-[#FF6400]/20">
                  <Link href={`/portal/checkout?prod=${prod.id}`}>Pedir</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 bg-[#003223] rounded-2xl p-5 text-center">
          <span className="text-2xl mb-2 block">🔧</span>
          <h3 className="text-[13px] font-bold text-[#F5EBE1]">¿Necesitas instalación?</h3>
          <p className="text-[11px] text-[#F5EBE1]/70 mt-1">Todos nuestros pedidos incluyen instalación y revisión de fugas sin costo extra.</p>
        </div>
      </main>
    </div>
  );
}
