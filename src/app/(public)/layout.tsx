import type { PropsWithChildren } from 'react';
import { PublicShell } from '@/core/ui/public-shell';

export default function PublicLayout({ children }: PropsWithChildren) {
  return <PublicShell>{children}</PublicShell>;
}
