import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Collection } from "mongodb";
import { z } from "zod";
import { v4 } from "uuid";
import { withMongo } from "../db/mongo";
import { CustomAbi } from "../types/custom-abi";
import { customAbiValidation } from "./validations";

const withCustomAbiCollection = <T>(
  handler: (collection: Collection<CustomAbi>) => Promise<T>
) => {
  return withMongo(async (db) => {
    const collection = db.collection<CustomAbi>("custom-abi");
    return handler(collection);
  });
};

export const router = trpc
  .router()
  .query("get", {
    input: z.undefined(),
    resolve: async () => {
      const elements = await withCustomAbiCollection((collection) =>
        collection.find().toArray()
      );
      return elements;
    },
  })
  .mutation("put", {
    input: customAbiValidation.omit({ _id: true }),
    resolve: async ({ input }) => {
      const customAbisAmount = await withCustomAbiCollection((collection) =>
        collection.countDocuments()
      );
      if (customAbisAmount >= 10) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Maximum amount of custom ABIs reached: 10`,
        });
      }
      const duplicatedAbis = await withCustomAbiCollection((collection) =>
        collection.find({ address: input.address }).toArray()
      );
      if (duplicatedAbis.length !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Custom ABI for address ${input.address} already exists`,
        });
      }
      return withCustomAbiCollection(async (collection) => {
        const id = v4();
        await collection.insertOne({ _id: id, ...input });
        return id;
      });
    },
  })
  .mutation("update", {
    input: customAbiValidation,
    resolve: async ({ input }) => {
      const result = await withCustomAbiCollection(async (collection) =>
        collection.updateOne({ _id: input._id }, { $set: input })
      );
      if (result.matchedCount === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Custom ABI with address ${input.address} does not exist`,
        });
      }
    },
  })
  .mutation("delete", {
    input: customAbiValidation.pick({ _id: true }),
    resolve: async ({ input: { _id } }) => {
      const result = await withCustomAbiCollection(async (collection) =>
        collection.deleteOne({ _id })
      );
      if (result.deletedCount === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Custom ABI with id ${_id} does not exist`,
        });
      }
    },
  });
