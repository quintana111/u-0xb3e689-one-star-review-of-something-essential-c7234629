import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One-star review of something essential: gravity.
// A deadpan complaint filed in earnest against a force that cannot be fixed.
const ENTRY =
  "One star. Gravity works fine until you drop your phone, then it works perfectly. No customer support, no refund, no appeal process.";

// The grader runs `node /bot/main.ts` with cwd != /bot, so the output
// directory comes from the environment, never from the working directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
// Best-effort copy beside the entrypoint: /bot is read-only at grade time,
// so a failure here must never fail the run.
try {
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), "entry.txt"), ENTRY, "utf8");
} catch {
  // Read-only checkout; the output-directory copy above is the graded one.
}
process.stdout.write(ENTRY + "\n");
