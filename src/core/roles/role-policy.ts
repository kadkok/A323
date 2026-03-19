import type { SystemRole } from '@/shared/constants/roles';
import { permissions } from '@/core/permissions/permissions';
import type { PermissionKey } from '@/core/permissions/permissions';

const rolePermissionMap: Record<SystemRole, PermissionKey[]> = {
  admin: Object.values(permissions),
  secretaria: ['users.manage'],
  'coordenador-geral': ['audit.read'],
  'coordenador-pedagogico': [],
  instrutor: [],
  psicologo: ['psychology.read', 'psychology.write'],
  aluno: [],
  responsavel: [],
};

export function roleHasPermission(role: SystemRole, permission: PermissionKey): boolean {
  return rolePermissionMap[role].includes(permission);
}
