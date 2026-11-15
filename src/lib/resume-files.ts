export async function readResume(file: File): Promise<{ resume: string; kind: 'text' | 'pdf' }> {
  if (file.size > 5 * 1024 * 1024) throw new Error('O arquivo deve ter até 5 MB.');
  if (file.name.toLowerCase().endsWith('.pdf')) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') throw new Error('Este arquivo não é um PDF válido.');
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { resume: btoa(binary), kind: 'pdf' };
  }
  if (file.name.toLowerCase().endsWith('.docx')) {
    const mammoth = await import('mammoth/mammoth.browser');
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    if (!result.value.trim()) throw new Error('O currículo está vazio ou não contém texto legível.');
    return { resume: result.value, kind: 'text' };
  }
  throw new Error('Escolha um currículo em PDF ou DOCX.');
}

export async function exportResume(text: string) {
  const { Document, Packer, Paragraph, TextRun } = await import('docx');
  const doc = new Document({ sections: [{ children: text.split('\n').map(line => new Paragraph({ children: [new TextRun({ text: line, font: 'Arial', size: 22 })], spacing: { after: 100 } })) }] });
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'curriculo-otimizado-ATS.docx'; link.click();
  URL.revokeObjectURL(url);
}