import { TRPCClientErrorLike } from "@trpc/client";
import React from "react";
import { UseQueryResult } from "react-query";
import { AppRouter } from "../../router";
import { ApiKey } from "../../types/api-keys";
import { Copyable } from "../common/copyable";
import { NoElements } from "../common/no-elements";
import { Spinner } from "../common/spinner";
import { Table } from "../common/table";
import { InfoButtons } from "./info-buttons";

type Props = {
  query: UseQueryResult<ApiKey[], TRPCClientErrorLike<AppRouter>>;
};

export const ApiKeysTable: React.FC<Props> = ({ query }) => {
  switch (query.status) {
    case "error":
      return <div>Error happened during loading: {query.error.message}</div>;
    case "loading":
      return <Spinner size={64} loading />;
    case "idle":
      return null;
    case "success":
      return (
        <>
          <Table
            header={["App name", "API key token"]}
            rows={query.data.map((element) => ({
              key: element.key,
              cells: [
                {
                  key: "name",
                  node: <span>{element.name}</span>,
                },
                {
                  key: "key",
                  node: <Copyable value={element.key} />,
                },
                {
                  key: "controls",
                  node: <InfoButtons element={element} />,
                },
              ],
            }))}
          />
          {query.data?.length === 0 ? <NoElements /> : null}
        </>
      );
  }
};
