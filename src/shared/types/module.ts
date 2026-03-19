import type { SystemRole } from '@/shared/constants/roles';

export type ModuleKey =
  | 'core'
  | 'students'
  | 'guardians'
  | 'classes'
  | 'enrollments'
  | 'attendance'
  | 'contents'
  | 'lessonPlans'
  | 'evaluations'
  | 'events'
  | 'messaging'
  | 'reports'
  | 'media'
  | 'psychology'
  | 'privacy';

export interface ModuleManifest {
  key: ModuleKey;
  name: string;
  description: string;
  enabled: boolean;
  dependencies: ModuleKey[];
  requiredRoles: SystemRole[];
  maintenanceMessage: string;
}
