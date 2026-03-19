import { getModuleManifest, isModuleEnabled } from '@/core/config/feature-flags';
import type { ModuleKey } from '@/shared/types/module';

export interface ModuleAvailability {
  available: boolean;
  reason?: string;
}

export function ensureModuleAvailable(moduleKey: ModuleKey): ModuleAvailability {
  if (isModuleEnabled(moduleKey)) {
    return { available: true };
  }

  return {
    available: false,
    reason: getModuleManifest(moduleKey).maintenanceMessage,
  };
}
