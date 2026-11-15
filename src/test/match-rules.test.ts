import { describe, it, expect } from 'vitest';
import { groundedResult, type MatchResult } from '../lib/match-schema';
const base: MatchResult = { score: 60, summary: '', sourceText: '', found: [], missing: ['Python'], suggestions: [], optimizedResume: '' };
describe('Evidências do currículo', () => {
  it('não atribui competência sem evidência presente no currículo', () => {
    const result = groundedResult({ ...base, found: [{ skill: 'Python', evidence: 'Curso de Python' }] }, 'Curso de Excel');
    expect(result.found).toEqual([]);
    expect(result.missing).toEqual(['Python']);
  });
  it('considera projetos acadêmicos como evidência de competências', () => {
    const result = groundedResult({ ...base, found: [{ skill: 'Excel', evidence: 'Projeto acadêmico com Excel' }] }, 'Projeto acadêmico com Excel');
    expect(result.found[0]?.skill).toBe('Excel');
  });
  it('considera estágios, cursos e atividades extracurriculares', () => {
    const found = [{ skill: 'Comunicação', evidence: 'Voluntariado' }, { skill: 'Excel', evidence: 'Curso de Excel' }, { skill: 'Atendimento', evidence: 'Estágio de atendimento' }];
    expect(groundedResult({ ...base, found }, 'Voluntariado. Curso de Excel. Estágio de atendimento.').found).toHaveLength(3);
  });
});