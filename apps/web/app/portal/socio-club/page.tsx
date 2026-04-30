import { Button } from "@repo/ui/button";

export default function PortalSocioClub() {
  const currentPoints = 450;
  const nextLevel = 500;
  const progressPercentage = (currentPoints / nextLevel) * 100;

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-300 bg-zinc-900 min-h-screen text-white">
      <header className="p-4 pt-6 flex items-center justify-between border-b border-zinc-800">
        <h1 className="text-[16px] font-bold">Socio Club ⭐</h1>
        <span className="text-[11px] font-medium bg-zinc-800 px-2 py-1 rounded-md text-zinc-300">Nivel Premium</span>
      </header>

      <main className="p-5">
        <div className="text-center my-8">
          <p className="text-[13px] text-zinc-400 uppercase tracking-widest font-bold mb-2">Tus Puntos</p>
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-amber-600 drop-shadow-sm">
            {currentPoints}
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 mb-8">
          <div className="flex justify-between text-[12px] font-medium mb-3">
            <span className="text-zinc-300">Nivel Premium</span>
            <span className="text-yellow-500">Nivel VIP ({nextLevel} pts)</span>
          </div>
          
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400 mt-3 text-center">
            Te faltan <span className="text-white font-bold">{nextLevel - currentPoints} pts</span> para ser VIP y obtener delivery gratis en todos tus pedidos.
          </p>
        </div>

        {/* Recompensas */}
        <h2 className="text-[14px] font-bold px-1 mb-4">Recompensas Disponibles</h2>
        
        <div className="space-y-3">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-700/50 rounded-lg flex items-center justify-center text-xl">
                💳
              </div>
              <div>
                <h3 className="text-[13px] font-bold leading-tight">Descuento S/ 10.00</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">Costo: 300 pts</p>
              </div>
            </div>
            <Button size="sm" className="bg-yellow-500 text-yellow-950 hover:bg-yellow-400 font-bold text-[11px] h-7 px-3">
              Canjear
            </Button>
          </div>

          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex items-center justify-between opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-700/50 rounded-lg flex items-center justify-center text-xl">
                🆓
              </div>
              <div>
                <h3 className="text-[13px] font-bold leading-tight">Balón 10kg Gratis</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">Costo: 1000 pts</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-zinc-700 px-2 py-1 rounded-md">Bloqueado</span>
          </div>
        </div>

        {/* Como ganar puntos */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <h3 className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest text-center mb-4">¿Cómo ganar puntos?</h3>
          <ul className="text-[12px] text-zinc-300 space-y-3">
            <li className="flex items-center gap-2"><span>🔥</span> Ganas 10 pts por cada S/ 10.00 de compra.</li>
            <li className="flex items-center gap-2"><span>📱</span> Ganas 50 pts extra si pides por la App.</li>
            <li className="flex items-center gap-2"><span>🎂</span> ¡Doble de puntos en el mes de tu cumpleaños!</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
