import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CustomAbiForm } from "../../types/custom-abi";
import { styled } from "../../styles";
import { Input } from "../common/input";
import { ethereumAddressRegexp } from "../../utils/validation";

const Wrapper = styled("div", {
  marginVertical: 24,
});

export type Props = {
  form: UseFormReturn<CustomAbiForm>;
};

export const FormInputs: React.FC<Props> = ({ form }) => {
  return (
    <Wrapper>
      <Input
        inputProps={form.register("name", {
          required: true,
          maxLength: 30,
        })}
        label="Contract name"
        value={form.watch("name")}
        valid={!form.formState.errors.name}
      />
      <Input
        inputProps={form.register("address", {
          required: true,
          pattern: ethereumAddressRegexp,
        })}
        label="Smart contract address (0x...)"
        value={form.watch("address")}
        valid={!form.formState.errors.address}
      />
      <Input
        inputProps={form.register("abi", {
          required: true,
          validate: (input) => {
            // TODO: proper ABI validation
            try {
              JSON.parse(input);
              return true;
            } catch {
              return false;
            }
          },
        })}
        label="Custom ABI [{...}] (JSON format)"
        value={form.watch("abi")}
        valid={!form.formState.errors.abi}
      />
    </Wrapper>
  );
};
