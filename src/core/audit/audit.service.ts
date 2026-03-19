import { createAuditLog } from '@/core/audit/audit.repository';
import type { AuditLogInput } from '@/core/audit/audit.types';

export async function registerAuditEvent(input: AuditLogInput): Promise<void> {
  await createAuditLog(input);
}
