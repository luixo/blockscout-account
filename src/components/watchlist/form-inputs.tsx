import React from "react";
import { UseFormReturn } from "react-hook-form";
import { WatchlistForm } from "../../hooks/use-watchlist-form";
import { styled } from "../../styles";
import { Input } from "../common/input";

const Wrapper = styled("div", {
  marginVertical: 24,
});

type Props = {
  form: UseFormReturn<WatchlistForm>;
};

export const FormInputs: React.FC<Props> = ({ form }) => {
  return (
    <Wrapper>
      <Input
        inputProps={form.register("address", {
          required: true,
          pattern: /^0x[a-fA-F0-9]{40}$/,
        })}
        label="Address (0x...)"
        value={form.watch("address")}
        valid={!form.formState.errors.address}
      />
      <Input
        inputProps={form.register("tag", { maxLength: 30 })}
        label="Private tag (max 30 characters)"
        value={form.watch("tag")}
        valid={!form.formState.errors.tag}
      />
    </Wrapper>
  );
};
