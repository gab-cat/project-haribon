/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as http from '../http.js';
import type * as users_api from '../users/api.js';
import type * as users_mutations_handleUserCreated from '../users/mutations/handleUserCreated.js';
import type * as users_mutations_handleUserDeleted from '../users/mutations/handleUserDeleted.js';
import type * as users_mutations_handleUserUpdated from '../users/mutations/handleUserUpdated.js';
import type * as users_mutations_index from '../users/mutations/index.js';
import type * as users_queries_getCurrentAuthenticatedUser from '../users/queries/getCurrentAuthenticatedUser.js';
import type * as users_queries_getUserByEmail from '../users/queries/getUserByEmail.js';
import type * as users_queries_getUsers from '../users/queries/getUsers.js';
import type * as users_queries_index from '../users/queries/index.js';
import type * as users_webhook from '../users/webhook.js';

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from 'convex/server';

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  http: typeof http;
  'users/api': typeof users_api;
  'users/mutations/handleUserCreated': typeof users_mutations_handleUserCreated;
  'users/mutations/handleUserDeleted': typeof users_mutations_handleUserDeleted;
  'users/mutations/handleUserUpdated': typeof users_mutations_handleUserUpdated;
  'users/mutations/index': typeof users_mutations_index;
  'users/queries/getCurrentAuthenticatedUser': typeof users_queries_getCurrentAuthenticatedUser;
  'users/queries/getUserByEmail': typeof users_queries_getUserByEmail;
  'users/queries/getUsers': typeof users_queries_getUsers;
  'users/queries/index': typeof users_queries_index;
  'users/webhook': typeof users_webhook;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, 'public'>
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, 'internal'>
>;

export declare const components: {
  r2: {
    lib: {
      deleteMetadata: FunctionReference<
        'mutation',
        'internal',
        { bucket: string; key: string },
        null
      >;
      deleteObject: FunctionReference<
        'mutation',
        'internal',
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          secretAccessKey: string;
        },
        null
      >;
      deleteR2Object: FunctionReference<
        'action',
        'internal',
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          secretAccessKey: string;
        },
        null
      >;
      getMetadata: FunctionReference<
        'query',
        'internal',
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          secretAccessKey: string;
        },
        {
          bucket: string;
          bucketLink: string;
          contentType?: string;
          key: string;
          lastModified: string;
          link: string;
          sha256?: string;
          size?: number;
          url: string;
        } | null
      >;
      listMetadata: FunctionReference<
        'query',
        'internal',
        {
          accessKeyId: string;
          bucket: string;
          cursor?: string;
          endpoint: string;
          limit?: number;
          secretAccessKey: string;
        },
        {
          continueCursor: string;
          isDone: boolean;
          page: Array<{
            bucket: string;
            bucketLink: string;
            contentType?: string;
            key: string;
            lastModified: string;
            link: string;
            sha256?: string;
            size?: number;
            url: string;
          }>;
          pageStatus?: null | 'SplitRecommended' | 'SplitRequired';
          splitCursor?: null | string;
        }
      >;
      store: FunctionReference<
        'action',
        'internal',
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          secretAccessKey: string;
          url: string;
        },
        any
      >;
      syncMetadata: FunctionReference<
        'action',
        'internal',
        {
          accessKeyId: string;
          bucket: string;
          endpoint: string;
          key: string;
          onComplete?: string;
          secretAccessKey: string;
        },
        null
      >;
      upsertMetadata: FunctionReference<
        'mutation',
        'internal',
        {
          bucket: string;
          contentType?: string;
          key: string;
          lastModified: string;
          link: string;
          sha256?: string;
          size?: number;
        },
        { isNew: boolean }
      >;
    };
  };
};
