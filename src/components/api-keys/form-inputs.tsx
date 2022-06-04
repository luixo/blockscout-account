import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ApiKeyForm } from "../../types/api-keys";
import { styled } from "../../styles";
import { Input } from "../common/input";

const Wrapper = styled("div", {
  marginVertical: 24,
});

export type Props = {
  apiKey?: string;
  form: UseFormReturn<ApiKeyForm>;
};

export const FormInputs: React.FC<Props> = ({ form, apiKey }) => {
  return (
    <Wrapper>
      {apiKey ? (
        <Input
          label="Auto-generated API key token"
          value={apiKey}
          valid
          disabled
        />
      ) : null}
      <Input
        inputProps={form.register("name", {
          required: true,
          maxLength: 30,
        })}
        label="Application name for API key (e.g Web3 project)"
        value={form.watch("name")}
        valid={!form.formState.errors.name}
      />
    </Wrapper>
  );
};
