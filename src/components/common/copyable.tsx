import React from "react";
import { styled } from "../../styles";
import { CopyToClipboard } from "../common/copy-to-clipboard";

const Wrapper = styled("span", {
  display: "inline-flex",
});

type Props = {
  value: string;
};

export const Copyable: React.FC<Props> = ({ value }) => {
  return (
    <Wrapper>
      {value} <CopyToClipboard text={value} />
    </Wrapper>
  );
};
