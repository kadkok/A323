import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { registerAuditEvent } from '@/core/audit/audit.service';
import { findUserById, findUserByEmail } from '@/core/users/user.repository';
import { createSession, deleteSession, findSessionByToken } from '@/core/auth/session.repository';
import { loginSchema } from '@/core/auth/auth.validators';
import type { SessionUser } from '@/shared/types/auth';

const SESSION_COOKIE_NAME = 'a323_session';

export async function loginWithPassword(input: unknown): Promise<{ ok: true } | { ok: false; message: string }> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: 'Credenciais inválidas.' };
  }

  const user = await findUserByEmail(parsed.data.email);

  if (!user) {
    return { ok: false, message: 'Usuário ou senha inválidos.' };
  }

  const validPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);

  if (!validPassword) {
    await registerAuditEvent({
      actorUserId: user.id,
      action: 'auth.login.failed',
      entityType: 'session',
      entityId: user.id,
    });

    return { ok: false, message: 'Usuário ou senha inválidos.' };
  }

  const { token } = await createSession(user.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  await registerAuditEvent({
    actorUserId: user.id,
    action: 'auth.login.success',
    entityType: 'session',
    entityId: user.id,
  });

  return { ok: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await deleteSession(token);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await findSessionByToken(token);

  if (!session || session.expiresAt < new Date()) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  const user = await findUserById(session.userId);

  if (!user) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/acesso');
  }

  return user;
}
