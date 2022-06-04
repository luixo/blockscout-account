import React from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { styled } from "../../styles";
import { Button } from "../common/button";

const Wrapper = styled("form", {
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

type Props<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  title: string;
  hint?: React.ReactNode;
  buttonText: string;
  mutationLoading: boolean;
  children: (form: UseFormReturn<T>) => React.ReactNode;
};

export const Form = <T extends FieldValues>({
  title,
  hint,
  onSubmit,
  defaultValues,
  buttonText,
  mutationLoading,
  children,
}: Props<T>) => {
  const form = useForm<T>({
    mode: "onChange",
    defaultValues,
  });

  return (
    <Wrapper onSubmit={form.handleSubmit(onSubmit)}>
      <Title>{title}</Title>
      {hint ? <div>{hint}</div> : null}
      {children(form)}
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
    </Wrapper>
  );
};
