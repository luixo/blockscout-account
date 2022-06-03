import React from "react";
import { UseFormReturn } from "react-hook-form";
import { WatchlistForm } from "../../hooks/use-watchlist-form";
import { styled } from "../../styles";
import { Checkbox } from "../common/checkbox";

const Wrapper = styled("div", {
  marginVertical: 12,
});

const Title = styled("div", {
  fontSize: 14,
  lineHeight: "17px",
  color: "#767676",
  marginBottom: 20,
});

type Props = {
  form: UseFormReturn<WatchlistForm>;
};

export const FormNotifications: React.FC<Props> = ({ form }) => {
  return (
    <Wrapper>
      <Title>Notification methods:</Title>
      <Checkbox
        checked={form.watch("emailNotification")}
        label="Email"
        {...form.register("emailNotification")}
        onChange={(nextChecked) =>
          form.setValue("emailNotification", nextChecked)
        }
      />
    </Wrapper>
  );
};
