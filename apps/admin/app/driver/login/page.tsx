"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginDriver } from "../../actions/attendance";

export default function DriverLoginPage() {
  const router = useRouter();
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginDriver(telefono);

    if (result.ok && result.driver) {
      // Guardar sesión en localStorage
      localStorage.setItem("driver_session", JSON.stringify({
        id: result.driver.id,
        nombre: result.driver.nombre,
        sede: result.driver.sede,
        telefono: result.driver.telefono,
        vehiculo: result.driver.vehiculo,
        placa: result.driver.placa,
        entrada: new Date().toISOString(),
      }));
      router.push("/driver");
    } else {
      setError(result.error || "Error al iniciar sesión");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#003223] flex items-center justify-center p-5">
      <div className="w-full max-w-sm">
        {/* Logo / Branding */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#FF6400] rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-2xl shadow-[#FF6400]/30">
            🛢️
          </div>
          <h1 className="text-2xl font-black text-[#F5EBE1]">Gas en Minutos</h1>
          <p className="text-[#F5EBE1]/60 text-[13px] mt-1">Portal del Driver</p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-3xl p-7 shadow-2xl">
          <h2 className="text-[18px] font-black text-[#003223] mb-1">Iniciar Turno</h2>
          <p className="text-[13px] text-zinc-500 mb-6">Ingresa tu número de celular para comenzar</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-zinc-600 mb-1.5">
                Número de Celular
              </label>
              <div className="flex items-center border-2 border-zinc-200 rounded-2xl overflow-hidden focus-within:border-[#003223] transition-colors bg-zinc-50">
                <span className="px-4 text-zinc-500 text-[14px] font-bold border-r border-zinc-200 py-3 bg-white">
                  🇵🇪 +51
                </span>
                <input
                  type="tel"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  placeholder="999 999 999"
                  maxLength={9}
                  className="flex-1 px-4 py-3 text-[16px] font-bold text-zinc-900 bg-zinc-50 focus:outline-none placeholder:text-zinc-300 placeholder:font-normal"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-[12px] text-red-700 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || telefono.replace(/\D/g, "").length < 9}
              className="w-full bg-[#FF6400] text-white py-4 rounded-2xl text-[15px] font-black hover:bg-[#E65A00] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF6400]/25 active:scale-95"
            >
              {loading ? "Verificando..." : "Iniciar Turno →"}
            </button>
          </form>

          <p className="text-center text-[11px] text-zinc-400 mt-5">
            ¿No puedes ingresar? Contacta al administrador para que registre tu número.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#F5EBE1]/30 mt-6">
          Gas en Minutos © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
