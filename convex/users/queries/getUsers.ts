import { QueryCtx } from "@/convex/_generated/server";
import { Infer, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getUsersArgs = v.object({
  paginationOpts: paginationOptsValidator,
});

export const getUsersHandler = async (ctx: QueryCtx, args: Infer<typeof getUsersArgs>) => {
  const { paginationOpts } = args;
  const users = await ctx.db
    .query('users')
    .order('desc')
    .paginate(paginationOpts);
  return users;
};