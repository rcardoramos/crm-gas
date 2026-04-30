"use client";

import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  // Ocultar header SOLO en la app del driver (móvil)
  if (pathname === "/driver" || pathname.startsWith("/driver/")) return null;

  return (
    <header className="h-16 bg-white border-b border-zinc-200/60 flex items-center justify-between px-8 shrink-0">
      <h1 className="text-[15px] font-semibold text-zinc-900">Panel</h1>
      <div className="flex items-center space-x-4">
        <select className="h-8 px-2 text-[13px] text-zinc-900 border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-zinc-400 font-medium">
          <option value="all">Todas las sedes</option>
          <option value="sede-1">Sede Lima Norte</option>
          <option value="sede-2">Sede Lima Sur</option>
        </select>
        <input
          type="text"
          placeholder="Buscar..."
          className="hidden md:block w-56 h-8 px-3 text-[13px] text-zinc-900 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400 shadow-sm bg-white"
        />
      </div>
    </header>
  );
}
