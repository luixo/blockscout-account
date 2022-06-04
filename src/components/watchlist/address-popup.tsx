import React from "react";
import { SubmitHandler } from "react-hook-form";
import { FormInputs } from "./form-inputs";
import { FormAssets } from "./form-assets";
import { FormNotifications } from "./form-notifications";
import { WatchlistForm } from "../../types/watchlist";
import { Form } from "../common/form";

type Props = {
  defaultValues: WatchlistForm;
  onSubmit: SubmitHandler<WatchlistForm>;
  title: string;
  hint?: React.ReactNode;
  buttonText: string;
  mutationLoading: boolean;
};

export const AddressPopup: React.FC<Props> = ({
  title,
  hint,
  onSubmit,
  defaultValues,
  buttonText,
  mutationLoading,
}) => {
  return (
    <Form
      title={title}
      hint={hint}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      buttonText={buttonText}
      mutationLoading={mutationLoading}
    >
      {(form) => (
        <>
          <FormInputs form={form} />
          <FormAssets form={form} />
          <FormNotifications form={form} />
        </>
      )}
    </Form>
  );
};
