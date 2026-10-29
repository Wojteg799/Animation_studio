import { NextRequest, NextResponse } from "next/server";
import { getJob } from "@/lib/render-manager";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = getJob(id);

  if (!job) {
    return NextResponse.json(
      { success: false, error: "Job not found or expired" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    job,
  });
}
