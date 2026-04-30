"use server";

import fs from "fs";
import path from "path";

const DRIVERS_PATH = path.join(process.cwd(), "..", "..", "packages", "lib", "data", "drivers.json");
const ATTENDANCE_PATH = path.join(process.cwd(), "..", "..", "packages", "lib", "data", "attendance.json");

export type DriverRecord = {
  id: string;
  nombre: string;
  telefono: string;
  sede: string;
  vehiculo: string;
  placa: string;
};

export type AttendanceRecord = {
  id: string;           // unique record id
  driverId: string;
  driverNombre: string;
  driverSede: string;
  entrada: string;      // ISO string
  salida: string | null;
  duracionMinutos: number | null;
};

function readDrivers(): DriverRecord[] {
  try { return JSON.parse(fs.readFileSync(DRIVERS_PATH, "utf-8")); } catch { return []; }
}

function readAttendance(): AttendanceRecord[] {
  try { return JSON.parse(fs.readFileSync(ATTENDANCE_PATH, "utf-8")); } catch { return []; }
}

function writeAttendance(records: AttendanceRecord[]) {
  fs.writeFileSync(ATTENDANCE_PATH, JSON.stringify(records, null, 2), "utf-8");
}

// Validates phone and returns driver if found
export async function loginDriver(telefono: string): Promise<{ ok: boolean; driver?: DriverRecord; error?: string }> {
  const clean = telefono.replace(/\D/g, "");
  const drivers = readDrivers();
  const driver = drivers.find(d => d.telefono.replace(/\D/g, "") === clean);

  if (!driver) return { ok: false, error: "Número no registrado. Contacta al administrador." };

  // Check if already has an open session
  const attendance = readAttendance();
  const openSession = attendance.find(a => a.driverId === driver.id && a.salida === null);
  if (openSession) return { ok: true, driver }; // Allow re-entry (idempotent)

  // Create new attendance record
  const newRecord: AttendanceRecord = {
    id: `att-${Date.now()}`,
    driverId: driver.id,
    driverNombre: driver.nombre,
    driverSede: driver.sede,
    entrada: new Date().toISOString(),
    salida: null,
    duracionMinutos: null,
  };

  writeAttendance([...attendance, newRecord]);
  return { ok: true, driver };
}

// Mark end of shift
export async function logoutDriver(driverId: string): Promise<{ ok: boolean }> {
  const attendance = readAttendance();
  const now = new Date();

  const updated = attendance.map(a => {
    if (a.driverId === driverId && a.salida === null) {
      const entrada = new Date(a.entrada);
      const duracionMinutos = Math.round((now.getTime() - entrada.getTime()) / 60000);
      return { ...a, salida: now.toISOString(), duracionMinutos };
    }
    return a;
  });

  writeAttendance(updated);
  return { ok: true };
}

// Get all attendance records (for CRM)
export async function getAttendance(): Promise<AttendanceRecord[]> {
  return readAttendance();
}

// Get active sessions (drivers currently clocked in)
export async function getActiveSessions(): Promise<AttendanceRecord[]> {
  return readAttendance().filter(a => a.salida === null);
}
