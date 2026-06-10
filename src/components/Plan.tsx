import { useState } from 'react'
import { PLAN, TAG_COLORS } from '../lib/data'

export default function Plan() {
  const [checks, setChecks] = useState<Record<string, boolean>>(
    () => JSON.parse(localStorage.getItem('plan_checks') || '{}')
  )

  const toggle = (id: string) => {
    const next = { ...checks, [id]: !checks[id] }
    setChecks(next)
    localStorage.setItem('plan_checks', JSON.stringify(next))
  }

  const allTasks = PLAN.flatMap(w => w.tasks)
  const totalDone = allTasks.filter(t => checks[t.id]).length
  const total = allTasks.length
  const pct = Math.round((totalDone / total) * 100)
  const completedWeeks = PLAN.filter(w => w.tasks.every(t => checks[t.id])).length

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="day-label">Mês 1 — Java + Spring Boot + Cybersegurança</div>
        <div className="day-title" style={{ fontSize: '18px' }}>Checklist de estudos</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div className="plan-stat">
          <div className="plan-stat-val">{totalDone}/{total}</div>
          <div className="plan-stat-lbl">tarefas concluídas</div>
        </div>
        <div className="plan-stat">
          <div className="plan-stat-val">{pct}%</div>
          <div className="plan-stat-lbl">do mês 1</div>
        </div>
        <div className="plan-stat">
          <div className="plan-stat-val">{completedWeeks}/4</div>
          <div className="plan-stat-lbl">semanas completas</div>
        </div>
      </div>

      {PLAN.map(week => {
        const done = week.tasks.filter(t => checks[t.id]).length
        const wpct = Math.round((done / week.tasks.length) * 100)
        return (
          <div key={week.week} className="week-block">
            <div className="week-title">
              {week.title}
              <span className="week-pct">{done}/{week.tasks.length}</span>
            </div>
            <div className="week-sub">{week.goal}</div>
            <div className="week-bar">
              <div className="week-bar-fill" style={{ width: `${wpct}%`, background: week.color }} />
            </div>
            {week.tasks.map(t => {
              const isDone = !!checks[t.id]
              const tc = TAG_COLORS[t.tag] ?? { bg: 'var(--surface2)', color: 'var(--muted)' }
              return (
                <div key={t.id} className="task-item" onClick={() => toggle(t.id)}>
                  <div className={`task-check${isDone ? ' done' : ''}`}>{isDone ? '✓' : ''}</div>
                  <div className={`task-text${isDone ? ' done' : ''}`}>
                    {t.text}
                    <span className="task-tag" style={{ background: tc.bg, color: tc.color }}>{t.tag}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
