import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { z } from 'zod';

const inputSchema = z.object({ resume: z.string().min(1).max(7500000), job: z.string().min(30).max(30000), filename: z.string().max(200), kind: z.enum(['pdf', 'text']) });
export const analyzeMatch = createServerFn({ method: 'POST' })
  .inputValidator((input: z.infer<typeof inputSchema>) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runMatch } = await import('./match.server');
    return runMatch(data, getRequest().signal);
  });