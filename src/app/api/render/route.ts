import { NextRequest, NextResponse } from "next/server";
import { startRenderJob } from "@/lib/render-manager";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      format = "prores4444",
      resolution = "16:9",
      fps = 30,
      inputProps = {},
      customDuration = 180,
      compositionId = "DocumentaryLowerThird",
    } = body;

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const job = await startRenderJob({
      id: jobId,
      compositionId,
      format,
      resolution,
      fps: Number(fps),
      inputProps,
      customDuration: Number(customDuration),
    });

    return NextResponse.json({
      success: true,
      jobId,
      job,
    });
  } catch (error: any) {
    console.error("[API Render] Error initiating render:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to start render" },
      { status: 500 }
    );
  }
}
