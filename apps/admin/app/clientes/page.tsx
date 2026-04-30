export default function ClientesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">Directorio de clientes registrados.</p>
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="Buscar cliente..." className="w-64 h-10 px-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900">Módulo en construcción</h3>
        <p className="text-sm text-gray-500 mt-2">Aquí verás la lista de clientes con búsqueda en tiempo real.</p>
      </div>
    </div>
  );
}
