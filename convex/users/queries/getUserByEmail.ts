import { Infer, v } from 'convex/values';

import { QueryCtx } from '@/convex/_generated/server';

export const getUserByEmailArgs = v.object({
  email: v.string(),
});

export const getUserByEmailHandler = async (ctx: QueryCtx, args: Infer<typeof getUserByEmailArgs>) => {
  const { email } = args;
  const user = await ctx.db
    .query('users')
    .withIndex('by_email', (q) => q.eq('email', email))
    .first();
  return user;
};