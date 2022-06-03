import type { NextPage } from "next";
import React from "react";
import { Button } from "../components/common/button";
import { Card } from "../components/common/card";
import { Layout } from "../components/general/layout";
import { Popup } from "../components/common/popup";
import { AddAddressPopup } from "../components/watchlist/add-address-popup";
import { Watchlist } from "../components/watchlist/watchlist";
import { styled } from "../styles";
import { trpc } from "../utils/trpc";

const Notification = styled("div", {
  marginBottom: 16,
});

const WatchlistPage: NextPage = () => {
  const watchElementsQuery = trpc.useQuery(["watchlist.get"]);

  return (
    <Layout title="Watchlist">
      <Card>
        <Notification>
          An Email notification can be sent to you when an address on your watch
          list sends or receives any transactions.
        </Notification>
        <Watchlist query={watchElementsQuery} />
        <Popup trigger={<Button minWidth={200}>Add address</Button>}>
          {(close) => <AddAddressPopup onDone={close} />}
        </Popup>
      </Card>
    </Layout>
  );
};

export default WatchlistPage;
