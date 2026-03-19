import type { SystemRole } from '@/shared/constants/roles';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  roles: SystemRole[];
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
}
