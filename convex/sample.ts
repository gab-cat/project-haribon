import { v } from 'convex/values';

import { query } from './_generated/server';

export const getUser = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id('users'),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
      image: v.string(),
    }),
  ),
  handler: async (ctx, _args) => {
    const users = await ctx.db.query('users').collect();
    return users;
  },
});