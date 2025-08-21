import { v } from "convex/values";
import { MutationCtx } from "../../_generated/server";
import { r2 } from "../r2";
import { api } from "@/convex/_generated/api";


// Delete file from R2 and database
export const deleteFileArgs = {
  key: v.string(),
};

export const deleteFileHandler = async (
  ctx: MutationCtx,
  args: {
    key: string;
  }
) => {
  // Require authentication
  const currentUser = await ctx.runQuery(api.users.api.getCurrentAuthenticatedUser);
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  // Get file metadata from R2 component
  const metadata = await r2.getMetadata(ctx, args.key);
  if (!metadata) {
    throw new Error("File not found");
  }

  // Delete the object from R2
  await r2.deleteObject(ctx, args.key);
};