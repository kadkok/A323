export interface UploadedFileDescriptor {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  storageKey: string;
}

export interface StorageService {
  save(file: Buffer, filename: string, mimeType: string): Promise<UploadedFileDescriptor>;
}
