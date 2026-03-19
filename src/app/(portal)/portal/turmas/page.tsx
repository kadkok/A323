import { ensureModuleAvailable } from '@/core/modules/module-guard';
import { Card } from '@/core/ui/card';
import { ModuleMaintenance } from '@/core/ui/module-maintenance';

export default function classesPage() {
  const availability = ensureModuleAvailable('classes');

  if (!availability.available) {
    return <ModuleMaintenance title="Turmas" description={availability.reason ?? 'Módulo indisponível.'} />;
  }

  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Módulo classes</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Turmas</h1>
      <p className="mt-3 text-sm text-slate-300">Tela base do módulo com fallback de manutenção habilitado por feature flag.</p>
    </Card>
  );
}
