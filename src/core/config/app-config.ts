import { env } from '@/shared/utils/env';

export const appConfig = {
  name: env.APP_NAME,
  url: env.APP_URL,
  storageDriver: env.STORAGE_DRIVER,
};
