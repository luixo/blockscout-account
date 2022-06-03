import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../router";

export const trpc = createReactQueryHooks<AppRouter>();
