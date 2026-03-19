export const permissions = {
  usersManage: 'users.manage',
  privacyManage: 'privacy.manage',
  psychologyRead: 'psychology.read',
  psychologyWrite: 'psychology.write',
  auditRead: 'audit.read',
} as const;

export type PermissionKey = (typeof permissions)[keyof typeof permissions];
