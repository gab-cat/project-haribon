import { QueryCtx } from '@/convex/_generated/server';

export const getCurrentAuthenticatedUserHandler = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('Unauthorized');
  }
  // Get user by Clerk ID
  const user = await ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
    .first();

  if (!user) {
    throw new Error('User not found or inactive');
  }
  return user;
};
