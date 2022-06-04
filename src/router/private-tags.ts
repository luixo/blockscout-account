import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Collection } from "mongodb";
import { v4 } from "uuid";
import { z } from "zod";
import { withMongo } from "../db/mongo";
import { PrivateTagElement } from "../types/tags";
import { privateTagType, privateTagValidation } from "./validations";

const withPrivateTagCollection = <T>(
  handler: (collection: Collection<PrivateTagElement>) => Promise<T>
) => {
  return withMongo(async (db) => {
    const collection = db.collection<PrivateTagElement>("private-tags");
    return handler(collection);
  });
};

export const router = trpc
  .router()
  .query("get", {
    input: z.strictObject({
      type: privateTagType,
    }),
    resolve: async ({ input: { type } }) => {
      const elements = await withPrivateTagCollection((collection) =>
        collection
          .find({
            type: { $eq: type },
          })
          .toArray()
      );
      return elements;
    },
  })
  .mutation("put", {
    input: privateTagValidation.omit({ _id: true }),
    resolve: async ({ input: { value, ...input } }) => {
      const lowercaseValue = value.toLowerCase();
      const duplicateElements = await withPrivateTagCollection(
        async (collection) =>
          collection.find({ value: lowercaseValue }).toArray()
      );
      if (duplicateElements.length !== 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `${
            input.type === "address" ? "Address" : "Transactions"
          } ${value} is already tracked`,
        });
      }
      await withPrivateTagCollection(async (collection) =>
        collection.insertOne({ _id: v4(), value: lowercaseValue, ...input })
      );
    },
  })
  .mutation("update", {
    input: privateTagValidation,
    resolve: async ({ input: { value, type, ...input } }) => {
      const lowercaseValue = value.toLowerCase();
      const result = await withPrivateTagCollection(async (collection) =>
        collection.updateOne(
          { _id: input._id },
          {
            $set: { ...input, value: lowercaseValue },
          }
        )
      );
      if (result.matchedCount === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `${
            type === "address" ? "Address" : "Transactions"
          } ${value} is not being watched`,
        });
      }
    },
  })
  .mutation("delete", {
    input: z.strictObject({
      _id: z.string(),
      type: privateTagType,
    }),
    resolve: async ({ input: { _id, type } }) => {
      const result = await withPrivateTagCollection(async (collection) =>
        collection.deleteOne({ _id })
      );
      if (result.deletedCount === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `${
            type === "address" ? "Address" : "Transactions"
          } with id ${_id} is not being watched`,
        });
      }
    },
  });
