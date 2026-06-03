// Gemeinsame Logik der Übungs-Engine (portiert aus Vanilla exercises.js).
// Grundlagen nutzt drei Typen: multiple-choice, matching, ordering.

export type MultipleChoicePayload = {
  type: "multiple-choice";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  wrongExplanations?: Record<string, string>;
  hint?: string;
};

export type MatchingPayload = {
  type: "matching";
  question: string;
  pairs: { left: string; right: string }[];
  explanation: string;
};

export type OrderingPayload = {
  type: "ordering";
  question: string;
  items: string[];
  correctOrder: number[];
  explanation: string;
};

export type ExercisePayload =
  | MultipleChoicePayload
  | MatchingPayload
  | OrderingPayload;

// --- Deterministisches Mischen ---------------------------------------------
// Wichtig: Übungen sind Client Components, werden aber serverseitig vor-
// gerendert. Zufall (Math.random) würde Server/Client auseinanderlaufen
// lassen (Hydration-Mismatch). Darum ein seed-basiertes, reproduzierbares
// Mischen — gleicher Seed => gleiche Reihenfolge.

// Knuth multiplicative hash -> positive int (gleichmäßigste Verteilung im Test).
function seedHash(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = Math.imul(hash ^ s.charCodeAt(i), 2654435761);
  }
  return Math.abs(hash);
}

// mulberry32 — kleiner, deterministischer PRNG (0..1) aus einem int-Seed.
function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Liefert eine deterministisch gemischte Index-Reihenfolge [0..n-1].
export function seededOrder(n: number, seed: string): number[] {
  const idx = Array.from({ length: n }, (_, i) => i);
  const rand = prng(seedHash(seed));
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

// Alle 24 Permutationen von [0,1,2,3] — für das MC-Shuffle.
const ALL_PERMS_4 = [
  [0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1],
  [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0],
  [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
  [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0],
];

// Mischt Optionen/correct/wrongExplanations einer 4-Optionen-MC deterministisch
// (verhindert Positions-Bias). Nur 4 Optionen — sonst unverändert.
export function shuffleMc(
  p: MultipleChoicePayload,
  seed: string,
): MultipleChoicePayload {
  if (p.options.length !== 4) return p;
  const perm = ALL_PERMS_4[seedHash(seed) % 24];
  const options = perm.map((i) => p.options[i]);
  const correct = perm.indexOf(p.correct);
  let wrongExplanations: Record<string, string> | undefined;
  if (p.wrongExplanations) {
    wrongExplanations = {};
    for (const [oldKey, value] of Object.entries(p.wrongExplanations)) {
      if (value == null) continue;
      const newIdx = perm.indexOf(Number.parseInt(oldKey, 10));
      wrongExplanations[String(newIdx)] = value;
    }
  }
  return { ...p, options, correct, wrongExplanations };
}

// Dekodiert die häufigsten HTML-Entities für Kontexte ohne HTML-Rendering
// (z.B. <option>-Labels). &amp; zuletzt, um Doppel-Dekodierung zu vermeiden.
export function decodeEntities(s: string): string {
  return s
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&minus;/g, "−")
    .replace(/&nbsp;/g, " ")
    .replace(/&Omega;/g, "Ω")
    .replace(/&deg;/g, "°")
    .replace(/&rarr;/g, "→")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}
