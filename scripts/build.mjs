import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptsDir, "..");

function runNodeScript(args, extraEnv = {}) {
  const result = spawnSync(process.execPath, args, {
    cwd: repoRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      ...extraEnv,
    },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

runNodeScript([resolve(repoRoot, "scripts", "generate-site-media-snapshot.mjs")]);
runNodeScript(
  [resolve(repoRoot, "node_modules", "next", "dist", "bin", "next"), "build"],
  { NOVALEAP_USE_MEDIA_SNAPSHOT: "1" }
);