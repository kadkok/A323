import type { PropsWithChildren } from 'react';
import { requireUser } from '@/core/auth/auth.service';
import { PortalShell } from '@/core/ui/portal-shell';

export default async function PortalLayout({ children }: PropsWithChildren) {
  await requireUser();

  return <PortalShell>{children}</PortalShell>;
}
