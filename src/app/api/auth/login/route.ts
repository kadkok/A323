import { NextResponse } from 'next/server';
import { loginWithPassword } from '@/core/auth/auth.service';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await loginWithPassword(body);

  if (!result.ok) {
    return NextResponse.json(result, { status: 401 });
  }

  return NextResponse.json(result);
}
