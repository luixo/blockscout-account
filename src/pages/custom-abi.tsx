import type { NextPage } from "next";
import React from "react";
import { Card } from "../components/common/card";
import { Layout } from "../components/general/layout";
import { CustomAbi } from "../components/custom-abi/custom-abi";

const CustomAbiPage: NextPage = () => {
  return (
    <Layout title="Custom ABIs">
      <Card>
        <CustomAbi />
      </Card>
    </Layout>
  );
};

export default CustomAbiPage;
