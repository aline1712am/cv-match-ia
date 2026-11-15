import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronRight, CircleHelp, FileCheck2, FileSearch, FileText, GraduationCap, Lightbulb, Loader2, LockKeyhole, Plus, ScanLine, ShieldCheck, Sparkles, Target, Upload, X, Download, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyzeMatch } from '@/lib/match.functions';
import { readResume, exportResume } from '@/lib/resume-files';
import type { MatchResult } from '@/lib/match-schema';
import resumeIllustration from '@/assets/resume-match.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Nova análise | CV Match AI' },
    { name: 'description', content: 'Descubra a compatibilidade do seu currículo com uma vaga, valorize seus projetos e crie uma versão otimizada para ATS.' },
    { property: 'og:title', content: 'CV Match AI — Seu currículo, sua próxima oportunidade' },
    { property: 'og:description', content: 'Análise de currículo por IA para estudantes e profissionais em início de carreira.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Brand() { return <div className="flex items-center gap-2.5"><span className="brand-mark"><ScanLine size={23} strokeWidth={1.8} /></span><span className="brand-name">CV Match <span className="brand-ai">AI</span></span></div>; }

function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [view, setView] = useState<'input' | 'result' | 'edit'>('input');
  const [edited, setEdited] = useState('');
  const [help, setHelp] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const analyze = useServerFn(analyzeMatch);
  function newAnalysis() { setView('input'); setResult(null); setError(''); setFile(null); setJob(''); setEdited(''); }
  function selectFile(next: File) {
    setError('');
    if (!/\.(pdf|docx)$/i.test(next.name)) { setError('Escolha um currículo em PDF ou DOCX.'); return; }
    if (next.size > 5 * 1024 * 1024) { setError('O arquivo deve ter até 5 MB.'); return; }
    setFile(next);
  }
  async function submit() {
    if (!file || job.trim().length < 30) { setError('Envie seu currículo e insira uma descrição de vaga com pelo menos 30 caracteres.'); return; }
    setBusy(true); setError('');
    try {
      const content = await readResume(file);
      const response = await analyze({ data: { ...content, job: job.trim(), filename: file.name } });
      if (response.error || !response.result) { setError(response.error ?? 'Nenhuma análise foi retornada.'); return; }
      setResult(response.result); setEdited(response.result.optimizedResume); setView('result');
    } catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível analisar o currículo.'); }
    finally { setBusy(false); }
  }
  async function download() { setExporting(true); setError(''); try { await exportResume(edited); } catch { setError('Não foi possível exportar o arquivo. Tente novamente.'); } finally { setExporting(false); } }
  const steps = ['Currículo e vaga', 'Análise de compatibilidade', 'Currículo otimizado'];
  const currentStep = view === 'input' ? 0 : view === 'result' ? 1 : 2;

  return <div className="min-h-screen">
    <aside className="app-sidebar">
      <div className="px-6 pb-9 pt-7"><Brand /><p className="mt-2.5 pl-11 text-[10px] text-muted-foreground">Seu potencial, em destaque.</p></div>
      <nav aria-label="Menu principal" className="px-4">
        <p className="nav-caption mb-3 pl-3">Workspace</p>
        <Button variant="secondary" className="h-11 w-full justify-start gap-3 bg-accent text-primary" onClick={() => setView('input')}><Sparkles size={18} />Nova análise<ChevronRight className="ml-auto" /></Button>
        <Button variant="ghost" disabled={!result || busy} className="mt-2 h-11 w-full justify-start gap-3 text-muted-foreground" onClick={() => setView('result')}><Target size={18} />Compatibilidade</Button>
        <Button variant="ghost" disabled={!result || busy} className="mt-1 h-11 w-full justify-start gap-3 text-muted-foreground" onClick={() => setView('edit')}><FileCheck2 size={18} />Currículo otimizado</Button>
      </nav>
      <div className="mx-6 mt-auto pb-6">
        <div className="mb-7 border-t border-border pt-6"><span className="mb-3 inline-flex rounded-lg bg-success-soft p-2 text-success"><GraduationCap size={19} /></span><p className="text-xs font-semibold">Toda trajetória tem valor.</p><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">Seus projetos e aprendizados também contam uma boa história.</p></div>
        <Button variant="ghost" className="w-full justify-start px-0 text-xs text-muted-foreground" onClick={() => setHelp(true)}><CircleHelp />Ajuda e informações<ArrowUpRight className="ml-auto" /></Button>
        <div className="mt-5 flex items-center gap-2 border-t border-border pt-5 text-[10px] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-success" />Feito para o seu próximo passo</div>
      </div>
    </aside>
    <main className="app-main">
      <header className="app-topbar"><div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">Workspace<ChevronRight size={13} /><span className="font-medium text-foreground">{view === 'input' ? 'Nova análise' : view === 'result' ? 'Compatibilidade' : 'Currículo otimizado'}</span></div><div className="md:hidden"><Brand /></div><span className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><ShieldCheck size={15} /><span className="hidden sm:inline">Sua trajetória. Seus dados.</span></span></header>
      <div className="workspace">
        <div className="flex items-start justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary"><Sparkles size={15} />Um novo passo na sua carreira</div><h1 className="page-title">{view === 'input' ? 'Sua próxima oportunidade começa aqui.' : view === 'result' ? 'Seu potencial, em perspectiva.' : 'Seu currículo, mais alinhado.'}</h1><p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">{view === 'input' ? 'Conecte o que você já fez com o que a vaga procura.' : view === 'result' ? 'Uma visão objetiva dos seus pontos fortes e oportunidades de melhoria.' : 'Revise cada informação antes de dar o próximo passo.'}</p></div>{result && <Button variant="outline" onClick={newAnalysis}><Plus />Nova análise</Button>}</div>
        <div className="stepper" aria-label="Etapas da análise">{steps.map((step, i) => <div key={step} className="contents"><div className={`step-item ${i <= currentStep ? 'active' : ''}`}><span className="step-circle">{i < currentStep ? <Check size={13} /> : i + 1}</span>{step}</div>{i < 2 && <span className="step-line" />}</div>)}</div>
        {error && <div role="alert" className="mb-5 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}
        {view === 'input' && <>
          <div className="analysis-grid">
            <section className="input-panel"><div className="mb-5 flex items-center gap-3"><span className="panel-icon"><FileText size={19} /></span><div><h2 className="panel-title">Seu currículo</h2><p className="mt-1 text-[11px] text-muted-foreground">O ponto de partida é a sua história.</p></div></div>
              <input ref={fileInput} aria-label="Enviar currículo" type="file" accept=".pdf,.docx" className="hidden" disabled={busy} onChange={e => { const selected = e.target.files?.[0]; if (selected) selectFile(selected); e.target.value = ''; }} />
              <div className={`drop-area ${dragging ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); if (!busy) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); const selected = e.dataTransfer.files[0]; if (selected && !busy) selectFile(selected); }}>
                <span className="upload-symbol">{file ? <FileCheck2 size={25} /> : <Upload size={25} strokeWidth={1.6} />}</span>
                {file ? <><p className="max-w-full break-all text-sm font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB · Pronto para analisar</p><div className="flex gap-2"><Button variant="outline" size="sm" disabled={busy} onClick={() => fileInput.current?.click()}>Trocar arquivo</Button><Button variant="ghost" size="icon" title="Remover currículo" aria-label="Remover currículo" disabled={busy} onClick={() => setFile(null)}><X /></Button></div></> : <><p className="text-[12px] font-medium">Arraste seu currículo até aqui</p><span className="text-[11px] text-muted-foreground">ou escolha um arquivo no seu dispositivo</span><Button variant="outline" className="mt-1 h-9 text-xs" onClick={() => fileInput.current?.click()}><Plus size={14} />Selecionar arquivo</Button><p className="mt-1 text-[10px] text-muted-foreground">PDF ou DOCX · Até 5 MB</p></>}
              </div><div className="panel-note"><LockKeyhole size={13} />Seu arquivo é usado apenas nesta análise.</div>
            </section>
            <section className="input-panel"><div className="mb-5 flex items-center gap-3"><span className="panel-icon"><FileSearch size={19} /></span><div><h2 className="panel-title">A vaga que você quer</h2><p className="mt-1 text-[11px] text-muted-foreground">Encontre os pontos de conexão.</p></div></div><textarea aria-label="Descrição da vaga" className="job-input" disabled={busy} value={job} maxLength={30000} onChange={e => setJob(e.target.value)} placeholder={'Cole a descrição completa da vaga aqui…\n\nInclua as responsabilidades, os requisitos e as\ncompetências desejadas.\n\nQuanto mais detalhes, melhor a análise.'} /><div className="panel-note justify-between"><span className="flex items-center gap-1.5"><Lightbulb size={13} />Vale uma vaga de estágio ou primeiro emprego.</span><span className="shrink-0">{job.length.toLocaleString('pt-BR')} caracteres</span></div></section>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2.5"><Button size="lg" className="h-12 min-w-60 rounded-lg text-[13px]" disabled={busy || !file || job.trim().length < 30} onClick={submit}>{busy ? <Loader2 className="animate-spin" /> : <Sparkles />} {busy ? 'Analisando seu currículo…' : 'Analisar compatibilidade'}{!busy && <ArrowRight />}</Button><p className="text-[10px] text-muted-foreground">{busy ? 'Sua análise está em andamento. Aguarde nesta página.' : 'Um olhar mais claro sobre a sua próxima oportunidade.'}</p></div>
          <div className="insight-band"><img src={resumeIllustration} alt="Currículos com uma lupa e um símbolo de confirmação" width={1024} height={768} className="insight-image" /><div><p className="text-[13px] font-semibold">Pouca experiência não significa pouco potencial.</p><p className="mt-2 max-w-xl text-[11px] leading-relaxed text-muted-foreground">Projetos acadêmicos, cursos, estágios e atividades extracurriculares também fazem parte da sua trajetória. Vamos dar a eles o destaque que merecem.</p></div><GraduationCap className="ml-auto hidden shrink-0 text-primary/60 lg:block" size={30} strokeWidth={1.2} /></div>
          <div className="feature-grid">{[{ icon: Target, title: 'Entenda sua compatibilidade', text: 'Veja as competências que conectam seu perfil à vaga.' }, { icon: Lightbulb, title: 'Destaque o que importa', text: 'Receba sugestões que valorizam suas experiências reais.' }, { icon: FileCheck2, title: 'Prepare seu currículo para ATS', text: 'Revise uma versão clara e alinhada à oportunidade.' }].map(item => <div key={item.title}><item.icon className="feature-icon" size={21} strokeWidth={1.6} /><h3 className="text-xs font-semibold">{item.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{item.text}</p></div>)}</div>
        </>}
        {view === 'result' && result && <>
          <section className="result-hero">
            <div className={`score-gauge tone-${scoreTone}`} style={{ '--score': result.score } as CSSProperties} role="img" aria-label={`Compatibilidade de ${result.score} por cento`}>
              <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="score-track" cx="60" cy="60" r="52" /><circle className="score-fill" cx="60" cy="60" r="52" /></svg>
              <div className="score-value"><strong>{result.score}%</strong><span>compatibilidade</span></div>
            </div>
            <div className="min-w-0 flex-1">
              <span className={`score-verdict tone-${scoreTone}`}>{scoreVerdict}</span>
              <h2 className="mt-3 text-lg font-semibold">Sua conexão com a vaga</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{result.summary}</p>
              <p className="mt-3 text-[11px] text-muted-foreground">Estimativa de aderência aos requisitos, não uma previsão de contratação.</p>
            </div>
          </section>
          <div className="stat-grid">
            <div className="stat-card"><span className="stat-icon tone-success"><CheckCheck size={18} /></span><div><strong>{result.found.length}</strong><p>{result.found.length === 1 ? 'competência encontrada' : 'competências encontradas'}</p></div></div>
            <div className="stat-card"><span className="stat-icon tone-warning"><Target size={18} /></span><div><strong>{result.missing.length}</strong><p>{result.missing.length === 1 ? 'oportunidade de desenvolvimento' : 'oportunidades de desenvolvimento'}</p></div></div>
            <div className="stat-card"><span className="stat-icon tone-primary"><Lightbulb size={18} /></span><div><strong>{result.suggestions.length}</strong><p>{result.suggestions.length === 1 ? 'sugestão de melhoria' : 'sugestões de melhoria'}</p></div></div>
          </div>
          <div className="analysis-grid"><section className="input-panel"><h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><CheckCheck className="text-success" size={18} />Competências encontradas <span className="ml-auto text-muted-foreground">{result.found.length}</span></h2>{result.found.length ? <div className="space-y-3">{result.found.map(item => <div key={item.skill} className="evidence-card"><p className="text-sm font-medium">{item.skill}</p><p className="evidence-quote">“{item.evidence}”</p></div>)}</div> : <p className="text-sm text-muted-foreground">Não foram encontradas evidências diretas dos requisitos no currículo.</p>}</section><section className="input-panel"><h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><Target className="text-warning" size={18} />Oportunidades de desenvolvimento</h2><div className="flex flex-wrap gap-2">{result.missing.map(item => <span key={item} className="rounded-md bg-warning-soft px-3 py-2 text-xs text-warning">{item}</span>)}</div><p className="mt-5 text-xs leading-relaxed text-muted-foreground">Esses requisitos não têm evidência no currículo enviado e não serão adicionados como competências suas.</p></section></div>
          <h2 className="mb-4 mt-7 text-base font-semibold">Um próximo passo para cada melhoria</h2><div className="space-y-3">{result.suggestions.map((item, i) => <div key={item.title} className="suggestion-card"><span className="panel-icon shrink-0">{i + 1}</span><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.detail}</p></div></div>)}</div><div className="mt-7 flex justify-end"><Button size="lg" onClick={() => setView('edit')}><PencilLine />Revisar currículo otimizado<ArrowRight /></Button></div>
        </>}
        {view === 'edit' && result && <><div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row"><p className="max-w-lg text-xs leading-relaxed text-muted-foreground">Confira contatos, datas e experiências. O texto abaixo é editável e deve representar fielmente sua trajetória.</p><Button onClick={download} disabled={!edited.trim() || exporting}>{exporting ? <Loader2 className="animate-spin" /> : <Download />}Exportar DOCX</Button></div><textarea aria-label="Currículo otimizado editável" value={edited} onChange={e => setEdited(e.target.value)} className="resume-editor" /><div className="mt-4 flex items-center justify-between gap-4"><Button variant="outline" onClick={() => setView('result')}>Voltar à análise</Button><span className="text-xs text-muted-foreground">Alterações mantidas nesta sessão</span></div></>}
        <footer className="page-footer"><span className="flex items-center gap-1.5"><ShieldCheck size={13} />Experiências reais. Sugestões transparentes.</span><span>A análise não garante aprovação em processos seletivos.</span><span className="shrink-0">CV Match AI © 2026</span></footer>
      </div>
    </main>
    {help && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-5" onClick={() => setHelp(false)}><section role="dialog" aria-modal="true" aria-labelledby="help-title" className="w-full max-w-md rounded-lg border border-border bg-card p-7 shadow-xl" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between"><h2 id="help-title" className="text-lg font-semibold">Ajuda e informações</h2><Button variant="ghost" size="icon" aria-label="Fechar ajuda" onClick={() => setHelp(false)}><X /></Button></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Envie seu currículo em PDF ou DOCX e cole a descrição da vaga. Depois da análise, revise o currículo otimizado antes de exportar.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Currículos e resultados não ficam salvos após fechar ou atualizar a página. Os documentos são enviados ao serviço de IA para análise.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">A análise considera sua trajetória real, incluindo projetos acadêmicos. Nenhuma sugestão garante contratação.</p><Button className="mt-6 w-full" onClick={() => setHelp(false)}>Entendi</Button></section></div>}
  </div>;
}
