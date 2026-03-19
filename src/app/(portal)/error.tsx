'use client';

import { useEffect } from 'react';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';

export default function PortalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Erro isolado na área privada</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">O portal encontrou uma falha.</h1>
        <p className="mt-3 text-sm text-slate-300">A boundary da área autenticada protege o restante do aplicativo.</p>
        <Button className="mt-6" onClick={() => reset()}>
          Recarregar portal
        </Button>
      </Card>
    </div>
  );
}
