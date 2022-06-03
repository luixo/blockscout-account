import * as trpc from "@trpc/server";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/declarations/src/adapters/node-http";
import { NextApiRequest, NextApiResponse } from "next";
import { router as watchlistRouter } from "./watchlist";

export const appRouter = trpc
  .router<Context>()
  .merge("watchlist.", watchlistRouter);

export type AppRouter = typeof appRouter;
export type Context = NodeHTTPCreateContextFnOptions<
  NextApiRequest,
  NextApiResponse
>;
