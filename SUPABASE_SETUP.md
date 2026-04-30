# 🚀 Guía de Activación de Supabase — Gas en Minutos

Todo el código ya está preparado. Solo necesitas seguir estos pasos cuando tengas tu cuenta en [supabase.com](https://supabase.com).

---

## Paso 1: Crear el proyecto en Supabase

1. Ir a [https://supabase.com](https://supabase.com) y crear una cuenta.
2. Crear un nuevo proyecto (anotar la contraseña de la BD).
3. Esperar ~2 minutos a que se aprovisione.

---

## Paso 2: Ejecutar el esquema de base de datos

1. En el dashboard de Supabase, ir a **SQL Editor**.
2. Copiar y pegar todo el contenido del archivo `packages/lib/schema.sql`.
3. Hacer clic en **Run** (▶️).

---

## Paso 3: Activar Realtime en la tabla `pedidos`

1. En el dashboard, ir a **Database → Replication**.
2. En la sección **Tables**, activar el toggle de la tabla **`pedidos`**.

Esto permite que el CRM y la App del Driver reciban actualizaciones en tiempo real cuando se insertan o modifican pedidos.

---

## Paso 4: Obtener las credenciales

1. En el dashboard, ir a **Project Settings → API**.
2. Copiar:
   - **Project URL** (ej: `https://abcxyz.supabase.co`)
   - **anon public key** (empieza con `eyJ...`)

---

## Paso 5: Crear los archivos `.env.local`

Crear dos archivos (uno por app). **Estos archivos NO se suben a GitHub** (ya están en `.gitignore`).

### `apps/web/.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### `apps/admin/.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

---

## Paso 6: Activar los comentarios TODO en el código

Busca en el proyecto la etiqueta `// TODO: Descomentar cuando Supabase esté configurado:` y descomenta las líneas debajo de ella. Están en:

- `apps/web/app/portal/checkout/page.tsx` → inserción del pedido
- `apps/admin/app/pedidos/page.tsx` → listener realtime del CRM
- `apps/admin/app/driver/page.tsx` → listener realtime + mutaciones del Driver

---

## Paso 7: Reiniciar los servidores

```bash
# Detener con Ctrl+C y volver a iniciar:
npm run dev
```

---

## ✅ Resultado esperado

| Acción | Efecto en tiempo real |
|--------|----------------------|
| Cliente hace pedido en `/portal/checkout` | Aparece en CRM `/pedidos` y en Driver `/driver` (sección "Disponibles") |
| Driver hace clic en "Asignarme" | Desaparece de "Disponibles" en todos los drivers. Aparece en el CRM con su nombre |
| Driver hace clic en "Iniciar Ruta" | Estado cambia a "En Camino" en CRM |
| Driver hace clic en "Entregado" | Estado cambia a "Entregado" en CRM. Desaparece de la vista del driver |
