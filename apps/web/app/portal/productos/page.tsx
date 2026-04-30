import Link from "next/link";
import { Button } from "@repo/ui/button";

const MOCK_PRODUCTS = [
  { id: "10kg", name: "Balón Normal 10kg", price: 45.00, icon: "🟢", desc: "Ideal para el hogar. Uso estándar de cocina." },
  { id: "15kg", name: "Balón Premium 15kg", price: 65.00, icon: "🔵", desc: "Mayor duración para familias grandes." },
  { id: "45kg", name: "Balón Industrial 45kg", price: 135.00, icon: "🏭", desc: "Para restaurantes y negocios." },
];

export default function PortalProductos() {
  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header Fijo Estilo App */}
      <header className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-20 flex items-center justify-center">
        <h1 className="text-[16px] font-bold text-zinc-900">Nuestros Productos</h1>
      </header>

      <main className="p-5 space-y-4">
        {MOCK_PRODUCTS.map((prod) => (
          <div key={prod.id} className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 group">
            <div className="w-16 h-16 bg-zinc-50 rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              {prod.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-[15px] font-bold text-zinc-900 leading-tight">{prod.name}</h2>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{prod.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-zinc-900">S/ {prod.price.toFixed(2)}</span>
                <Button size="sm" asChild className="rounded-lg h-7 px-3 text-[11px] font-bold bg-zinc-900 hover:bg-zinc-800">
                  <Link href={`/portal/checkout?prod=${prod.id}`}>Pedir</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 bg-zinc-100 rounded-2xl p-5 text-center">
          <span className="text-2xl mb-2 block">🔧</span>
          <h3 className="text-[13px] font-bold text-zinc-800">¿Necesitas instalación?</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Todos nuestros pedidos incluyen instalación y revisión de fugas sin costo extra.</p>
        </div>
      </main>
    </div>
  );
}
