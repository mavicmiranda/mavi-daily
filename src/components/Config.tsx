export default function Config() {
  return (
    <div>
      <div className="config-card">
        <div className="config-title">Conexão Supabase</div>
        <div className="config-desc">
          Suas dailies são salvas na nuvem e isoladas por usuário.
        </div>
        <div style={{ fontSize: '13px', color: 'var(--green)' }}>
          ✓ Conectado — yydexbzvucnnzirmdxws.supabase.co
        </div>
      </div>

      <div className="config-card">
        <div className="config-title">⚠️ Execute este SQL no Supabase</div>
        <div className="config-desc">
          Adiciona isolamento por usuário e bloqueia novos cadastros.
        </div>
        <pre>{`-- 1. Adiciona coluna user_id à tabela
alter table dailies
  add column if not exists user_id uuid references auth.users(id);

-- 2. Remove política antiga e cria uma isolada por usuário
drop policy if exists "allow all" on dailies;
drop policy if exists "authenticated only" on dailies;

create policy "own data only" on dailies
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);`}</pre>
        <div className="config-desc" style={{ marginTop: '12px', marginBottom: 0 }}>
          Depois vá em <strong>Authentication → Settings</strong> e desative <strong>"Enable sign ups"</strong> para ninguém mais criar conta.
        </div>
      </div>
    </div>
  )
}
