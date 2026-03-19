import { NextResponse } from 'next/server';
import { appConfig } from '@/core/config/app-config';
import { listModuleManifests } from '@/core/config/feature-flags';

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: appConfig.name,
    modules: listModuleManifests(),
  });
}
