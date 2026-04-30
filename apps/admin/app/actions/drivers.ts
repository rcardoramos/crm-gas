"use server";

import fs from "fs";
import path from "path";

const DRIVERS_PATH = path.join(process.cwd(), "..", "..", "packages", "lib", "data", "drivers.json");

export type DriverRecord = {
  id: string;
  nombre: string;
  telefono: string;
  sede: string;
  vehiculo: string;
  placa: string;
  estado: "activo" | "ocupado" | "fuera_de_servicio";
  carga_actual: number;
  pedidos_hoy: number;
};

export async function getDrivers(): Promise<DriverRecord[]> {
  try {
    const raw = fs.readFileSync(DRIVERS_PATH, "utf-8");
    return JSON.parse(raw) as DriverRecord[];
  } catch {
    return [];
  }
}

export async function saveDrivers(drivers: DriverRecord[]): Promise<{ ok: boolean }> {
  try {
    fs.writeFileSync(DRIVERS_PATH, JSON.stringify(drivers, null, 2), "utf-8");
    return { ok: true };
  } catch (e) {
    console.error("Error guardando drivers:", e);
    return { ok: false };
  }
}
