import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

export async function requireAuth() {
  const session = await auth();

  if (session) return session;

  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || headersList.get('x-pathname') || headersList.get('x-invoke-path') || '/';

  redirect(`/sign-in?returnTo=${encodeURIComponent(currentPath)}`);
}
