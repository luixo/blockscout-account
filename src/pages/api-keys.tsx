import type { NextPage } from "next";
import React from "react";
import { Card } from "../components/common/card";
import { Layout } from "../components/general/layout";
import { ApiKeys } from "../components/api-keys/api-keys";

const ApiKeysPage: NextPage = () => {
  return (
    <Layout title="API keys">
      <Card>
        <ApiKeys />
      </Card>
    </Layout>
  );
};

export default ApiKeysPage;
