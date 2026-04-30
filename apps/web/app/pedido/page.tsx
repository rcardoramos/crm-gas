"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

// Normally we would use createSupabaseClient here.
// import { createSupabaseClient } from "@repo/lib";

export default function PedidoPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Supabase insertion for now
    // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    // const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
    // ... logic to insert into clientes and pedidos ...

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="h-24 w-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Pedido Recibido!</h1>
        <p className="text-xl text-gray-500 max-w-md mx-auto mb-8">
          Tu balón de gas está en camino. Te contactaremos pronto para confirmar la entrega.
        </p>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-8 left-8 text-sm font-medium text-gray-500 hover:text-black transition-colors">
        ← Volver
      </Link>

      <main className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-black/5 animate-in slide-in-from-bottom-8 fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Detalles del pedido</h1>
          <p className="text-sm text-gray-500">Ingresa tus datos para enviar el balón.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" required placeholder="Ej. Juan Pérez" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" required type="tel" placeholder="999 999 999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="producto">Producto</Label>
              <select id="producto" required className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="10kg">Balón 10kg</option>
                <option value="15kg">Balón 15kg</option>
                <option value="45kg">Balón 45kg</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sede">Zona / Distrito</Label>
            <select id="sede" required defaultValue="" className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="" disabled>Selecciona tu zona...</option>
              <option value="sede-1">Lima Norte (Comas, Los Olivos, SMP)</option>
              <option value="sede-2">Lima Sur (Chorrillos, SJM, VMT)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección exacta</Label>
            <Input id="direccion" required placeholder="Av. Principal 123" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pago">Método de pago</Label>
            <select id="pago" required className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="efectivo">Efectivo</option>
              <option value="yape">Yape / Plin</option>
              <option value="tarjeta">Tarjeta (POS)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas">Notas (Opcional)</Label>
            <Input id="notas" placeholder="Ej. Tocar el timbre 2 veces" />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-xl text-md h-12 mt-4" disabled={loading}>
            {loading ? "Procesando..." : "Confirmar Pedido"}
          </Button>
        </form>
      </main>
    </div>
  );
}
