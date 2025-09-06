import { v } from 'convex/values';

import { MutationCtx } from '@/convex/_generated/server';

export const handleUserCreatedArgs = {
  clerkUser: v.any(),
};

export const handleUserCreatedHandler = async (
  ctx: MutationCtx,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { clerkUser: any }
) => {
  const { clerkUser } = args;

  try {
    console.log('Creating user from Clerk webhook:', clerkUser.id);

    // Extract user data from Clerk user object
    const email = clerkUser.email_addresses?.[0]?.email_address || '';
    const firstName = clerkUser.first_name || '';
    const lastName = clerkUser.last_name || '';
    const imageUrl = clerkUser.image_url || '';
    const phone = clerkUser.phone_numbers?.[0]?.phone_number || '';

    // Check if user already exists
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkId', clerkUser.id))
      .first();

    if (existingUser) {
      console.log('User already exists, skipping creation');
      return existingUser._id;
    }

    // Create new user with default values
    const userId = await ctx.db.insert('users', {
      clerkId: clerkUser.id,
      email,
      firstName,
      lastName,
      imageUrl,
      frontIdImageUrl: '',
      backIdImageUrl: '',
      phone,
      role: 'user',
    });

    console.log('User created successfully:', userId);
    return userId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(`Failed to create user: ${error}`);
  }
};
