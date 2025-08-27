// QUERIES

import { query } from '../_generated/server';

import {
  getCurrentAuthenticatedUserHandler,
  getUserByEmailArgs,
  getUserByEmailHandler,
  getUsersArgs,
  getUsersHandler
} from './queries';

export const getUserByEmail = query({
  args: getUserByEmailArgs,
  handler: getUserByEmailHandler
});

export const getUsers = query({
  args: getUsersArgs,
  handler: getUsersHandler
});

export const getCurrentAuthenticatedUser = query({
  handler: getCurrentAuthenticatedUserHandler
});
