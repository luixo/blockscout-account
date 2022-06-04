import { TRPCClientErrorLike } from "@trpc/client";
import React from "react";
import { UseQueryResult } from "react-query";
import { AppRouter } from "../../router";
import { CustomAbi } from "../../types/custom-abi";
import { Hash } from "../common/hash";
import { NoElements } from "../common/no-elements";
import { Spinner } from "../common/spinner";
import { Table } from "../common/table";
import { InfoButtons } from "./info-buttons";

type Props = {
  query: UseQueryResult<CustomAbi[], TRPCClientErrorLike<AppRouter>>;
};

export const CustomAbiTable: React.FC<Props> = ({ query }) => {
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
            header={["Contract name", "Contract address"]}
            rows={query.data.map((element) => ({
              key: element.address,
              cells: [
                {
                  key: "name",
                  node: <span>{element.name}</span>,
                },
                {
                  key: "address",
                  node: <Hash value={element.address} />,
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
