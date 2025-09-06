import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export const roadNetworks = defineTable({
  type: v.string(), // "Feature"
  isDamaged: v.boolean(),
  description: v.optional(v.string()),
  severity: v.number(),

  // flatten "properties"
  properties: v.object({
    u: v.number(),
    v: v.number(), // convert $numberLong → string
    key: v.number(),
    osmid: v.number(),
    highway: v.optional(v.string()),
    oneway: v.optional(v.string()),
    reversed: v.optional(v.string()),
    length: v.number(),
    speed_kph: v.number(),
    travel_time: v.number(),
    from: v.string(),
    to: v.string(),
    lanes: v.optional(v.string()),
    name: v.optional(v.string()),
    ref: v.optional(v.string()),
    bridge: v.optional(v.string()),
    maxspeed: v.optional(v.string()),
    access: v.optional(v.string()),
    width: v.optional(v.string()),
    junction: v.optional(v.string()),
    tunnel: v.optional(v.string())
  }),

  geometry: v.object({
    type: v.string(), // "LineString"
    coordinates: v.array(v.array(v.number())), // [[lng, lat], ...]
  }),
});


