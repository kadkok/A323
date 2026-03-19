import Link from 'next/link';
import { Card } from '@/core/ui/card';

export default function Page() {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Área pública</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Privacidade</h1>
      <p className="mt-3 max-w-2xl text-sm text-slate-300">
        Esta página é um placeholder institucional da Fase 0. O conteúdo definitivo será conectado aos módulos e integrações nas próximas etapas.
      </p>
      
    </Card>
  );
}
