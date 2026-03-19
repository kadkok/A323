import type { SystemRole } from '@/shared/constants/roles';

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  roles: SystemRole[];
}
