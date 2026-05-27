import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwajbNbnkiuykNz4OU82Q99u0iZfyY70FRfMTDYibp_amxpuhYGT5hKVPGkak9RoRuv/exec";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      redirect: "follow",
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ count: 0 });
    const data = await res.json();
    const count = typeof data?.count === "number" ? data.count : 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
