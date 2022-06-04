import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Collection } from "mongodb";
import { v4 } from "uuid";
import { z } from "zod";
import { withMongo } from "../db/mongo";
import { ApiKey } from "../types/api-keys";
import { apiKeyValidation } from "./validations";

const withApiKeysCollection = <T>(
  handler: (collection: Collection<ApiKey>) => Promise<T>
) => {
  return withMongo(async (db) => {
    const collection = db.collection<ApiKey>("api-keys");
    return handler(collection);
  });
};

export const router = trpc
  .router()
  .query("get", {
    input: z.undefined(),
    resolve: async () => {
      const elements = await withApiKeysCollection((collection) =>
        collection.find().toArray()
      );
      return elements.map(({ _id, ...element }) => element);
    },
  })
  .mutation("put", {
    input: apiKeyValidation.omit({ key: true }),
    resolve: async ({ input: { name } }) => {
      const apiKeysAmount = await withApiKeysCollection(async (collection) =>
        collection.countDocuments()
      );
      if (apiKeysAmount >= 3) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Maximum amount of API keys reached: 3`,
        });
      }
      return withApiKeysCollection(async (collection) => {
        const key = v4();
        await collection.insertOne({ key, name });
        return key;
      });
    },
  })
  .mutation("update", {
    input: apiKeyValidation,
    resolve: async ({ input: { key, name } }) => {
      const result = await withApiKeysCollection(async (collection) =>
        collection.updateOne({ key: key }, { $set: { name } })
      );
      if (result.matchedCount === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `API key ${key} does not exist`,
        });
      }
    },
  })
  .mutation("delete", {
    input: apiKeyValidation.omit({ name: true }),
    resolve: async ({ input: { key } }) => {
      const result = await withApiKeysCollection(async (collection) =>
        collection.deleteOne({ key })
      );
      if (result.deletedCount === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `API key ${key} does not exist`,
        });
      }
    },
  });
