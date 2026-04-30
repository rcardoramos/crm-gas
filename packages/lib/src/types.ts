export type Database = {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string
          nombre: string
          telefono: string
          direccion: string
          referencia: string | null
          tipo_cliente: string
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          telefono: string
          direccion: string
          referencia?: string | null
          tipo_cliente?: string
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
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
          nombre: string
          telefono: string
          vehiculo: string | null
          estado: string
        }
        Insert: {
          id?: string
          nombre: string
          telefono: string
          vehiculo?: string | null
          estado?: string
        }
        Update: {
          id?: string
          nombre?: string
          telefono?: string
          vehiculo?: string | null
          estado?: string
        }
      }
      asignaciones: {
        Row: {
          id: string
          pedido_id: string | null
          conductor_id: string | null
          estado: string
          ganancia_conductor: number | null
          pago_estado: string
        }
        Insert: {
          id?: string
          pedido_id?: string | null
          conductor_id?: string | null
          estado?: string
          ganancia_conductor?: number | null
          pago_estado?: string
        }
        Update: {
          id?: string
          pedido_id?: string | null
          conductor_id?: string | null
          estado?: string
          ganancia_conductor?: number | null
          pago_estado?: string
        }
      }
    }
  }
}
