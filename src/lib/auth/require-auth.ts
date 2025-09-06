import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

export async function requireAuth() {
  const session = await auth();

  if (session.userId) return session;

  const headersList = await headers();
  const rawPath =
    headersList.get('x-current-path') ||
    headersList.get('x-pathname') ||
    headersList.get('x-invoke-path') ||
    '/';
  const safeReturnTo = rawPath.startsWith('/') ? rawPath : '/';

  redirect(`/sign-in?returnTo=${encodeURIComponent(safeReturnTo)}`);
}
