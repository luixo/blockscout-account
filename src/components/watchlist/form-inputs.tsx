import React from "react";
import { UseFormReturn } from "react-hook-form";
import { WatchlistForm } from "../../types/watchlist";
import { styled } from "../../styles";
import { Input } from "../common/input";
import { ethereumAddressRegexp } from "../../utils/validation";

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
          pattern: ethereumAddressRegexp,
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
