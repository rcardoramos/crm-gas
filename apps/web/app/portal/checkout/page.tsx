"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { supabase } from "@repo/lib";

export default function PortalCheckout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<{id: number, title: string, discount: number, icon: string} | null>(null);
  
  // Mocks para el Checkout Express
  const userAddresses = [
    { id: 1, label: "Casa", address: "Av. Principal 123, Mz A Lt 5", district: "Comas" },
  ];
  
  const AVAILABLE_COUPONS = [
    { id: 1, title: "Fin de mes", discount: 5.00, desc: "S/ 5.00 de dscto en balones de 15kg.", icon: "🎟️" },
    { id: 2, title: "Día de la Madre", discount: 4.50, desc: "10% de descuento en tu pedido.", icon: "💝" },
  ];

  const selectedProduct = { name: "Balón Normal 10kg", price: 45.00, icon: "🟢" };
  const deliveryFee = 0.00;
  const discountAmount = selectedCoupon ? selectedCoupon.discount : 0;
  const total = selectedProduct.price + deliveryFee - discountAmount;

  const handleConfirmOrder = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with real authenticated user ID and their mapped sede_id
      // const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('pedidos')
        .insert({
          // cliente_id: userData.user?.id, 
          sede_id: "00000000-0000-0000-0000-000000000000", // Default o inferido por distrito
          origen: "web",
          estado: "pendiente",
          total: total,
          notas: "Pedido Express vía App"
        });

      if (error) throw error;
      
      alert("¡Pedido Confirmado! El conductor está en camino.");
      router.push("/portal");
    } catch (err) {
      console.error(err);
      alert("Para probar esta integración real, necesitas configurar tus variables de entorno de Supabase (.env.local)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-300 pb-24">
      {/* Header Estilo App */}
      <header className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-20 flex items-center">
        <button onClick={() => router.back()} className="text-xl mr-4 text-zinc-600 hover:text-zinc-900">
          ←
        </button>
        <h1 className="text-[16px] font-bold text-zinc-900">Confirmar Pedido</h1>
      </header>

      <main className="p-5 space-y-6">
        
        {/* Sección 1: Dirección de Entrega */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-[14px] font-bold text-zinc-900">Entregar en</h2>
            <button className="text-[12px] font-bold text-blue-600 hover:underline">
              Agregar nueva
            </button>
          </div>
          
          <div className="bg-white border-2 border-zinc-900 rounded-2xl p-4 shadow-sm relative">
            <div className="absolute top-4 right-4 text-zinc-900 text-lg">✓</div>
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">📍</span>
              <div>
                <h3 className="text-[14px] font-bold text-zinc-900">{userAddresses[0].label} ({userAddresses[0].district})</h3>
                <p className="text-[12px] text-zinc-500 mt-0.5 pr-6 leading-relaxed">
                  {userAddresses[0].address}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2: Resumen del Pedido */}
        <section>
          <h2 className="text-[14px] font-bold text-zinc-900 mb-3">Resumen de compra</h2>
          
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-xl">
                  {selectedProduct.icon}
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-zinc-900">{selectedProduct.name}</h3>
                  <p className="text-[11px] text-zinc-500">Cantidad: 1</p>
                </div>
              </div>
              <span className="font-bold text-[13px] text-zinc-900">S/ {selectedProduct.price.toFixed(2)}</span>
            </div>
            
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-[12px] text-zinc-500">
                <span>Subtotal</span>
                <span>S/ {selectedProduct.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[12px] text-zinc-500">
                <span>Delivery e Instalación</span>
                <span className="text-emerald-600 font-bold">Gratis</span>
              </div>
              {selectedCoupon && (
                <div className="flex justify-between text-[12px] font-bold text-blue-600 pt-2 border-t border-zinc-100">
                  <span>Cupón: {selectedCoupon.title}</span>
                  <span>- S/ {selectedCoupon.discount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sección 3: Socio Club / Cupones */}
        <section>
          <button 
            onClick={() => setIsCouponModalOpen(true)}
            className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:bg-zinc-100 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{selectedCoupon ? selectedCoupon.icon : '🎟️'}</span>
              <div>
                <h3 className="text-[13px] font-bold text-zinc-900">
                  {selectedCoupon ? selectedCoupon.title : 'Agregar Cupón'}
                </h3>
                <p className={`text-[11px] ${selectedCoupon ? 'text-blue-600 font-medium' : 'text-zinc-500'}`}>
                  {selectedCoupon ? `Ahorraste S/ ${selectedCoupon.discount.toFixed(2)}` : 'Promos o Socio Club'}
                </p>
              </div>
            </div>
            <span className="text-[20px] text-zinc-400">
              {selectedCoupon ? '✓' : '→'}
            </span>
          </button>
        </section>

      </main>

      {/* Footer Fijo con Total y Botón */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-4 pb-8 z-50 flex flex-col items-center justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:max-w-md md:mx-auto">
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-[13px] font-bold text-zinc-500">Total a pagar</span>
          <span className="text-[20px] font-bold text-zinc-900">S/ {total.toFixed(2)}</span>
        </div>
        <Button 
          onClick={handleConfirmOrder}
          disabled={loading}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 text-[14px] font-bold shadow-md"
        >
          {loading ? "Procesando..." : "Hacer Pedido"}
        </Button>
      </div>

      {/* Modal / Bottom Sheet de Cupones */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsCouponModalOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 pb-10 animate-in slide-in-from-bottom-full duration-300 md:max-w-md md:mx-auto md:w-full">
            <div className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mb-6" />
            <h2 className="text-[16px] font-bold text-zinc-900 mb-4">Cupones Disponibles</h2>
            
            <div className="space-y-3">
              {AVAILABLE_COUPONS.map((coupon) => (
                <button
                  key={coupon.id}
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    setIsCouponModalOpen(false);
                  }}
                  className={`w-full text-left bg-white border ${
                    selectedCoupon?.id === coupon.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-zinc-200/80 hover:border-zinc-300'
                  } rounded-2xl p-4 shadow-sm transition-all flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{coupon.icon}</span>
                    <div>
                      <h3 className="text-[14px] font-bold text-zinc-900">{coupon.title}</h3>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{coupon.desc}</p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600 text-[13px]">-S/ {coupon.discount.toFixed(2)}</span>
                </button>
              ))}
              
              <button
                  onClick={() => {
                    setSelectedCoupon(null);
                    setIsCouponModalOpen(false);
                  }}
                  className="w-full text-center py-3 text-[13px] font-bold text-zinc-500 hover:text-zinc-900 transition-colors mt-2"
                >
                  No usar cupón
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
