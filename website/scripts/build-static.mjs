import { execSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const parked = path.join(root, ".static-excluded");
const SERVER_ONLY = [
  ["src/app/admin", "admin"],
  ["src/app/api", "api"],
];

const move = (from, to) => { if (existsSync(from)) renameSync(from, to); };

mkdirSync(parked, { recursive: true });
console.log("Building the static site (no server features).");
try {
  for (const [dir, name] of SERVER_ONLY) move(path.join(root, dir), path.join(parked, name));
  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1", NEXT_PUBLIC_STATIC: "1" },
  });
} finally {
  for (const [dir, name] of SERVER_ONLY) move(path.join(parked, name), path.join(root, dir));
  rmSync(parked, { recursive: true, force: true });
}
console.log("\nDone. Upload everything inside website/out/ to your Hostinger public_html folder.");
