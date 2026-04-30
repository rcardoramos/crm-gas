"use server";

import fs from "fs";
import path from "path";
import type { Producto } from "@repo/lib";

const DATA_PATH = path.join(process.cwd(), "..", "..", "packages", "lib", "data", "products.json");

export async function getProductos(): Promise<Producto[]> {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Producto[];
  } catch {
    return [];
  }
}

export async function saveProductos(productos: Producto[]): Promise<{ ok: boolean }> {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(productos, null, 2), "utf-8");
    return { ok: true };
  } catch (e) {
    console.error("Error guardando productos:", e);
    return { ok: false };
  }
}
