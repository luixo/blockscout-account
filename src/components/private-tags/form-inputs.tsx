import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PrivateTagForm } from "../../types/tags";
import { styled } from "../../styles";
import { Input } from "../common/input";

const Wrapper = styled("div", {
  marginVertical: 24,
});

export type Props = {
  form: UseFormReturn<PrivateTagForm>;
  valueConfig: {
    label: string;
    pattern: RegExp;
  };
};

export const FormInputs: React.FC<Props> = ({ form, valueConfig }) => {
  return (
    <Wrapper>
      <Input
        inputProps={form.register("tag", { maxLength: 30 })}
        label="Private tag (max 30 characters)"
        value={form.watch("tag")}
        valid={!form.formState.errors.tag}
      />
      <Input
        inputProps={form.register("value", {
          required: true,
          pattern: valueConfig.pattern,
        })}
        label={valueConfig.label}
        value={form.watch("value")}
        valid={!form.formState.errors.value}
      />
    </Wrapper>
  );
};
