import React from "react";
import { DefaultValues, SubmitHandler } from "react-hook-form";
import { PrivateTagForm } from "../../types/tags";
import { Form } from "../common/form";
import { FormInputs, Props as InputsProps } from "./form-inputs";

export type Props = {
  onSubmit: SubmitHandler<PrivateTagForm>;
  title: string;
  hint?: React.ReactNode;
  buttonText: string;
  mutationLoading: boolean;
  defaultValues?: DefaultValues<PrivateTagForm>;
  valueConfig: InputsProps["valueConfig"];
};

export const TagForm: React.FC<Props> = ({
  onSubmit,
  title,
  hint,
  buttonText,
  defaultValues,
  mutationLoading,
  valueConfig,
}) => {
  return (
    <Form
      title={title}
      hint={hint}
      onSubmit={onSubmit}
      defaultValues={defaultValues || {}}
      buttonText={buttonText}
      mutationLoading={mutationLoading}
    >
      {(form) => <FormInputs form={form} valueConfig={valueConfig} />}
    </Form>
  );
};

export type { InputsProps };
