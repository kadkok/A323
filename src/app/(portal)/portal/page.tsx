import { Card } from '@/core/ui/card';
import { requireUser } from '@/core/auth/auth.service';
import { listModuleManifests } from '@/core/config/feature-flags';

export default async function PortalPage() {
  const user = await requireUser();
  const modules = listModuleManifests();

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Portal privado</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Bem-vindo, {user.name}</h1>
        <p className="mt-3 text-sm text-slate-300">Perfil autenticado com papéis: {user.roles.join(', ')}.</p>
      </Card>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.key}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">{module.name}</h2>
              <span className={`rounded-full px-3 py-1 text-xs ${module.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-200'}`}>{module.enabled ? 'Pronto' : 'Off'}</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{module.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
