import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getJob } from "@/lib/render-manager";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = getJob(id);

  if (!job || !job.fileName) {
    return new NextResponse("Render job or file not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "outputs", job.fileName);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found on disk (may have been cleaned up)", {
      status: 404,
    });
  }

  const fileStat = await fs.promises.stat(filePath);
  const fileStream = fs.createReadStream(filePath);
  const isMov = job.fileName.endsWith(".mov");

  // Cast Node ReadableStream to web ReadableStream
  const webStream = new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk) => controller.enqueue(chunk));
      fileStream.on("end", () => controller.close());
      fileStream.on("error", (err) => controller.error(err));
    },
  });

  return new NextResponse(webStream, {
    headers: {
      "Content-Type": isMov ? "video/quicktime" : "video/webm",
      "Content-Length": fileStat.size.toString(),
      "Content-Disposition": `attachment; filename="${job.fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
