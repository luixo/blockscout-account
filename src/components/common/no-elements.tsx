import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  paddingVertical: 24,
});

export const NoElements: React.FC = () => {
  return <Wrapper>No elements yet.. :(</Wrapper>;
};
