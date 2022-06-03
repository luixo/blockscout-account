import React from "react";
import { FiatAmount } from "../types/watchlist";

type Props = {
  value: FiatAmount;
};

export const FiatAmountView: React.FC<Props> = ({ value }) => {
  return (
    <span>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: value.currency,
      }).format(value.amount)}
    </span>
  );
};
