-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: clientes
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
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

-- Table: pedidos
CREATE TABLE public.pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID REFERENCES public.clientes(id),
  origen TEXT DEFAULT 'web',
  estado TEXT DEFAULT 'pendiente', -- pendiente, validado, en_camino, entregado, cancelado
  total NUMERIC(10, 2) NOT NULL,
  metodo_pago TEXT,
  notas TEXT,
  fecha_entrega TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: conductores
CREATE TABLE public.conductores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  vehiculo TEXT,
  estado TEXT DEFAULT 'activo'
);

-- Table: asignaciones
CREATE TABLE public.asignaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID REFERENCES public.pedidos(id),
  conductor_id UUID REFERENCES public.conductores(id),
  estado TEXT DEFAULT 'asignado',
  ganancia_conductor NUMERIC(10, 2),
  pago_estado TEXT DEFAULT 'pendiente' -- pendiente, pagado
);

-- RLS (Row Level Security) - Basic Setup (Assuming CRM admin has full access and web can insert)
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conductores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asignaciones ENABLE ROW LEVEL SECURITY;

-- Allow anon inserts for web
CREATE POLICY "Allow public inserts on clientes" ON public.clientes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public inserts on pedidos" ON public.pedidos FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow full access for anon for now (development only - IN PRODUCTION SHOULD BE RESTRICTED TO AUTHENTICATED)
CREATE POLICY "Allow all on clientes" ON public.clientes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on pedidos" ON public.pedidos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on productos" ON public.productos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on conductores" ON public.conductores FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on asignaciones" ON public.asignaciones FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Enable realtime for pedidos and asignaciones
ALTER PUBLICATION supabase_realtime ADD TABLE pedidos;
ALTER PUBLICATION supabase_realtime ADD TABLE asignaciones;
ALTER PUBLICATION supabase_realtime ADD TABLE clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE conductores;
