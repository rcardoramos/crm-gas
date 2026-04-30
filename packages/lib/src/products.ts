// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTOS COMPARTIDOS — Gas en Minutos
// Este archivo es la única fuente de verdad para el catálogo de productos.
// Tanto el CRM (apps/admin) como la web del cliente (apps/web) lo importan.
//
// TODO: Cuando Supabase esté configurado, reemplazar MOCK_PRODUCTOS con:
//   const { data } = await supabase.from('productos').select('*').eq('activo', true);
// ─────────────────────────────────────────────────────────────────────────────

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  icon: string;
  activo: boolean;
  destacado: boolean;
};

export const MOCK_PRODUCTOS: Producto[] = [
  {
    id: "10kg",
    nombre: "Balón Normal 10kg",
    descripcion: "Ideal para el hogar. Uso estándar de cocina.",
    precio: 45.00,
    icon: "🟢",
    activo: true,
    destacado: false,
  },
  {
    id: "15kg",
    nombre: "Balón Premium 15kg",
    descripcion: "Mayor duración para familias grandes.",
    precio: 65.00,
    icon: "🔵",
    activo: true,
    destacado: true,
  },
  {
    id: "45kg",
    nombre: "Balón Industrial 45kg",
    descripcion: "Para restaurantes y negocios.",
    precio: 135.00,
    icon: "🏭",
    activo: true,
    destacado: false,
  },
];
