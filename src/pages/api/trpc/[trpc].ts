import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../router";

const trpcHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: (opts) => opts,
});

export default trpcHandler;
