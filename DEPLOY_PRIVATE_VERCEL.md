# Publicação Privada para Aprovação (Vercel + senha)

## 1) Pré-requisitos
- Conta na Vercel.
- Repositório do projeto acessível (GitHub/GitLab/Bitbucket) ou Vercel CLI.
- Variáveis de ambiente:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## 2) Build já validado
- Build de produção validado com sucesso:
  - `npm run build`

## 3) Configuração de SPA (React Router)
- Este projeto já contém `vercel.json` com:
  - `buildCommand: npm run build`
  - `outputDirectory: dist`
  - rewrite global para `/index.html`

Isso garante funcionamento de rotas diretas como:
- `/`
- `/en`
- `/es`
- `/form/pt`
- `/form/en`
- `/form/es`
- `/termos-e-condicoes`
- `/terms-and-conditions`
- `/terminos-y-condiciones`

## 4) Publicar na Vercel
### Opção A: Via painel (recomendado)
1. `Add New -> Project`
2. Selecione o repositório.
3. Framework: `Vite` (auto-detectado).
4. Build command: `npm run build` (ou automático).
5. Output directory: `dist`.
6. Deploy.

### Opção B: Via CLI
1. Instalar CLI:
   - `npm i -g vercel`
2. No projeto:
   - `vercel`
3. Para produção:
   - `vercel --prod`

## 5) Variáveis de ambiente na Vercel
No projeto da Vercel:
1. `Settings -> Environment Variables`
2. Cadastrar:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Re-deploy após salvar variáveis.

## 6) Proteção privada por senha
No deployment/projeto da Vercel:
1. Abrir configurações de proteção de acesso (Deployment Protection / Password Protection).
2. Ativar proteção por senha.
3. Definir senha forte para a rodada de aprovação.
4. Compartilhar com aprovadores:
   - URL
   - Senha
   - Prazo de validade da revisão

## 7) Checklist final de validação
- Abrir URL sem senha: bloqueia acesso.
- Entrar com senha: libera o site.
- Validar rotas:
  - `/`, `/en`, `/es`
  - `/form/pt`, `/form/en`, `/form/es`
  - páginas de termos
- Validar CTAs e troca de idioma.
- Validar envio de formulário nos 3 idiomas.

## 8) Template para envio ao time
Use o texto abaixo:

```
Pessoal, segue link privado para aprovação:
URL: <COLE_AQUI_A_URL>
Senha: <COLE_AQUI_A_SENHA>
Validade da revisão: <DATA/HORA>

Escopo para validação:
- Navegação PT/EN/ES
- CTAs e redirecionamentos
- Formulários e páginas de termos
```

