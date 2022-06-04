import { withTRPC } from "@trpc/next";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppType } from "next/dist/shared/lib/utils";
import React from "react";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "../router";
import { globalCss } from "../styles";

const globalStyles = globalCss({
  "html,body": {
    backgroundColor: "#F7F8F9",
    padding: 0,
    margin: 0,
    fontFamily: "Inter, sans-serif",
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },

  "*": {
    boxSizing: "border-box",
  },
});

const App: AppType = ({ Component, pageProps }) => {
  globalStyles();
  return (
    <>
      <Component {...pageProps} />
      <ReactQueryDevtools />
      <Toaster />
    </>
  );
};

export default withTRPC<AppRouter>({
  config: () => {
    const isVercel = !!process.env.NEXT_PUBLIC_VERCEL_URL;
    const host = isVercel ? process.env.NEXT_PUBLIC_VERCEL_URL : "localhost";
    const port = isVercel ? undefined : process.env.PORT;
    const secure = isVercel;
    const url = `http${secure ? "s" : ""}://${host}${
      port ? `:${port}` : ""
    }/api/trpc`;
    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: true,
})(App);
