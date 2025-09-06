import { internalMutation } from '../_generated/server';

import {
  handleUserCreatedArgs,
  handleUserCreatedHandler,
  handleUserDeletedArgs,
  handleUserDeletedHandler,
  handleUserUpdatedArgs,
  handleUserUpdatedHandler,
} from './mutations';

export const handleUserCreated = internalMutation({
  args: handleUserCreatedArgs,
  handler: handleUserCreatedHandler,
});

export const handleUserUpdated = internalMutation({
  args: handleUserUpdatedArgs,
  handler: handleUserUpdatedHandler,
});

export const handleUserDeleted = internalMutation({
  args: handleUserDeletedArgs,
  handler: handleUserDeletedHandler,
});
