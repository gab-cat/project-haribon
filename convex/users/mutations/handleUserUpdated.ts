import { v } from 'convex/values';

import { MutationCtx } from '@/convex/_generated/server';

export const handleUserUpdatedArgs = {
  clerkUser: v.any(),
};

export const handleUserUpdatedHandler = async (
  ctx: MutationCtx,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { clerkUser: any }
) => {
  const { clerkUser } = args;

  try {
    console.log('Updating user from Clerk webhook:', clerkUser.id);

    // Find existing user
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkId', clerkUser.id))
      .first();

    if (!existingUser) {
      console.log('User not found, creating new user');

      // Extract user data from Clerk user object
      const email = clerkUser.email_addresses?.[0]?.email_address || '';
      const firstName = clerkUser.first_name || '';
      const lastName = clerkUser.last_name || '';
      const imageUrl = clerkUser.image_url || '';
      const phone = clerkUser.phone_numbers?.[0]?.phone_number || '';

      // Create new user with default values
      const userId = await ctx.db.insert('users', {
        clerkId: clerkUser.id,
        email,
        firstName,
        lastName,
        imageUrl,
        phone,
        role: 'user',
      });

      console.log('User created successfully:', userId);
      return userId;
    }

    // Extract updated data from Clerk user object
    const email =
      clerkUser.email_addresses?.[0]?.email_address || existingUser.email;
    const firstName = clerkUser.first_name || existingUser.firstName;
    const lastName = clerkUser.last_name || existingUser.lastName;
    const imageUrl = clerkUser.image_url || existingUser.imageUrl;
    const phone =
      clerkUser.phone_numbers?.[0]?.phone_number || existingUser.phone;

    // Update user
    await ctx.db.patch(existingUser._id, {
      email,
      firstName,
      lastName,
      imageUrl,
      phone,
    });

    console.log('User updated successfully:', existingUser._id);
    return existingUser._id;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(`Failed to update user: ${error}`);
  }
};
