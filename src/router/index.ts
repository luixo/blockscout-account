import * as trpc from "@trpc/server";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/declarations/src/adapters/node-http";
import { NextApiRequest, NextApiResponse } from "next";
import { router as watchlistRouter } from "./watchlist";
import { router as privateTagsRouter } from "./private-tags";
import { router as apiKeysRouter } from "./api-keys";
import { router as customAbiRouter } from "./custom-abi";

export const appRouter = trpc
  .router<Context>()
  .merge("watchlist.", watchlistRouter)
  .merge("private-tags.", privateTagsRouter)
  .merge("api-keys.", apiKeysRouter)
  .merge("custom-abi.", customAbiRouter);

export type AppRouter = typeof appRouter;
export type Context = NodeHTTPCreateContextFnOptions<
  NextApiRequest,
  NextApiResponse
>;
