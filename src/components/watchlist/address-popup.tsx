import React from "react";
import { SubmitHandler } from "react-hook-form";
import { styled } from "../../styles";
import { Button } from "../common/button";
import { FormInputs } from "./form-inputs";
import { FormAssets } from "./form-assets";
import { FormNotifications } from "./form-notifications";
import {
  useWatchlistForm,
  WatchlistForm,
} from "../../hooks/use-watchlist-form";

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
});

const Title = styled("h2", {
  margin: 0,
  marginBottom: 20,
});

const ButtonWrapper = styled("div", {
  marginTop: 24,
});

type Props = {
  defaultValues: WatchlistForm;
  onSubmit: SubmitHandler<WatchlistForm>;
  title: string;
  prefix?: React.ReactNode;
  buttonText: string;
  mutationLoading: boolean;
};

export const AddressPopup: React.FC<Props> = ({
  title,
  prefix,
  onSubmit,
  defaultValues,
  buttonText,
  mutationLoading,
}) => {
  const form = useWatchlistForm(defaultValues);

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Title>{title}</Title>
      {prefix}
      <FormInputs form={form} />
      <FormAssets form={form} />
      <FormNotifications form={form} />
      <ButtonWrapper>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid}
          loading={mutationLoading}
          minWidth={200}
        >
          {buttonText}
        </Button>
      </ButtonWrapper>
    </Form>
  );
};
