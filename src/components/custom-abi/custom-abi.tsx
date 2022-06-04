import React from "react";
import { CustomAbiTable } from "./custom-abi-table";
import { styled } from "../../styles";
import { trpc } from "../../utils/trpc";
import { AddCustomAbiButton } from "./add-custom-abi-button";
import Link from "next/link";

const Warning = styled("span", {
  marginLeft: 12,
  whiteSpace: "no-wrap",
});

export const CustomAbi: React.FC = () => {
  const customAbisQuery = trpc.useQuery(["custom-abi.get"]);
  const isLimitReached = (customAbisQuery.data?.length ?? 0) >= 3;
  return (
    <div>
      <div>
        Adding custom ABIs introduces a new way to debug and interact with smart
        contracts. This feature is only for individual Gnosis Chain account and
        available to all smart contracts, whether or not the source code was
        verified on Gnosis Chain.
      </div>
      <CustomAbiTable query={customAbisQuery} />
      <AddCustomAbiButton
        buttonDisabled={customAbisQuery.status !== "success" || isLimitReached}
      />
      {isLimitReached ? (
        <Warning>
          You have added maximum custom ABIs (max 10).{" "}
          <Link href="mailto:us@blockscout.com">Contact us</Link>
        </Warning>
      ) : null}
    </div>
  );
};
