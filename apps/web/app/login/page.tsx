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
      <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-6 animate-in fade-in duration-500">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl shadow-black/5 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✉️
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Revisa tu correo</h2>
          <p className="text-[13px] text-zinc-500 mb-6 leading-relaxed">
            Hemos enviado un enlace mágico a <span className="font-bold text-zinc-800">{email}</span>. Haz clic en el enlace para iniciar sesión.
          </p>
          <p className="text-[11px] text-zinc-400 mb-6">
            (Para esta demo, asume que hiciste click en el correo y continuarás al Onboarding)
          </p>
          <Button asChild className="w-full bg-zinc-900 text-white rounded-xl h-11 text-[13px] font-bold">
            <Link href="/onboarding">Continuar a Onboarding (Demo)</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            G
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Gas en Minutos</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Ingresa a tu portal de cliente</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-black/5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-zinc-700 mb-1.5">Tu correo electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full h-11 px-4 text-[13px] border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all bg-zinc-50/50"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 text-[13px] font-bold shadow-sm"
            >
              {loading ? "Enviando..." : "Enviar Enlace Mágico"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[11px] text-zinc-400">
              No necesitas contraseña. Te enviaremos un link seguro para entrar instantáneamente.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-[13px] font-bold text-zinc-500 hover:text-zinc-900 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
