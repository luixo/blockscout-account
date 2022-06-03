import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { generateWatchElement, generateWatchElements } from "./generator";
import { watchlistElementValidation } from "./validations";

const watchlistDB = {
  elements: generateWatchElements(),
};

export const router = trpc
  .router()
  .query("get", {
    input: z.undefined(),
    resolve: async () => {
      return watchlistDB.elements;
    },
  })
  .mutation("put", {
    input: watchlistElementValidation,
    resolve: async ({ input: { address, ...input } }) => {
      const lowercaseAddress = address.toLowerCase();
      const duplicateElement = watchlistDB.elements.find(
        (element) => element.address === lowercaseAddress
      );
      if (duplicateElement) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Address ${address} is already tracked`,
        });
      }
      watchlistDB.elements.push(generateWatchElement({ address, ...input }));
    },
  })
  .mutation("update", {
    input: watchlistElementValidation,
    resolve: async ({ input: { address, ...input } }) => {
      const lowercaseAddress = address.toLowerCase();
      const matchedElementIndex = watchlistDB.elements.findIndex(
        (element) => element.address === lowercaseAddress
      );
      if (matchedElementIndex === -1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Address ${address} not found`,
        });
      }
      watchlistDB.elements[matchedElementIndex] = {
        ...watchlistDB.elements[matchedElementIndex],
        ...input,
      };
    },
  })
  .mutation("switch-mail-notification", {
    input: z.strictObject({ address: z.string() }),
    resolve: async ({ input: { address, ...input } }) => {
      const lowercaseAddress = address.toLowerCase();
      const matchedElementIndex = watchlistDB.elements.findIndex(
        (element) => element.address === lowercaseAddress
      );
      if (matchedElementIndex === -1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Address ${address} not found`,
        });
      }
      watchlistDB.elements[matchedElementIndex] = {
        ...watchlistDB.elements[matchedElementIndex],
        emailNotification:
          !watchlistDB.elements[matchedElementIndex].emailNotification,
      };
    },
  })
  .mutation("delete", {
    input: z.strictObject({ address: z.string() }),
    resolve: async ({ input }) => {
      const lowercaseAddress = input.address.toLowerCase();
      const matchedElement = watchlistDB.elements.find(
        (element) => element.address === lowercaseAddress
      );
      if (!matchedElement) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Address ${input.address} not found`,
        });
      }
      watchlistDB.elements = watchlistDB.elements.filter(
        (element) => element !== matchedElement
      );
    },
  });
