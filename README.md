
# CV Match AI

Aplicação web que utiliza inteligência artificial para comparar currículos com descrições de vagas e gerar versões otimizadas para sistemas ATS (Applicant Tracking Systems).

## 1. Problema que a aplicação resolve

Estudantes e pessoas em início de carreira frequentemente encontram dificuldades para elaborar currículos alinhados às exigências das vagas de emprego.

Muitos candidatos possuem conhecimentos adquiridos em cursos, projetos acadêmicos, estágios e atividades extracurriculares, mas não sabem como destacar essas qualificações de maneira estratégica.

O CV Match AI busca solucionar esse problema por meio da análise comparativa entre o currículo e a descrição da vaga, identificando competências compatíveis, lacunas e oportunidades de melhoria.

## 2. Mega prompt utilizado e evolução

O desenvolvimento foi orientado por um prompt estruturado para definir os objetivos, funcionalidades, regras de negócio e identidade visual da aplicação.

### Especificações do prompt

- **Nome:** CV Match AI
- **Público-alvo:** Estudantes e pessoas em início de carreira.
- **Idioma:** Português do Brasil.
- **Objetivo:** Comparar currículos com descrições de vagas e gerar versões otimizadas para ATS.

### Funcionalidades especificadas

1. Upload de currículo em PDF ou DOCX.
2. Inserção da descrição da vaga.
3. Análise de compatibilidade.
4. Identificação de competências encontradas e ausentes.
5. Sugestões de melhoria.
6. Geração de currículo otimizado para ATS.
7. Exportação do currículo revisado.

### Regras de negócio

- Considerar experiências profissionais e acadêmicas.
- Valorizar projetos, cursos, estágios e atividades extracurriculares.
- Não inventar experiências ou competências.
- Permitir revisão e edição das sugestões.
- Apresentar resultados de forma clara e objetiva.
- Não garantir aprovação em processos seletivos.

### Evolução do prompt

| Versão | Alterações |
|---|---|
| Inicial | Definição do objetivo, público-alvo e funcionalidades. |
| Intermediária | Inclusão das telas, fluxo de análise e Design System. |
| Final | Simplificação das instruções para reduzir o consumo de créditos no Lovable e priorizar a implementação incremental. |

A principal mudança foi substituir um prompt extenso por uma especificação compacta, complementada por comandos menores para cada etapa do desenvolvimento.

## 3. Como funciona a análise

O fluxo proposto para a aplicação contempla as seguintes etapas:

### 3.1. Inserção dos dados

O usuário informa a descrição da vaga e envia seu currículo em PDF ou DOCX.

### 3.2. Extração das informações

O sistema interpreta o conteúdo do currículo e identifica informações como:

- Formação acadêmica;
- Experiências profissionais;
- Projetos acadêmicos;
- Cursos e certificações;
- Competências técnicas;
- Habilidades comportamentais.

### 3.3. Comparação com a vaga

A aplicação compara as informações do currículo com os requisitos da oportunidade, identificando:

- Competências encontradas;
- Competências parcialmente identificadas;
- Requisitos não identificados;
- Palavras-chave relevantes;
- Pontos que podem ser melhor apresentados.

### 3.4. Diagnóstico

O sistema apresenta um indicador de compatibilidade e recomendações para melhorar o currículo.

### 3.5. Otimização do currículo

Com base no diagnóstico, a inteligência artificial sugere melhorias na organização, redação e apresentação das qualificações.

O candidato poderá revisar e editar as sugestões antes de gerar a versão final.

**Importante:** a otimização deverá preservar a veracidade das informações, sem inventar experiências, conhecimentos ou qualificações.


## 4. Ajustes solicitados após a primeira geração

Durante o desenvolvimento da aplicação no Lovable, foram identificadas oportunidades de melhoria na experiência do usuário.

| Ajuste | Motivo |
|---|---|
| Aprimoramento da apresentação dos resultados | Tornar o diagnóstico de compatibilidade mais claro e intuitivo, facilitando a identificação de competências encontradas, requisitos ausentes e sugestões de melhoria. |


## 5. Design System

A identidade visual proposta para o CV Match AI utiliza uma interface moderna, minimalista e profissional.

| Elemento | Especificação |
|---|---|
| Cor principal | Roxo (#7555D9) |
| Fundo | Branco e cinza claro |
| Tipografia | Inter |
| Componentes | Cards com bordas suaves |
| Botões | Cantos arredondados |
| Layout | Responsivo |
| Estilo | SaaS moderno e minimalista |

## 6. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| React | Construção da interface |
| TypeScript | Tipagem e organização do código |
| Tailwind CSS | Estilização |
| Lovable | Desenvolvimento assistido por IA |

## 7. Publicação

- **Aplicação:** [[Link para o App Implementado]](https://cv-match-ia.lovable.app/)
- **Repositório GitHub:** [[URL do repositório]](https://github.com/aline1712am/cv-match-ia/)

## 8. Status do desenvolvimento

### Funcionalidades e etapas

- [x] Definição da proposta e do público-alvo da aplicação.
- [x] Definição das funcionalidades principais.
- [x] Elaboração do prompt inicial para geração da aplicação no Lovable.
- [x] Primeira geração da interface da aplicação.
- [x] Aprimoramento da apresentação dos resultados da análise.
- [x] Implementação da análise de compatibilidade entre currículo e vaga.
- [x] Implementação da edição e otimização do currículo.
- [x] Publicação da aplicação.


## 9. Considerações finais

O CV Match AI propõe utilizar inteligência artificial para tornar a preparação de currículos mais acessível a estudantes e pessoas em início de carreira.

O projeto busca demonstrar como ferramentas de desenvolvimento assistido por inteligência artificial podem transformar uma necessidade real em uma solução digital, combinando experiência do usuário, análise de informações e automação.
