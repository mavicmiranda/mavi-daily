import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setSuccess('Conta criada! Verifique seu email para confirmar (ou entre já se a confirmação estiver desativada).')
    }
    setLoading(false)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">daily.mv</div>
        <div className="auth-title">{mode === 'login' ? 'Entrar' : 'Criar conta'}</div>
        <div className="auth-sub">
          {mode === 'login' ? 'Acesse suas dailies' : 'Configure sua conta uma vez, acesse de qualquer lugar'}
        </div>

        <form onSubmit={submit}>
          <input
            className="auth-input"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? (
            <>Primeira vez?{' '}<button onClick={() => { setMode('signup'); setError(''); setSuccess('') }}>Criar conta</button></>
          ) : (
            <>Já tem conta?{' '}<button onClick={() => { setMode('login'); setError(''); setSuccess('') }}>Entrar</button></>
          )}
        </div>
      </div>
    </div>
  )
}
