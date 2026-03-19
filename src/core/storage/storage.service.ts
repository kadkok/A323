import { LocalStorageService } from '@/core/storage/local-storage.service';
import type { StorageService } from '@/core/storage/storage.contract';

let storageService: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!storageService) {
    storageService = new LocalStorageService();
  }

  return storageService;
}
