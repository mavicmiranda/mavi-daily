import type { Tab } from '../types'

interface Props {
  tab: Tab
  setTab: (t: Tab) => void
  streak: number
  onLogout: () => void
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'dash',    label: 'Início' },
  { id: 'daily',   label: 'Daily' },
  { id: 'plan',    label: 'Plano' },
  { id: 'history', label: 'Histórico' },
  { id: 'config',  label: 'Config' },
]

export default function TopBar({ tab, setTab, streak, onLogout }: Props) {
  return (
    <header className="topbar">
      <div className="logo">daily.mv</div>
      <nav className="nav-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="streak-pill">🔥 <span>{streak} dias</span></div>
        <button
          onClick={onLogout}
          title="Sair"
          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '16px', padding: '4px', lineHeight: 1 }}
        >
          ⎋
        </button>
      </div>
    </header>
  )
}
