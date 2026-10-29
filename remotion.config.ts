// Remotion configuration for Alpha Transparent ProRes 4444 export
// Documentation: https://remotion.dev/docs/config

import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./src/remotion/webpack-override.mjs";

// Enable PNG image format to preserve the Alpha channel on each rendered frame
Config.setVideoImageFormat("png");

// Default to Apple ProRes 4444 with Alpha (yuva444p10le) for NLEs (DaVinci, Premiere, FCP)
Config.setCodec("prores");
Config.setProResProfile("4444");
Config.setPixelFormat("yuva444p10le");

Config.setRspack(true);
Config.overrideBundlerConfig(webpackOverride);
