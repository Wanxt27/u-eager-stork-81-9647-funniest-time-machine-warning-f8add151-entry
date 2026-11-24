import { mkdirSync, writeFileSync } from "node:fs";

// A warning label, straight-faced like a real safety notice: meeting your
// past self is the hazard, and the punchline is that the loan is already
// lost before it is made — he knows your payment history first-hand.
const line =
  "WARNING: Do not meet your past self. If you do, do not lend him money — he already knows you won't pay it back.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// The gate allows 1 to 120 characters, one line, no padding: fail loudly
// rather than ship an invalid entry.
const MAX_CHARS = 120;
const length = [...line].length;
if (
  length < 1 ||
  length > MAX_CHARS ||
  line.trim() !== line ||
  line.includes("\n") ||
  line.includes("\r")
) {
  throw new Error(
    `entry line must be a single line of 1-${MAX_CHARS} non-blank characters, got ${length}`,
  );
}

writeFileSync(`${outDir}/entry.txt`, line, "utf8");
