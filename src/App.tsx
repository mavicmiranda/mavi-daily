import { useState, useEffect, useCallback } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { Tab, Daily, ToastState } from './types'
import { supabase } from './lib/supabase'
import TopBar from './components/TopBar'
import Toast from './components/Toast'
import Modal from './components/Modal'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import DailyTab from './components/DailyForm'
import Plan from './components/Plan'
import History from './components/History'
import Config from './components/Config'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('dash')
  const [entries, setEntries] = useState<Daily[]>([])
  const [streak, setStreak] = useState(0)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [modal, setModal] = useState<Daily | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const showToast = useCallback((message: string, type: ToastState['type'] = '') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const loadEntries = useCallback(async () => {
    const { data } = await supabase
      .from('dailies')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(90)
    if (data) setEntries(data)
  }, [])

  useEffect(() => {
    if (!session) return
    setStreak(parseInt(localStorage.getItem('daily_streak') || '0'))
    loadEntries()
  }, [session, loadEntries])

  const onDailySaved = useCallback(() => {
    loadEntries()
    setStreak(parseInt(localStorage.getItem('daily_streak') || '0'))
  }, [loadEntries])

  const logout = async () => {
    await supabase.auth.signOut()
    setEntries([])
  }

  if (authLoading) return <div className="loading">Carregando...</div>
  if (!session) return <Login />

  return (
    <>
      <TopBar tab={tab} setTab={setTab} streak={streak} onLogout={logout} />
      <main className="main">
        {tab === 'dash' && (
          <Dashboard entries={entries} onGoToDaily={() => setTab('daily')} />
        )}
        {tab === 'daily' && (
          <DailyTab
            entries={entries}
            userId={session.user.id}
            onSaved={onDailySaved}
            onGoToDash={() => setTab('dash')}
            showToast={showToast}
          />
        )}
        {tab === 'plan' && <Plan />}
        {tab === 'history' && (
          <History entries={entries} streak={streak} onOpenEntry={setModal} />
        )}
        {tab === 'config' && <Config />}
      </main>
      {modal && <Modal entry={modal} onClose={() => setModal(null)} />}
      <Toast toast={toast} />
    </>
  )
}
