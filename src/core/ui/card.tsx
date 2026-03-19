import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/utils/cn';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn('rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/30', className)}>{children}</section>;
}
