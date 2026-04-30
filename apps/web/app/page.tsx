import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <main className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          Servicio activo en tu zona
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
          Gas en minutos, <br className="hidden md:block"/> sin complicaciones.
        </h1>
        
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Pide tu balón de gas desde el celular y recíbelo en la puerta de tu casa en tiempo récord. Simple, rápido y seguro.
        </p>

        <div className="pt-8">
          <Button size="lg" asChild className="rounded-full text-lg px-8 py-6 h-auto shadow-xl shadow-black/10 hover:shadow-black/20 transition-all hover:-translate-y-1">
            <Link href="/pedido">
              Pedir Ahora
            </Link>
          </Button>
        </div>
      </main>
      
      <footer className="absolute bottom-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Gas en Minutos. Todos los derechos reservados.
      </footer>
    </div>
  );
}
