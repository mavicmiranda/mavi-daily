import { useState } from 'react'
import type { Daily, Answers, Question } from '../types'
import { QUESTIONS, SECTION_LABELS } from '../lib/data'
import { supabase } from '../lib/supabase'
import Summary from './Summary'

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

// ── Question card ────────────────────────────────────────────────────────────

interface CardProps {
  question: Question
  answers: Answers
  setAnswer: (id: string, val: string | number | boolean) => void
}

function QuestionCard({ question: q, answers, setAnswer }: CardProps) {
  const saved = answers[q.id]

  return (
    <div>
      <div className={`section-chip ${q.chip}`}>{q.icon} {SECTION_LABELS[q.section]}</div>
      <div className="q-text">{q.text}</div>

      {q.type === 'mood' && (
        <div className="opts-row">
          {q.opts!.map(opt => (
            <button
              key={opt}
              className={`opt-btn${saved === opt ? ' selected' : ''}`}
              onClick={() => setAnswer(q.id, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {q.type === 'bool' && (
        <div className="opts-row">
          <button className={`opt-btn${saved === true ? ' selected' : ''}`} onClick={() => setAnswer(q.id, true)}>✓ Sim</button>
          <button className={`opt-btn${saved === false ? ' selected' : ''}`} onClick={() => setAnswer(q.id, false)}>✗ Não</button>
        </div>
      )}

      {q.type === 'num' && (
        <div className="num-row">
          <input
            className="num-input"
            type="number"
            min={q.min ?? 0}
            max={q.max ?? 999}
            step={q.step ?? 1}
            value={saved !== undefined ? String(saved) : ''}
            onChange={e => setAnswer(q.id, parseFloat(e.target.value) || 0)}
            placeholder="0"
            autoFocus
          />
          <span className="num-unit">{q.unit ?? ''}</span>
        </div>
      )}

      {!q.type && (
        <textarea
          value={String(saved ?? '')}
          onChange={e => setAnswer(q.id, e.target.value)}
          placeholder={q.placeholder ?? ''}
          autoFocus
        />
      )}
    </div>
  )
}

// ── Daily tab (manages the full flow) ────────────────────────────────────────

interface Props {
  entries: Daily[]
  userId: string
  onSaved: () => void
  onGoToDash: () => void
  showToast: (msg: string, type?: 'success' | 'error' | '') => void
}

export default function DailyTab({ entries, userId, onSaved, onGoToDash, showToast }: Props) {
  const [answers, setAnswers] = useState<Answers>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [saving, setSaving] = useState(false)

  const alreadyDone =
    entries.some(e => (e.date || e.created_at?.split('T')[0]) === todayKey()) ||
    localStorage.getItem('daily_last') === todayKey()

  const activeQs = QUESTIONS.filter(q => {
    if (!q.skip_if) return true
    return answers[q.skip_if.id] !== q.skip_if.val
  })

  const question = activeQs[currentIdx]
  const progress = activeQs.length > 0 ? (currentIdx / activeQs.length) * 100 : 0

  const setAnswer = (id: string, val: string | number | boolean) => {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  const goNext = async () => {
    const val = answers[question.id]
    if (val === undefined || val === '') {
      showToast('Responda para continuar', 'error')
      return
    }
    if (currentIdx < activeQs.length - 1) {
      setCurrentIdx(i => i + 1)
    } else {
      await finish()
    }
  }

  const finish = async () => {
    setSaving(true)
    const record = { date: todayKey(), user_id: userId, ...answers }
    const { error } = await supabase.from('dailies').insert([record])
    setSaving(false)
    if (error) {
      showToast('Erro ao salvar: ' + error.message, 'error')
      return
    }
    localStorage.setItem('daily_last', todayKey())
    const last = localStorage.getItem('daily_streak_last')
    const today = todayKey()
    const yest = new Date(); yest.setDate(yest.getDate() - 1)
    const yKey = yest.toISOString().split('T')[0]
    if (last !== today) {
      let s = parseInt(localStorage.getItem('daily_streak') || '0')
      s = last === yKey ? s + 1 : 1
      localStorage.setItem('daily_streak', String(s))
      localStorage.setItem('daily_streak_last', today)
    }
    showToast('Daily salva na nuvem ✓', 'success')
    onSaved()
    setCompleted(true)
  }

  const restart = () => {
    setAnswers({})
    setCurrentIdx(0)
    setCompleted(false)
  }

  if (alreadyDone && !completed) {
    return (
      <div>
        <div className="day-header">
          <div className="day-label">Daily concluída 🎯</div>
          <div className="day-title">Você já registrou hoje!</div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '1.5rem' }}>
          Volte amanhã para manter a sequência. 🔥
        </p>
        <button className="btn btn-primary" onClick={onGoToDash}>Ver dashboard →</button>
      </div>
    )
  }

  if (completed) {
    return <Summary answers={answers} onRestart={restart} onGoToDash={onGoToDash} />
  }

  if (!question) return null

  const now = new Date()
  const dayLabel = now.toLocaleDateString('pt-BR', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase())
  const dayTitle = now.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())

  return (
    <div>
      <div className="day-header">
        <div className="day-label">{dayLabel}</div>
        <div className="day-title">{dayTitle}</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <QuestionCard key={question.id} question={question} answers={answers} setAnswer={setAnswer} />

      <div className="actions">
        {currentIdx > 0 && (
          <button className="btn btn-ghost" onClick={() => setCurrentIdx(i => i - 1)}>← Voltar</button>
        )}
        <button
          className="btn btn-primary"
          style={{ marginLeft: 'auto' }}
          onClick={goNext}
          disabled={saving}
        >
          {currentIdx === activeQs.length - 1
            ? (saving ? 'Salvando...' : 'Finalizar ✓')
            : 'Próximo →'}
        </button>
      </div>
    </div>
  )
}
