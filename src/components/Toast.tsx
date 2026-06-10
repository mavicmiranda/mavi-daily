import type { ToastState } from '../types'

interface Props {
  toast: ToastState | null
}

export default function Toast({ toast }: Props) {
  return (
    <div className={`toast${toast ? ` show ${toast.type}` : ''}`}>
      {toast?.message ?? ''}
    </div>
  )
}
