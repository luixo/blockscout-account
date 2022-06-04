import type { NextPage } from "next";
import React from "react";
import { Card } from "../components/common/card";
import { Layout } from "../components/general/layout";
import { Tabs } from "../components/common/tabs";
import { PrivateTags } from "../components/private-tags/private-tags";

const PrivateTagsPage: NextPage = () => {
  return (
    <Layout title="Private tags">
      <Card>
        <Tabs>
          {[
            {
              id: "address",
              label: "Address",
              node: <PrivateTags type="address" />,
            },
            {
              id: "transaction",
              label: "Transaction",
              node: <PrivateTags type="transaction" />,
            },
          ]}
        </Tabs>
      </Card>
    </Layout>
  );
};

export default PrivateTagsPage;
