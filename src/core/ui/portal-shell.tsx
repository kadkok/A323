import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { portalNavigation } from '@/shared/constants/routes';
import { isModuleEnabled } from '@/core/config/feature-flags';

export function PortalShell({ children }: PropsWithChildren) {
  const navigation = portalNavigation.filter((item) => item.moduleKey === 'core' || isModuleEnabled(item.moduleKey));

  return (
    <div className="grid min-h-screen bg-slate-950/30 lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-white/10 bg-slate-950/70 p-6 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Portal autenticado</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">A323 Control Center</h1>
          <p className="mt-2 text-sm text-slate-400">Núcleo operacional com módulos isoláveis por feature flag.</p>
        </div>
        <nav className="mt-8 space-y-2">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-xl border border-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-400/40 hover:bg-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6 lg:p-10">{children}</main>
    </div>
  );
}
