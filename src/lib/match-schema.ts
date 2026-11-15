import { z } from 'zod';

export const matchSchema = z.object({
  score: z.number(),
  summary: z.string(),
  sourceText: z.string(),
  found: z.array(z.object({ skill: z.string(), evidence: z.string() })),
  missing: z.array(z.string()),
  suggestions: z.array(z.object({ title: z.string(), detail: z.string() })),
  optimizedResume: z.string(),
});
export type MatchResult = z.infer<typeof matchSchema>;

export function groundedResult(result: MatchResult, source: string): MatchResult {
  const normalized = source.toLocaleLowerCase('pt-BR').replace(/\s+/g, ' ');
  return {
    ...result,
    score: Math.round(Math.max(0, Math.min(100, result.score))),
    found: result.found.filter(item => item.evidence.trim().length > 0 && normalized.includes(item.evidence.toLocaleLowerCase('pt-BR').replace(/\s+/g, ' '))),
  };
}