import type { User } from '@prisma/client';
import { prisma } from '@/core/db/prisma';
import type { UserRecord } from '@/core/users/user.types';
import type { SystemRole } from '@/shared/constants/roles';

function normalizeUser(user: User & { roles: { role: { key: string } }[] }): UserRecord {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    passwordHash: user.passwordHash,
    roles: user.roles.map((entry) => entry.role.key as SystemRole),
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { roles: { include: { role: true } } },
  });

  return user ? normalizeUser(user) : null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { roles: { include: { role: true } } },
  });

  return user ? normalizeUser(user) : null;
}
