import React from "react";
import { ApiKeysTable } from "./api-keys-table";
import { styled } from "../../styles";
import { trpc } from "../../utils/trpc";
import { AddApiKeyButton } from "./add-api-key-button";
import Link from "next/link";

const Warning = styled("span", {
  marginLeft: 12,
  whiteSpace: "no-wrap",
});

export const ApiKeys: React.FC = () => {
  const apiKeysQuery = trpc.useQuery(["api-keys.get"]);
  const isLimitReached = (apiKeysQuery.data?.length ?? 0) >= 3;
  return (
    <div>
      <div>
        Create an API key to use with your RPC и EthRPC API requests. Read{" "}
        <Link href="https://google.com">how to use API keys</Link>
      </div>
      <ApiKeysTable query={apiKeysQuery} />
      <AddApiKeyButton
        buttonDisabled={apiKeysQuery.status !== "success" || isLimitReached}
      />
      {isLimitReached ? (
        <Warning>
          You have added maximum API keys (max 3).{" "}
          <Link href="mailto:us@blockscout.com">Contact us</Link>
        </Warning>
      ) : null}
    </div>
  );
};
