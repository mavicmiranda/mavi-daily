import { useMemo } from 'react'
import type { Daily } from '../types'
import { QUOTES } from '../lib/data'
import { localToday, entryDay } from '../lib/utils'

const QUOTE = QUOTES[Math.floor(Math.random() * QUOTES.length)]
const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

interface Props {
  entries: Daily[]
  onGoToDaily: () => void
}

export default function Dashboard({ entries, onGoToDaily }: Props) {
  const today = localToday()
  const doneToday = entries.some(e => entryDay(e.date, e.created_at) === today)

  const weekDots = useMemo(() => {
    const now = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now)
      d.setDate(d.getDate() - (6 - i))
      const key = d.toLocaleDateString('sv')
      return {
        key,
        day: DAY_NAMES[d.getDay()],
        done: entries.some(e => entryDay(e.date, e.created_at) === key),
        isToday: key === today,
      }
    })
  }, [entries, today])

  const last7 = entries.slice(0, 7)
  const gymDays  = last7.filter(e => e.academia).length
  const studyMin = last7.reduce((s, e) => s + (e.estudo_min || 0), 0)
  const pages    = last7.reduce((s, e) => s + (e.leitura_pag || 0), 0)
  const avgSono  = last7.length
    ? (last7.reduce((s, e) => s + (Number(e.sono_h) || 0), 0) / last7.length).toFixed(1)
    : '—'
  const avgEner  = last7.length
    ? Math.round(last7.reduce((s, e) => s + (e.energia || 0), 0) / last7.length)
    : '—'
  const mbaDays  = last7.filter(e => e.mba && e.mba.toLowerCase() !== 'nenhuma').length

  const pillars = [
    { icon: '💻', name: 'estudo',   val: studyMin >= 60 ? (studyMin / 60).toFixed(1) + 'h' : studyMin + 'min', sub: 'últimos 7 dias' },
    { icon: '🏋️', name: 'academia', val: gymDays,  sub: 'treinos / 7 dias' },
    { icon: '🎓', name: 'pós',      val: mbaDays,  sub: 'atividades / 7 dias' },
    { icon: '📚', name: 'leitura',  val: pages,    sub: 'páginas lidas' },
    { icon: '🌙', name: 'sono',     val: avgSono + 'h', sub: 'média / noite' },
    { icon: '⚡', name: 'energia',  val: avgEner,  sub: 'média / 10' },
  ]

  return (
    <>
      <div className="dash-greeting">
        <h2>{greeting()}, Maria Victória</h2>
        <p>Veja como você está evoluindo</p>
      </div>

      <div className="quote-card">
        <div className="quote-text">{QUOTE.text}</div>
        <div className="quote-author">{QUOTE.author}</div>
      </div>

      <div className="section-title">semana atual</div>
      <div className="week-dots">
        {weekDots.map(d => (
          <div key={d.key} className={`week-dot${d.done ? ' done' : ''}${d.isToday ? ' today' : ''}`}>
            <span className="dot-day">{d.day}</span>
            <span className="dot-check">{d.done ? '✓' : d.isToday ? '·' : ''}</span>
          </div>
        ))}
      </div>

      <div style={{ margin: '1.5rem 0 0.75rem' }} />
      <div className="section-title">últimos 7 dias</div>
      <div className="pillars-grid">
        {pillars.map(p => (
          <div key={p.name} className="pillar-card">
            <div className="pillar-icon">{p.icon}</div>
            <div className="pillar-name">{p.name}</div>
            <div className="pillar-val">{p.val}</div>
            <div className="pillar-sub">{p.sub}</div>
          </div>
        ))}
      </div>

      {doneToday ? (
        <div className="cta-daily" style={{ background: 'var(--green-soft)', borderColor: 'rgba(34,197,94,0.25)' }}>
          <div>
            <div className="cta-text" style={{ color: 'var(--green)' }}>✓ Daily de hoje concluída!</div>
            <div className="cta-sub">Volte amanhã para manter a sequência.</div>
          </div>
        </div>
      ) : (
        <div className="cta-daily">
          <div>
            <div className="cta-text">Daily de hoje pendente</div>
            <div className="cta-sub">Leva menos de 5 minutos.</div>
          </div>
          <button className="btn btn-primary" onClick={onGoToDaily}>Registrar →</button>
        </div>
      )}
    </>
  )
}
