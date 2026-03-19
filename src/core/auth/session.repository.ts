import { createHash, randomBytes } from 'node:crypto';
import { addDays } from '@/shared/utils/time';
import { prisma } from '@/core/db/prisma';

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = addDays(new Date(), 7);

  const session = await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return {
    session,
    token,
  };
}

export async function findSessionByToken(token: string) {
  return prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
  });
}

export async function deleteSession(token: string) {
  await prisma.session.deleteMany({
    where: { tokenHash: hashToken(token) },
  });
}
