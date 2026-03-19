import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { appConfig } from '@/core/config/app-config';
import type { StorageService, UploadedFileDescriptor } from '@/core/storage/storage.contract';
import { env } from '@/shared/utils/env';

export class LocalStorageService implements StorageService {
  async save(file: Buffer, filename: string, mimeType: string): Promise<UploadedFileDescriptor> {
    const id = randomUUID();
    const storageKey = `${id}-${filename}`;
    const targetDir = join(process.cwd(), env.STORAGE_LOCAL_PATH);
    const filePath = join(targetDir, storageKey);

    await mkdir(targetDir, { recursive: true });
    await writeFile(filePath, file);

    return {
      id,
      filename,
      mimeType,
      size: file.byteLength,
      storageKey: `${appConfig.storageDriver}:${storageKey}`,
    };
  }
}
