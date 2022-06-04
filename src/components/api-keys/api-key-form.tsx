import React from "react";
import { DefaultValues, SubmitHandler } from "react-hook-form";
import { ApiKeyForm } from "../../types/api-keys";
import { Form } from "../common/form";
import { FormInputs } from "./form-inputs";

export type Props = {
  onSubmit: SubmitHandler<ApiKeyForm>;
  title: string;
  hint?: React.ReactNode;
  buttonText: string;
  mutationLoading: boolean;
  defaultValues?: DefaultValues<ApiKeyForm>;
  apiKey?: string;
};

export const ApiKeyFormView: React.FC<Props> = ({
  onSubmit,
  title,
  hint,
  buttonText,
  defaultValues,
  mutationLoading,
  apiKey,
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
      {(form) => <FormInputs form={form} apiKey={apiKey} />}
    </Form>
  );
};
