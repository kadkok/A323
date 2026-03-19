import { prisma } from '@/core/db/prisma';
import type { AuditLogInput } from '@/core/audit/audit.types';

export async function createAuditLog(input: AuditLogInput): Promise<void> {
  await prisma.auditLog.create({
    data: {
      actorUserId: input.actorUserId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata,
      sensitive: input.sensitive ?? false,
    },
  });
}
