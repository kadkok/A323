import { Card } from '@/core/ui/card';
import { listModuleManifests } from '@/core/config/feature-flags';

export default function HomePage() {
  const modules = listModuleManifests();

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Fase 0 · Fundação</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Webapp modular para operação educacional, social e musical.</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            A base foi reconstruída como monólito modular em Next.js, com autenticação server-side, auditoria mínima, feature flags e isolamento de falhas por módulo.
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Princípios estruturais</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li>• Zero trust entre camadas.</li>
            <li>• LGPD desde o desenho inicial.</li>
            <li>• Sessão segura via cookie httpOnly.</li>
            <li>• Núcleo fixo sem dependência de módulos opcionais.</li>
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.key}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">{module.name}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${module.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-200'}`}>
                {module.enabled ? 'Ativo' : 'Desligado'}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{module.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Dependências: {module.dependencies.join(', ') || 'nenhuma'}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
