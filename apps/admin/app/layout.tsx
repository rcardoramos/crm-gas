import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM | Gas en Minutos",
  description: "Panel de administración",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white flex h-screen overflow-hidden text-zinc-900`}>
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
          <AdminHeader />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
