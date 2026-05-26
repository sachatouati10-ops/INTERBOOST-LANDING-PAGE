import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwajbNbnkiuykNz4OU82Q99u0iZfyY70FRfMTDYibp_amxpuhYGT5hKVPGkak9RoRuv/exec";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const url = `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}`;
  await fetch(url, { redirect: "follow" });
  return NextResponse.json({ status: "ok" });
}
