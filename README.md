# Web Pet Front

Este projeto é um frontend desenvolvido com Next.js e TypeScript para o sistema Web Pet.

## Pré-requisitos

- Node.js (recomendado: versão 18 ou superior)
- pnpm (recomendado)

## Instalação

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd web-pet-front
```

2. **Instale as dependências:**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env.local` na raiz do projeto e defina as variáveis necessárias:

```
AUTH_SECRET=<sua_auth_secret>
NEXT_PUBLIC_API_URL=<url_da_api>
```

4. **Execute o projeto em modo de desenvolvimento:**

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:3000`.

## Scripts úteis

- `pnpm dev` — Inicia o servidor de desenvolvimento
- `pnpm build` — Gera a build de produção
- `pnpm start` — Inicia o servidor em modo produção
- `pnpm lint` — Executa o linter

## Observações

- Certifique-se de que a API backend esteja rodando e acessível pelo endereço configurado em `NEXT_PUBLIC_API_URL`.
- Para dúvidas ou problemas, consulte a documentação ou abra uma issue.
