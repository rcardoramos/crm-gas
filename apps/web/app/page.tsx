import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5EBE1] font-sans selection:bg-[#FF6400] selection:text-white flex flex-col">
      {/* Header Global */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5EBE1]/80 backdrop-blur-md border-b border-[#003223]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF6400] rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-[#FF6400]/30">
              G
            </div>
            <span className="text-xl font-bold tracking-tight text-[#003223]">
              Gas en Minutos
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-bold text-[#003223]/80">
            <Link href="#beneficios" className="hover:text-[#FF6400] transition-colors">Beneficios</Link>
            <Link href="#socio-club" className="hover:text-[#FF6400] transition-colors">Socio Club</Link>
            <Link href="#promociones" className="hover:text-[#FF6400] transition-colors">Promociones</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-[14px] font-bold text-[#003223] hover:text-[#FF6400] transition-colors">
              Iniciar Sesión
            </Link>
            <Button asChild className="bg-[#003223] hover:bg-[#001f16] text-[#F5EBE1] rounded-xl px-6 h-11 font-bold shadow-md">
              <Link href="/login">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center pt-32 pb-20 px-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          <div className="inline-flex items-center rounded-full border border-[#003223]/20 bg-[#003223]/5 px-4 py-1.5 text-[13px] font-bold text-[#003223]">
            <span className="flex h-2 w-2 rounded-full bg-[#8CC850] mr-2 animate-pulse"></span>
            Cobertura activa en Lima Norte y Sur
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#003223] leading-[1.05]">
            Tu gas a tiempo. <br/>
            <span className="text-[#FF6400]">Sin complicaciones.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-[#003223]/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Pide desde tu celular, paga seguro y recibe tu balón en la puerta de tu casa en tiempo récord.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" asChild className="w-full sm:w-auto bg-[#FF6400] hover:bg-[#E65A00] text-white rounded-2xl text-[16px] px-10 py-7 h-auto font-bold shadow-xl shadow-[#FF6400]/30 transition-all hover:scale-105 active:scale-95">
              <Link href="/pedido">
                Pedir como Invitado
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-2 border-[#003223] text-[#003223] hover:bg-[#003223] hover:text-[#F5EBE1] bg-transparent rounded-2xl text-[16px] px-10 py-7 h-auto font-bold transition-all hover:scale-105 active:scale-95">
              <Link href="/login">
                Registrarse y Ganar Puntos
              </Link>
            </Button>
          </div>
          <p className="text-[12px] text-[#003223]/60 font-medium pt-2">No necesitas tarjeta de crédito para registrarte.</p>
        </div>

        {/* Features Section */}
        <div id="beneficios" className="grid md:grid-cols-3 gap-6 mt-32">
          {/* Card 1 */}
          <div className="bg-[#003223] p-8 rounded-[2rem] text-[#F5EBE1] shadow-2xl shadow-[#003223]/20 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[#FF6400] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
              🚀
            </div>
            <h3 className="text-xl font-bold mb-3">Entrega Flash</h3>
            <p className="text-[#F5EBE1]/80 text-[15px] leading-relaxed">
              Nuestros drivers están distribuidos estratégicamente para llegar a ti antes de que el agua hierva.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#8CC850] p-8 rounded-[2rem] text-[#003223] shadow-xl border border-transparent hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[#003223] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
              ⭐
            </div>
            <h3 className="text-xl font-bold mb-3">Socio Club</h3>
            <p className="text-[#003223]/80 text-[15px] leading-relaxed">
              Acumula puntos por cada pedido y canjéalos por balones gratis o descuentos exclusivos en tu portal.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] text-[#003223] shadow-xl border border-white hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-[#FF6400] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
              📱
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#FF6400]">Portal 1-Click</h3>
            <p className="text-[#003223]/80 text-[15px] leading-relaxed">
              Guarda tus direcciones y métodos de pago. Tu siguiente pedido estará a literalmente un solo botón de distancia.
            </p>
          </div>
        </div>

        {/* Promos Banner */}
        <div id="promociones" className="mt-24 bg-[#FF6400] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl shadow-[#FF6400]/30 relative overflow-hidden">
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">Obtén S/ 5.00 Dcto.</h2>
            <p className="text-lg text-white/90 font-medium">
              Regístrate hoy, completa tu Onboarding y recibe un cupón de bienvenida automático para tu primer pedido de 15kg.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Button size="lg" asChild className="bg-[#003223] hover:bg-[#001f16] text-[#F5EBE1] rounded-2xl text-[16px] px-10 py-7 h-auto font-bold shadow-xl transition-all hover:scale-105">
              <Link href="/login">
                Reclamar mi Cupón
              </Link>
            </Button>
          </div>
          {/* Decoración */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#8CC850] opacity-40 rounded-full blur-3xl"></div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#003223]/10 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-[13px] font-bold text-[#003223]/60">
          <p>© {new Date().getFullYear()} Gas en Minutos CRM. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#FF6400]">Términos</Link>
            <Link href="#" className="hover:text-[#FF6400]">Privacidad</Link>
            <Link href="/login" className="hover:text-[#FF6400]">Staff CRM</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
