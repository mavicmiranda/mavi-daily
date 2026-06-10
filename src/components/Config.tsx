export default function Config() {
  return (
    <div>
      <div className="config-card">
        <div className="config-title">Conexão Supabase</div>
        <div className="config-desc">
          Suas dailies são salvas automaticamente na nuvem e protegidas por autenticação.
        </div>
        <div style={{ fontSize: '13px', color: 'var(--green)' }}>
          ✓ Conectado — yydexbzvucnnzirmdxws.supabase.co
        </div>
      </div>

      <div className="config-card">
        <div className="config-title">Atualizar RLS — execute no Supabase SQL Editor</div>
        <div className="config-desc">
          Rode isso para garantir que apenas usuários autenticados acessem os dados.
        </div>
        <pre>{`-- Remove a política antiga e cria uma segura
drop policy if exists "allow all" on dailies;

create policy "authenticated only" on dailies
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');`}</pre>
      </div>

      <div className="config-card">
        <div className="config-title">Script SQL inicial (caso ainda não tenha rodado)</div>
        <pre>{`create table if not exists dailies (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  date date not null,
  mood text, energia int,
  estudou text, estudo_min int,
  praticou text, aprendizado text, duvida text, amanha text,
  academia boolean, academia_min int,
  mba text,
  leitura text, leitura_pag int,
  lazer text,
  sono_h numeric, bloqueio text
);
alter table dailies enable row level security;`}</pre>
      </div>
    </div>
  )
}
