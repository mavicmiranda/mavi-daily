export type Tab = 'dash' | 'daily' | 'history' | 'config' | 'plan'
export type Section = 'tech' | 'gym' | 'mba' | 'read' | 'life' | 'sleep'

export interface Daily {
  id?: string
  created_at?: string
  date: string
  mood?: string
  energia?: number
  estudou?: string
  estudo_min?: number
  praticou?: string
  aprendizado?: string
  duvida?: string
  amanha?: string
  academia?: boolean
  academia_min?: number
  mba?: string
  leitura?: string
  leitura_pag?: number
  lazer?: string
  sono_h?: number
  bloqueio?: string
}

export type Answers = Record<string, string | number | boolean>

export interface Question {
  id: string
  section: Section
  chip: string
  icon: string
  label: string
  text: string
  type?: 'mood' | 'bool' | 'num'
  opts?: string[]
  unit?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  skip_if?: { id: string; val: boolean }
}

export interface PlanTask {
  id: string
  tag: string
  text: string
}

export interface PlanWeek {
  week: number
  title: string
  goal: string
  color: string
  tasks: PlanTask[]
}

export interface ToastState {
  message: string
  type: 'success' | 'error' | ''
}
