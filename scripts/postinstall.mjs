import { spawnSync } from "node:child_process";

const isProduction = process.env.NODE_ENV === "production";
const forceGenerate = process.env.NOVALEAP_RUN_PRISMA_GENERATE === "1";

if (isProduction && !forceGenerate) {
  console.log(
    "Skipping Prisma generate in production postinstall. Set NOVALEAP_RUN_PRISMA_GENERATE=1 to force it."
  );
  process.exit(0);
}

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(command, ["prisma", "generate"], {
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
