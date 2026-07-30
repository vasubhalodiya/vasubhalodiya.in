import { NextRequest } from "next/server";

const DOC_ID = "1NO3IQkvFTkidtS5BNsEfZyvd-4OWfzc455FSu7CMJ7I";
const EXPORT_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=pdf`;
const FILENAME = "Vasu-Bhalodiya-Resume.pdf";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const res = await fetch(EXPORT_URL, { cache: "no-store" });

  if (!res.ok) {
    return new Response("Resume is temporarily unavailable.", { status: 502 });
  }

  const download = request.nextUrl.searchParams.get("download") !== null;
  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${FILENAME}"`,
      "Cache-Control": "no-store",
    },
  });
}
