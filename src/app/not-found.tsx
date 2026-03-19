import Link from 'next/link';
import { Card } from '@/core/ui/card';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Página não encontrada</h1>
        <p className="mt-3 text-sm text-slate-300">A rota solicitada não existe ou ainda não foi habilitada no mapa modular.</p>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950">
          Voltar para a Home
        </Link>
      </Card>
    </div>
  );
}
