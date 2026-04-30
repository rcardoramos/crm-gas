"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function LoginCliente() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Magic Link sent
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F5EBE1] flex flex-col justify-center items-center p-6 animate-in fade-in duration-500">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl shadow-[#003223]/5 text-center">
          <div className="w-16 h-16 bg-[#F5EBE1] text-[#FF6400] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✉️
          </div>
          <h2 className="text-2xl font-bold text-[#003223] mb-2">Revisa tu correo</h2>
          <p className="text-[13px] text-[#003223]/70 mb-6 leading-relaxed">
            Hemos enviado un enlace mágico a <span className="font-bold text-[#003223]">{email}</span>. Haz clic en el enlace para iniciar sesión.
          </p>
          <p className="text-[11px] text-[#003223]/40 mb-6">
            (Para esta demo, asume que hiciste click en el correo y continuarás al Onboarding)
          </p>
          <Button asChild className="w-full bg-[#FF6400] hover:bg-[#E65A00] text-white rounded-xl h-11 text-[13px] font-bold">
            <Link href="/onboarding">Continuar a Onboarding (Demo)</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EBE1] flex flex-col justify-center items-center p-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#003223] text-[#F5EBE1] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-xl shadow-[#003223]/30">
            G
          </div>
          <h1 className="text-2xl font-black text-[#003223]">Gas en Minutos</h1>
          <p className="text-[13px] text-[#003223]/60 mt-1 font-medium">Ingresa a tu portal de cliente</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#003223]/5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-[#003223] mb-1.5">Tu correo electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full h-11 px-4 text-[13px] border border-[#003223]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6400]/30 focus:border-[#FF6400] transition-all bg-[#F5EBE1]/30 placeholder:text-[#003223]/30 text-[#003223]"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#FF6400] hover:bg-[#E65A00] text-white rounded-xl h-11 text-[13px] font-bold shadow-md shadow-[#FF6400]/20"
            >
              {loading ? "Enviando..." : "Enviar Enlace Mágico ✨"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[11px] text-[#003223]/50">
              No necesitas contraseña. Te enviaremos un link seguro para entrar instantáneamente.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#003223]/10"></div>
            <span className="text-[11px] font-bold text-[#003223]/40">O también</span>
            <div className="flex-1 h-px bg-[#003223]/10"></div>
          </div>
          <Button variant="outline" asChild className="w-full border-2 border-[#003223]/20 text-[#003223] hover:bg-[#003223] hover:text-[#F5EBE1] bg-white rounded-xl h-11 text-[13px] font-bold transition-all">
            <Link href="/pedido">Pedir como Invitado →</Link>
          </Button>
          <Link href="/" className="block text-[13px] font-bold text-[#003223]/50 hover:text-[#003223] transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
