'use client';

import { useEffect } from 'react';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Falha global protegida</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Algo saiu do esperado.</h1>
          <p className="mt-3 text-sm text-slate-300">O erro foi isolado por boundary global para preservar o restante do sistema.</p>
          <Button className="mt-6" onClick={() => reset()}>
            Tentar novamente
          </Button>
        </Card>
      </body>
    </html>
  );
}
