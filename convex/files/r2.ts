import { R2 } from '@convex-dev/r2';

import { api, components } from '../_generated/api';

export const r2 = new R2(components.r2);

export const { generateUploadUrl, syncMetadata } = r2.clientApi({
  checkUpload: async (ctx, bucket) => {
    // For testing purposes, let's allow all uploads
    // In production, you should implement proper authentication
    console.log(`Upload check for bucket: ${bucket}`);
    
    const currentUser = await ctx.runQuery(api.users.api.getCurrentAuthenticatedUser);
    if (!currentUser) {
      throw new Error('Unauthorized');
    }
  },
  onUpload: async (ctx, bucket, key) => {
    // This runs after the file is uploaded and metadata is synced
    // You can perform additional actions here like:
    // - Updating related entities
    // - Sending notifications
    // - Processing the file (e.g., image resizing)
    
    console.log(`File uploaded successfully: ${key} to bucket: ${bucket}`);
  },
});
