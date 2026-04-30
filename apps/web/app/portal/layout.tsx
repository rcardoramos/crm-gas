"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/portal", icon: "🏠" },
    { name: "Historial", href: "/portal/historial", icon: "📜" },
    { name: "Promo", href: "/portal/promociones", icon: "🎁" },
    { name: "Socio", href: "/portal/socio-club", icon: "⭐" },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl shadow-black/5 relative flex flex-col overflow-hidden pb-20">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-zinc-100 flex justify-around items-center h-16 z-50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                  isActive ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <span className="text-xl filter grayscale" style={{ filter: isActive ? "none" : "grayscale(100%) opacity(50%)" }}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
