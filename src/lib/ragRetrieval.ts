/**
 * ==============================================================================
 * Vidyabot RAG Retrieval Engine (Server-Side, No External Service)
 * ==============================================================================
 *
 * Real retrieval, not simulated: proper BM25 lexical scoring over the actual
 * Laws of Motion textbook corpus. No fabricated "evaluation metrics", no
 * hardcoded "quality grade", no canned answers keyed to specific topics — if
 * the corpus doesn't cover a question, retrieval honestly returns a low score
 * and the caller falls through to Gemini or the "not found" message.
 *
 * This runs entirely inside the app (server.ts) — no n8n, no separate service
 * to deploy or keep in sync.
 * ==============================================================================
 */

import { LAWS_OF_MOTION_CORPUS, CorpusSection } from '../data/lawsOfMotionCorpus';

export interface Chunk {
  id: string;
  sectionId: string;
  sectionTitle: string;
  text: string;
  tokens: string[];
}

export interface ScoredChunk {
  chunk: Chunk;
  score: number;
}

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
  'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it',
  'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on',
  'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should',
  'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your', 'yours', 'yourself',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/** Split each corpus section into ~500-char chunks with ~50-char overlap. */
function splitIntoChunks(text: string, chunkSize = 500, overlap = 50): string[] {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= chunkSize) return [clean];

  const result: string[] = [];
  let start = 0;
  while (start < clean.length) {
    let end = Math.min(start + chunkSize, clean.length);
    if (end < clean.length) {
      const lastPeriod = clean.lastIndexOf('. ', end);
      if (lastPeriod > start + chunkSize / 2) end = lastPeriod + 1;
    }
    result.push(clean.slice(start, end).trim());
    if (end >= clean.length) break;
    start = Math.max(start + 1, end - overlap);
  }
  return result.filter((c) => c.length > 20);
}

/** Build the chunk index once, at module load — small corpus, negligible cost. */
function buildIndex(): Chunk[] {
  const chunks: Chunk[] = [];
  for (const section of LAWS_OF_MOTION_CORPUS as CorpusSection[]) {
    const pieces = splitIntoChunks(section.text);
    pieces.forEach((piece, idx) => {
      chunks.push({
        id: `${section.id}-${idx}`,
        sectionId: section.id,
        sectionTitle: section.title,
        text: piece,
        tokens: tokenize(piece),
      });
    });
  }
  return chunks;
}

const CHUNK_INDEX: Chunk[] = buildIndex();

/**
 * Real BM25 scoring — standard formula (k1=1.5, b=0.75), no shortcuts and no
 * artificial floors. A question with no real match in the corpus will
 * legitimately score low here.
 */
export function retrieveTopK(query: string, topK = 3): ScoredChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0 || CHUNK_INDEX.length === 0) return [];

  const N = CHUNK_INDEX.length;
  const df: Record<string, number> = {};
  for (const qt of queryTokens) {
    df[qt] = CHUNK_INDEX.filter((c) => c.tokens.includes(qt)).length;
  }
  const avgLen = CHUNK_INDEX.reduce((acc, c) => acc + c.tokens.length, 0) / N;
  const k1 = 1.5;
  const b = 0.75;

  const scored: ScoredChunk[] = CHUNK_INDEX.map((chunk) => {
    const termCounts: Record<string, number> = {};
    for (const t of chunk.tokens) termCounts[t] = (termCounts[t] || 0) + 1;

    let score = 0;
    for (const qt of queryTokens) {
      const tf = termCounts[qt] || 0;
      if (tf === 0) continue;
      const idf = Math.log((N - (df[qt] || 0) + 0.5) / ((df[qt] || 0) + 0.5) + 1);
      const tfComponent = (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (chunk.tokens.length / (avgLen || 1))));
      score += idf * tfComponent;
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter((s) => s.score > 0);
}

/** Genuine confidence check — no floor, no boost. Caller decides what to do below this. */
export function isConfidentMatch(results: ScoredChunk[]): boolean {
  return results.length > 0 && results[0].score >= 1.2;
}
