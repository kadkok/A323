import { NextResponse } from 'next/server';
import { logout } from '@/core/auth/auth.service';

export async function POST() {
  await logout();
  return NextResponse.json({ ok: true });
}
