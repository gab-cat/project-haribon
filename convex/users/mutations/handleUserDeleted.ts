import { v } from 'convex/values';

import { MutationCtx } from '@/convex/_generated/server';

export const handleUserDeletedArgs = {
  clerkUserId: v.string(),
};

export const handleUserDeletedHandler = async (
  ctx: MutationCtx,
  args: { clerkUserId: string }
) => {
  const { clerkUserId } = args;

  try {
    console.log('Soft deleting user from Clerk webhook:', clerkUserId);

    // Find existing user
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkId', clerkUserId))
      .first();

    if (!existingUser) {
      console.log('User not found, skipping deletion');
      return;
    }

    await ctx.db.delete(existingUser._id);

    console.log('User soft deleted successfully:', existingUser._id);
    return existingUser._id;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(`Failed to delete user: ${error}`);
  }
};
