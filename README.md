# A323 Plataforma Modular

Fundação da Fase 0 para um monólito modular em Next.js com App Router, TypeScript, Tailwind CSS, Prisma e PostgreSQL.

## O que já existe

- Estrutura base de `src/app`, `src/core`, `src/modules`, `src/shared` e `src/tests`.
- Área pública institucional com placeholders.
- Área privada autenticada com sessão server-side e cookie httpOnly.
- Feature flags por módulo com fallback de manutenção.
- Auditoria mínima com persistência em `audit_logs`.
- Prisma schema inicial para identidade, privacidade, arquivos e auditoria.

## Como rodar localmente

1. Copie `.env.example` para `.env`.
2. Suba o PostgreSQL com `docker compose up -d postgres`.
3. Instale dependências com `npm install`.
4. Gere o client Prisma com `npm run prisma:generate`.
5. Aplique o schema com `npm run db:push`.
6. Rode o app com `npm run dev`.

## Próximas fases

- Fase 1: students, guardians, classes, enrollments, attendance.
- Fase 2: conteúdos e núcleo pedagógico.
- Fase 3+: comunicação, mídia, privacidade avançada e integrações.
