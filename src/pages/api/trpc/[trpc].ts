import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiHandler } from "next";
import { appRouter } from "../../../router";

const trpcHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: (opts) => opts,
});

const handler: NextApiHandler = (req, res) => {
  if (req.method === "OPTIONS") {
    return res.send("OK");
  }
  return trpcHandler(req, res);
};

export default handler;
