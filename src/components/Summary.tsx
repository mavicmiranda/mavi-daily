import type { Answers } from '../types'
import { QUESTIONS } from '../lib/data'

const LABELS: Record<string, string> = {
  mood: 'Humor', energia: 'Energia', academia: 'Academia',
  academia_min: 'Tempo de treino', estudou: 'O que estudou',
  estudo_min: 'Tempo de estudo', praticou: 'O que praticou',
  aprendizado: 'Aprendizado', duvida: 'Ficou em dúvida',
  mba: 'Pós-graduação', leitura: 'Leitura', leitura_pag: 'Páginas lidas',
  lazer: 'Lazer', sono_h: 'Sono', bloqueio: 'Bloqueio', amanha: 'Plano para amanhã',
}

interface Props {
  answers: Answers
  onRestart: () => void
  onGoToDash: () => void
}

export default function Summary({ answers, onRestart, onGoToDash }: Props) {
  return (
    <div>
      <div className="day-header">
        <div className="day-label">Daily concluída 🎯</div>
        <div className="day-title">Mais um dia registrado!</div>
      </div>

      {QUESTIONS.map(q => {
        const v = answers[q.id]
        if (v === undefined || v === '') return null
        const display = q.type === 'bool'
          ? (v ? 'Sim ✓' : 'Não')
          : q.type === 'num'
          ? `${v} ${q.unit ?? ''}`
          : String(v)
        return (
          <div key={q.id} className="detail-row">
            <div className="detail-lbl">{LABELS[q.id] ?? q.id}</div>
            <div className={`detail-val${q.type === 'num' ? ' detail-num' : ''}`}>{display}</div>
          </div>
        )
      })}

      <div className="actions" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
        <button className="btn btn-ghost" onClick={onRestart}>Refazer</button>
        <button className="btn btn-primary" onClick={onGoToDash}>Ver dashboard →</button>
      </div>
    </div>
  )
}
