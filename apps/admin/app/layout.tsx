import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM | Gas en Minutos",
  description: "Panel de administración",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white flex h-screen overflow-hidden text-zinc-900`}>
        {/* Sidebar */}
        <aside className="w-64 bg-[#FBFBFB] border-r border-zinc-200/60 flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-zinc-200/60">
            <span className="font-bold text-[15px] text-zinc-900 tracking-tight">Gas Admin</span>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            <Link href="/" className="flex items-center px-3 py-2 text-[14px] font-medium rounded-md text-zinc-900 bg-zinc-200/40">
              Dashboard
            </Link>
            <Link href="/pedidos" className="flex items-center px-3 py-2 text-[14px] font-medium rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40 transition-colors">
              Pedidos
            </Link>
            <Link href="/conductores" className="flex items-center px-3 py-2 text-[14px] font-medium rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40 transition-colors">
              Conductores
            </Link>
            <Link href="/clientes" className="flex items-center px-3 py-2 text-[14px] font-medium rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40 transition-colors">
              Clientes
            </Link>
            <Link href="/promociones" className="flex items-center px-3 py-2 text-[14px] font-medium rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40 transition-colors">
              Campañas
            </Link>
          </nav>
          <div className="p-4 border-t border-zinc-200/60">
            <div className="flex items-center px-2">
              <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-[11px] font-bold text-zinc-700">A</div>
              <div className="ml-3">
                <p className="text-[13px] font-medium text-zinc-900 leading-tight">Admin</p>
                <p className="text-[12px] text-zinc-500 leading-tight">admin@gas.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
          <header className="h-16 bg-white border-b border-zinc-200/60 flex items-center justify-between px-8">
            <h1 className="text-[15px] font-semibold text-zinc-900">Panel</h1>
            <div className="flex items-center space-x-4">
              <select className="h-8 px-2 text-[13px] border border-zinc-200 rounded-md bg-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-medium text-zinc-700">
                <option value="all">Todas las sedes</option>
                <option value="sede-1">Sede Lima Norte</option>
                <option value="sede-2">Sede Lima Sur</option>
              </select>
              <input type="text" placeholder="Buscar..." className="hidden md:block w-56 h-8 px-3 text-[13px] border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400 shadow-sm" />
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
