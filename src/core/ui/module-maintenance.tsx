import { Card } from '@/core/ui/card';

export function ModuleMaintenance({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-amber-500/30 bg-amber-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Módulo temporariamente indisponível</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-200">{description}</p>
    </Card>
  );
}
