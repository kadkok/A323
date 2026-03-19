import { ensureModuleAvailable } from '@/core/modules/module-guard';
import { Card } from '@/core/ui/card';
import { ModuleMaintenance } from '@/core/ui/module-maintenance';

export default function privacyPage() {
  const availability = ensureModuleAvailable('privacy');

  if (!availability.available) {
    return <ModuleMaintenance title="Privacidade" description={availability.reason ?? 'Módulo indisponível.'} />;
  }

  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Módulo privacy</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Privacidade</h1>
      <p className="mt-3 text-sm text-slate-300">Tela base do módulo com fallback de manutenção habilitado por feature flag.</p>
    </Card>
  );
}
