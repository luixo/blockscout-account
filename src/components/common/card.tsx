import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  backgroundColor: "white",
  borderRadius: 10,
  paddingVertical: 20,
  paddingHorizontal: 32,
});

type Props = {
  children: React.ReactNode;
};

export const Card: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
