import type { Daily } from '../types'

const LABELS: Record<string, string> = {
  mood: 'Humor', energia: 'Energia', academia: 'Academia',
  academia_min: 'Tempo treino', estudou: 'O que estudou',
  estudo_min: 'Min. de estudo', praticou: 'O que praticou',
  aprendizado: 'Aprendizado', duvida: 'Ficou em dúvida',
  mba: 'Pós-graduação', leitura: 'Leitura', leitura_pag: 'Páginas',
  lazer: 'Lazer', sono_h: 'Sono', bloqueio: 'Bloqueio', amanha: 'Plano p/ amanhã',
}

const NUM_FIELDS = new Set(['energia', 'academia_min', 'estudo_min', 'leitura_pag', 'sono_h'])

interface Props {
  entry: Daily
  onClose: () => void
}

export default function Modal({ entry, onClose }: Props) {
  const d = new Date(entry.created_at || entry.date)
  const dateStr = d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-top">
          <div className="modal-title">{dateStr}</div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        {Object.entries(LABELS).map(([k, lbl]) => {
          const val = entry[k as keyof Daily]
          if (val === undefined || val === null || val === '') return null
          const display = k === 'academia' ? (val ? 'Sim ✓' : 'Não') : String(val)
          return (
            <div key={k} className="detail-row">
              <div className="detail-lbl">{lbl}</div>
              <div className={`detail-val${NUM_FIELDS.has(k) ? ' detail-num' : ''}`}>{display}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
