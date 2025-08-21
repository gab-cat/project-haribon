'use client';

import { ReactNode } from 'react';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexQueryCacheProvider } from 'convex-helpers/react/cache';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ConvexQueryCacheProvider>
        {children}
      </ConvexQueryCacheProvider>
    </ConvexProvider>
  );
}


