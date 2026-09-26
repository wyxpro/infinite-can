import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parseChangelog } from "@/lib/release";

function safeReadFile(path: string, fallback = ""): string {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return fallback;
    }
}

const webDir = dirname(fileURLToPath(import.meta.url));
const localVersion = safeReadFile(resolve(webDir, "../VERSION"), "v0.0.1").trim() || "dev";
const localChangelog = safeReadFile(resolve(webDir, "../CHANGELOG.md"), "");

export default function nextConfig(phase: string): NextConfig {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const releases = parseChangelog(localChangelog);

    return {
        output: "standalone",
        allowedDevOrigins: isDev ? ["*.*.*.*"] : [],
        typescript: {
            ignoreBuildErrors: true,
        },
        env: {
            NEXT_PUBLIC_APP_VERSION: localVersion,
            NEXT_PUBLIC_APP_RELEASES: JSON.stringify(releases),
        },
    };
}
