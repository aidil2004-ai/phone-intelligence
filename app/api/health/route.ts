  import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "phone-intelligence",
    timestamp: new Date().toISOString(),
  });
}
