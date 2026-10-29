import path from "path";
import fs from "fs";
import os from "os";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { RenderJobStatus, RenderFormat, AspectRatioType, RESOLUTIONS } from "./types";

// In-memory job store (survives requests within the Node.js runtime)
const jobs = new Map<string, RenderJobStatus>();

// Cached webpack bundle path for fast repeated renders
let cachedBundleLocation: string | null = null;
let cachedBundleTimestamp = 0;
let isBundling = false;
let bundlePromise: Promise<string> | null = null;

/**
 * Invalidate bundle cache so the next render rebuilds from latest source
 */
export const invalidateBundleCache = () => {
  console.log("[Remotion Bundler] Cache invalidated manually.");
  cachedBundleLocation = null;
  cachedBundleTimestamp = 0;
  bundlePromise = null;
};

/**
 * Recursively find latest file modification timestamp in directory
 */
const getLatestSourceMtime = (dir: string): number => {
  let latest = 0;
  try {
    if (!fs.existsSync(dir)) return 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        latest = Math.max(latest, getLatestSourceMtime(fullPath));
      } else if (entry.isFile()) {
        const stat = fs.statSync(fullPath);
        latest = Math.max(latest, stat.mtimeMs);
      }
    }
  } catch {
    // ignore
  }
  return latest;
};

/**
 * Pre-bundle or get cached bundle for Remotion Root with hot source-invalidation
 */
const getOrBuildBundle = async (forceFresh: boolean = false): Promise<string> => {
  const remotionSrcDir = path.join(process.cwd(), "src", "remotion");
  const latestSourceMtime = getLatestSourceMtime(remotionSrcDir);

  const isStale = Boolean(
    cachedBundleLocation &&
      (latestSourceMtime > cachedBundleTimestamp || !fs.existsSync(cachedBundleLocation))
  );

  if (isStale) {
    console.log(
      `[Remotion Bundler] Source code changes detected in src/remotion (latest mtime: ${new Date(
        latestSourceMtime
      ).toLocaleTimeString()}). Rebuilding fresh bundle...`
    );
    cachedBundleLocation = null;
    cachedBundleTimestamp = 0;
    bundlePromise = null;
  }

  if (!forceFresh && !isStale && cachedBundleLocation && fs.existsSync(cachedBundleLocation)) {
    return cachedBundleLocation;
  }

  if (isBundling && bundlePromise && !forceFresh && !isStale) {
    return bundlePromise;
  }

  isBundling = true;
  bundlePromise = (async () => {
    try {
      const entryPoint = path.join(process.cwd(), "src", "remotion", "index.ts");
      console.log(`[Remotion Bundler] Bundling entry point: ${entryPoint}`);
      const bundleLocation = await bundle({
        entryPoint,
        webpackOverride: (current) => current,
      });
      cachedBundleLocation = bundleLocation;
      cachedBundleTimestamp = Date.now();
      console.log(`[Remotion Bundler] Bundled successfully to: ${bundleLocation}`);
      return bundleLocation;
    } finally {
      isBundling = false;
    }
  })();

  return bundlePromise;
};

// Target directory for rendered exports
const OUTPUT_DIR = path.join(process.cwd(), "public", "outputs");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Automatically clean up rendered files older than 30 minutes to prevent disk bloat
 */
export const cleanupOldOutputs = async () => {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) return;
    const files = await fs.promises.readdir(OUTPUT_DIR);
    const now = Date.now();
    const MAX_AGE_MS = 30 * 60 * 1000; // 30 minutes

    for (const file of files) {
      const filePath = path.join(OUTPUT_DIR, file);
      try {
        const stats = await fs.promises.stat(filePath);
        if (now - stats.mtimeMs > MAX_AGE_MS) {
          await fs.promises.unlink(filePath);
          console.log(`[Auto-Cleanup] Removed old render: ${file}`);
        }
      } catch {
        // file may have been removed or locked
      }
    }
  } catch (err) {
    console.error("[Auto-Cleanup] Error cleaning outputs:", err);
  }
};

export const getJob = (id: string): RenderJobStatus | undefined => {
  return jobs.get(id);
};

export interface StartRenderParams {
  id: string;
  compositionId?: string;
  format: RenderFormat;
  resolution: AspectRatioType;
  fps: number;
  inputProps: any;
  customDuration?: number;
}

export const startRenderJob = async (params: StartRenderParams): Promise<RenderJobStatus> => {
  const {
    id,
    compositionId = "DocumentaryLowerThird",
    format = "prores4444",
    resolution = "16:9",
    fps = 30,
    inputProps,
    customDuration = 180,
  } = params;

  // Cleanup old render artifacts on new trigger
  cleanupOldOutputs();

  const resConfig = RESOLUTIONS[resolution] || RESOLUTIONS["16:9"];
  const extension = format === "prores4444" ? "mov" : format === "mp4" ? "mp4" : "webm";
  const outputFileName = `documotion-${id}.${extension}`;
  const outputFilePath = path.join(OUTPUT_DIR, outputFileName);

  const initialJob: RenderJobStatus = {
    id,
    status: "bundling",
    progress: 0,
    renderedFrames: 0,
    totalFrames: customDuration,
    format,
    resolution,
    fps,
    startedAt: Date.now(),
  };

  jobs.set(id, initialJob);

  // Run render in background asynchronously so response is returned immediately
  (async () => {
    try {
      console.log(`[Render Engine] Starting job ${id} (${format.toUpperCase()} ${resConfig.label})`);

      // 1. Bundle Remotion project
      let serveUrl = await getOrBuildBundle();

      // 2. Select composition with dynamic props
      const fullProps = {
        ...inputProps,
        videoWidth: resConfig.width,
        videoHeight: resConfig.height,
        customFps: fps,
        customDuration,
      };

      let composition;
      try {
        composition = await selectComposition({
          serveUrl,
          id: compositionId,
          inputProps: fullProps,
        });
      } catch (selectErr) {
        console.warn(`[Render Engine] Composition ${compositionId} missing from cached bundle, rebuilding fresh bundle...`);
        cachedBundleLocation = null;
        serveUrl = await getOrBuildBundle(true);
        composition = await selectComposition({
          serveUrl,
          id: compositionId,
          inputProps: fullProps,
        });
      }

      // Update total frames if composition provides it
      const totalFrames = composition.durationInFrames || customDuration;
      jobs.set(id, {
        ...jobs.get(id)!,
        status: "rendering",
        totalFrames,
      });

      // Concurrency configuration: Use half the available CPU cores to prevent system freeze during ProRes compression
      const availableCores = os.cpus().length || 4;
      const safeConcurrency = Math.max(1, Math.min(4, Math.floor(availableCores / 2)));
      console.log(`[Render Engine] Multi-threading configured: ${safeConcurrency} worker threads (system has ${availableCores} cores)`);

      // 3. Render media with full Alpha Channel configuration
      if (format === "prores4444") {
        await renderMedia({
          composition,
          serveUrl,
          codec: "prores",
          proResProfile: "4444",
          pixelFormat: "yuva444p10le", // 10-bit YUVA with full Alpha
          imageFormat: "png", // Required for transparent alpha preservation
          outputLocation: outputFilePath,
          inputProps: fullProps,
          concurrency: safeConcurrency,
          onProgress: ({ progress, renderedFrames }) => {
            const current = jobs.get(id);
            if (current) {
              jobs.set(id, {
                ...current,
                status: progress < 0.95 ? "rendering" : "encoding",
                progress,
                renderedFrames,
              });
            }
          },
        });
      } else if (format === "mp4") {
        // High Quality MP4 H.264 (CRF 17 for broadcast quality & compact file size)
        await renderMedia({
          composition,
          serveUrl,
          codec: "h264",
          crf: 17,
          pixelFormat: "yuv420p",
          outputLocation: outputFilePath,
          inputProps: fullProps,
          concurrency: safeConcurrency,
          onProgress: ({ progress, renderedFrames }) => {
            const current = jobs.get(id);
            if (current) {
              jobs.set(id, {
                ...current,
                status: progress < 0.95 ? "rendering" : "encoding",
                progress,
                renderedFrames,
              });
            }
          },
        });
      } else {
        // WebM with alpha (VP9)
        await renderMedia({
          composition,
          serveUrl,
          codec: "vp9",
          pixelFormat: "yuva420p",
          imageFormat: "png",
          outputLocation: outputFilePath,
          inputProps: fullProps,
          concurrency: safeConcurrency,
          onProgress: ({ progress, renderedFrames }) => {
            const current = jobs.get(id);
            if (current) {
              jobs.set(id, {
                ...current,
                status: progress < 0.95 ? "rendering" : "encoding",
                progress,
                renderedFrames,
              });
            }
          },
        });
      }

      // 4. Check rendered output file
      const stats = await fs.promises.stat(outputFilePath);

      jobs.set(id, {
        ...jobs.get(id)!,
        status: "completed",
        progress: 1,
        renderedFrames: totalFrames,
        fileSizeBytes: stats.size,
        fileName: outputFileName,
        downloadUrl: `/api/render/${id}/download`,
        completedAt: Date.now(),
      });

      console.log(`[Render Engine] Render job ${id} successfully completed! File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
    } catch (err: any) {
      console.error(`[Render Engine] Render job ${id} failed:`, err);
      jobs.set(id, {
        ...jobs.get(id)!,
        status: "failed",
        error: err.message || "Unknown rendering error occurred",
      });
    }
  })();

  return initialJob;
};
