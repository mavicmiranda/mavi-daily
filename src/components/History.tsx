import type { Daily } from '../types'

interface Props {
  entries: Daily[]
  streak: number
  onOpenEntry: (entry: Daily) => void
}

export default function History({ entries, streak, onOpenEntry }: Props) {
  const total    = entries.length
  const gymTotal = entries.filter(e => e.academia).length
  const studyH   = Math.round(entries.reduce((s, e) => s + (e.estudo_min || 0), 0) / 60)
  const pages    = entries.reduce((s, e) => s + (e.leitura_pag || 0), 0)

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="day-label">Histórico</div>
        <div className="day-title" style={{ fontSize: '18px' }}>Sua evolução</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-val">{total}</div><div className="stat-lbl">Dailies feitas</div></div>
        <div className="stat-card"><div className="stat-val">{streak}</div><div className="stat-lbl">Sequência atual</div></div>
        <div className="stat-card"><div className="stat-val">{studyH}h</div><div className="stat-lbl">Horas de estudo</div></div>
        <div className="stat-card"><div className="stat-val">{gymTotal}</div><div className="stat-lbl">Treinos</div></div>
        <div className="stat-card"><div className="stat-val">{pages}</div><div className="stat-lbl">Páginas lidas</div></div>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          Nenhuma daily ainda.<br />Complete a primeira hoje!
        </div>
      ) : (
        entries.map((e, i) => {
          const d = new Date(e.created_at || e.date)
          const dateStr = d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
          return (
            <div key={e.id ?? i} className="entry-card" onClick={() => onOpenEntry(e)}>
              <div className="entry-top">
                <div className="entry-date">{dateStr} {e.mood ?? ''}</div>
                <div className="entry-tags">
                  {e.academia && (
                    <span className="entry-tag" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>academia</span>
                  )}
                  {(e.estudo_min ?? 0) > 0 && (
                    <span className="entry-tag" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>{e.estudo_min}min estudo</span>
                  )}
                  {(e.leitura_pag ?? 0) > 0 && (
                    <span className="entry-tag" style={{ background: 'var(--amber-soft)', color: 'var(--amber)' }}>{e.leitura_pag}p</span>
                  )}
                </div>
              </div>
              <div className="entry-preview">{e.estudou ?? '(sem registro de estudo)'}</div>
            </div>
          )
        })
      )}
    </div>
  )
}
