import { describe, expect, it } from 'vitest';
import { getModuleManifest, isModuleEnabled } from '@/core/config/feature-flags';

describe('feature flags', () => {
  it('should keep the core module always enabled', () => {
    expect(getModuleManifest('core').enabled).toBe(true);
  });

  it('should expose consistent availability for active phase 1 modules', () => {
    expect(isModuleEnabled('students')).toBe(true);
    expect(isModuleEnabled('attendance')).toBe(true);
  });
});
