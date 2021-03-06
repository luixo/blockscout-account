import { faker } from "@faker-js/faker";
import { z } from "zod";
import { WatchlistElement } from "../types/watchlist";
import { watchlistElementValidation } from "./validations";

export const generateWatchElement = (
  input: z.infer<typeof watchlistElementValidation>
): WatchlistElement => {
  const baseTokenEstimate = Number(faker.finance.amount(1, 100));
  const tokensEstimate = Number(faker.finance.amount(10, 1000));
  return {
    ...input,
    iconUrl: "/avatar.png",
    baseToken: {
      amount: Number(faker.finance.amount(10, 1000)),
      tokenName: "xDAI",
      estimated: {
        amount: baseTokenEstimate,
        currency: "USD",
      },
    },
    tokens: faker.datatype.boolean()
      ? {
          quantity: faker.datatype.number({ min: 1, max: 10 }),
          estimated: {
            amount: tokensEstimate,
            currency: "USD",
          },
        }
      : undefined,
    totalBalance: {
      amount: baseTokenEstimate + tokensEstimate,
      currency: "USD",
    },
  };
};
