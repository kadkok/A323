import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { publicNavigation } from '@/shared/constants/routes';

export function PublicShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-[0.3em] text-sky-300 uppercase">
            A323
          </Link>
          <nav className="hidden gap-4 text-sm text-slate-200 lg:flex">
            {publicNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-sky-300">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/acesso" className="rounded-full border border-sky-400/40 px-4 py-2 text-sm text-sky-200 transition hover:border-sky-300 hover:text-white">
            Entrar
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-12">{children}</main>
      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Plataforma modular, segura e preparada para LGPD.</p>
          <p>Fundação Fase 0 · Next.js · Prisma · PostgreSQL</p>
        </div>
      </footer>
    </div>
  );
}
