import React from "react";
import { UseQueryResult } from "react-query";
import { TRPCClientErrorLike } from "@trpc/client";
import { Tag } from "../tag";
import { WatchlistElement } from "../../types/watchlist";
import { AppRouter } from "../../router";
import { InfoAddress } from "./info-address";
import { InfoSwitch } from "./info-switch";
import { InfoButtons } from "./info-buttons";
import { Table } from "../common/table";
import { Spinner } from "../common/spinner";
import { NoElements } from "../common/no-elements";

type Props = {
  query: UseQueryResult<WatchlistElement[], TRPCClientErrorLike<AppRouter>>;
};

export const Watchlist: React.FC<Props> = ({ query }) => {
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
            header={["Address", "Private tag", "Notification"]}
            rows={query.data.map((element) => ({
              key: element.address,
              cells: [
                {
                  key: "address",
                  node: <InfoAddress element={element} />,
                },
                {
                  key: "tag",
                  node: element.tag ? <Tag tag={element.tag} /> : null,
                },
                {
                  key: "switch",
                  node: <InfoSwitch element={element} />,
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
