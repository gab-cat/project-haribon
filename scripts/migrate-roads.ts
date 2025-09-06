/* eslint-disable @typescript-eslint/no-unused-vars */
/*
  Bun script: Import MongoDB Compass JSON export into Convex `roads` table.
  Usage:
    bun run scripts/migrate-roads.ts <path-to-json> [convex-url]

  - If convex-url is omitted, uses process.env.CONVEX_URL
  - The JSON file can be either:
      a) an array of road documents, or
      b) an object with a top-level `data` array.
*/

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ConvexHttpClient } from 'convex/browser';
import type { FunctionReference } from 'convex/server';

interface MongoNumberLong {
  $numberLong: string;
}
interface MongoNumberInt {
  $numberInt: string;
}
interface MongoNumberDouble {
  $numberDouble: string;
}
interface MongoNumberDecimal {
  $numberDecimal: string;
}

type Maybe<T> = T | null | undefined;
type MongoNumeric = number | string | MongoNumberLong | MongoNumberInt | MongoNumberDouble | MongoNumberDecimal | null;

interface RoadPropertiesMongo {
  u: MongoNumeric;
  v: string | MongoNumeric;
  key: MongoNumeric;
  osmid: MongoNumeric;
  highway?: Maybe<string>;
  oneway?: Maybe<string>;
  reversed?: Maybe<string>;
  length: MongoNumeric;
  speed_kph: MongoNumeric;
  travel_time: MongoNumeric;
  from: string;
  to: string;
  lanes?: Maybe<string>;
  name?: Maybe<string>;
  ref?: Maybe<string>;
  bridge?: Maybe<string>;
  maxspeed?: Maybe<string>;
  access?: Maybe<string>;
  width?: Maybe<string>;
  junction?: Maybe<string>;
  tunnel?: Maybe<string>;
}

interface RoadGeometryMongo {
  type: string;
  coordinates: Array<[number, number]>;
}

interface RoadMongo {
  type: string; // "Feature"
  is_damaged: boolean;
  description?: Maybe<string>;
  severity: MongoNumeric;
  properties: RoadPropertiesMongo;
  geometry: RoadGeometryMongo;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toNumber(value: MongoNumeric): number {
  if (value === null) return 0; // Default to 0 for null values
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value);
  if (isObject(value)) {
    if ('$numberLong' in value) return Number((value as MongoNumberLong).$numberLong);
    if ('$numberInt' in value) return Number((value as MongoNumberInt).$numberInt);
    if ('$numberDouble' in value) return Number((value as MongoNumberDouble).$numberDouble);
    if ('$numberDecimal' in value) return Number((value as MongoNumberDecimal).$numberDecimal);
  }
  // Debug: log the problematic value
  console.error('Failed to convert value to number:', JSON.stringify(value, null, 2));
  throw new Error(`Invalid numeric value: ${JSON.stringify(value)}`);
}

function toStringFromMixed(value: string | MongoNumeric): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (isObject(value)) {
    if ('$numberLong' in value) return (value as MongoNumberLong).$numberLong;
    if ('$numberInt' in value) return (value as MongoNumberDouble).$numberDouble;
    if ('$numberDouble' in value) return (value as MongoNumberDouble).$numberDouble;
    if ('$numberDecimal' in value) return (value as MongoNumberDecimal).$numberDecimal;
  }
  // Debug: log the problematic value
  console.error('Failed to convert value to string:', JSON.stringify(value, null, 2));
  throw new Error(`Invalid stringifiable value: ${JSON.stringify(value)}`);
}

function normalizeOptionalString(value: Maybe<string>): string | undefined {
  if (value === null || value === undefined) return undefined;
  return value;
}

function normalizeRoad(doc: RoadMongo) {
  return {
    type: doc.type,
    is_damaged: Boolean(doc.is_damaged),
    description: normalizeOptionalString(doc.description),
    severity: toNumber(doc.severity),
    properties: {
      u: toNumber(doc.properties.u),
      v: toNumber(doc.properties.v),
      key: toNumber(doc.properties.key),
      osmid: toNumber(doc.properties.osmid),
      highway: normalizeOptionalString(doc.properties.highway),
      oneway: normalizeOptionalString(doc.properties.oneway),
      reversed: normalizeOptionalString(doc.properties.reversed),
      length: toNumber(doc.properties.length),
      speed_kph: toNumber(doc.properties.speed_kph),
      travel_time: toNumber(doc.properties.travel_time),
      from: doc.properties.from,
      to: doc.properties.to,
      lanes: normalizeOptionalString(doc.properties.lanes),
      name: normalizeOptionalString(doc.properties.name),
      ref: normalizeOptionalString(doc.properties.ref),
      bridge: normalizeOptionalString(doc.properties.bridge),
      maxspeed: normalizeOptionalString(doc.properties.maxspeed),
      access: normalizeOptionalString(doc.properties.access),
      width: normalizeOptionalString(doc.properties.width),
      junction: normalizeOptionalString(doc.properties.junction),
      tunnel: normalizeOptionalString(doc.properties.tunnel),
    },
    geometry: {
      type: doc.geometry.type,
      coordinates: doc.geometry.coordinates.map(pair => [Number(pair[0]), Number(pair[1])]),
    },
  } as const;
}

async function readInputFile(filePath: string) {
  const abs = path.resolve(filePath);
  const content = await readFile(abs, 'utf8');
  const json = JSON.parse(content);
  if (Array.isArray(json)) return json as RoadMongo[];
  if (Array.isArray(json?.data)) return json.data as RoadMongo[];
  throw new Error('Expected JSON array or object with `data` array');
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

async function retryOperation<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error('Retry operation failed');
}

async function main() {
  const [, , inputPath, urlArg] = process.argv;
  if (!inputPath) {
    console.error('Usage: bun run scripts/migrate-roads.ts <path-to-json> [convex-url]');
    process.exit(1);
  }

  const convexUrl = urlArg || process.env.CONVEX_URL;
  if (!convexUrl) {
    console.error('Missing Convex URL. Provide arg or set CONVEX_URL.');
    process.exit(1);
  }

  const client = new ConvexHttpClient(convexUrl);
  const rawDocs = await readInputFile(inputPath);
  let normalized = rawDocs.map(normalizeRoad);

  // Migration settings
  const batchSize = 50;
  const delayMs = 100; // gentle rate limit between batches
  let inserted = 0;
  let errorCount = 0;
  const skippedCount = 0;
  const startTime = Date.now();

  // Resume from specific index (change this to resume from where you left off)
  const startFromIndex = 7750;
  normalized = normalized.slice(startFromIndex);
  console.log(`Resuming migration from index ${startFromIndex}, processing ${normalized.length} remaining roads...`);
  console.log(`Migration settings: Batch size: ${batchSize}, Delay: ${delayMs}ms`);
  console.log(`Starting migration at ${new Date().toISOString()}`);

  // Until generated API includes road module, assert the function reference.
  const insertRoadRef = 'road_networks/mutations/index.js:insertRoad' as unknown as FunctionReference<'mutation'>;

  for (let i = 0; i < normalized.length; i += batchSize) {
    const batch = normalized.slice(i, i + batchSize);
    for (const road of batch) {
      try {
        await retryOperation(
          async () => {
            await client.mutation(insertRoadRef, road);
          },
          3,
          1000
        );
        inserted += 1;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Failed to insert road ${road.properties.osmid} after all retries:`, errorMessage);
        console.error('Road data:', JSON.stringify(road, null, 2));
        errorCount += 1;
        // Continue with next road instead of stopping
      }
    }
    await sleep(delayMs);
    // Calculate progress and performance metrics
    const elapsed = Date.now() - startTime;
    const progress = (((i + batch.length) / normalized.length) * 100).toFixed(2);
    const avgTimePerRoad = elapsed / (inserted + errorCount);
    const estimatedTimeRemaining = (normalized.length - (i + batch.length)) * avgTimePerRoad;

    console.log(
      `Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(normalized.length / batchSize)}: ` +
        `Inserted ${inserted}/${normalized.length} roads (${progress}%) | ` +
        `Errors: ${errorCount} | ` +
        `Batch size: ${batch.length} | ` +
        `Elapsed: ${formatTime(elapsed)} | ` +
        `ETA: ${formatTime(estimatedTimeRemaining)}`
    );
  }

  // Final migration statistics
  const totalTime = Date.now() - startTime;
  const successRate = ((inserted / (inserted + errorCount)) * 100).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total roads processed: ${normalized.length}`);
  console.log(`Successfully inserted: ${inserted}`);
  console.log(`Errors encountered: ${errorCount}`);
  console.log(`Success rate: ${successRate}%`);
  console.log(`Total time: ${formatTime(totalTime)}`);
  console.log(`Average time per road: ${formatTime(totalTime / (inserted + errorCount))}`);
  console.log(`Completed at: ${new Date().toISOString()}`);
  console.log('='.repeat(60));
}

main();
