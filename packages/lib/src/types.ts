export type Database = {
  public: {
    Tables: {
      sedes: {
        Row: {
          id: string
          nombre: string
          direccion: string
          ciudad: string
          estado: string
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          direccion: string
          ciudad: string
          estado?: string
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          direccion?: string
          ciudad?: string
          estado?: string
          created_at?: string
        }
      }
      clientes: {
        Row: {
          id: string
          auth_id: string | null
          sede_id: string | null
          nombre: string
          dni: string | null
          telefono: string
          direccion: string
          referencia: string | null
          tipo_cliente: string
          created_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          sede_id?: string | null
          nombre: string
          dni?: string | null
          telefono: string
          direccion: string
          referencia?: string | null
          tipo_cliente?: string
          created_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          sede_id?: string | null
          nombre?: string
          dni?: string | null
          telefono?: string
          direccion?: string
          referencia?: string | null
          tipo_cliente?: string
          created_at?: string
        }
      }
      pedidos: {
        Row: {
          id: string
          cliente_id: string | null
          sede_id: string
          conductor_id: string | null
          origen: string
          estado: string
          total: number
          metodo_pago: string | null
          notas: string | null
          fecha_entrega: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cliente_id?: string | null
          sede_id: string
          conductor_id?: string | null
          origen?: string
          estado?: string
          total: number
          metodo_pago?: string | null
          notas?: string | null
          fecha_entrega?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cliente_id?: string | null
          sede_id?: string
          conductor_id?: string | null
          origen?: string
          estado?: string
          total?: number
          metodo_pago?: string | null
          notas?: string | null
          fecha_entrega?: string | null
          created_at?: string
        }
      }
      productos: {
        Row: {
          id: string
          nombre: string
          precio: number
          stock: number
        }
        Insert: {
          id?: string
          nombre: string
          precio: number
          stock?: number
        }
        Update: {
          id?: string
          nombre?: string
          precio?: number
          stock?: number
        }
      }
      conductores: {
        Row: {
          id: string
          auth_id: string | null
          sede_id: string
          nombre: string
          telefono: string
          vehiculo: string | null
          estado: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          sede_id: string
          nombre: string
          telefono: string
          vehiculo?: string | null
          estado?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          sede_id?: string
          nombre?: string
          telefono?: string
          vehiculo?: string | null
          estado?: string
        }
      }
      asignaciones: {
        Row: {
          id: string
          pedido_id: string
          conductor_id: string
          estado: string
          created_at: string
        }
        Insert: {
          id?: string
          pedido_id: string
          conductor_id: string
          estado?: string
          created_at?: string
        }
        Update: {
          id?: string
          pedido_id?: string
          conductor_id?: string
          estado?: string
          created_at?: string
        }
      }
      promociones: {
        Row: {
          id: string
          titulo: string
          descripcion: string
          codigo: string
          fecha_inicio: string
          fecha_fin: string | null
          tipo_descuento: string
          valor_descuento: number
          estado: string
          color_theme: string
          usos: number
          created_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descripcion: string
          codigo: string
          fecha_inicio?: string
          fecha_fin?: string | null
          tipo_descuento?: string
          valor_descuento: number
          estado?: string
          color_theme?: string
          usos?: number
          created_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descripcion?: string
          codigo?: string
          fecha_inicio?: string
          fecha_fin?: string | null
          tipo_descuento?: string
          valor_descuento?: number
          estado?: string
          color_theme?: string
          usos?: number
          created_at?: string
        }
      }
    }
  }
}
