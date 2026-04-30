-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: sedes
CREATE TABLE public.sedes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  estado TEXT DEFAULT 'activa', -- activa, inactiva
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE, -- Linked to auth.users
  sede_id UUID REFERENCES public.sedes(id), -- Opcional
  nombre TEXT NOT NULL,
  dni TEXT UNIQUE,
  telefono TEXT NOT NULL,
  direccion TEXT NOT NULL,
  referencia TEXT,
  tipo_cliente TEXT DEFAULT 'residencial',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: productos
CREATE TABLE public.productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  precio NUMERIC(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0
);

-- Table: conductores (Empleados)
CREATE TABLE public.conductores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE, -- Linked to auth.users
  sede_id UUID REFERENCES public.sedes(id) NOT NULL,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  vehiculo TEXT,
  estado TEXT DEFAULT 'activo' -- activo, ocupado, fuera_de_servicio
);

-- Table: pedidos
CREATE TABLE public.pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID REFERENCES public.clientes(id),
  sede_id UUID REFERENCES public.sedes(id) NOT NULL,
  conductor_id UUID REFERENCES public.conductores(id),
  origen TEXT DEFAULT 'web', -- web, manual_crm, telefono, whatsapp
  estado TEXT DEFAULT 'pendiente', -- pendiente, validado, asignado, en_camino, entregado, no_entregado, cancelado
  total NUMERIC(10, 2) NOT NULL,
  metodo_pago TEXT,
  notas TEXT,
  fecha_entrega TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: asignaciones (Historial de cambios de estado / asignaciones por pedido)
-- Simplificada ya que las ganancias fueron removidas
CREATE TABLE public.asignaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID REFERENCES public.pedidos(id) NOT NULL,
  conductor_id UUID REFERENCES public.conductores(id) NOT NULL,
  estado TEXT DEFAULT 'asignado',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: promociones
CREATE TABLE public.promociones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  codigo TEXT UNIQUE NOT NULL,
  fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_fin TIMESTAMP WITH TIME ZONE,
  tipo_descuento TEXT DEFAULT 'monto_fijo', -- monto_fijo, porcentaje
  valor_descuento NUMERIC(10, 2) NOT NULL,
  estado TEXT DEFAULT 'activa', -- activa, pausada, expirada
  color_theme TEXT DEFAULT 'from-blue-500 to-indigo-600',
  usos INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) - Basic Setup
ALTER TABLE public.sedes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conductores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asignaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promociones ENABLE ROW LEVEL SECURITY;

-- Allow anon inserts for web (For MVP/Testing without Auth)
CREATE POLICY "Allow public inserts on clientes" ON public.clientes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public inserts on pedidos" ON public.pedidos FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow full access for anon for now (development only)
CREATE POLICY "Allow all on sedes" ON public.sedes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on clientes" ON public.clientes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on pedidos" ON public.pedidos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on productos" ON public.productos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on conductores" ON public.conductores FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on asignaciones" ON public.asignaciones FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on promociones" ON public.promociones FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE pedidos;
ALTER PUBLICATION supabase_realtime ADD TABLE asignaciones;
ALTER PUBLICATION supabase_realtime ADD TABLE clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE conductores;
ALTER PUBLICATION supabase_realtime ADD TABLE sedes;
ALTER PUBLICATION supabase_realtime ADD TABLE promociones;
