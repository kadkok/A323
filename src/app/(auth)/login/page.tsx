import { redirect } from 'next/navigation';
import { getCurrentUser, loginWithPassword } from '@/core/auth/auth.service';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect('/portal');
  }

  async function loginAction(formData: FormData) {
    'use server';

    const result = await loginWithPassword({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!result.ok) {
      redirect(`/login?error=${encodeURIComponent(result.message)}`);
    }

    redirect('/portal');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Autenticação server-side</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Acesso ao portal</h1>
        <p className="mt-3 text-sm text-slate-300">Login processado no backend, com sessão persistida apenas em cookie httpOnly.</p>
        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-200">
            E-mail
            <input name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white" required />
          </label>
          <label className="block text-sm text-slate-200">
            Senha
            <input name="password" type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white" required minLength={8} />
          </label>
          <Button type="submit" className="w-full">Entrar com sessão segura</Button>
        </form>
      </Card>
    </div>
  );
}
