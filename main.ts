// The Best Advice I Ever Got — one sentence, <=200 chars, about the best
// advice the writer ever received. Judge: wisest advice told with the most
// life; a real voice recalling a real moment, not a slogan. The entry is a
// memory with a concrete object (the spare key under the third flowerpot)
// and a saying that transfers from houses to people.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

interface Memory {
  who: string;
  habit: string;
  saying: string;
}

const MEMORY: Memory = {
  who: "My grandmother",
  habit: "kept a spare key under the third flowerpot by the back door",
  saying: "Always leave yourself a way back in — to houses, and to people.",
};

function recall(m: Memory): string {
  // One breath: who, the concrete habit, then the saying in her words.
  return `${m.who} ${m.habit} and said, '${m.saying}'`;
}

function checkSentence(s: string): void {
  if (s.length < 1 || s.length > LIMIT) {
    throw new Error(`advice must be 1-${LIMIT} chars, got ${s.length}`);
  }
  if (/[\r\n]/.test(s)) {
    throw new Error("advice must be a single sentence, no line breaks");
  }
  // The saying's own full stop sits inside the quotes; strip quoted text
  // before counting sentences so one quoted saying still counts as one.
  const unquoted = s.replace(/'[^']*'/g, "''");
  if (unquoted.split(/[.!?]/).filter(Boolean).length !== 1) {
    throw new Error("advice must be exactly one sentence");
  }
}

const line = recall(MEMORY);
checkSentence(line);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
