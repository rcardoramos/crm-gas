export default function ConductoresPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Conductores</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de conductores y pagos pendientes.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
          Nuevo Conductor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900">Módulo en construcción</h3>
        <p className="text-sm text-gray-500 mt-2">Aquí verás la lista de conductores, sus ganancias y podrás marcar sus pagos.</p>
      </div>
    </div>
  );
}
