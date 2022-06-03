import React from "react";
import { UseQueryResult } from "react-query";
import { TRPCClientErrorLike } from "@trpc/client";
import { useLoading, Oval } from "@agney/react-loading";
import { Tag } from "../tag";
import { styled } from "../../styles";
import { WatchlistElement } from "../../types/watchlist";
import { AppRouter } from "../../router";
import { InfoAddress } from "./info-address";
import { InfoSwitch } from "./info-switch";
import { InfoButtons } from "./info-buttons";

const Table = styled("table", {
  borderSpacing: 24,
  margin: -24,
  marginVertical: 0,
  width: "100%",
});

const TableHeaderCell = styled("th", {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17px",
  color: "#767676",

  textAlign: "left",
});

const TableBorderCell = styled("td", {
  borderBottom: "1px solid #E5E5E5",
});

const TableCell = styled("td", {
  verticalAlign: "top",
});

const LoadingIndicator = styled("div", {
  padding: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

type Props = {
  query: UseQueryResult<WatchlistElement[], TRPCClientErrorLike<AppRouter>>;
};

export const Watchlist: React.FC<Props> = ({ query }) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: query.isLoading,
    indicator: <Oval width="64" />,
  });
  switch (query.status) {
    case "error":
      return <div>Error happened during loading: {query.error.message}</div>;
    case "loading":
      return (
        <LoadingIndicator {...containerProps}>{indicatorEl}</LoadingIndicator>
      );
    case "idle":
      return null;
    case "success":
      return (
        <>
          <Table>
            <thead>
              <tr>
                <TableHeaderCell>Address</TableHeaderCell>
                <TableHeaderCell>Private tag</TableHeaderCell>
                <TableHeaderCell>Notification</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableBorderCell colSpan={5} />
              </tr>
              {query.data.map((element) => (
                <React.Fragment key={element.address}>
                  <tr>
                    <TableCell>
                      <InfoAddress element={element} />
                    </TableCell>
                    <TableCell>
                      {element.tag ? <Tag tag={element.tag} /> : null}
                    </TableCell>
                    <TableCell>
                      <InfoSwitch element={element} />
                    </TableCell>
                    <TableCell>
                      <InfoButtons element={element} />
                    </TableCell>
                  </tr>
                  <tr>
                    <TableBorderCell colSpan={5} />
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          {query.data?.length === 0 ? <div>No elements</div> : null}
        </>
      );
  }
};
