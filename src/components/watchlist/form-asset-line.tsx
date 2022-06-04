import React from "react";
import { UseFormReturn } from "react-hook-form";
import { WatchlistForm } from "../../types/watchlist";
import { styled } from "../../styles";
import { Checkbox } from "../common/checkbox";

const Wrapper = styled("div", {
  display: "flex",

  "& + &": {
    marginTop: 20,
  },

  "& > *:not(:first-child)": {
    marginLeft: 24,
  },

  "& > *:nth-child(1)": {
    flex: 3,
  },

  "& > *:nth-child(2)": {
    flex: 1,
  },

  "& > *:nth-child(3)": {
    flex: 1,
  },
});

type Props = {
  form: UseFormReturn<WatchlistForm>;
  name: string;
  path: "fts" | "nfts" | "xdai";
};

export const FormAssetLine: React.FC<Props> = ({ form, path, name }) => {
  const incomingPath = `assetsNotifications.${path}.incoming` as const;
  const outgoingPath = `assetsNotifications.${path}.outgoing` as const;
  return (
    <Wrapper>
      <span>{name}</span>
      <Checkbox
        checked={form.watch(incomingPath)}
        label="Incoming"
        {...form.register(incomingPath)}
        onChange={(nextChecked) => form.setValue(incomingPath, nextChecked)}
      />
      <Checkbox
        checked={form.watch(outgoingPath)}
        label="Outgoing"
        {...form.register(outgoingPath)}
        onChange={(nextChecked) => form.setValue(outgoingPath, nextChecked)}
      />
    </Wrapper>
  );
};
