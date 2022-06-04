import { TRPCClientErrorLike } from "@trpc/client";
import React from "react";
import { UseQueryResult } from "react-query";
import { AppRouter } from "../../router";
import { PrivateTagElement } from "../../types/tags";
import { Hash } from "../common/hash";
import { NoElements } from "../common/no-elements";
import { Spinner } from "../common/spinner";
import { Table } from "../common/table";
import { Tag } from "../tag";
import { InfoButtons, Props as ButtonsProps } from "./info-buttons";

type Props = {
  query: UseQueryResult<PrivateTagElement[], TRPCClientErrorLike<AppRouter>>;
  valueHeader: string;
  editPopup: ButtonsProps["editPopup"];
};

export const PrivateTagsTable: React.FC<Props> = ({
  query,
  valueHeader,
  editPopup,
}) => {
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
            header={["Private tag", valueHeader]}
            rows={query.data.map((element) => ({
              key: element.value,
              cells: [
                {
                  key: "tag",
                  node: <Tag tag={element.tag} />,
                },
                {
                  key: "value",
                  node: <Hash value={element.value} />,
                },
                {
                  key: "controls",
                  node: <InfoButtons element={element} editPopup={editPopup} />,
                },
              ],
            }))}
          />
          {query.data?.length === 0 ? <NoElements /> : null}
        </>
      );
  }
};
