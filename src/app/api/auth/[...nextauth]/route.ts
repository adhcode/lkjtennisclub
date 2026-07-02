import { NextRequest } from "next/server";
import { GET as AuthGET, POST as AuthPOST } from "@/lib/auth";

// Wrap handlers to ensure proper async handling for Next.js 15
export async function GET(req: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  // Resolve params and pass the resolved context
  const params = await context.params;
  return AuthGET(req, { params });
}

export async function POST(req: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  // Resolve params and pass the resolved context
  const params = await context.params;
  return AuthPOST(req, { params });
}
