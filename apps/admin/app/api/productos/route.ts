import { NextResponse } from "next/server";
import { getProductos } from "../../actions/products";

export async function GET() {
  const productos = await getProductos();
  return NextResponse.json(productos, {
    headers: {
      // Permite que la web app (otro puerto) consuma esta API
      "Access-Control-Allow-Origin": "*",
    },
  });
}
