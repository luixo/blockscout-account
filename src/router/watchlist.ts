import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Collection } from "mongodb";
import { z } from "zod";
import { withMongo } from "../db/mongo";
import { WatchlistElement } from "../types/watchlist";
import { generateWatchElement } from "./faker";
import { watchlistElementValidation } from "./validations";

const withWatchlistCollection = <T>(
  handler: (collection: Collection<WatchlistElement>) => Promise<T>
) => {
  return withMongo(async (db) => {
    const collection = db.collection<WatchlistElement>("watchlist");
    return handler(collection);
  });
};

export const router = trpc
  .router()
  .query("get", {
    input: z.undefined(),
    resolve: async () => {
      const elements = await withWatchlistCollection((collection) =>
        collection.find().toArray()
      );
      return elements.map(({ _id, ...element }) => element);
    },
  })
  .mutation("put", {
    input: watchlistElementValidation,
    resolve: async ({ input: { address, ...input } }) => {
      const lowercaseAddress = address.toLowerCase();
      const duplicateElements = await withWatchlistCollection(
        async (collection) =>
          collection.find({ address: lowercaseAddress }).toArray()
      );
      if (duplicateElements.length !== 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Address ${address} is already tracked`,
        });
      }
      await withWatchlistCollection(async (collection) =>
        collection.insertOne(
          generateWatchElement({ address: lowercaseAddress, ...input })
        )
      );
    },
  })
  .mutation("update", {
    input: watchlistElementValidation,
    resolve: async ({ input: { address, ...input } }) => {
      const lowercaseAddress = address.toLowerCase();
      const result = await withWatchlistCollection(async (collection) =>
        collection.updateOne(
          { address: lowercaseAddress },
          {
            $set: input,
          }
        )
      );
      if (result.matchedCount === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Address ${address} is not being watched`,
        });
      }
    },
  })
  .mutation("switch-mail-notification", {
    input: z.strictObject({ address: z.string() }),
    resolve: async ({ input: { address } }) => {
      const lowercaseAddress = address.toLowerCase();
      const result = await withWatchlistCollection(async (collection) =>
        collection.updateOne({ address: lowercaseAddress }, [
          {
            $set: { emailNotification: { $not: "$emailNotification" } },
          },
        ])
      );
      if (result.matchedCount === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Address ${address} is not being watched`,
        });
      }
    },
  })
  .mutation("delete", {
    input: z.strictObject({ address: z.string() }),
    resolve: async ({ input: { address } }) => {
      const lowercaseAddress = address.toLowerCase();
      const result = await withWatchlistCollection(async (collection) =>
        collection.deleteOne({ address: lowercaseAddress })
      );
      if (result.deletedCount === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Address ${address} is not being watched`,
        });
      }
    },
  });
