import type { Question, PlanWeek } from '../types'

export const QUESTIONS: Question[] = [
  { id: 'mood', section: 'life', chip: 'chip-life', icon: '😊', label: 'humor',
    text: 'Como você está chegando para o dia de hoje?', type: 'mood',
    opts: ['Animada 🚀', 'Focada 🎯', 'Cansada 😴', 'Travada 🤔', 'Tranquila 😌', 'Empolgada ✨'] },
  { id: 'energia', section: 'life', chip: 'chip-life', icon: '⚡', label: 'energia',
    text: 'Nível de energia hoje (1–10)?', type: 'num', unit: '/ 10', min: 1, max: 10 },

  { id: 'academia', section: 'gym', chip: 'chip-gym', icon: '🏋️', label: 'academia',
    text: 'Você foi à academia hoje?', type: 'bool' },
  { id: 'academia_min', section: 'gym', chip: 'chip-gym', icon: '⏱️', label: 'tempo de treino',
    text: 'Quanto tempo treinou?', type: 'num', unit: 'min', min: 0, max: 180,
    skip_if: { id: 'academia', val: false } },

  { id: 'estudou', section: 'tech', chip: 'chip-tech', icon: '💻', label: 'o que estudou',
    text: 'O que você estudou hoje (Java, Spring Boot, segurança...)?',
    placeholder: 'Ex: Aula de controllers no Spring Boot, capítulo 2 do Código Limpo...' },
  { id: 'estudo_min', section: 'tech', chip: 'chip-tech', icon: '⏱️', label: 'tempo de estudo',
    text: 'Quantos minutos você estudou hoje?', type: 'num', unit: 'min', min: 0, max: 300 },
  { id: 'praticou', section: 'tech', chip: 'chip-tech', icon: '⌨️', label: 'o que praticou',
    text: 'O que você colocou em prática?',
    placeholder: 'Ex: Criei meu primeiro endpoint REST, refatorei um método...' },
  { id: 'aprendizado', section: 'tech', chip: 'chip-tech', icon: '💡', label: 'principal aprendizado',
    text: 'Qual foi o principal aprendizado técnico do dia?',
    placeholder: 'Ex: Entendi a diferença entre @RestController e @Controller...' },
  { id: 'duvida', section: 'tech', chip: 'chip-tech', icon: '🤔', label: 'ficou em dúvida',
    text: 'O que ainda não ficou claro?',
    placeholder: 'Ex: Não entendi bem como o JPA funciona por baixo...' },

  { id: 'mba', section: 'mba', chip: 'chip-mba', icon: '🎓', label: 'pós-graduação',
    text: 'Teve alguma atividade do MBA hoje? (aula, tarefa, leitura de material)',
    placeholder: 'Ex: Assisti aula de arquitetura de sistemas... (ou "nenhuma")' },

  { id: 'leitura', section: 'read', chip: 'chip-read', icon: '📚', label: 'leitura',
    text: 'O que você leu hoje? (livro técnico, artigo, notícia...)',
    placeholder: 'Ex: Li 15 páginas do Clean Code, artigo sobre Kafka no Medium...' },
  { id: 'leitura_pag', section: 'read', chip: 'chip-read', icon: '📄', label: 'páginas lidas',
    text: 'Quantas páginas você leu hoje?', type: 'num', unit: 'pág', min: 0, max: 200 },

  { id: 'lazer', section: 'life', chip: 'chip-life', icon: '🎮', label: 'lazer',
    text: 'Como foi seu momento de lazer hoje?',
    placeholder: 'Ex: Assisti série, saí com amigos, descansei na varanda...' },

  { id: 'sono_h', section: 'sleep', chip: 'chip-sleep', icon: '🌙', label: 'sono',
    text: 'Quantas horas você dormiu na última noite?', type: 'num', unit: 'h', min: 3, max: 12, step: 0.5 },

  { id: 'bloqueio', section: 'tech', chip: 'chip-tech', icon: '🚧', label: 'bloqueio do dia',
    text: 'Teve algum impedimento ou bloqueio hoje?',
    placeholder: 'Ex: Não consegui configurar o ambiente, me perdi no conteúdo...' },

  { id: 'amanha', section: 'tech', chip: 'chip-tech', icon: '📅', label: 'plano para amanhã',
    text: 'O que você quer fazer amanhã?',
    placeholder: 'Ex: Spring Data JPA + PostgreSQL, continuar o cap 3 do Código Limpo...' },
]

export const SECTION_LABELS: Record<string, string> = {
  tech: 'Estudos', gym: 'Academia', mba: 'Pós-graduação',
  read: 'Leitura', life: 'Vida', sleep: 'Sono',
}

export const QUOTES = [
  { text: 'A consistência supera a intensidade. Não o quanto você fez hoje, mas o fato de ter aparecido.', author: '— princípio do hábito' },
  { text: 'Código limpo faz uma coisa e faz bem. Assim como uma boa rotina.', author: '— Robert C. Martin' },
  { text: 'Você não precisa ser ótima para começar, mas precisa começar para ser ótima.', author: '— Zig Ziglar' },
  { text: 'O segredo de avançar é começar. O segredo de começar é dividir tarefas complexas em pequenas ações.', author: '— Mark Twain' },
  { text: 'Cada linha de código que você escreve hoje é uma versão melhor de você amanhã.', author: '— diário da dev' },
  { text: 'Descanso não é fraqueza — é parte do processo de construção.', author: '— nota de arquitetura' },
  { text: 'Sua rotina é seu sistema. E você confia em sistemas, não em motivação.', author: '— James Clear' },
  { text: 'Programar é como escrever uma carta para o futuro você. Seja gentil.', author: '— comunidade dev' },
]

export const PLAN: PlanWeek[] = [
  {
    week: 1, title: 'Semana 1 — Java moderno na prática',
    goal: 'Consolidar a base antes de entrar no Spring', color: '#3b82f6',
    tasks: [
      { id: 'w1t1', tag: 'Alura', text: 'Java — POO, generics e collections' },
      { id: 'w1t2', tag: 'Alura', text: 'Java — exceptions, streams e lambdas' },
      { id: 'w1t3', tag: 'Prática', text: 'Exercícios de streams na prática' },
      { id: 'w1t4', tag: 'Código Limpo', text: 'Caps. 1–3: nomes, funções e princípios' },
      { id: 'w1t5', tag: 'Prática', text: 'Refatorar código Java já escrito aplicando o que leu' },
      { id: 'w1t6', tag: 'HackerRank', text: 'Exercícios Java nível fácil (trilha Java)' },
      { id: 'w1t7', tag: 'YouTube', text: 'Talk sobre Java moderno (streams, records, sealed classes)' },
    ],
  },
  {
    week: 2, title: 'Semana 2 — Spring Boot do zero',
    goal: 'Criar sua primeira API funcional', color: '#22c55e',
    tasks: [
      { id: 'w2t1', tag: 'Alura', text: 'Spring Boot — estrutura do projeto, primeiro endpoint' },
      { id: 'w2t2', tag: 'Alura', text: 'Controllers, RequestMapping e ResponseEntity' },
      { id: 'w2t3', tag: 'Alura', text: 'Spring Data JPA — conectar ao PostgreSQL, criar entidade' },
      { id: 'w2t4', tag: 'Projeto', text: 'Criar API de controle financeiro pessoal (CRUD de transações)' },
      { id: 'w2t5', tag: 'Alura', text: 'Tratamento de erros e Bean Validation' },
      { id: 'w2t6', tag: 'Projeto', text: 'Adicionar validações e retornos de erro corretos no projeto' },
      { id: 'w2t7', tag: 'Código Limpo', text: 'Caps. 4–5: comentários e formatação' },
    ],
  },
  {
    week: 3, title: 'Semana 3 — PostgreSQL + JPA de verdade',
    goal: 'Entender o que acontece no banco quando você usa JPA', color: '#f59e0b',
    tasks: [
      { id: 'w3t1', tag: 'Alura', text: 'SQL — joins, group by, subqueries' },
      { id: 'w3t2', tag: 'pgexercises', text: 'Praticar queries reais no pgexercises.com' },
      { id: 'w3t3', tag: 'Alura', text: 'JPA — relacionamentos OneToMany / ManyToMany, lazy vs eager' },
      { id: 'w3t4', tag: 'Prática', text: 'Ativar log de SQL no Spring e estudar o N+1 problem' },
      { id: 'w3t5', tag: 'Projeto', text: 'Adicionar relacionamentos ao projeto (usuário → transações → categorias)' },
      { id: 'w3t6', tag: 'Código Limpo', text: 'Caps. 6–9 + refatorar projeto com o que aprendeu' },
    ],
  },
  {
    week: 4, title: 'Semana 4 — Introdução a Cybersegurança',
    goal: 'Base conceitual para o mestrado + aplicação prática', color: '#a78bfa',
    tasks: [
      { id: 'w4t1', tag: 'Alura', text: 'Segurança — fundamentos, CIA Triad, tipos de ataque' },
      { id: 'w4t2', tag: 'OWASP', text: 'OWASP Top 10 (versão PT-BR) — primeiros 5 itens' },
      { id: 'w4t3', tag: 'OWASP', text: 'OWASP Top 10 — itens 6 a 10' },
      { id: 'w4t4', tag: 'Alura', text: 'Spring Security — autenticação básica e configuração' },
      { id: 'w4t5', tag: 'Projeto', text: 'Implementar JWT no projeto: login, token e proteção de rotas' },
      { id: 'w4t6', tag: 'Prática', text: 'Estudar SQL Injection e XSS — onde o Spring protege e onde não protege' },
      { id: 'w4t7', tag: 'Alura', text: 'LGPD para devs — o que precisa implementar no código' },
      { id: 'w4t8', tag: 'Código Limpo', text: 'Caps. 10–11 + revisão geral do projeto do mês' },
    ],
  },
]

export const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  'Alura':        { bg: 'var(--accent-soft)',   color: 'var(--accent)' },
  'Projeto':      { bg: 'var(--green-soft)',    color: 'var(--green)' },
  'Código Limpo': { bg: 'var(--amber-soft)',    color: 'var(--amber)' },
  'Prática':      { bg: 'var(--pink-soft)',     color: 'var(--pink)' },
  'OWASP':        { bg: 'var(--purple-soft)',   color: 'var(--purple)' },
  'HackerRank':   { bg: 'var(--teal-soft)',     color: 'var(--teal)' },
  'YouTube':      { bg: 'rgba(239,68,68,0.1)',  color: '#ef4444' },
  'pgexercises':  { bg: 'var(--amber-soft)',    color: 'var(--amber)' },
}
