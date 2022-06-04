import React from "react";
import { UseFormReturn } from "react-hook-form";
import { WatchlistForm } from "../../types/watchlist";
import { styled } from "../../styles";
import { FormAssetLine } from "./form-asset-line";

const Wrapper = styled("div", {
  marginVertical: 12,
});

const Title = styled("div", {
  fontSize: 14,
  lineHeight: "17px",
  color: "#767676",
  marginBottom: 32,
});

type Props = {
  form: UseFormReturn<WatchlistForm>;
};

export const FormAssets: React.FC<Props> = ({ form }) => {
  return (
    <Wrapper>
      <Title>Please select what types of notifications you will receive:</Title>
      <FormAssetLine name="xDAI" path="xdai" form={form} />
      <FormAssetLine name="ERC-20" path="fts" form={form} />
      <FormAssetLine name="ERC-721, ERC-1155 (NFT)" path="nfts" form={form} />
    </Wrapper>
  );
};
