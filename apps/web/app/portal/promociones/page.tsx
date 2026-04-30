import { Button } from "@repo/ui/button";

const MOCK_PROMOS = [
  { id: 1, title: "Fin de mes", desc: "S/ 5.00 de dscto en balones de 15kg.", code: "FINMES5", expires: "Vence en 2 días", color: "from-blue-500 to-indigo-600", icon: "🎟️" },
  { id: 2, title: "Día de la Madre", desc: "10% de descuento en tu próximo pedido.", code: "MAMA10", expires: "Vence en 15 días", color: "from-pink-500 to-rose-500", icon: "💝" },
];

export default function PortalPromociones() {
  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-300">
      <header className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-20 flex items-center justify-center">
        <h1 className="text-[16px] font-bold text-zinc-900">Promociones</h1>
      </header>

      <main className="p-5 space-y-6">
        <div className="space-y-4">
          <h2 className="text-[14px] font-bold text-zinc-900 px-1">Tus Cupones Activos</h2>
          
          {MOCK_PROMOS.map((promo) => (
            <div key={promo.id} className={`bg-gradient-to-br ${promo.color} rounded-2xl p-5 text-white shadow-md relative overflow-hidden group`}>
              <div className="relative z-10 w-3/4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-md mb-3 inline-block">
                  {promo.expires}
                </span>
                <h3 className="font-bold text-lg leading-tight mb-1">{promo.title}</h3>
                <p className="text-[12px] text-white/90 mb-4">{promo.desc}</p>
                
                <div className="flex items-center gap-2">
                  <div className="bg-black/20 px-3 py-1.5 rounded-lg text-[13px] font-mono font-bold tracking-wider border border-white/10 backdrop-blur-sm select-all">
                    {promo.code}
                  </div>
                  <button className="bg-white text-zinc-900 rounded-lg h-8 px-3 text-[11px] font-bold hover:bg-zinc-100 transition-colors">
                    Copiar
                  </button>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-500">
                {promo.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-2xl mb-2 block">🤝</span>
          <h3 className="text-[13px] font-bold text-zinc-800">Programa de Referidos</h3>
          <p className="text-[11px] text-zinc-500 mt-1 mb-4">Invita a un amigo y ambos ganan un cupón de S/ 10.00 en su próximo pedido.</p>
          <Button size="sm" className="w-full rounded-lg text-[12px] font-bold bg-zinc-900 text-white">
            Compartir mi código
          </Button>
        </div>
      </main>
    </div>
  );
}
