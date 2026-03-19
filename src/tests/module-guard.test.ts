import { describe, expect, it } from 'vitest';
import { ensureModuleAvailable } from '@/core/modules/module-guard';

describe('module guard', () => {
  it('returns maintenance reason for disabled modules', () => {
    const result = ensureModuleAvailable('psychology');

    expect(result.available).toBe(false);
    expect(result.reason).toContain('manutenção');
  });
});
