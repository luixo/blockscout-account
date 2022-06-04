import React from "react";
import { DefaultValues, SubmitHandler } from "react-hook-form";
import { CustomAbiForm } from "../../types/custom-abi";
import { Form } from "../common/form";
import { FormInputs } from "./form-inputs";

export type Props = {
  onSubmit: SubmitHandler<CustomAbiForm>;
  title: string;
  hint?: React.ReactNode;
  buttonText: string;
  mutationLoading: boolean;
  defaultValues?: DefaultValues<CustomAbiForm>;
};

export const CustomAbiFormView: React.FC<Props> = ({
  onSubmit,
  title,
  hint,
  buttonText,
  defaultValues,
  mutationLoading,
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
      {(form) => <FormInputs form={form} />}
    </Form>
  );
};
