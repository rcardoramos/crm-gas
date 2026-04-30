import Link from "next/link";

const MOCK_HISTORY = [
  { id: "920", date: "12 de Oct, 2023", product: "Balón 10kg", price: 45.00, status: "entregado" },
  { id: "845", date: "02 de Sep, 2023", product: "Balón 10kg", price: 45.00, status: "entregado" },
  { id: "712", date: "15 de Ago, 2023", product: "Balón 15kg", price: 65.00, status: "entregado" },
  { id: "650", date: "01 de Jul, 2023", product: "Balón 10kg", price: 45.00, status: "cancelado" },
];

export default function PortalHistorial() {
  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-300">
      <header className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-20 flex items-center justify-center">
        <h1 className="text-[16px] font-bold text-zinc-900">Historial de Pedidos</h1>
      </header>

      <main className="p-5">
        <div className="space-y-4">
          {MOCK_HISTORY.map((order) => (
            <div key={order.id} className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
              {/* Decoración lateral */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${order.status === 'entregado' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
              
              <div className="flex justify-between items-start mb-2 pl-2">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Pedido #{order.id}</span>
                  <h3 className="text-[14px] font-bold text-zinc-900 leading-tight">{order.product}</h3>
                </div>
                <span className="font-bold text-zinc-900">S/ {order.price.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center pl-2 mt-3 pt-3 border-t border-zinc-100">
                <span className="text-[12px] text-zinc-500 flex items-center gap-1.5">
                  <span className="text-[10px]">📅</span> {order.date}
                </span>
                
                {order.status === 'entregado' ? (
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Entregado</span>
                ) : (
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Cancelado</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {MOCK_HISTORY.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl filter grayscale opacity-30 mb-4">📜</span>
            <p className="text-[14px] font-medium text-zinc-500">Aún no tienes pedidos.</p>
            <Link href="/portal/productos" className="mt-4 text-[13px] font-bold text-blue-600 underline">
              Hacer mi primer pedido
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
