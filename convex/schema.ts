import { defineSchema } from 'convex/server';

import { roadNetworks } from './road_networks/road-networks.model';
import { users } from './users/users.model';

export default defineSchema({
  users,
  roadNetworks,
});
