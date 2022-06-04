import React from "react";
import { styled } from "../../styles";
import { Copyable } from "./copyable";

const Wrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  color: "#3F68C0",
});

type Props = {
  value: string;
};

export const Hash: React.FC<Props> = ({ value }) => {
  return (
    <Wrapper>
      <Copyable value={value} />
    </Wrapper>
  );
};
