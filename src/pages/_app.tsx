import { AppType } from "next/dist/shared/lib/utils";
import React from "react";
import { globalCss } from "../styles";

const globalStyles = globalCss({
  "html,body": {
    padding: 0,
    margin: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
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
  return <Component {...pageProps} />;
};

export default App;
