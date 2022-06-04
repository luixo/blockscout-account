import React from "react";
import { useLoading, Oval } from "@agney/react-loading";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  padding: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

type Props = {
  size: number;
  loading: boolean;
};

export const Spinner: React.FC<Props> = ({ size, loading }) => {
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval width={size} />,
  });
  return <Wrapper {...containerProps}>{indicatorEl}</Wrapper>;
};
