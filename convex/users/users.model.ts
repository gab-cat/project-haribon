import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const users = defineTable({
  firstName: v.string(),
  lastName: v.string(),
  email: v.string(),
  imageUrl: v.optional(v.string()),
  clerkId: v.string(),
  phone: v.optional(v.string()),
  role: v.union(v.literal('user'), v.literal('admin'), v.literal('superadmin')),
})
  .index('by_clerkId', ['clerkId'])
  .index('by_email', ['email']);
