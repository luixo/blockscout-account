import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiHandler } from "next";
import { appRouter } from "../../../router";

const trpcHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: (opts) => opts,
});

const handler: NextApiHandler = (req, res) => {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Max-Age", 86400);
    return res.send("OK");
  }
  return trpcHandler(req, res);
};

export default handler;
