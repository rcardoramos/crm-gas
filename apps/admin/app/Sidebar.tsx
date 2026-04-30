"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Pedidos", href: "/pedidos" },
  { label: "Drivers", href: "/drivers" },
  { label: "Clientes", href: "/clientes" },
  { label: "Productos", href: "/productos" },
  { label: "Campañas", href: "/promociones" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#FBFBFB] border-r border-zinc-200/60 flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-zinc-200/60">
        <span className="font-bold text-[15px] text-zinc-900 tracking-tight">Gas Admin</span>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 text-[14px] font-medium rounded-md transition-colors ${
                isActive
                  ? "text-zinc-900 bg-zinc-200/40"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
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
  );
}
