# Aplicar `supabase-setup.sql`

Opções para aplicar o arquivo `supabase-setup.sql` no seu projeto Supabase.

1) Pelo painel web (recomendado)
 - Acesse o Dashboard do seu projeto em https://app.supabase.com
 - Navegue até **SQL Editor** → **New query**
 - Abra o arquivo `supabase-setup.sql` no seu editor local e cole o conteúdo no editor do Supabase
 - Clique em **Run** para executar as instruções (verifique permissões antes)

2) Usando `psql` (via string de conexão Postgres)
 - Gere a connection string no Dashboard → Settings → Database → Connection string
 - Rode localmente:

```bash
psql "postgres://<DB_USER>:<DB_PASSWORD>@<HOST>:<PORT>/<DB_NAME>" -f supabase-setup.sql
```

3) Usando o Supabase CLI
 - Instale a CLI: https://supabase.com/docs/guides/cli
 - Configure acesso ao banco remoto conforme a documentação do CLI
 - Execute o SQL via `psql` apontando para a connection string obtida com o CLI

Observações:
- Este repositório contém o arquivo: `supabase-setup.sql` (raiz do projeto). Verifique-o antes de executar.
- Não tenho credenciais do seu projeto; preciso que você execute um dos passos acima com as credenciais do seu Supabase.
