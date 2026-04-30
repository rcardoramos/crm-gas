export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="bg-white p-5 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 flex flex-col">
          <span className="text-[13px] font-medium text-zinc-500">Pedidos Hoy</span>
          <span className="text-2xl font-semibold mt-1 text-zinc-900">24</span>
          <span className="text-[12px] text-emerald-600 mt-2 font-medium flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L11 6L9.6 7.4L6.9 4.8V11H5.1V4.8L2.4 7.4L1 6L6 1Z" fill="currentColor"/></svg>
            12% vs ayer
          </span>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 flex flex-col">
          <span className="text-[13px] font-medium text-zinc-500">Ingresos Hoy</span>
          <span className="text-2xl font-semibold mt-1 text-zinc-900">S/ 1,240</span>
          <span className="text-[12px] text-emerald-600 mt-2 font-medium flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L11 6L9.6 7.4L6.9 4.8V11H5.1V4.8L2.4 7.4L1 6L6 1Z" fill="currentColor"/></svg>
            5% vs ayer
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 flex flex-col">
          <span className="text-[13px] font-medium text-zinc-500">Pedidos Pendientes</span>
          <span className="text-2xl font-semibold mt-1 text-orange-600">5</span>
          <span className="text-[12px] text-zinc-400 mt-2 font-medium flex items-center gap-1">
            Requieren atención
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-zinc-200/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100">
          <h2 className="text-[14px] font-semibold text-zinc-800">Últimos Pedidos</h2>
        </div>
        <div className="p-6 text-center text-[13px] text-zinc-500">
          Implementar lista aquí
        </div>
      </div>
    </div>
  );
}
