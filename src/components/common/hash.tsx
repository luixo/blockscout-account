import React from "react";
import { styled } from "../../styles";
import { CopyToClipboard } from "../common/copy-to-clipboard";

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
      {value} <CopyToClipboard text={value} />
    </Wrapper>
  );
};
